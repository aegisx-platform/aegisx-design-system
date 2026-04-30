/* AegisX DS · Phase 5 — shared helpers (loaded before the section files) */
window.AX5 = (function(){
  const h = (tag, attrs, ...kids) => {
    const e = document.createElement(tag);
    if (attrs) for (const [k,v] of Object.entries(attrs)) {
      if (k === 'class') e.className = v;
      else if (k === 'html') e.innerHTML = v;
      else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v);
    }
    for (const k of kids.flat()) {
      if (k == null) continue;
      e.appendChild(typeof k === 'string' ? document.createTextNode(k) : k);
    }
    return e;
  };
  const section = (id, num, title, desc, ...blocks) => {
    const s = h('section', {id, class:'section'});
    s.appendChild(h('div', {class:'section__head'},
      h('h2', {class:'section__title'}, h('span', {class:'section__num'}, num), title),
      h('p', {class:'section__desc'}, desc)));
    for (const b of blocks) s.appendChild(b);
    return s;
  };
  const sub = (title, body) => {
    const w = h('div', {class:'subsection'});
    if (title) w.appendChild(h('h3', {class:'subsection__title'}, title));
    w.appendChild(body);
    return w;
  };
  const demo = (...kids) => h('div', {class:'demo'}, ...kids);
  const html2el = (str) => {
    const t = document.createElement('template');
    t.innerHTML = str.trim();
    return t.content.firstElementChild;
  };

  // registry: each section file pushes its builder fn
  const builders = [];
  const register = (fn) => builders.push(fn);
  const mount = () => {
    const root = document.getElementById('sections-phase5')
              || document.getElementById('sections-phase4')
              || document.getElementById('sections-handoff');
    if (!root) return;
    for (const fn of builders) {
      try { root.appendChild(fn()); }
      catch (e) { console.error('[phase5]', fn.name || 'builder', e); }
    }
  };

  return { h, section, sub, demo, html2el, register, mount };
})();
