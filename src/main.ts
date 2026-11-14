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
    if (foot) foot.textContent = fmt(L.readAt, { time: new Date(p.readAt).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }) });
    return;
  }
  fill('facts', t.facts.map(([label, value]) => fact(label, value)));
  if (foot && pulse === 'reading') foot.textContent = t.pulseSoon;
  if (foot && pulse !== 'reading' && pulse.kind === 'unreachable') foot.textContent = L.unreachable;
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
