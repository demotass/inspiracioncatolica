// main.js - Versión limpia (Solo gestión de idiomas)

// Inicializa pie de página (Año actual)
(function(){
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

/* --- LÓGICA DE IDIOMA (Mantenida) --- */
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
    // Ignore errors
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