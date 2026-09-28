(function () {
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const projectsList = document.getElementById('projectsList');
  portfolio.projects.forEach((p) => {
    const card = el('article', 'project');
    const img = el('img');
    img.src = p.image;
    img.alt = p.title;
    img.loading = 'lazy';
    const body = el('div', 'project-body');
    body.append(el('h3', '', p.title), el('p', '', p.text));
    card.append(img, body);
    projectsList.append(card);
  });

  const skillsList = document.getElementById('skillsList');
  portfolio.skills.forEach((s) => {
    const row = el('div', 'skill-row');
    const dd = el('dd');
    s.items.forEach((item) => dd.append(el('span', 'tag', item)));
    row.append(el('dt', '', s.title), dd);
    skillsList.append(row);
  });

  const certsList = document.getElementById('certsList');
  portfolio.certificates.forEach((c) => {
    const li = el('li', 'cert');
    const link = el('a', '', 'Ver PDF');
    link.href = c.file;
    link.target = '_blank';
    link.rel = 'noopener';
    li.append(el('span', '', c.title), link);
    certsList.append(li);
  });

  const contactList = document.getElementById('contactList');
  portfolio.contact.forEach((c) => {
    const li = el('li');
    const value = el('span', 'value');
    if (c.href) {
      const a = el('a', '', c.text);
      a.href = c.href;
      if (c.href.startsWith('http')) {
        a.target = '_blank';
        a.rel = 'noopener';
      }
      value.append(a);
    } else {
      value.textContent = c.text;
    }
    li.append(el('span', 'label', c.label), value);
    contactList.append(li);
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  const nav = document.getElementById('nav');
  const sections = document.querySelectorAll('section[data-nav]');
  sections.forEach((s) => {
    const a = el('a', '', s.dataset.nav);
    a.href = '#' + s.id;
    nav.append(a);
  });

  const menuBtn = document.getElementById('menuBtn');
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  const links = [...nav.querySelectorAll('a')];
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  sections.forEach((s) => observer.observe(s));
})();
