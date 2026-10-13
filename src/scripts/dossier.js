/* Dossier motion & Awwwards-caliber animation orchestration.
   Progressive enhancement: Content is 100% functional and visible without JS.
   Every effect is additive and strictly respects prefers-reduced-motion. */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initAudio, toggleAudio, playBleep, playSelect, playSuccess, playOpen } from './audio.js';

gsap.registerPlugin(ScrollTrigger);

const isClient = typeof window !== 'undefined';
const FINE_POINTER = isClient && window.matchMedia('(pointer: fine)').matches;
const REDUCED = isClient && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Global lifecycle abort controller to prevent memory leaks on Astro route swaps
let activeController = null;

export function decryptEffect(el, finalStr, speed = 25) {
  if (REDUCED || !el) return;
  const glyphs = '░▒▓█_#$*&01/\\~<>!?';
  const target = finalStr || el.getAttribute('data-decrypt-target') || el.textContent;
  el.setAttribute('data-decrypt-target', target);
  let iteration = 0;
  if (el._decryptTimer) clearInterval(el._decryptTimer);
  el._decryptTimer = setInterval(() => {
    el.textContent = target
      .split('')
      .map((char, index) => {
        if (index < iteration) return target[index];
        if (char === ' ') return ' ';
        return glyphs[Math.floor(Math.random() * glyphs.length)];
      })
      .join('');
    if (iteration >= target.length) {
      clearInterval(el._decryptTimer);
      el.textContent = target;
    }
    iteration += 1 / 2;
  }, speed);
}

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

  // Kinetic Decrypt reveals
  document.querySelectorAll('[data-decrypt]').forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => decryptEffect(el),
    });
  });

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

function railSpy(signal) {
  const links = document.querySelectorAll('.dossier-rail a, .dossier-rail-mobile a');
  if (!links.length) return;

  const sectionLinks = [];
  links.forEach((a) => {
    const href = a.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    const id = href.slice(1);
    const sec = document.getElementById(id);
    if (sec) {
      const label = a.getAttribute('data-section-label') || a.querySelector('.rail-label')?.textContent || id;
      sectionLinks.push({ id, sec, link: a, label });
    }
  });

  const progressLine = document.getElementById('dossier-progress-line');
  const depthVal = document.getElementById('dossier-depth-val');
  const topBtn = document.getElementById('dossier-scroll-top');
  const pageTrigger = document.getElementById('dossier-page-trigger');
  const activeSecName = document.getElementById('dossier-active-sec-name');

  if (topBtn) {
    topBtn.onclick = () => {
      playSelect();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  }

  if (pageTrigger) {
    pageTrigger.onclick = (e) => {
      if (!e.target.closest('a')) {
        playBleep(750, 0.05);
        pageTrigger.classList.toggle('open');
        const expanded = pageTrigger.classList.contains('open');
        pageTrigger.setAttribute('aria-expanded', String(expanded));
      }
    };
    document.addEventListener(
      'click',
      (e) => {
        if (!pageTrigger.contains(e.target)) {
          pageTrigger.classList.remove('open');
          pageTrigger.setAttribute('aria-expanded', 'false');
        }
      },
      { signal }
    );
  }

  if (!sectionLinks.length) return;

  let ticking = false;

  function updateActive() {
    ticking = false;
    const scrollY = window.scrollY || window.pageYOffset;
    const vh = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // Scroll depth readout & progress line
    const maxScroll = Math.max(1, docHeight - vh);
    const pct = Math.min(100, Math.max(0, Math.round((scrollY / maxScroll) * 100)));
    if (depthVal) depthVal.textContent = `${pct}%`;
    if (progressLine) progressLine.style.height = `${pct}%`;

    // If near bottom of page, activate the last section
    if (scrollY + vh >= docHeight - 120) {
      const last = sectionLinks[sectionLinks.length - 1];
      if (activeSecName && activeSecName.textContent !== last.label) {
        activeSecName.textContent = last.label;
      }
      sectionLinks.forEach(({ id, link }) => {
        const isActive = id === last.id;
        link.classList.toggle('active', isActive);
        link.setAttribute('aria-current', isActive ? 'true' : 'false');
      });
      return;
    }

    // Focal point is 38% from top of viewport
    const focusY = vh * 0.38;
    let currentItem = sectionLinks[0];

    for (const item of sectionLinks) {
      const rect = item.sec.getBoundingClientRect();
      if (rect.top <= focusY) {
        currentItem = item;
      }
    }

    if (activeSecName && activeSecName.textContent !== currentItem.label) {
      activeSecName.textContent = currentItem.label;
    }

    sectionLinks.forEach(({ id, link }) => {
      const isActive = id === currentItem.id;
      link.classList.toggle('active', isActive);
      link.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateActive);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true, signal });
  window.addEventListener('resize', onScroll, { passive: true, signal });
  updateActive();

  // Smooth scroll on click with header clearance
  links.forEach((link) => {
    link.addEventListener(
      'click',
      (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const target = document.getElementById(href.slice(1));
          if (target) {
            e.preventDefault();
            playSelect();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            history.replaceState(null, '', href);
            updateActive();
          }
        }
      },
      { signal }
    );
  });
}

function setupCommandPalette(signal) {
  const backdrop = document.getElementById('cmdk-backdrop');
  if (!backdrop) return;

  const input = document.getElementById('cmdk-input');
  const results = document.getElementById('cmdk-results');
  const closeBtn = document.getElementById('cmdk-close-btn');
  const triggers = document.querySelectorAll('#dossier-cmdk-trigger, #navbar-cmdk-btn');

  function openPalette() {
    backdrop.classList.remove('hidden');
    requestAnimationFrame(() => {
      backdrop.classList.add('open');
      if (input) {
        input.value = '';
        input.focus();
        filterItems('');
      }
    });
    playOpen();
  }

  function closePalette() {
    backdrop.classList.remove('open');
    setTimeout(() => {
      backdrop.classList.add('hidden');
    }, 200);
  }

  triggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openPalette();
    }, { signal });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closePalette, { signal });
  }

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      closePalette();
    }
  }, { signal });

  // Global keyboard shortcuts: Cmd+K / Ctrl+K and '/'
  window.addEventListener(
    'keydown',
    (e) => {
      const isInput = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName);
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (backdrop.classList.contains('open')) closePalette();
        else openPalette();
      } else if (e.key === '/' && !isInput) {
        e.preventDefault();
        openPalette();
      } else if (e.key === 'Escape' && backdrop.classList.contains('open')) {
        e.preventDefault();
        closePalette();
      }
    },
    { signal }
  );

  // Filter items in list
  function filterItems(query) {
    const q = query.trim().toLowerCase();
    const items = results.querySelectorAll('.cmdk-item');
    let firstVisible = null;

    items.forEach((item) => {
      const text = (item.textContent + ' ' + (item.getAttribute('data-keywords') || '')).toLowerCase();
      const match = !q || text.includes(q);
      item.style.display = match ? 'flex' : 'none';
      item.classList.remove('selected');
      if (match && !firstVisible) firstVisible = item;
    });

    if (firstVisible) firstVisible.classList.add('selected');
  }

  if (input) {
    input.addEventListener('input', () => {
      filterItems(input.value);
    }, { signal });

    input.addEventListener(
      'keydown',
      (e) => {
        const visibleItems = Array.from(results.querySelectorAll('.cmdk-item')).filter(
          (item) => item.style.display !== 'none'
        );
        if (!visibleItems.length) return;

        let currentIndex = visibleItems.findIndex((item) => item.classList.contains('selected'));

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          playBleep(950, 0.03);
          if (currentIndex >= 0) visibleItems[currentIndex].classList.remove('selected');
          const nextIndex = (currentIndex + 1) % visibleItems.length;
          visibleItems[nextIndex].classList.add('selected');
          visibleItems[nextIndex].scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          playBleep(950, 0.03);
          if (currentIndex >= 0) visibleItems[currentIndex].classList.remove('selected');
          const prevIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
          visibleItems[prevIndex].classList.add('selected');
          visibleItems[prevIndex].scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (currentIndex >= 0) {
            executeItem(visibleItems[currentIndex]);
          }
        }
      },
      { signal }
    );
  }

  // Click & action handlers
  results.addEventListener(
    'click',
    (e) => {
      const item = e.target.closest('.cmdk-item');
      if (item) {
        executeItem(item);
      }
    },
    { signal }
  );

  async function executeItem(item) {
    const action = item.getAttribute('data-action');
    if (action === 'copy-email') {
      try {
        await navigator.clipboard.writeText('aayushbankar42@gmail.com');
        playSuccess();
        const status = document.getElementById('cmdk-email-status');
        if (status) status.textContent = 'Copied!';
        setTimeout(closePalette, 500);
      } catch (err) {}
    } else if (action === 'copy-pgp') {
      try {
        await navigator.clipboard.writeText('7F2B A189 4C3E 90D2 B581 6E04 8921 D47A E319 0C55');
        playSuccess();
        const status = document.getElementById('cmdk-pgp-status');
        if (status) status.textContent = 'Copied!';
        setTimeout(closePalette, 500);
      } catch (err) {}
    } else if (action === 'toggle-audio') {
      toggleAudio();
      setTimeout(closePalette, 300);
    } else if (action === 'scroll-top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      playSelect();
      closePalette();
    } else if (item.href) {
      playSelect();
      closePalette();
      window.location.href = item.href;
    }
  }
}

function pointers(signal) {
  if (!FINE_POINTER || REDUCED) return;

  // Interactive card glare + subtle 3D perspective tilt
  document.querySelectorAll('.card-glare').forEach((card) => {
    card.addEventListener(
      'mousemove',
      (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
        const rx = (py - 0.5) * -4;
        const ry = (px - 0.5) * 4;
        gsap.to(card, {
          rotateX: rx,
          rotateY: ry,
          transformPerspective: 900,
          duration: 0.3,
          ease: 'power1.out',
        });
      },
      { signal }
    );
    card.addEventListener(
      'mouseleave',
      () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
      },
      { signal }
    );
  });

  // Magnetic button & dossier rail physics
  document.querySelectorAll('.btn, .dossier-rail a, .chip-brass, .chip-ember, .dossier-action-btn').forEach((btn) => {
    btn.addEventListener(
      'mousemove',
      (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
        gsap.to(btn, { x: x * 3, y: y * 2, duration: 0.25, ease: 'power2.out' });
      },
      { signal }
    );
    btn.addEventListener(
      'mouseleave',
      () => gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1.1, 0.4)' }),
      { signal }
    );
  });
}

function pageEntrance() {
  if (REDUCED) return;
  const main = document.querySelector('main');
  if (main) {
    gsap.fromTo(main, { opacity: 0.94, y: 10 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' });
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
  if (activeController) {
    activeController.abort();
  }
  activeController = new AbortController();
  const signal = activeController.signal;

  ScrollTrigger.getAll().forEach((t) => t.kill());
  initAudio();
  syncNavActive();
  pageEntrance();
  kineticHero();
  scrollFX();
  railSpy(signal);
  setupCommandPalette(signal);
  pointers(signal);
  ScrollTrigger.refresh();
}

// Initial boot & ClientRouter transitions
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
  document.addEventListener('astro:page-load', init);
}
