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

