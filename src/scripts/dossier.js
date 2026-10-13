/* Dossier motion & Awwwards-caliber animation orchestration.
   Progressive enhancement: Content is 100% functional and visible without JS.
   Every effect is additive and strictly respects prefers-reduced-motion. */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const isClient = typeof window !== 'undefined';
const FINE_POINTER = isClient && window.matchMedia('(pointer: fine)').matches;
const REDUCED = isClient && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function kineticHero() {
  if (REDUCED) return;
  const chars = document.querySelectorAll('.hero-char');
  if (chars.length) {
    gsap.fromTo(
      chars,
      { yPercent: 125, opacity: 0, rotateZ: 3 },
      {
        yPercent: 0,
        opacity: 1,
        rotateZ: 0,
        duration: 0.95,
        stagger: 0.03,
        ease: 'power4.out',
      }
    );
  }

  const fades = document.querySelectorAll('.hero-fade');
  if (fades.length) {
    gsap.fromTo(
      fades,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        delay: 0.2,
        ease: 'power3.out',
      }
    );
  }
}

function scrollFX() {
  if (REDUCED) return;

  // Single element reveals
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    gsap.fromTo(
      el,
      { y: 32, opacity: 0, scale: 0.985 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      }
    );
  });

  // Grid container children stagger reveals
  document.querySelectorAll('[data-reveal-grid]').forEach((grid) => {
    const items = grid.children;
    if (items.length) {
      gsap.fromTo(
        items,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: grid, start: 'top 88%', once: true },
        }
      );
    }
  });

  // Parallax elements
  document.querySelectorAll('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallax || '0.12');
    gsap.to(el, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el.closest('section') || el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  // Animated numbers
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = el.textContent.trim();
    const num = parseInt(target.replace(/\D/g, ''), 10);
    if (Number.isNaN(num)) return;
    const pad = target.match(/^0\d/) ? 2 : 0;
    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      once: true,
      onEnter: () =>
        gsap.to(obj, {
          v: num,
          duration: 1.2,
          ease: 'power3.out',
          onUpdate: () => {
            el.textContent = pad
              ? String(Math.round(obj.v)).padStart(pad, '0')
              : Math.round(obj.v);
          },
        }),
    });
  });
}

function railSpy() {
  const rail = document.querySelector('.dossier-rail');
  const links = document.querySelectorAll('.dossier-rail a');
  if (!rail || !links.length) return;

  const sectionLinks = [];
  links.forEach((a) => {
    const href = a.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    const id = href.slice(1);
    const sec = document.getElementById(id);
    if (sec) {
      sectionLinks.push({ id, sec, link: a });
    }
  });

  if (!sectionLinks.length) return;

  let ticking = false;

  function updateActive() {
    ticking = false;
    const scrollY = window.scrollY || window.pageYOffset;
    const vh = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // If near bottom of page, activate the last section
    if (scrollY + vh >= docHeight - 140) {
      sectionLinks.forEach(({ link }, idx) => {
        if (idx === sectionLinks.length - 1) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
      return;
    }

    // Focal point is 42% from top of viewport
    const focusY = vh * 0.42;
    let current = sectionLinks[0];

    for (const item of sectionLinks) {
      const rect = item.sec.getBoundingClientRect();
      if (rect.top <= focusY) {
        current = item;
      }
    }

    sectionLinks.forEach(({ link }) => {
      if (link === current.link) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateActive);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  updateActive();

  // Smooth scroll on click
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.getElementById(href.slice(1));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.replaceState(null, '', href);
          updateActive();
        }
      }
    });
  });
}

function pointers() {
  if (!FINE_POINTER || REDUCED) return;

  // Interactive card glare + subtle 3D perspective tilt
  document.querySelectorAll('.card-glare').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
      const rx = (py - 0.5) * -5;
      const ry = (px - 0.5) * 5;
      gsap.to(card, {
        rotateX: rx,
        rotateY: ry,
        transformPerspective: 900,
        duration: 0.3,
        ease: 'power1.out',
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    });
  });

  // Magnetic button physics
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      gsap.to(btn, { x: x * 5, y: y * 4, duration: 0.25, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () =>
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1.1, 0.4)' })
    );
  });
}

function pageEntrance() {
  if (REDUCED) return;
  const main = document.querySelector('main');
  if (main) {
    gsap.fromTo(main, { opacity: 0.92, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
  }
}

function syncNavActive() {
  if (typeof window === 'undefined') return;
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('header nav a, header .nav-link').forEach((link) => {
    const href = link.getAttribute('href')?.replace(/\/$/, '') || '/';
    const isActive = href === '/' ? path === '/' : path.startsWith(href);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
      link.classList.add('is-active', 'bg-bone-50/10', 'text-ember-400', 'font-semibold', 'shadow-inner');
      link.classList.remove('text-bone-400');
    } else {
      link.removeAttribute('aria-current');
      link.classList.remove('is-active', 'bg-bone-50/10', 'text-ember-400', 'font-semibold', 'shadow-inner');
      link.classList.add('text-bone-400');
    }
  });
}

function init() {
  ScrollTrigger.getAll().forEach((t) => t.kill());
  syncNavActive();
  pageEntrance();
  kineticHero();
  scrollFX();
  railSpy();
  pointers();
  ScrollTrigger.refresh();
}

// Initial boot
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  // ClientRouter transitions
  document.addEventListener('astro:page-load', init);
  document.addEventListener('astro:after-swap', init);
}
