// Pequeñas utilidades: reveal on scroll, menú móvil, ripple en botones

// Reveal using IntersectionObserver
(function(){
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(prefersReduced) {
    document.querySelectorAll('.reveal').forEach(el=>el.classList.add('is-visible'));
    return;
  }

  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  },{threshold:0.12});

  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
})();

// Simple mobile nav toggle
(function(){
  const btn = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  btn && btn.addEventListener('click', ()=>{
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    if(!expanded){
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.gap = '0.5rem';
      nav.style.padding = '0.75rem';
    } else {
      nav.style.display = '';
    }
  });
})();

// Button ripple effect
(function(){
  function createRipple(e){
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const circle = document.createElement('span');
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = diameter + 'px';
    circle.style.left = (e.clientX - rect.left - radius) + 'px';
    circle.style.top = (e.clientY - rect.top - radius) + 'px';
    circle.classList.add('ripple');
    const existing = target.getElementsByClassName('ripple')[0];
    if (existing) existing.remove();
    target.appendChild(circle);
    setTimeout(()=>circle.remove(), 600);
  }

  document.querySelectorAll('.btn').forEach(btn=>{
    btn.addEventListener('click', createRipple);
  });
})();

// Smooth scroll for internal links
(function(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length > 1){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target){
          target.scrollIntoView({behavior:'smooth',block:'start'});
        }
      }
    });
  });
})();
