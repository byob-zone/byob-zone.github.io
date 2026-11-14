import { usable, type SiteConfig } from './btc-dao/core/config';
import { KIND } from './btc-dao/core/events';
import { rebuild } from './btc-dao/core/state';
import { parseDescriptor } from './btc-dao/core/descriptor';
import { loadTreasury } from './btc-dao/core/chain';
import { queryAll } from './btc-dao/lib/relays';

/** What the home page shows of a founded DAO, computed by the same code as the DAO's own app. */
export interface Pulse {
  founded: number; // unix seconds
  members: number;
  council: number;
  threshold: number;
  treasury?: number; // sats, undefined if the chain could not be read
  paidOut: number; // sats paid by payout rounds (not treasury moves)
  paidRounds: number;
  readAt: number; // ms
}

export type PulseResult = { kind: 'pulse'; pulse: Pulse } | { kind: 'not-founded' } | { kind: 'unreachable' };

/**
 * Read a DAO's pulse once. The DAO's own config says whether it is founded (its DAO id).
 * Its record is read from the public relays first, so the DAO's own relay (the first in its list) stays free for
 * members; the DAO's relay is asked only if the public ones don't have the founding.
 */
export async function readPulse(siteUrl: string): Promise<PulseResult> {
  let site: SiteConfig;
  try {
    const r = await fetch(siteUrl.replace(/\/$/, '') + '/dao.json', { cache: 'no-store' });
    if (!r.ok) return { kind: 'unreachable' };
    site = (await r.json()) as SiteConfig;
  } catch {
    return { kind: 'unreachable' };
  }
  if (!site.daoId) return { kind: 'not-founded' };

  const relays = usable(site.relays);
  const publicRelays = relays.slice(1);
  const filter = { '#D': [site.daoId] };
  let events = publicRelays.length ? await queryAll(publicRelays, filter).catch(() => []) : [];
  if (!events.some(e => e.kind === KIND.genesis)) events = await queryAll(relays, filter).catch(() => []);

  const dao = rebuild(site, events);
  if (!dao.founded || !dao.settings.length) return { kind: 'unreachable' };

  const settings = dao.settings[dao.settings.length - 1].content;
  const paid = dao.rounds.filter(r => r.status === 'paid' && !r.isMigration && !r.isSweep && r.inspection);
  const paidOut = paid.reduce((sum, r) => sum + r.inspection!.outputs.filter(o => o.change === undefined).reduce((s, o) => s + o.value, 0), 0);

  let treasury: number | undefined;
  try {
    const apis = [...new Set([...usable(site.chainApi), ...usable(dao.founded.config.chainApi ?? [])])];
    const view = await loadTreasury(parseDescriptor(settings.descriptor, site.network), site.network, apis);
    treasury = view.balance;
  } catch {
    treasury = undefined;
  }

  return {
    kind: 'pulse',
    pulse: {
      founded: dao.founded.effectiveAt ?? dao.founded.event.created_at,
      members: dao.members.length,
      council: settings.council.length,
      threshold: settings.threshold,
      treasury,
      paidOut,
      paidRounds: paid.length,
      readAt: Date.now(),
    },
  };
}
