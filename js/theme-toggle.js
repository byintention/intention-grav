/*
 * Intention Base — appearance controller
 *
 * Ported from Quark2. Precedence: localStorage > theme-mode default > OS.
 * When preference is "auto", OS prefers-color-scheme changes update live.
 *
 * Inline bootstrap in base.html.twig sets data-theme before first paint.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'intention-base-theme';
  var root = document.documentElement;

  function getStored() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function setStored(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) {}
  }
  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyMode(mode) {
    var resolved = (mode === 'light' || mode === 'dark')
      ? mode
      : (systemPrefersDark() ? 'dark' : 'light');
    root.setAttribute('data-theme', resolved);
    root.setAttribute('data-theme-preference', mode === 'light' || mode === 'dark' ? mode : 'auto');
    root.classList.toggle('dark', resolved === 'dark');
  }

  function currentPreference() {
    return getStored() || root.getAttribute('data-theme-default') || 'auto';
  }

  function cyclePreference(pref) {
    if (pref === 'auto')  return 'light';
    if (pref === 'light') return 'dark';
    return 'auto';
  }

  var FALLBACK_LABELS = { auto: 'Auto', light: 'Light', dark: 'Dark' };
  var FALLBACK_ARIA = 'Appearance: %s';
  var FALLBACK_TITLE = 'Appearance: %s (click to cycle)';

  function attr(button, name, fallback) {
    var value = button.getAttribute(name);
    return value !== null && value !== '' ? value : fallback;
  }

  function updateToggleLabel(button, pref) {
    if (!button) return;
    var label = attr(button, 'data-label-' + pref, FALLBACK_LABELS[pref]);
    var aria = attr(button, 'data-aria-template', FALLBACK_ARIA);
    var title = attr(button, 'data-title-template', FALLBACK_TITLE);
    button.setAttribute('aria-label', aria.replace('%s', label));
    button.setAttribute('title', title.replace('%s', label));
    button.setAttribute('data-mode', pref);
  }

  if (window.matchMedia) {
    var mql = window.matchMedia('(prefers-color-scheme: dark)');
    var handler = function () {
      if (currentPreference() === 'auto') applyMode('auto');
    };
    if (mql.addEventListener) mql.addEventListener('change', handler);
    else if (mql.addListener) mql.addListener(handler);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var buttons = document.querySelectorAll('[data-theme-toggle]');
    var pref = currentPreference();
    applyMode(pref);
    buttons.forEach(function (btn) {
      updateToggleLabel(btn, pref);
      btn.addEventListener('click', function () {
        var next = cyclePreference(currentPreference());
        setStored(next);
        applyMode(next);
        buttons.forEach(function (b) { updateToggleLabel(b, next); });
      });
    });
  });
})();
