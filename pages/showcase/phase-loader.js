/* AegisX HIS Showcase — phase loader
   Captures phase 5-10 builders by name into PHASE_BUILDERS so views.js can
   reuse them inside route content. Disables _index.js mount() because the
   showcase has no #sections-phaseN container.
   Must load AFTER each phaseN/_helpers.js but BEFORE the section .js files. */
(function () {
  window.PHASE_BUILDERS = {};
  ['AX5', 'AX6', 'AX7', 'AX8', 'AX9', 'AX10'].forEach(function (ns) {
    var api = window[ns];
    if (!api || typeof api.register !== 'function') {
      console.warn('[phase-loader] missing namespace', ns);
      return;
    }
    var origRegister = api.register;
    api.register = function (fn) {
      var name = fn && fn.name;
      if (name) window.PHASE_BUILDERS[name] = fn;
      return origRegister.call(this, fn);
    };
    api.mount = function () {};
  });

  /* Returns the full <section> (with docs header) — kept for backward compat. */
  window.renderPhaseComponent = function (builderName) {
    var fn = window.PHASE_BUILDERS && window.PHASE_BUILDERS[builderName];
    if (typeof fn !== 'function') {
      return '<div class="empty">Component "' + builderName + '" not loaded</div>';
    }
    try {
      var node = fn();
      return node && node.outerHTML ? node.outerHTML : '';
    } catch (e) {
      console.error('[phase-loader] builder failed:', builderName, e);
      return '<div class="empty">Builder "' + builderName + '" threw — see console</div>';
    }
  };

  /* Returns ONLY the actual component content — strips:
       1. <section> wrapper + .section__head ("71 Admission record" + desc)
       2. .subsection wrapper + .subsection__title ("IPD admission · ED → MED-SURG")
       3. .demo wrapper itself (background / border / 20px padding / radius from docs CSS)
     What's left is the bare component (e.g. <div class="adm">…</div>) which sits
     flush inside HIS showcase tab content with no double-border. */
  window.renderPhaseDemo = function (builderName) {
    var fn = window.PHASE_BUILDERS && window.PHASE_BUILDERS[builderName];
    if (typeof fn !== 'function') {
      return '<div class="empty">Component "' + builderName + '" not loaded</div>';
    }
    try {
      var node = fn();
      if (!node) return '';
      var demos = node.querySelectorAll('.demo');
      if (demos.length === 0) {
        // Builder didn't use demo() helper — strip section__head + subsection__title only.
        node.querySelectorAll('.section__head, .subsection__title').forEach(function (el) { el.remove(); });
        return node.outerHTML || '';
      }
      var html = '';
      for (var i = 0; i < demos.length; i++) html += demos[i].innerHTML;
      return html;
    } catch (e) {
      console.error('[phase-loader] builder failed:', builderName, e);
      return '<div class="empty">Builder "' + builderName + '" threw — see console</div>';
    }
  };
})();
