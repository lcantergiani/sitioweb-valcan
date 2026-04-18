// Sticky nav — only toggle on pages with a hero section
const nav = document.getElementById('nav');
const hasHero = document.querySelector('.hero');
if (hasHero) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 50);
  });
}

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('nav__links--open');
  navToggle.classList.toggle('nav__toggle--active');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('nav__links--open');
    navToggle.classList.remove('nav__toggle--active');
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Intersection Observer for fade-up animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-up--visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Donut chart
const donutCanvas = document.getElementById('donutChart');
if (donutCanvas) {
  const labels = ['Líder','Jumbo','Santa Isabel','Montecarlo','Ekono','Monserrat','Unimarc','Carrefour','Economax','Puerto Cristo'];
  const data = [40, 12, 7, 6, 6, 4, 3, 2, 2, 2];
  const colors = [
    'rgba(26,58,122,1)',
    'rgba(26,58,122,0.75)',
    'rgba(26,58,122,0.6)',
    '#3dbf8a',
    'rgba(26,58,122,0.5)',
    'rgba(26,58,122,0.4)',
    'rgba(26,58,122,0.35)',
    'rgba(26,58,122,0.3)',
    'rgba(26,58,122,0.25)',
    'rgba(26,58,122,0.2)'
  ];

  // Build legend
  const legendEl = document.getElementById('donutLegend');
  labels.forEach((name, i) => {
    const isHighlight = name === 'Montecarlo';
    const item = document.createElement('div');
    item.className = 'ranking__legend-item' + (isHighlight ? ' ranking__legend-item--highlight' : '');
    item.innerHTML = '<span class="ranking__legend-dot" style="background:' + colors[i] + '"></span>' +
      '<span class="ranking__legend-name">' + name + '</span>' +
      '<span class="ranking__legend-pct">' + data[i] + '%</span>';
    legendEl.appendChild(item);
  });

  // Init chart on scroll
  const donutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        new Chart(donutCanvas, {
          type: 'doughnut',
          data: {
            labels: labels,
            datasets: [{
              data: data,
              backgroundColor: colors,
              borderWidth: 2,
              borderColor: '#ffffff',
              hoverOffset: 8
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: '62%',
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: '#1a3a7a',
                titleFont: { family: 'Inter', weight: '600' },
                bodyFont: { family: 'Inter' },
                padding: 10,
                cornerRadius: 6,
                callbacks: {
                  label: function(ctx) {
                    return ' ' + ctx.label + ': ' + ctx.parsed + '%';
                  }
                }
              }
            },
            animation: {
              animateRotate: true,
              duration: 1200,
              easing: 'easeOutQuart'
            }
          }
        });
        donutObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  donutObserver.observe(donutCanvas);
}

// ===== i18n SYSTEM =====
const i18n = {
  es: {
    // Nav
    'nav.portfolio': 'Portafolio',
    'nav.companies': 'Empresas',
    'nav.work': 'Trabaja con Nosotros',
    'nav.about': 'Nosotros',
    'nav.contact': 'Contacto',
    // Hero
    'hero.subtitle': 'Grupo Valcan',
    'hero.title': 'MÁS DE 60 AÑOS CREANDO VALOR',
    'hero.sub': 'Inversiones en Chile y Estados Unidos',
    'hero.btn': 'Conoce nuestros rubros',
    // Rubros
    'rubros.label': 'Nuestros Rubros',
    'rubros.title': 'Diversificación Estratégica',
    'rubros.re': 'Explotación Inmobiliaria',
    'rubros.re_d': 'Administración y arriendo de propiedades comerciales y residenciales',
    'rubros.dev': 'Proyectos Inmobiliarios',
    'rubros.dev_d': 'Desarrollo integral de proyectos residenciales, comerciales y de usos mixtos',
    'rubros.agr': 'Agricultura',
    'rubros.agr_d': 'Explotación forestal, agrícola y producción de lácteos',
    'rubros.ene': 'Energía',
    'rubros.ene_d': 'Financiamiento y desarrollo de proyectos de energías renovables no convencionales',
    'rubros.pe': 'Private Equity',
    'rubros.pe_d': 'Fondos de inversión privado para financiar y apoyar proyectos innovadores',
    // Portafolio
    'port.label': 'Portafolio',
    'port.title': 'Proyectos Destacados',
    'port.cat_cc': 'Centro Comercial',
    'port.cat_ret': 'Retail',
    'port.cat_res': 'Residencial',
    'port.cat_agr': 'Agrícola',
    'port.cat_ene': 'Energía',
    'port.cat_inv': 'Inversiones',
    'port.energia': 'Energía Renovable',
    'port.stat1': 'm² en retail',
    'port.stat2': 'unidades residenciales',
    'port.stat3': 'hoteles desarrollados',
    'port.stat4': 'años de experiencia',
    // Quiénes Somos
    'about.label': 'Nuestra Historia',
    'about.title': 'Quiénes Somos',
    'about.p1': 'Los comienzos del grupo empresarial se remontan a los años 1965 cuando su fundador Valentín Cantergiani inaugura un local de alimento con el nombre de "Establecimientos Montecarlo" que tenía una superficie de 38m2 y dos trabajadores.',
    'about.p2': 'Con los años se inauguran varios locales más, sin embargo en el año 1982 el grupo decide transformar uno de sus locales más emblemáticos, ubicado en el centro de Santiago de Chile, a un Supermercado, llamándolo Supermercados Montecarlo.',
    'about.p3': 'En el año 2004 esta cadena ya era una de las más importantes del país, contaba con más de 16 puntos de venta, ventas anuales por más de USD235 millones y más de 3000 trabajadores. Se caracterizaba por ser una de las cadenas más eficientes del país.',
    'about.p4': 'En Noviembre del año 2004 el grupo decide vender la operación de retail a la empresa Cencosud, conservando la propiedad de los locales y centros comerciales, los que fueron entregados en arriendo.',
    'about.p5': 'Así en ese año nace la empresa de Inversiones Valcan cuyo principal objetivo es administrar los flujos producto de la operación de venta.',
    'about.chart': 'Supermercados Preferidos — Chile 2003',
    'about.source': 'Fuente: IBBO Investigación',
    // Fundador
    'founder.quote': 'La clave del éxito está en las personas. Independiente de liderar un desarrollo inmobiliario o una cadena de supermercados, nuestra filosofía se basa en contratar a los mejores profesionales de cada industria.',
    'founder.role': 'Fundador, Valcan Inversiones',
    // Timeline
    'timeline.label': 'Legado',
    'timeline.title': 'Hitos Valcan',
    'tl.h1': 'Establecimientos Montecarlo',
    'tl.p1': 'Valentín Cantergiani inaugura el primer local de alimentos con 38m² y dos trabajadores',
    'tl.h2': 'Supermercados Montecarlo',
    'tl.p2': 'El grupo transforma su local emblemático en Santiago en un supermercado',
    'tl.h3': 'Premio ASACH',
    'tl.p3': 'Reconocida como cadena destacada del año por la Asociación de Supermercados de Chile',
    'tl.h4': 'Cámara de Comercio',
    'tl.p4': 'Premio de la Cámara Nacional de Comercio por excelencia en el retail',
    'tl.h5': 'Nace Valcan Inversiones',
    'tl.p5': 'Venta de la operación retail a Cencosud. Se funda Valcan para administrar las inversiones del grupo',
    'tl.h6': 'Holding Diversificado',
    'tl.p6': 'Más de 40 años de trayectoria con presencia en Real Estate, Energía, Agrícola y Private Equity',
    // Premios
    'awards.label': 'Legado',
    'awards.title': 'Premios y Reconocimientos',
    'awards.intro': 'Dentro de los logros obtenidos en los 22 años de retail se puede destacar:',
    'awards.t1': 'Premio ASACH',
    'awards.t1d': 'Cadena destacada del año 1997',
    'awards.t2': 'Cámara Nacional de Comercio',
    'awards.t2d': 'Premio año 2000',
    'awards.t3': 'Premio a la Capacitación',
    'awards.t3d': 'Otorgado por la Cámara Nacional de Comercio',
    // Footer
    'footer.desc': 'Más de 40 años construyendo valor con excelencia, diversificación y un equipo de clase mundial.',
    'footer.companies': 'Empresas',
    'footer.contact': 'Contacto',
    'footer.copy': '&copy; 2026 Valcan Inversiones. Todos los derechos reservados.',
    // Empresas page
    'emp.label': 'Ecosistema',
    'emp.title': 'Nuestras Empresas',
    'emp.filiales': 'Empresas Filiales',
    'emp.relacionadas': 'Empresas Relacionadas',
    'emp.mc_t': 'Inmobiliaria Montecarlo',
    'emp.mc_d': 'Administra arriendos en Quilicura, Santiago Downtown y La Florida',
    'emp.se_t': 'Inmobiliaria Santa Elena',
    'emp.se_d': 'Administra 6 propiedades: Mercado Central, La Florida, Gran Avenida, Ciudad Satélite, Pajaritos, Huérfanos',
    'emp.vr_t': 'Inmobiliaria Valle Real',
    'emp.vr_d': 'Inversiones en propiedades en Chile y el extranjero',
    'emp.iv_t': 'Inmobiliaria Valcan',
    'emp.iv_d': 'Administra proyectos inmobiliarios de desarrollo integral',
    'emp.li_t': 'La Invernada',
    'emp.li_d': 'Sociedad agrícola orientada a explotación forestal y agrícola',
    'emp.mm_t': 'Multimedical',
    'emp.mm_d': 'Centro médico en Maipú (edificio Jumbo Pajaritos)',
    'emp.cl_t': 'Clenergy',
    'emp.cl_d': 'Financia y desarrolla proyectos de energías renovables no convencionales',
    'emp.cp_t': 'Ceroplas',
    'emp.cp_d': 'Manufactura de packaging 100% compostable y biodegradable — PLA, PBAT, CaCO3',
    'emp.cf_t': 'Cancor FIP',
    'emp.cf_d': 'Fondo de Inversión Privado — financia y apoya proyectos innovadores',
    'emp.sa_t': 'Inmobiliaria Santa Anita',
    'emp.sa_d': 'Desarrolla proyectos inmobiliarios',
    'emp.hp_t': 'Huérfanos Plaza FIP',
    'emp.hp_d': 'Fondo de Inversión Privado inmobiliario',
    'emp.lv_t': 'Lácteos Valle Central',
    'emp.lv_d': 'Producción de quesos — marcas Los Criadores y Longaví',
    'emp.ab_t': 'Comercial Atlantic / Baby Way',
    'emp.ab_d': 'Comercialización de rodados',
    'emp.lg_t': 'Sociedad Agrícola La Laguna',
    'emp.lg_d': 'Explotación forestal',
    // Contacto page
    'contact.label': 'Contáctenos',
    'contact.title': 'Contacto',
    'contact.company': 'Inversiones Valcan Ltda.',
    'contact.form_title': 'Envíanos un mensaje',
    'contact.send': 'Enviar mensaje',
    'contact.ph_name': 'Nombre completo',
    'contact.ph_email': 'Email',
    'contact.ph_phone': 'Teléfono',
    'contact.ph_subject': 'Asunto',
    'contact.ph_message': 'Mensaje',
    // Trabaja page
    'work.hero_label': 'Carreras',
    'work.hero_title': 'Únete a Valcan',
    'work.hero_desc': 'Buscamos personas apasionadas que quieran ser parte de un equipo multidisciplinario de clase mundial.',
    'work.culture_label': 'Nuestra Cultura',
    'work.culture_title': 'Por qué trabajar en Valcan',
    'work.v1': 'Las personas primero',
    'work.v1d': 'Creemos que la clave del éxito está en las personas. Invertimos en el desarrollo profesional y personal de cada integrante de nuestro equipo.',
    'work.v2': 'Excelencia',
    'work.v2d': 'Más de 40 años de trayectoria nos respaldan. Trabajamos con los más altos estándares en cada industria donde operamos.',
    'work.v3': 'Diversificación',
    'work.v3d': 'Oportunidades en Real Estate, Energía, Agricultura, Salud y Private Equity. Tu carrera puede crecer en múltiples direcciones.',
    'work.form_label': 'Postula',
    'work.form_title': 'Formulario de Postulación',
    'work.send': 'Enviar postulación',
    'work.attach': 'Adjuntar CV (PDF, DOC)',
    'work.ph_name': 'Nombre completo',
    'work.ph_email': 'Email',
    'work.ph_phone': 'Teléfono',
    'work.ph_position': 'Cargo de interés',
    'work.ph_message': 'Cuéntanos sobre ti y por qué te gustaría trabajar en Valcan'
  },
  en: {
    // Nav
    'nav.portfolio': 'Portfolio',
    'nav.companies': 'Companies',
    'nav.work': 'Work with Us',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    // Hero
    'hero.subtitle': 'Grupo Valcan',
    'hero.title': 'MORE THAN 60 YEARS CREATING VALUE',
    'hero.sub': 'Investments in Chile and the United States',
    'hero.btn': 'Discover our sectors',
    // Rubros
    'rubros.label': 'Our Sectors',
    'rubros.title': 'Strategic Diversification',
    'rubros.re': 'Real Estate Management',
    'rubros.re_d': 'Management and leasing of commercial and residential properties',
    'rubros.dev': 'Real Estate Development',
    'rubros.dev_d': 'Comprehensive development of residential, commercial and mixed-use projects',
    'rubros.agr': 'Agriculture',
    'rubros.agr_d': 'Forestry, agricultural exploitation and dairy production',
    'rubros.ene': 'Energy',
    'rubros.ene_d': 'Financing and development of non-conventional renewable energy projects',
    'rubros.pe': 'Private Equity',
    'rubros.pe_d': 'Private investment funds to finance and support innovative projects',
    // Portafolio
    'port.label': 'Portfolio',
    'port.title': 'Featured Projects',
    'port.cat_cc': 'Shopping Center',
    'port.cat_ret': 'Retail',
    'port.cat_res': 'Residential',
    'port.cat_agr': 'Agriculture',
    'port.cat_ene': 'Energy',
    'port.cat_inv': 'Investments',
    'port.energia': 'Renewable Energy',
    'port.stat1': 'sqm in retail',
    'port.stat2': 'residential units',
    'port.stat3': 'hotels developed',
    'port.stat4': 'years of experience',
    // Quiénes Somos
    'about.label': 'Our History',
    'about.title': 'About Us',
    'about.p1': 'The beginnings of the business group date back to 1965 when its founder Valentín Cantergiani opened a food store under the name "Establecimientos Montecarlo" with an area of 38 sqm and two employees.',
    'about.p2': 'Over the years, several more stores were opened. However, in 1982 the group decided to transform one of its most iconic locations in downtown Santiago, Chile, into a supermarket, naming it Supermercados Montecarlo.',
    'about.p3': 'By 2004, this chain was one of the most important in the country, with over 16 points of sale, annual sales exceeding USD 235 million and more than 3,000 employees. It was known as one of the most efficient chains in the country.',
    'about.p4': 'In November 2004, the group decided to sell the retail operation to Cencosud, retaining ownership of the stores and shopping centers, which were leased out.',
    'about.p5': 'That same year, Inversiones Valcan was born with the primary objective of managing the cash flows from the sale operation.',
    'about.chart': 'Preferred Supermarkets — Chile 2003',
    'about.source': 'Source: IBBO Research',
    // Fundador
    'founder.quote': 'The key to success lies in people. Regardless of whether we are leading a real estate development or a supermarket chain, our philosophy is based on hiring the best professionals in each industry.',
    'founder.role': 'Founder, Valcan Inversiones',
    // Timeline
    'timeline.label': 'Legacy',
    'timeline.title': 'Valcan Milestones',
    'tl.h1': 'Establecimientos Montecarlo',
    'tl.p1': 'Valentín Cantergiani opens the first food store with 38 sqm and two employees',
    'tl.h2': 'Supermercados Montecarlo',
    'tl.p2': 'The group transforms its flagship location in Santiago into a supermarket',
    'tl.h3': 'ASACH Award',
    'tl.p3': 'Recognized as the outstanding chain of the year by the Chilean Supermarkets Association',
    'tl.h4': 'Chamber of Commerce',
    'tl.p4': 'National Chamber of Commerce award for retail excellence',
    'tl.h5': 'Valcan Inversiones is Born',
    'tl.p5': 'Sale of the retail operation to Cencosud. Valcan is founded to manage the group\'s investments',
    'tl.h6': 'Diversified Holding',
    'tl.p6': 'Over 40 years of track record with presence in Real Estate, Energy, Agriculture and Private Equity',
    // Premios
    'awards.label': 'Legacy',
    'awards.title': 'Awards & Recognition',
    'awards.intro': 'Among the achievements obtained in 22 years of retail, the following stand out:',
    'awards.t1': 'ASACH Award',
    'awards.t1d': 'Outstanding chain of the year 1997',
    'awards.t2': 'National Chamber of Commerce',
    'awards.t2d': 'Award year 2000',
    'awards.t3': 'Training Award',
    'awards.t3d': 'Granted by the National Chamber of Commerce',
    // Footer
    'footer.desc': 'Over 40 years building value with excellence, diversification and a world-class team.',
    'footer.companies': 'Companies',
    'footer.contact': 'Contact',
    'footer.copy': '&copy; 2026 Valcan Inversiones. All rights reserved.',
    // Empresas page
    'emp.label': 'Ecosystem',
    'emp.title': 'Our Companies',
    'emp.filiales': 'Subsidiary Companies',
    'emp.relacionadas': 'Related Companies',
    'emp.mc_t': 'Inmobiliaria Montecarlo',
    'emp.mc_d': 'Manages leases in Quilicura, Santiago Downtown and La Florida',
    'emp.se_t': 'Inmobiliaria Santa Elena',
    'emp.se_d': 'Manages 6 properties: Mercado Central, La Florida, Gran Avenida, Ciudad Satélite, Pajaritos, Huérfanos',
    'emp.vr_t': 'Inmobiliaria Valle Real',
    'emp.vr_d': 'Property investments in Chile and abroad',
    'emp.iv_t': 'Inmobiliaria Valcan',
    'emp.iv_d': 'Manages comprehensive real estate development projects',
    'emp.li_t': 'La Invernada',
    'emp.li_d': 'Agricultural company focused on forestry and agricultural exploitation',
    'emp.mm_t': 'Multimedical',
    'emp.mm_d': 'Medical center in Maipú (Jumbo Pajaritos building)',
    'emp.cl_t': 'Clenergy',
    'emp.cl_d': 'Finances and develops non-conventional renewable energy projects',
    'emp.cp_t': 'Ceroplas',
    'emp.cp_d': '100% compostable and biodegradable packaging manufacturing — PLA, PBAT, CaCO3',
    'emp.cf_t': 'Cancor FIP',
    'emp.cf_d': 'Private Investment Fund — finances and supports innovative projects',
    'emp.sa_t': 'Inmobiliaria Santa Anita',
    'emp.sa_d': 'Develops real estate projects',
    'emp.hp_t': 'Huérfanos Plaza FIP',
    'emp.hp_d': 'Real estate Private Investment Fund',
    'emp.lv_t': 'Lácteos Valle Central',
    'emp.lv_d': 'Cheese production — brands Los Criadores and Longaví',
    'emp.ab_t': 'Comercial Atlantic / Baby Way',
    'emp.ab_d': 'Commercialization of wheeled goods',
    'emp.lg_t': 'Sociedad Agrícola La Laguna',
    'emp.lg_d': 'Forestry exploitation',
    // Contacto page
    'contact.label': 'Get in Touch',
    'contact.title': 'Contact',
    'contact.company': 'Inversiones Valcan Ltda.',
    'contact.form_title': 'Send us a message',
    'contact.send': 'Send message',
    'contact.ph_name': 'Full name',
    'contact.ph_email': 'Email',
    'contact.ph_phone': 'Phone',
    'contact.ph_subject': 'Subject',
    'contact.ph_message': 'Message',
    // Trabaja page
    'work.hero_label': 'Careers',
    'work.hero_title': 'Join Valcan',
    'work.hero_desc': 'We are looking for passionate people who want to be part of a world-class multidisciplinary team.',
    'work.culture_label': 'Our Culture',
    'work.culture_title': 'Why work at Valcan',
    'work.v1': 'People First',
    'work.v1d': 'We believe that the key to success lies in people. We invest in the professional and personal development of every team member.',
    'work.v2': 'Excellence',
    'work.v2d': 'Over 40 years of track record back us up. We work with the highest standards in every industry we operate in.',
    'work.v3': 'Diversification',
    'work.v3d': 'Opportunities in Real Estate, Energy, Agriculture, Health and Private Equity. Your career can grow in multiple directions.',
    'work.form_label': 'Apply',
    'work.form_title': 'Application Form',
    'work.send': 'Submit application',
    'work.attach': 'Attach CV (PDF, DOC)',
    'work.ph_name': 'Full name',
    'work.ph_email': 'Email',
    'work.ph_phone': 'Phone',
    'work.ph_position': 'Position of interest',
    'work.ph_message': 'Tell us about yourself and why you would like to work at Valcan'
  }
};

function setLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[lang] && i18n[lang][key]) {
      el.innerHTML = i18n[lang][key];
    }
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (i18n[lang] && i18n[lang][key]) {
      el.placeholder = i18n[lang][key];
    }
  });
  document.querySelectorAll('.nav__lang-btn').forEach(btn => {
    btn.classList.toggle('nav__lang-btn--active', btn.getAttribute('data-lang') === lang);
  });
  document.documentElement.lang = lang === 'en' ? 'en' : 'es';
  localStorage.setItem('valcan_lang', lang);
}

// Language switcher click handlers
document.querySelectorAll('.nav__lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang')));
});

// Apply saved language on load
const savedLang = localStorage.getItem('valcan_lang');
if (savedLang && savedLang !== 'es') {
  setLanguage(savedLang);
}

// ===== PORTAFOLIO DATA-DRIVEN =====

const catConfig = {
  'retail':       { label: 'RETAIL',        bg: 'rgba(93,202,165,0.2)',    color: '#5DCAA5' },
  'residencial':  { label: 'RESIDENCIAL',   bg: 'rgba(127,148,197,0.22)', color: '#A5B4D1' },
  'hoteleria':    { label: 'HOTELERÍA',     bg: 'rgba(180,160,120,0.2)',  color: '#D4BC99' },
  'agricola':     { label: 'AGRÍCOLA',      bg: 'rgba(140,170,120,0.22)', color: '#A9C49A' },
  'energia':      { label: 'ENERGÍA',       bg: 'rgba(200,170,100,0.2)',  color: '#D4BC7A' },
  'private-equity': { label: 'PRIVATE EQUITY', bg: 'rgba(170,140,180,0.22)', color: '#C5AACB' },
};

const proyectos = [
  // FILA 1 – En Desarrollo (6+4=10)
  { id: 'quilicura', nombre: 'Punto Centro Quilicura', categoria: 'retail', col: 6, row: 2, destacado: true, badges: ['EN DESARROLLO'], imagen: 'punto-centro.jpg' },
  { id: 'hilton', nombre: 'Hotel Hilton', categoria: 'hoteleria', col: 4, row: 2, destacado: true, badges: ['EN DESARROLLO'], imagen: 'hotel hilton.jpg' },
  // FILA 2 (5+5=10)
  { id: 'mapocho', nombre: 'Mapocho', categoria: 'retail', col: 5, minH: '340px', destacado: true, imagen: 'inmobiliaria-montecarlo.png', bgPos: 'center' },
  { id: 'huerfanos', nombre: 'Huérfanos', categoria: 'retail', col: 5, minH: '340px', destacado: true, imagen: 'Local huerfanos.JPG', bgPos: 'center' },
  // FILA 3 (5+5=10)
  { id: 'la-florida', nombre: 'La Florida', categoria: 'retail', col: 5, destacado: true, imagen: 'centro-comercial-la-florda.jpg' },
  { id: 'cantagallo', nombre: 'Cantagallo', categoria: 'retail', col: 5, destacado: true, imagen: 'Local Cantagallo.JPG' },
  // FILA 4 (5+5=10)
  { id: 'pajaritos', nombre: 'Pajaritos', categoria: 'retail', col: 5, destacado: true, imagen: 'Local Pajaritos.JPG' },
  { id: 'ciudad-satelite', nombre: 'Ciudad Satélite', categoria: 'retail', col: 5, destacado: true, imagen: 'Local Ciudad Satelite.JPG' },
  // FILA 5 – Residencial (3+2+3+2=10)
  { id: 'mirador', nombre: 'Mirador Santa Anita', categoria: 'residencial', col: 3, minH: '380px', destacado: true, imagen: 'mirador-santa-anita.jpg' },
  { id: 'gran-santiago', nombre: 'Edificio Gran Santiago', categoria: 'residencial', col: 2, minH: '380px', destacado: true, imagen: 'edificio-gran-santiago.jpg' },
  { id: 'los-leones', nombre: 'Edificio Los Leones', categoria: 'residencial', col: 3, minH: '380px', destacado: true, imagen: 'edificio-los-leones.jpg' },
  { id: 'concepcion', nombre: 'Edificio Concepción', categoria: 'residencial', col: 2, minH: '380px', destacado: true, imagen: 'Edificio Concepcion.jpg' },
  // FILA 6 – Diversificación (4+3+3=10)
  { id: 'la-invernada', nombre: 'La Invernada', categoria: 'agricola', col: 4, destacado: true, imagen: 'la-invernada-agricultura.jpg' },
  { id: 'energia', nombre: 'Energía Renovable', categoria: 'energia', col: 3, destacado: true, imagen: 'energia-renovable.jpg' },
  { id: 'valle-central', nombre: 'Alimentos Valle Central', categoria: 'private-equity', col: 3, destacado: true, imagen: 'pe-banner.png' },
  // No destacados
  { id: 'ismael-valdes', nombre: 'Local Ismael Valdés Vergara', categoria: 'retail', destacado: false, imagen: null },
  { id: 'alameda', nombre: 'Alameda', categoria: 'retail', destacado: false, imagen: null },
  { id: 'maipu', nombre: 'Maipú', categoria: 'retail', destacado: false, imagen: null },
  { id: 'la-cisterna', nombre: 'La Cisterna', categoria: 'retail', destacado: false, imagen: null },
  { id: 'la-florida-10149', nombre: 'La Florida 10149', categoria: 'retail', destacado: false, imagen: null },
  { id: 'fundo-montecarlo', nombre: 'Fundo Montecarlo', categoria: 'agricola', destacado: false, imagen: null },
  { id: 'campo-lonquimay', nombre: 'Campo Lonquimay', categoria: 'agricola', destacado: false, imagen: null },
  { id: 'ceroplas', nombre: 'Ceroplas', categoria: 'private-equity', destacado: false, imagen: null },
  { id: 'wellnature', nombre: 'Wellnature', categoria: 'private-equity', destacado: false, imagen: null },
  { id: 'amatime', nombre: 'Amatime', categoria: 'private-equity', destacado: false, imagen: null },
  { id: 'multimedical', nombre: 'Multimedical', categoria: 'private-equity', destacado: false, imagen: null },
];

let currentFilter = 'destacados';

const filterTabs = [
  { key: 'destacados', label: 'Destacados' },
  { key: 'retail', label: 'Retail' },
  { key: 'residencial', label: 'Residencial' },
  { key: 'hoteleria', label: 'Hotelería' },
  { key: 'agricola', label: 'Agrícola' },
  { key: 'energia', label: 'Energía' },
  { key: 'private-equity', label: 'Private Equity' },
];

function renderFilters() {
  const container = document.getElementById('bento-filters');
  if (!container) return;

  container.innerHTML = filterTabs.map(tab => {
    const count = tab.key === 'destacados'
      ? proyectos.filter(p => p.destacado).length
      : proyectos.filter(p => p.categoria === tab.key).length;
    const isActive = currentFilter === tab.key;
    const activeStyle = 'background:#23bdbb;color:#0F6E56;';
    const inactiveStyle = 'background:rgba(255,255,255,0.08);color:white;border:1px solid rgba(255,255,255,0.12);';
    const countStyle = isActive
      ? 'background:rgba(15,110,86,0.2);padding:2px 8px;border-radius:10px;font-size:11px;'
      : 'color:#B5D4F4;font-size:11px;';
    return `<div class="bento-tab" data-filter="${tab.key}" style="${isActive ? activeStyle : inactiveStyle}padding:10px 18px;border-radius:8px;font-size:13px;font-weight:500;display:flex;align-items:center;gap:8px;cursor:pointer;">${tab.label} <span style="${countStyle}">${count}</span></div>`;
  }).join('');

  container.querySelectorAll('.bento-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      if (filter === currentFilter) return;
      currentFilter = filter;
      const grid = document.getElementById('bento-cards');
      grid.style.opacity = '0';
      setTimeout(() => {
        renderPortfolio();
        renderFilters();
        grid.style.opacity = '1';
      }, 200);
    });
  });
}

function renderPortfolio() {
  const container = document.getElementById('bento-cards');
  if (!container) return;

  let items;
  if (currentFilter === 'destacados') {
    items = proyectos.filter(p => p.destacado);
  } else {
    items = proyectos
      .filter(p => p.categoria === currentFilter)
      .sort((a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0));
  }

  container.innerHTML = items.map(p => {
    const cat = catConfig[p.categoria];
    const hasImage = !!p.imagen;
    const bgPos = p.bgPos || 'center';
    const col = p.col || 1;
    const row = p.row || 1;
    const isHero = row > 1;

    // Grid span
    const gridCol = col > 1 ? 'grid-column: span ' + col + ';' : '';
    const gridRow = row > 1 ? 'grid-row: span ' + row + ';' : '';
    const heroClass = isHero ? ' portfolio-hero' : '';

    // Min-height
    const minHeight = isHero ? '460px' : (p.minH || '220px');

    // Badge HTML
    const badgeStyle = 'padding:4px 11px;font-size:11px;border-radius:4px;font-weight:500;letter-spacing:0.5px;text-transform:uppercase;z-index:3;';
    const catBadge = `<div style="background:${cat.bg};color:${cat.color};${badgeStyle}align-self:flex-start;display:inline-block;">${cat.label}</div>`;
    const extraBadges = (p.badges || []).map(b =>
      `<div style="background:rgba(255,255,255,0.95);color:#1e3a6f;${badgeStyle}">${b}</div>`
    ).join('');

    // Overlay gradient
    const heroOverlay = 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.1) 75%, transparent 100%)';
    const stdOverlay = 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 30%, transparent 60%)';
    const overlay = isHero ? heroOverlay : stdOverlay;

    // Title style
    const titleSize = isHero ? '22px' : '15px';
    const titleStyle = `color:white;font-size:${titleSize};font-weight:500;text-shadow:0 1px 4px rgba(0,0,0,0.8);`;
    const titleClass = 'card-title';
    const contentPad = isHero ? '1.5rem' : '1rem';
    const border = isHero ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.08)';

    if (hasImage) {
      const badgeWrap = `<div style="display:inline-flex;gap:8px;">${catBadge}${extraBadges}</div>`;

      return `<div class="portfolio-card${heroClass}" style="${gridCol}${gridRow}border-radius:12px;position:relative;min-height:${minHeight};border:${border};overflow:hidden;">
  <div style="position:absolute;inset:0;background-image:url('assets/images/${p.imagen}');background-size:cover;background-position:${bgPos};border-radius:12px;"></div>
  <div style="position:absolute;inset:0;background:${overlay};border-radius:12px;"></div>
  <div style="position:relative;z-index:2;padding:${contentPad};display:flex;flex-direction:column;justify-content:space-between;height:100%;box-sizing:border-box;">
    ${badgeWrap}
    <div class="${titleClass}" style="${titleStyle}">${p.nombre}</div>
  </div>
</div>`;
    } else {
      const badgeRow = `<div style="display:flex;gap:8px;align-items:flex-start;">${catBadge}${extraBadges}</div>`;
      return `<div class="portfolio-card${heroClass}" style="${gridCol}${gridRow}background:linear-gradient(135deg,#3a4a7a 0%,#2a3a6a 100%);border-radius:12px;padding:1rem;min-height:${minHeight};display:flex;flex-direction:column;justify-content:space-between;border:1px solid rgba(175,169,236,0.3);box-sizing:border-box;">
    ${badgeRow}
    <div class="${titleClass}" style="${titleStyle}">${p.nombre}</div>
</div>`;
    }
  }).join('\n');
}

renderFilters();
renderPortfolio();
