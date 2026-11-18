import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-sans/700.css';
import '@fontsource/ibm-plex-mono/600.css';
import './style.css';
import { T, type Lang } from './i18n';
import { C } from './compare-i18n';

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
  const c = C[lang];
  const shared = { footer: T[lang].footer, contact: T[lang].contact };
  document.documentElement.lang = lang;
  document.title = c.docTitle;
  document.querySelectorAll<HTMLElement>('[data-t]').forEach(node => {
    const key = node.dataset.t as string;
    const v = (c as Record<string, unknown>)[key] ?? (shared as Record<string, unknown>)[key];
    if (typeof v === 'string') node.textContent = v;
  });
  document.querySelectorAll<HTMLButtonElement>('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));

  fill('flow', c.flow.map(([title, text], i) => {
    const li = el('li', 'card step');
    li.append(el('span', 'step-n', '0' + (i + 1)), el('h3', '', title), el('p', '', text));
    return li;
  }));

  fill('cmp', c.rows.map(([topic, coop, dao]) => {
    const tr = el('tr');
    const th = el('th', '', topic);
    th.scope = 'row';
    const a = el('td', '', coop); a.dataset.label = c.colCoop;
    const b = el('td', 'cmp-dao', dao); b.dataset.label = c.colDao;
    tr.append(th, a, b);
    return tr;
  }));

  fill('know', c.know.map(([title, text]) => {
    const li = el('li', 'card step');
    li.append(el('h3', '', title), el('p', '', text));
    return li;
  }));
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
