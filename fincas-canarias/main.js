let lang = 'es';
let activeCategory = 'All';

function setLang(l) {
  lang = l;
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.textContent === l.toUpperCase()));
  document.getElementById('heroTagline').textContent = UI[l].tagline;
  document.getElementById('catTitle').textContent = UI[l].categories;
  document.getElementById('mainSearch').placeholder = UI[l].searchPlaceholder;
  document.getElementById('overlayLabel').textContent = UI[l].overlayLabel;
  document.getElementById('overlaySearchInput').placeholder = UI[l].overlayPlaceholder;
  renderCategories();
  renderProducts();
}

function renderCategories() {
  document.getElementById('categoriesBar').innerHTML = CAT_KEY.map(c =>
    `<button class="cat-btn${activeCategory===c?' active':''}" onclick="selectCategory('${c}')">${CAT_LABEL[lang][c]}</button>`
  ).join('');
}

function selectCategory(cat) {
  activeCategory = cat;
  renderCategories();
  renderProducts();
}

const PLACEHOLDER_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`;

function getFiltered() {
  const q = document.getElementById('mainSearch').value.toLowerCase().trim();
  return PRODUCTS.filter(p => {
    const catMatch = activeCategory === 'All' || p.category === activeCategory;
    const searchMatch = !q || [p.name[lang], p.subtitle[lang], p.desc[lang]].join(' ').toLowerCase().includes(q);
    return catMatch && searchMatch;
  });
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const filtered = getFiltered();
  document.getElementById('resultsMeta').innerHTML = UI[lang].results(filtered.length);
  if (!filtered.length) { grid.innerHTML = `<div class="empty-state">${UI[lang].empty}</div>`; return; }
  grid.innerHTML = filtered.map((p,i) => `
    <div class="product-card" style="animation-delay:${i*0.04}s" onclick="openModal(${p.id})">
      <div class="product-img-wrap">
        ${p.img ? `<img src="${p.img}" alt="${p.name[lang]}" loading="lazy">` : `<div class="img-placeholder">${PLACEHOLDER_SVG}</div>`}
        <span class="product-category-tag">${CAT_LABEL[lang][p.category]}</span>
      </div>
      <div class="product-info">
        <h3 class="product-name">${p.name[lang]}</h3>
        <p class="product-subtitle">${p.subtitle[lang]}</p>
        <p class="product-desc">${p.desc[lang]}</p>
      </div>
    </div>
  `).join('');
}

function openModal(id) {
  const p = PRODUCTS.find(x => x.id===id);
  if (!p) return;
  document.getElementById('modalImgWrap').innerHTML = p.img
    ? `<img class="modal-img" src="${p.img}" alt="${p.name[lang]}">`
    : `<div class="modal-img-placeholder">${PLACEHOLDER_SVG}<span>${UI[lang].photoSoon}</span></div>`;
  document.getElementById('modalTag').textContent = CAT_LABEL[lang][p.category];
  document.getElementById('modalTitle').textContent = p.name[lang];
  document.getElementById('modalSubtitle').textContent = p.subtitle[lang];
  document.getElementById('modalDesc').textContent = p.desc[lang];
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() { document.getElementById('modalOverlay').classList.remove('open'); document.body.style.overflow = ''; }
function handleModalClick(e) { if (e.target === document.getElementById('modalOverlay')) closeModal(); }

function openSearch() {
  document.getElementById('searchOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('overlaySearchInput').focus(), 100);
}
function closeSearch() { document.getElementById('searchOverlay').classList.remove('open'); document.body.style.overflow = ''; }

function handleOverlaySearch(q) {
  const results = document.getElementById('overlayResults');
  const ql = q.toLowerCase().trim();
  if (!ql) { results.innerHTML = ''; return; }
  const filtered = PRODUCTS.filter(p => [p.name[lang], p.subtitle[lang], p.desc[lang]].join(' ').toLowerCase().includes(ql)).slice(0,6);
  results.innerHTML = filtered.map(p => `
    <div class="product-card" onclick="closeSearch();openModal(${p.id})">
      <div class="product-img-wrap" style="aspect-ratio:1">
        ${p.img ? `<img src="${p.img}" alt="${p.name[lang]}" loading="lazy">` : `<div class="img-placeholder">${PLACEHOLDER_SVG}</div>`}
      </div>
      <div class="product-info">
        <h3 class="product-name" style="font-size:0.8rem">${p.name[lang]}</h3>
        <p class="product-subtitle" style="font-size:0.7rem">${p.subtitle[lang]}</p>
      </div>
    </div>
  `).join('') || `<p style="color:var(--text-muted);font-style:italic">${UI[lang].empty}</p>`;
}

document.addEventListener('keydown', e => { if (e.key==='Escape') { closeModal(); closeSearch(); } });

renderCategories();
renderProducts();



