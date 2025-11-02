# Web de la app "Inspiración Católica"

Sitio estático para la app móvil de frases católicas. Preparado para alojarse en GitHub Pages bajo la ruta `/inspiracioncatolica` y con páginas legales (Privacidad, Términos y Cookies) orientadas a RGPD/EEE y CCPA.

## Estructura

- `docs/` — raíz del sitio para GitHub Pages
  - `index.html` — portada
  - `privacy.html`, `terms.html`, `cookies.html` — páginas legales
  - `en/` — versión en inglés (mismas páginas)
  - `assets/css/style.css` — estilos (paleta azul mariano y oro)
  - `assets/js/main.js` — banner de consentimiento y GA opcional
  - `assets/fondos/` — coloca aquí tus fondos de la app
  - `assets/img/favicon.svg`, `assets/img/og-hero.svg`
  - `robots.txt`, `sitemap.xml`

## Cómo publicar en GitHub Pages

1. Sube este repo a GitHub: `demotass/inspiracioncatolica`.
2. En el repositorio, ve a Settings → Pages.
3. En "Build and deployment", selecciona:
   - Source: `Deploy from a branch`
   - Branch: `main` y carpeta `/docs`
4. Guarda. Tu web quedará en: `https://demotass.github.io/inspiracioncatolica/`.

Si usas un dominio propio, añade un archivo `docs/CNAME` con tu dominio y configura el `A/AAAA/CNAME` en tu DNS.

## Personalización mínima

- En `docs/index.html` reemplaza los enlaces de **Android** y **iOS** cuando tengas las URLs de las tiendas.
- En `docs/privacy.html` y `docs/terms.html` cambia el correo `contacto@tu-dominio.com` por el real.
- En `docs/assets/js/main.js` añade tu `GA_MEASUREMENT_ID` (ej. `G-XXXXXXXXXX`) si deseas analíticas. No se cargan sin consentimiento.
- Coloca tus fondos en `docs/assets/fondos/` con estos nombres (o ajusta el HTML):
  - `papal_wisdom.jpg`
  - `divine_mercy.jpg`
  - `marian_devotion.jpg`
  - `saints_inspiration.jpg`
  - `scripture_trust.jpg`

## Cumplimiento y privacidad

- Web: solo una cookie técnica `ic_consent` para recordar preferencias. Analíticas se cargan únicamente con consentimiento explícito.
- App: sin cuentas ni backend propio; favoritos/ajustes en el dispositivo; TTS a cargo del sistema; notificaciones locales. Ver `privacy.html`.

> Nota: Este repositorio no constituye asesoramiento legal. Adapta los textos a tu situación y jurisdicción con tu asesor.
