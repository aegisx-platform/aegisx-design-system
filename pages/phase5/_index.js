/* AegisX DS · Phase 5 — bootstraps after every section file loaded */
(function(){
  if (!window.AX5) return console.error('[phase5] AX5 helpers missing');
  // run after DOM ready (script is at bottom of body so synchronous OK)
  AX5.mount();
})();
