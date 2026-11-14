import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-sans/700.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/600.css';
import '@fontsource/ibm-plex-mono/700.css';
import './style.css';
import { T, type Lang } from './i18n';
import news from '../content/news.json';
import { DAOS } from './daos';
import type { PulseResult } from './pulse';

type Post = { date: Record<Lang, string>; next?: boolean; tag: Record<Lang, string>; title: Record<Lang, string>; text: Record<Lang, string> };

// Every element is built with DOM calls: no HTML strings anywhere.
function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string, text?: string): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}

function fill(id: string, items: HTMLElement[]) {
  const box = document.getElementById(id);
  if (box) box.replaceChildren(...items);
}

function render(lang: Lang) {
  currentLang = lang;
  const t = T[lang];
  document.documentElement.lang = lang;
  document.title = t.docTitle;
  document.querySelectorAll<HTMLElement>('[data-t]').forEach(node => {
    const v = t[node.dataset.t as keyof typeof t];
    if (typeof v === 'string') node.textContent = v;
  });
  document.querySelectorAll<HTMLButtonElement>('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));

  fill('steps', t.steps.map(([title, text], i) => {
    const li = el('li', 'card step');
    li.append(el('span', 'step-n', '0' + (i + 1)), el('h3', '', title), el('p', '', text));
    return li;
  }));

  renderDao(lang);

  fill('badges', t.badges.map((b, i) => {
    const li = el('li', 'badge');
    const mark = el('span', 'badge-mark ' + b.tone, String(i + 1));
    mark.setAttribute('aria-hidden', 'true');
    const body = el('div', 'badge-body');
    const head = el('div', 'badge-head');
    head.append(el('h3', '', b.name), el('span', 'note', b.who));
    const doP = el('p', '');
    doP.append(el('strong', '', t.task + ' '), b.task);
    const learnP = el('p', 'muted');
    learnP.append(el('strong', '', t.learn + ' '), b.learn);
    body.append(head, doP, learnP, el('span', 'reward', t.reward));
    li.append(mark, body);
    return li;
  }));

  fill('news', (news as Post[]).map(p => {
    const a = el('article', 'card post');
    const side = el('div', 'post-side');
    side.append(el('time', 'mono', p.date[lang]), el('span', 'tag' + (p.next ? ' tag-next' : ''), p.tag[lang]));
    const body = el('div', 'post-body');
    body.append(el('h3', '', p.title[lang]), el('p', '', p.text[lang]));
    a.append(side, body);
    return a;
  }));
}

let pulse: PulseResult | 'reading' = 'reading';
let currentLang: Lang = 'en';
const fmt = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ''));

/** The ALPHA DAO card: the founding facts, or its live pulse once it is founded. */
function renderDao(lang: Lang) {
  const t = T[lang];
  const L = t.live;
  const locale = lang === 'it' ? 'it-IT' : 'en-GB';
  const num = (n: number) => n.toLocaleString(locale);
  const fact = (label: string, value: string, sub?: string) => {
    const d = el('div', 'fact');
    d.append(el('dt', '', label), el('dd', '', value));
    if (sub) d.append(el('dd', 'fact-sub', sub));
    return d;
  };
  const status = document.querySelector<HTMLElement>('[data-t="status"]');
  const foot = document.querySelector<HTMLElement>('[data-t="pulseSoon"]');
  if (pulse !== 'reading' && pulse.kind === 'pulse') {
    const p = pulse.pulse;
    const network = DAOS[0].network;
    if (status) status.textContent = fmt(L.founded, { date: new Date(p.founded * 1000).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' }) });
    fill('facts', [
      fact(L.members, num(p.members)),
      fact(L.council, fmt(L.councilVal, { m: p.threshold, n: p.council }), L.councilSub),
      fact(L.treasury, p.treasury === undefined ? '—' : num(p.treasury), p.treasury === undefined ? L.treasuryUnread : fmt(L.treasurySub, { network })),
      fact(L.paidOut, num(p.paidOut), p.paidRounds === 1 ? L.paidSubOne : fmt(L.paidSub, { n: p.paidRounds })),
    ]);
    renderNow(lang, p);
    if (foot) foot.textContent = fmt(L.readAt, { time: new Date(p.readAt).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }) });
    return;
  }
  fill('facts', t.facts.map(([label, value]) => fact(label, value)));
  if (foot && pulse === 'reading') foot.textContent = t.pulseSoon;
  if (foot && pulse !== 'reading' && pulse.kind === 'unreachable') foot.textContent = L.unreachable;
}

let ticker: number | undefined;

/** What is happening now: the open vote with its countdown, and the latest payout. */
function renderNow(lang: Lang, p: Extract<PulseResult, { kind: 'pulse' }>['pulse']) {
  const L = T[lang].live;
  const locale = lang === 'it' ? 'it-IT' : 'en-GB';
  const box = document.getElementById('now');
  if (!box) return;
  if (ticker !== undefined) clearInterval(ticker);

  const vote = el('div', 'now-cell');
  if (p.vote) {
    const v = p.vote;
    const title = el('a', 'now-title', v.title);
    title.href = v.link;
    const count = el('div', 'countdown');
    const label = el('span', 'note', L.closesIn);
    const clock = el('span', 'clock mono');
    count.append(label, clock);
    const note = el('p', 'note', L.voteNote);
    vote.append(el('span', 'now-label', L.voteOpen), title, count, note);
    if (v.others > 0) vote.append(el('span', 'note', fmt(L.moreOpen, { n: v.others })));
    const tick = () => {
      const left = Math.max(0, Math.round(v.closeAt - (Date.now() + p.offsetMs) / 1000));
      if (left === 0) {
        count.replaceChildren(el('span', 'now-closed', L.closed));
        if (ticker !== undefined) clearInterval(ticker);
        return;
      }
      const d = Math.floor(left / 86400), h = Math.floor((left % 86400) / 3600), m = Math.floor((left % 3600) / 60), s = left % 60;
      const two = (n: number) => String(n).padStart(2, '0');
      clock.textContent = d > 0 ? `${d}d ${two(h)}:${two(m)}` : h > 0 ? `${h}:${two(m)}:${two(s)}` : `${m}:${two(s)}`;
    };
    tick();
    ticker = window.setInterval(tick, 1000);
  } else {
    vote.append(el('span', 'now-label', L.voteOpen), el('p', 'note', L.noVote));
  }

  const pay = el('div', 'now-cell');
  pay.append(el('span', 'now-label', L.latestPayout));
  if (p.payout) {
    const x = p.payout;
    const sats = el('span', 'now-sats mono', `${x.sats.toLocaleString(locale)} ${L.sats}`);
    const what = el('p', 'now-what', [x.titles.length ? fmt(L.payoutFor, { titles: x.titles.join(' · ') }) : '', fmt(L.paidOn, { date: new Date(x.at * 1000).toLocaleDateString(locale, { day: 'numeric', month: 'long' }) })].filter(Boolean).join(' · '));
    const link = el('a', '', L.onChain);
    link.href = x.link;
    link.rel = 'noopener';
    pay.append(sats, what, link);
  } else {
    pay.append(el('p', 'note', L.noPayout));
  }
  box.replaceChildren(vote, pay);
  box.hidden = false;
  renderStory(lang, p);
}

/** The story so far: the latest moments in the record, newest first, by day since the founding. */
function renderStory(lang: Lang, p: Extract<PulseResult, { kind: 'pulse' }>['pulse']) {
  const L = T[lang].live;
  const locale = lang === 'it' ? 'it-IT' : 'en-GB';
  const box = document.getElementById('story');
  if (!box || !p.story.length) return;
  const sats = (n: number) => n.toLocaleString(locale);
  const items = p.story.map(m => {
    const text =
      m.kind === 'founded' ? fmt(L.sFounded, { n: m.members, k: m.council, m: m.threshold })
      : m.kind === 'passed' ? fmt(L.sPassed, { title: m.title })
      : m.kind === 'rejected' ? fmt(L.sRejected, { title: m.title })
      : m.kind === 'paid' ? (m.titles.length ? fmt(L.sPaidFor, { sats: sats(m.sats), titles: m.titles.join(' · ') }) : fmt(L.sPaid, { sats: sats(m.sats) }))
      : m.kind === 'moved' ? L.sMoved
      : m.kind === 'joined' ? fmt(L.sJoined, { name: m.name })
      : m.kind === 'left' ? fmt(L.sLeft, { name: m.name })
      : '';
    const li = el('li', 'moment');
    li.append(el('span', 'moment-day mono', fmt(L.day, { n: Math.floor((m.at - p.founded) / 86400) + 1 })), el('span', 'moment-text', text));
    return li;
  });
  const list = el('ol', 'story-list');
  list.append(...items);
  box.replaceChildren(el('h4', 'story-title', L.storyTitle), list);
  box.hidden = false;
}

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'en' || saved === 'it') return saved;
  } catch { /* storage unavailable: fall back to the browser's language */ }
  return navigator.language.toLowerCase().startsWith('it') ? 'it' : 'en';
}

document.querySelectorAll<HTMLButtonElement>('.lang button').forEach(b => b.addEventListener('click', () => {
  const lang = b.dataset.lang as Lang;
  try { localStorage.setItem('lang', lang); } catch { /* not kept: fine */ }
  render(lang);
}));

render(initialLang());

// Read the pulse once, on load. In development, ?site=<a local DAO site> reads a test DAO instead.
const devSite = import.meta.env.DEV ? new URLSearchParams(location.search).get('site') : null;
// The record code loads after the page shows, so the page itself stays light.
void import('./pulse').then(m => m.readPulse(devSite ?? DAOS[0].site)).then(r => {
  pulse = r;
  renderDao(currentLang);
});
