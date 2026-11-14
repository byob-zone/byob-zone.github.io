import { usable, type SiteConfig } from './btc-dao/core/config';
import { KIND } from './btc-dao/core/events';
import { rebuild } from './btc-dao/core/state';
import { parseDescriptor } from './btc-dao/core/descriptor';
import { loadTreasury, explorerFor } from './btc-dao/core/chain';
import { clockOffset, offsetFromDate, setClockOffset } from './btc-dao/core/util';
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
  /** The app's time minus this phone's clock, for the countdown. */
  offsetMs: number;
  /** The open vote closing soonest, and how many others are open. */
  vote?: { title: string; closeAt: number; link: string; others: number };
  /** The latest payout round paid. */
  payout?: { sats: number; titles: string[]; at: number; link: string };
  /** The story so far: moments computed from the record, newest first. */
  story: Moment[];
}

export type Moment =
  | { at: number; kind: 'founded'; members: number; council: number; threshold: number }
  | { at: number; kind: 'passed' | 'rejected'; title: string }
  | { at: number; kind: 'paid'; sats: number; titles: string[] }
  | { at: number; kind: 'moved' }
  | { at: number; kind: 'joined' | 'left'; name: string };

const STORY_LENGTH = 6;

export type PulseResult = { kind: 'pulse'; pulse: Pulse } | { kind: 'not-founded' } | { kind: 'unreachable' };

/**
 * Read a DAO's pulse once. The DAO's own config says whether it is founded (its DAO id).
 * Its record is read from the public relays first, so the DAO's own relay (the first in its list) stays free for
 * members; the DAO's relay is asked only if the public ones don't have the founding.
 */
export async function readPulse(siteUrl: string): Promise<PulseResult> {
  // The time votes close by is the app's time (protocol 1): this page's own server says what time it is.
  try {
    const sent = Date.now();
    const r = await fetch('/', { method: 'HEAD', cache: 'no-store' });
    const off = offsetFromDate(r.headers.get('date'), sent, Date.now());
    if (off !== undefined) setClockOffset(off);
  } catch { /* the phone's clock, then */ }
  const base = siteUrl.replace(/\/$/, '');
  let site: SiteConfig;
  try {
    const r = await fetch(base + '/dao.json', { cache: 'no-store' });
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
  
  const apis = [...new Set([...usable(site.chainApi), ...usable(dao.founded.config.chainApi ?? [])])];
  const outSats = (r: (typeof paid)[number]) => r.inspection!.outputs.filter(o => o.change === undefined).reduce((s, o) => s + o.value, 0);

  const open = dao.proposals.filter(p => p.status === 'open').sort((a, b) => a.closeAt - b.closeAt);
  const vote = open.length
    ? { title: open[0].content.title, closeAt: open[0].closeAt, link: `${base}/#/p/${open[0].event.id}`, others: open.length - 1 }
    : undefined;

  const paidAt = (r: (typeof paid)[number]) => r.receipt?.created_at ?? r.event.created_at;
  const last = [...paid].sort((a, b) => paidAt(b) - paidAt(a))[0];
  const titleOf = new Map(dao.proposals.map(p => [p.event.id, p.content.title]));
  const payout = last
    ? {
        sats: outSats(last),
        titles: last.content.proposals.map(id => titleOf.get(id)).filter((x): x is string => !!x),
        at: paidAt(last),
        link: `${explorerFor(apis)}/tx/${last.inspection!.txid}`,
      }
    : undefined;

  // The story: the founding, decided votes, paid rounds, treasury moves, members joining and leaving.
  const founded = dao.founded.effectiveAt ?? dao.founded.event.created_at;
  const moments: Moment[] = [];
  const first = dao.settings[0].content;
  moments.push({ at: founded, kind: 'founded', members: dao.rosters[0]?.content.members.length ?? 0, council: first.council.length, threshold: first.threshold });
  for (const p of dao.proposals) {
    if (!['passed', 'rejected', 'no_quorum'].includes(p.status)) continue;
    const at = p.tally?.events[0]?.created_at ?? p.closeAt;
    moments.push({ at, kind: p.status === 'passed' ? 'passed' : 'rejected', title: p.content.title });
  }
  for (const r of paid) moments.push({ at: paidAt(r), kind: 'paid', sats: outSats(r), titles: r.content.proposals.map(id => titleOf.get(id)).filter((x): x is string => !!x) });
  for (const r of dao.rounds) if (r.status === 'paid' && r.isMigration) moments.push({ at: paidAt(r), kind: 'moved' });
  for (let i = 1; i < dao.rosters.length; i++) {
    const before = new Map(dao.rosters[i - 1].content.members.map(m => [dao.personOf(m.key), m.name]));
    const after = new Map(dao.rosters[i].content.members.map(m => [dao.personOf(m.key), m.name]));
    const at = dao.rosters[i].effectiveAt;
    for (const [person, name] of after) if (!before.has(person)) moments.push({ at, kind: 'joined', name });
    for (const [person, name] of before) if (!after.has(person)) moments.push({ at, kind: 'left', name });
  }
  const story = moments.sort((a, b) => b.at - a.at).slice(0, STORY_LENGTH);

  let treasury: number | undefined;
  try {
    const view = await loadTreasury(parseDescriptor(settings.descriptor, site.network), site.network, apis);
    treasury = view.balance;
  } catch {
    treasury = undefined;
  }

  return {
    kind: 'pulse',
    pulse: {
      founded,
      members: dao.members.length,
      council: settings.council.length,
      threshold: settings.threshold,
      treasury,
      paidOut: paid.reduce((sum, r) => sum + outSats(r), 0),
      paidRounds: paid.length,
      readAt: Date.now(),
      offsetMs: clockOffset(),
      vote,
      payout,
      story,
    },
  };
}
