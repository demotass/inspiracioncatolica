// Configurable: añade tu GA4 ID si deseas analíticas (se cargan solo con consentimiento)
const GA_MEASUREMENT_ID = ""; // ej. "G-XXXXXXXXXX" o deja vacío para desactivar

// Utilidad mínima de consentimiento (localStorage)
window.ICConsent = {
  key: 'ic_consent',
  get(){
    try{ return JSON.parse(localStorage.getItem(this.key)||''); }catch(_){ return null }
  },
  save(opts){
    const current = this.get() || {};
    const next = { necessary: true, analytics: !!opts.analytics, ts: Date.now() };
    localStorage.setItem(this.key, JSON.stringify(next));
    // aplica cambios
    applyConsent(next);
    return next;
  }
};

// Inicializa pie de página y banner
(function(){
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  const banner = document.getElementById('cookie-banner');
  if (!banner) return; // página legal puede no tener banner

  const prefs = ICConsent.get();
  if (!prefs){
    banner.hidden = false;
  } else {
    applyConsent(prefs);
  }

  const chk = document.getElementById('consent-analytics');
  const btn = document.getElementById('consent-accept');
  if (chk && btn){
    btn.addEventListener('click', function(){
      ICConsent.save({ analytics: chk.checked });
      banner.hidden = true;
    });
  }
})();

function applyConsent(prefs){
  // carga/descarga analíticas según consentimiento
  if (prefs.analytics && GA_MEASUREMENT_ID){
    enableAnalytics();
  }
}

function enableAnalytics(){
  if (window.__gaEnabled || !GA_MEASUREMENT_ID) return;
  window.__gaEnabled = true;
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(s);
}

const LANG_PREF_KEY = "ic_lang_pref";

function getStoredLangPref() {
  try {
    const value = localStorage.getItem(LANG_PREF_KEY);
    return value === "es" || value === "en" ? value : null;
  } catch (_) {
    return null;
  }
}

function setStoredLangPref(lang) {
  if (lang !== "es" && lang !== "en") return;
  try {
    localStorage.setItem(LANG_PREF_KEY, lang);
  } catch (_) {
    // Ignore storage errors (private mode, blocked storage).
  }
}

function getBrowserLangPreference() {
  const raw = (navigator.languages && navigator.languages.length)
    ? navigator.languages
    : [navigator.language || navigator.userLanguage || ""];
  const langs = raw.map((lang) => String(lang).toLowerCase());
  const primary = langs[0] || "";
  if (primary === "en" || primary.startsWith("en-")) {
    return "en";
  }
  if (primary === "es" || primary.startsWith("es-")) {
    return "es";
  }
  return "es";
}

function getCurrentLangFromPath() {
  const path = window.location.pathname || "/";
  return (path === "/en" || path.startsWith("/en/")) ? "en" : "es";
}

function buildLangUrl(targetLang) {
  const path = window.location.pathname || "/";
  const suffix = (window.location.search || "") + (window.location.hash || "");

  if (targetLang === "en") {
    if (path === "/en" || path.startsWith("/en/")) {
      return (path === "/en" ? "/en/" : path) + suffix;
    }
    if (path === "/") return "/en/" + suffix;
    return "/en" + (path.startsWith("/") ? path : "/" + path) + suffix;
  }

  if (path === "/en" || path === "/en/") return "/" + suffix;
  if (path.startsWith("/en/")) return path.replace(/^\/en\//, "/") + suffix;
  return path + suffix;
}

function maybeRedirectLanguage() {
  const currentLang = getCurrentLangFromPath();
  const stored = getStoredLangPref();
  const currentUrl = window.location.pathname + (window.location.search || "") + (window.location.hash || "");

  if (stored && stored !== currentLang) {
    const target = buildLangUrl(stored);
    if (target !== currentUrl) window.location.replace(target);
    return;
  }

  if (!stored && currentLang === "es") {
    const preferred = getBrowserLangPreference();
    if (preferred === "en") {
      const target = buildLangUrl("en");
      if (target !== currentUrl) window.location.replace(target);
    }
  }
}

function initLanguageSwitch() {
  const links = document.querySelectorAll("a[data-lang]");
  if (!links.length) return;
  links.forEach((link) => {
    link.addEventListener("click", () => {
      setStoredLangPref(link.dataset.lang);
    });
  });
}

maybeRedirectLanguage();
initLanguageSwitch();
