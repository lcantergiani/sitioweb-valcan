# Valcan Inversiones — Sitio Web

Sitio web corporativo del holding Valcan Inversiones.

## Estructura del proyecto

```
├── index.html                  # Página principal
├── BRIEF.md                    # Brief de contenido del holding
├── README.md                   # Este archivo
├── pages/
│   └── empresas.html           # Página de empresas filiales y relacionadas
└── assets/
    ├── css/
    │   └── style.css           # Estilos del sitio
    ├── js/
    │   └── main.js             # JavaScript (nav, scroll, animaciones, Chart.js)
    └── images/
        ├── Logo Valcan Transparente.png
        ├── robert-bye-WTPp4wgourk-unsplash.jpg  (hero)
        ├── Punto Centro.jpg
        ├── Inmobiliaria Montecarlo.JPG
        ├── Centro Comercial La Florda.jpg
        ├── Mirador Santa Anita.jpg
        ├── Edificio Gran Santiago.jpg
        ├── Edificio Los Leones.jpg
        ├── Punto Centro Quilicura.jpg
        ├── La Invernada Agricultura.jpg
        ├── Energia Renovable.jpg
        ├── Private Equity.jpg
        ├── valentin.jpg
        ├── img_05.jpg, img_04 (1).jpg, img_11.jpg  (trofeos)
        └── ...otras imágenes
```

## Stack

- HTML5 + CSS3 + JavaScript vanilla
- Chart.js (CDN) para gráfico donut
- Tipografía: Inter (Google Fonts)

## Secciones — index.html

1. **Nav** — Logo + links, sticky con fondo blanco al scroll
2. **Hero** — Foto de fondo con overlay, claim principal
3. **Rubros** — 5 rubros del holding con iconos SVG
4. **Portafolio** — Grid de proyectos con fotos reales
5. **Quiénes Somos** — Historia + gráfico donut de ranking supermercados
6. **Fundador** — Foto + quote de Valentín Cantergiani
7. **Hitos Valcan** — Timeline horizontal con años clave
8. **Premios** — Trofeos con fotos reales
9. **Footer** — Contacto y redes sociales

## Páginas adicionales

- **pages/empresas.html** — Empresas filiales y relacionadas

## Deploy

Sitio estático compatible con Vercel, Netlify o cualquier hosting.
Dominio: valcan.cl
