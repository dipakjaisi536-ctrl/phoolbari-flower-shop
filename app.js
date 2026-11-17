/* ==========================================================================
   Phoolbari (फूलबारी) — E-Commerce, Geolocation & Order Tracking Engine
   ========================================================================== */

(() => {
  'use strict';

  // Fallback SVG data URI if an external image fails to load
  const FALLBACK_IMG =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
        <rect width="400" height="300" fill="#d1fae5"/>
        <circle cx="200" cy="140" r="54" fill="#059669" opacity="0.22"/>
        <circle cx="200" cy="140" r="26" fill="#ea580c" opacity="0.85"/>
        <text x="200" y="235" text-anchor="middle" font-family="sans-serif" font-size="18" font-weight="bold" fill="#064e3b">Phoolbari Fresh Bloom</text>
      </svg>`
    );

  // 20 Nepali Native & Popular International Flowers
  const FLOWERS = [
    {
      id: 'sayapatri',
      name: 'Sayapatri Marigold Garland (5ft)',
      nepali: 'सयपत्री माला',
      category: 'nepali puja',
      origin: 'Nepali Native',
      price: 350,
      oldPrice: 450,
      rating: 4.9,
      sold: 842,
      image: 'photo-1613539246066-78db6ec4ff0f.avif',
      desc: 'Fresh golden-orange Sayapatri marigold garlands hand-woven in Bhaktapur for Tihar, Puja, and welcoming guests.'
    },
    {
      id: 'makhamali',
      name: 'Makhamali Eternal Mala',
      nepali: 'मखमली माला (सुपारी फूल)',
      category: 'nepali puja',
      origin: 'Nepali Native',
      price: 420,
      oldPrice: 520,
      rating: 4.9,
      sold: 690,
      image: 'photo-1589100534833-475e31a17b4e.avif',
      desc: 'Ever-vibrant purple Makhamali (Globe Amaranth) mala symbolizing longevity and Bhai Tika blessings.'
    },
    {
      id: 'laligurans',
      name: 'Himalayan Laligurans Bunch',
      nepali: 'लालीगुराँस (National Flower)',
      category: 'nepali bouquets',
      origin: 'Nepali Native',
      price: 950,
      oldPrice: 1200,
      rating: 4.8,
      sold: 315,
      image: 'photo-1487139975590-b4f1dce9b035.avif',
      desc: 'Nepal’s iconic crimson Rhododendron blooms sourced ethically from high-hill nurseries in Ilam and Phulchoki.'
    },
    {
      id: 'godavari',
      name: 'Godavari Chrysanthemum Pot & Bunch',
      nepali: 'गोदावरी फूल',
      category: 'nepali puja',
      origin: 'Nepali Native',
      price: 550,
      oldPrice: 700,
      rating: 4.7,
      sold: 410,
      image: 'photo-1508808703020-ef18109db02f.avif',
      desc: 'Lush autumn-blooming Godavari clusters ideal for home balconies, festivals, and ceremonial decor.'
    },
    {
      id: 'chameli',
      name: 'Fragrant Chameli & Beli Gajra',
      nepali: 'चमेली र बेली गजरा',
      category: 'nepali puja',
      origin: 'Nepali Native',
      price: 280,
      oldPrice: 350,
      rating: 4.9,
      sold: 520,
      image: 'photo-1471696035578-3d8c78d99684.avif',
      desc: 'Sweetly scented white jasmine strings crafted every dawn for bridal hair, Puja offerings, and Teej.'
    },
    {
      id: 'parijat',
      name: 'Sacred Parijat Morning Basket',
      nepali: 'पारिजात फूल',
      category: 'nepali puja',
      origin: 'Nepali Native',
      price: 320,
      oldPrice: 400,
      rating: 4.8,
      sold: 278,
      image: 'premium_photo-1674986175088-2d7dda41f7f8.avif',
      desc: 'Delicate coral-stemmed night-flowering jasmine gathered fresh at sunrise for temple and home Puja.'
    },
    {
      id: 'kamal',
      name: 'Sacred Pink Kamal (Lotus) Pair',
      nepali: 'कमलको फूल',
      category: 'nepali puja',
      origin: 'Nepali Native',
      price: 480,
      oldPrice: 600,
      rating: 4.9,
      sold: 360,
      image: 'premium_photo-1676475964992-6404b8db0b53.avif',
      desc: 'Freshly harvested sacred lotus blooms for Laxmi Puja, meditation altars, and serene water bowls.'
    },
    {
      id: 'suryamukhi',
      name: 'Surya Mukhi Sunflower Bouquet',
      nepali: 'सूर्यमुखी गुच्छा',
      category: 'nepali bouquets',
      origin: 'Nepali Grown',
      price: 890,
      oldPrice: 1100,
      rating: 4.8,
      sold: 445,
      image: 'photo-1613539246066-78db6ec4ff0f.avif',
      desc: 'Radiant golden sunflowers wrapped in kraft paper with eucalyptus greenery to brighten any celebration.'
    },
    {
      id: 'beli',
      name: 'Beli Bridal & Temple Garland',
      nepali: 'बेली पुष्प माला',
      category: 'nepali puja',
      origin: 'Nepali Native',
      price: 650,
      oldPrice: 800,
      rating: 4.8,
      sold: 230,
      image: 'photo-1471696035578-3d8c78d99684.avif',
      desc: 'Double-layered Arabian jasmine and rose-petal wedding varmala crafted for Nepali ceremonies.'
    },
    {
      id: 'mandar',
      name: 'Mandar & Dubo Puja Thali Pack',
      nepali: 'मन्दार र दुबो पूजा सेट',
      category: 'nepali puja',
      origin: 'Nepali Native',
      price: 250,
      oldPrice: 320,
      rating: 4.7,
      sold: 612,
      image: 'photo-1508808703020-ef18109db02f.avif',
      desc: 'Complete daily Puja pack with Mandar, red hibiscus, Dubo grass, and fresh Sayapatri petals.'
    },
    {
      id: 'red-roses',
      name: '12 Velvet Red Roses Bouquet',
      nepali: 'रातो गुलाब गुच्छा',
      category: 'roses bouquets',
      origin: 'Popular Gift',
      price: 1250,
      oldPrice: 1550,
      rating: 4.9,
      sold: 980,
      image: 'olia-gozha-9A_peGrSbZc-unsplash.jpg',
      desc: 'Long-stemmed velvety red roses styled with baby’s breath and satin ribbon for anniversaries and love notes.'
    },
    {
      id: 'pink-roses',
      name: 'Blush Pink Rose & Peony Box',
      nepali: 'गुलाबी गुलाब बक्स',
      category: 'roses bouquets',
      origin: 'Luxury',
      price: 2200,
      oldPrice: 2700,
      rating: 4.9,
      sold: 405,
      image: 'photo-1487139975590-b4f1dce9b035.avif',
      desc: 'Soft pastel pink roses and lush peonies arranged in a keepsake Phoolbari gift box.'
    },
    {
      id: 'white-lilies',
      name: 'Royal White & Stargazer Lilies',
      nepali: 'सेतो लिली गुच्छा',
      category: 'bouquets',
      origin: 'Popular Gift',
      price: 1650,
      oldPrice: 1950,
      rating: 4.8,
      sold: 289,
      image: 'premium_photo-1674986175088-2d7dda41f7f8.avif',
      desc: 'Aromatic Oriental white lilies symbolizing purity, grace, and heartfelt congratulations.'
    },
    {
      id: 'dutch-tulips',
      name: 'Spring Dutch Tulips Mix (10 Stems)',
      nepali: 'रंगीबिरंगी ट्यूलिप',
      category: 'exotic bouquets',
      origin: 'Imported Exotic',
      price: 1850,
      oldPrice: 2250,
      rating: 4.8,
      sold: 214,
      image: 'photo-1589100534833-475e31a17b4e.avif',
      desc: 'Crisp imported tulips in coral, yellow, and blush tones—an unforgettable modern gift.'
    },
    {
      id: 'purple-orchid',
      name: 'Exotic Phalaenopsis Orchid',
      nepali: 'सुनाखरी (Orchid)',
      category: 'exotic',
      origin: 'Himalayan & Exotic',
      price: 2450,
      oldPrice: 2900,
      rating: 4.9,
      sold: 198,
      image: 'premium_photo-1676475964992-6404b8db0b53.avif',
      desc: 'Long-lasting purple Sunakhari orchid stems in a ceramic planter for offices and luxury gifting.'
    },
    {
      id: 'hydrangea',
      name: 'Blue Hydrangea Cloud Wrap',
      nepali: 'हाइड्रेन्जिया बुके',
      category: 'exotic bouquets',
      origin: 'Popular Gift',
      price: 1750,
      oldPrice: 2100,
      rating: 4.7,
      sold: 164,
      image: 'photo-1508808703020-ef18109db02f.avif',
      desc: 'Voluminous sky-blue hydrangea blooms paired with soft white fillers in Korean-style wrapping.'
    },
    {
      id: 'carnations',
      name: 'Pastel Carnation Joy Bunch',
      nepali: 'कार्नेसन फूल',
      category: 'bouquets',
      origin: 'Popular Gift',
      price: 780,
      oldPrice: 950,
      rating: 4.7,
      sold: 356,
      image: 'photo-1487139975590-b4f1dce9b035.avif',
      desc: 'Ruffled pink and peach carnations loved for Mother’s Day, birthdays, and teacher appreciation.'
    },
    {
      id: 'babys-breath',
      name: 'Minimalist Baby’s Breath Cloud',
      nepali: 'जिप्सोफिला बुके',
      category: 'bouquets',
      origin: 'Trending',
      price: 690,
      oldPrice: 850,
      rating: 4.8,
      sold: 478,
      image: 'photo-1471696035578-3d8c78d99684.avif',
      desc: 'Airy cloud-like Gypsophila bouquet wrapped in matte emerald paper—minimalist and aesthetic.'
    },
    {
      id: 'gerbera',
      name: 'Gerbera Daisy Fiesta Basket',
      nepali: 'जर्बेरा फूल टोकरी',
      category: 'bouquets',
      origin: 'Nepali Grown',
      price: 920,
      oldPrice: 1150,
      rating: 4.8,
      sold: 290,
      image: 'photo-1613539246066-78db6ec4ff0f.avif',
      desc: 'Cheerful multicolor Gerbera daisies arranged in a hand-woven Nepali bamboo basket.'
    },
    {
      id: 'wedding-bouquet',
      name: 'Royal Nepali Wedding Bouquet',
      nepali: 'विवाह विशेष बुके',
      category: 'roses bouquets exotic',
      origin: 'Bridal Studio',
      price: 3400,
      oldPrice: 4100,
      rating: 5.0,
      sold: 142,
      image: 'olia-gozha-9A_peGrSbZc-unsplash.jpg',
      desc: 'Bespoke bridal arrangement blending garden roses, orchids, lilies, and golden foliage.'
    }
  ];

  // State Management
  const state = {
    category: 'all',
    search: '',
    sort: 'popular',
    priceRange: 'all',
    promoCode: '',
    cart: JSON.parse(localStorage.getItem('phoolbari_cart') || '[]'),
    wishlist: JSON.parse(localStorage.getItem('phoolbari_wishlist') || '[]'),
    orders: JSON.parse(localStorage.getItem('phoolbari_orders') || '[]'),
    location: JSON.parse(
      localStorage.getItem('phoolbari_location') ||
        JSON.stringify({
          lat: 27.7172,
          lng: 85.324,
          label: 'Kathmandu Valley, Nepal',
          isUserPinned: false
        })
    )
  };

  // DOM Elements
  const grid = document.getElementById('product-grid');
  const resultCount = document.getElementById('result-count');
  const cartCountEl = document.getElementById('cart-count');
  const ordersCountEl = document.getElementById('orders-count');
  const searchInput = document.getElementById('search-input');
  const suggestionsBox = document.getElementById('search-suggestions');
  const sortSelect = document.getElementById('sort-select');
  const priceSelect = document.getElementById('price-select');
  const toastEl = document.getElementById('toast');

  const cartDialog = document.getElementById('cart-dialog');
  const checkoutDialog = document.getElementById('checkout-dialog');
  const quickviewDialog = document.getElementById('quickview-dialog');
  const ordersDialog = document.getElementById('orders-dialog');

  let toastTimer;
  function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2800);
  }

  function saveState() {
    localStorage.setItem('phoolbari_cart', JSON.stringify(state.cart));
    localStorage.setItem('phoolbari_wishlist', JSON.stringify(state.wishlist));
    localStorage.setItem('phoolbari_orders', JSON.stringify(state.orders));
    localStorage.setItem('phoolbari_location', JSON.stringify(state.location));
    updateHeaderBadges();
  }

  function updateHeaderBadges() {
    const totalQty = state.cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountEl.textContent = totalQty;
    ordersCountEl.textContent = state.orders.length;
  }

  // Format currency in Nepalese Rupees
  const formatNPR = (n) => `NPR ${Number(n).toLocaleString('en-IN')}`;

  // ========================================================================
  // Product Filtering, Sorting & Rendering
  // ========================================================================
  function getFilteredFlowers() {
    let list = FLOWERS.filter((f) => {
      const catMatch =
        state.category === 'all' || f.category.split(' ').includes(state.category);
      const q = state.search.trim().toLowerCase();
      const searchMatch =
        !q ||
        f.name.toLowerCase().includes(q) ||
        f.nepali.toLowerCase().includes(q) ||
        f.desc.toLowerCase().includes(q) ||
        f.origin.toLowerCase().includes(q);

      let priceMatch = true;
      if (state.priceRange === 'under-600') priceMatch = f.price < 600;
      else if (state.priceRange === '600-1500')
        priceMatch = f.price >= 600 && f.price <= 1500;
      else if (state.priceRange === 'above-1500') priceMatch = f.price > 1500;

      return catMatch && searchMatch && priceMatch;
    });

    if (state.sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (state.sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (state.sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    else list.sort((a, b) => b.sold - a.sold);

    return list;
  }

  function renderProducts() {
    const list = getFilteredFlowers();
    resultCount.textContent = `Showing ${list.length} flower${list.length === 1 ? '' : 's'}`;

    if (list.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:3rem 1rem;background:var(--color-card);border-radius:var(--radius-lg);border:1px solid var(--color-border);">
          <h3>No matching flowers found</h3>
          <p style="color:var(--color-muted-foreground);margin:0.5rem 0 1rem;">Try clearing your search or choosing another category.</p>
          <button type="button" class="btn btn-primary" id="empty-reset-btn">Show All Flowers</button>
        </div>`;
      document.getElementById('empty-reset-btn')?.addEventListener('click', resetFilters);
      return;
    }

    grid.innerHTML = list
      .map((f) => {
        const discount = Math.round(((f.oldPrice - f.price) / f.oldPrice) * 100);
        const wished = state.wishlist.includes(f.id);
        return `
        <article class="product-card">
          <div class="product-media">
            <img src="${f.image}" alt="${f.name} (${f.nepali})" loading="lazy" data-fallback>
            <div class="product-badges">
              <span class="badge-discount">-${discount}%</span>
              <span class="badge-origin">${f.origin}</span>
            </div>
            <button type="button" class="wishlist-btn ${wished ? 'active' : ''}" data-wish="${f.id}" aria-label="${wished ? 'Remove from wishlist' : 'Add to wishlist'}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${wished ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
          </div>
          <div class="product-body">
            <span class="product-nepali">${f.nepali}</span>
            <h3 class="product-title">${f.name}</h3>
            <p class="product-desc">${f.desc}</p>
            <div class="product-meta">
              <span class="stars">&#9733; ${f.rating.toFixed(1)}</span>
              <span>(${f.sold} sold)</span>
            </div>
            <div class="product-price-row">
              <span class="price-current">${formatNPR(f.price)}</span>
              <span class="price-old">${formatNPR(f.oldPrice)}</span>
            </div>
            <div class="product-actions">
              <button type="button" class="btn btn-ghost btn-sm" data-quick="${f.id}">Quick View</button>
              <button type="button" class="btn btn-primary btn-sm" data-add="${f.id}">Add to Cart</button>
            </div>
          </div>
        </article>`;
      })
      .join('');

    // Attach image fallbacks
    grid.querySelectorAll('img[data-fallback]').forEach((img) => {
      img.addEventListener('error', () => {
        if (img.src !== FALLBACK_IMG) img.src = FALLBACK_IMG;
      });
    });
  }

  function resetFilters() {
    state.category = 'all';
    state.search = '';
    state.sort = 'popular';
    state.priceRange = 'all';
    searchInput.value = '';
    sortSelect.value = 'popular';
    priceSelect.value = 'all';
    document.querySelectorAll('.cat-pill, .nav-link[data-cat]').forEach((el) => {
      el.classList.toggle('active', el.dataset.cat === 'all');
    });
    renderProducts();
  }

  // Event delegation on Product Grid
  grid.addEventListener('click', (e) => {
    const addBtn = e.target.closest('[data-add]');
    const quickBtn = e.target.closest('[data-quick]');
    const wishBtn = e.target.closest('[data-wish]');

    if (addBtn) {
      addToCart(addBtn.dataset.add, 1);
    } else if (quickBtn) {
      openQuickView(quickBtn.dataset.quick);
    } else if (wishBtn) {
      const id = wishBtn.dataset.wish;
      const idx = state.wishlist.indexOf(id);
      if (idx === -1) {
        state.wishlist.push(id);
        showToast('Saved to wishlist');
      } else {
        state.wishlist.splice(idx, 1);
        showToast('Removed from wishlist');
      }
      saveState();
      renderProducts();
    }
  });

  // Category & Filter Listeners
  document.querySelectorAll('.cat-pill, .nav-link[data-cat]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.category = btn.dataset.cat;
      document.querySelectorAll('.cat-pill, .nav-link[data-cat]').forEach((el) => {
        el.classList.toggle('active', el.dataset.cat === state.category);
      });
      renderProducts();
    });
  });

  sortSelect.addEventListener('change', () => {
    state.sort = sortSelect.value;
    renderProducts();
  });

  priceSelect.addEventListener('change', () => {
    state.priceRange = priceSelect.value;
    renderProducts();
  });

  document.getElementById('reset-filters-btn').addEventListener('click', resetFilters);

  // Live Search & Daraz-style Suggestions
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    state.search = q;
    renderProducts();

    if (!q) {
      suggestionsBox.classList.remove('open');
      suggestionsBox.innerHTML = '';
      return;
    }

    const matches = FLOWERS.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.nepali.toLowerCase().includes(q) ||
        f.origin.toLowerCase().includes(q)
    ).slice(0, 6);

    if (!matches.length) {
      suggestionsBox.classList.remove('open');
      return;
    }

    suggestionsBox.innerHTML = matches
      .map(
        (m) => `
      <button type="button" class="suggestion-item" data-suggest="${m.id}">
        <span><strong>${m.name}</strong> <small style="color:var(--color-primary);">(${m.nepali})</small></span>
        <span style="font-weight:700;color:var(--color-accent);">${formatNPR(m.price)}</span>
      </button>`
      )
      .join('');
    suggestionsBox.classList.add('open');
  });

  suggestionsBox.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-suggest]');
    if (!btn) return;
    suggestionsBox.classList.remove('open');
    openQuickView(btn.dataset.suggest);
  });

  document.getElementById('search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    suggestionsBox.classList.remove('open');
    document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrap')) suggestionsBox.classList.remove('open');
  });

  // ========================================================================
  // Cart & Daraz-Style Checkout Logic
  // ========================================================================
  function addToCart(id, qty = 1) {
    const existing = state.cart.find((c) => c.id === id);
    if (existing) existing.qty += qty;
    else state.cart.push({ id, qty, selected: true });
    saveState();
    const flower = FLOWERS.find((f) => f.id === id);
    showToast(`Added ${flower?.name || 'flower'} to cart`);
  }

  function calculateTotals() {
    const selectedItems = state.cart.filter((c) => c.selected);
    const subtotal = selectedItems.reduce((sum, item) => {
      const f = FLOWERS.find((x) => x.id === item.id);
      return sum + (f ? f.price * item.qty : 0);
    }, 0);

    let discount = 0;
    const code = state.promoCode.trim().toUpperCase();
    if (code === 'PHOOL10') discount = Math.round(subtotal * 0.1);
    else if (code === 'TIHAR50' && subtotal > 300) discount = 50;

    const delivery = subtotal === 0 ? 0 : subtotal >= 1500 ? 0 : 99;
    const total = Math.max(0, subtotal - discount + delivery);
    return { selectedItems, subtotal, discount, delivery, total };
  }

  function renderCart() {
    const body = document.getElementById('cart-body');
    if (state.cart.length === 0) {
      body.innerHTML = `
        <div style="text-align:center;padding:2rem 1rem;">
          <p style="font-size:1.1rem;font-weight:700;margin-bottom:0.5rem;">Your Phoolbari cart is empty</p>
          <p style="color:var(--color-muted-foreground);margin-bottom:1.25rem;">Add fresh Sayapatri, Makhamali, or luxury roses to start your order.</p>
          <button type="button" class="btn btn-primary" data-close-dialog>Browse Flowers</button>
        </div>`;
      return;
    }

    const { selectedItems, subtotal, discount, delivery, total } = calculateTotals();

    const itemsHtml = state.cart
      .map((item) => {
        const f = FLOWERS.find((x) => x.id === item.id);
        if (!f) return '';
        return `
        <div class="cart-item">
          <input type="checkbox" ${item.selected ? 'checked' : ''} data-toggle-item="${f.id}" aria-label="Select ${f.name}">
          <img src="${f.image}" alt="${f.name}">
          <div>
            <strong>${f.name}</strong>
            <div style="font-size:0.82rem;color:var(--color-primary);">${f.nepali}</div>
            <div style="font-weight:700;color:var(--color-accent);margin-top:0.2rem;">${formatNPR(f.price)}</div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:0.4rem;">
            <div class="qty-stepper">
              <button type="button" data-qty-dec="${f.id}" aria-label="Decrease quantity">&minus;</button>
              <span>${item.qty}</span>
              <button type="button" data-qty-inc="${f.id}" aria-label="Increase quantity">+</button>
            </div>
            <button type="button" style="background:none;border:none;color:var(--color-destructive);font-size:0.8rem;font-weight:700;" data-remove-item="${f.id}">Remove</button>
          </div>
        </div>`;
      })
      .join('');

    body.innerHTML = `
      ${itemsHtml}
      <div style="display:flex;gap:0.5rem;align-items:center;">
        <input type="text" id="promo-input" value="${state.promoCode}" placeholder="Voucher code (try PHOOL10 or TIHAR50)" style="flex:1;padding:0.55rem 0.85rem;border-radius:var(--radius-sm);border:1.5px solid var(--color-border);background:var(--color-background);">
        <button type="button" class="btn btn-ghost btn-sm" id="apply-promo-btn">Apply</button>
      </div>
      <div class="summary-box">
        <div class="summary-row"><span>Selected Items (${selectedItems.length})</span><span>${formatNPR(subtotal)}</span></div>
        <div class="summary-row"><span>Voucher Discount</span><span style="color:var(--color-primary);">&minus; ${formatNPR(discount)}</span></div>
        <div class="summary-row"><span>Delivery Fee (Free over NPR 1,500)</span><span>${delivery === 0 ? 'FREE' : formatNPR(delivery)}</span></div>
        <div class="summary-row summary-total"><span>Total Payable</span><span>${formatNPR(total)}</span></div>
      </div>
      <button type="button" class="btn btn-accent" id="proceed-checkout-btn" ${selectedItems.length === 0 ? 'disabled' : ''}>
        Proceed to Checkout (${selectedItems.length})
      </button>`;
  }

  document.getElementById('cart-body').addEventListener('click', (e) => {
    const inc = e.target.closest('[data-qty-inc]');
    const dec = e.target.closest('[data-qty-dec]');
    const rem = e.target.closest('[data-remove-item]');
    const tog = e.target.closest('[data-toggle-item]');

    if (inc) {
      const item = state.cart.find((c) => c.id === inc.dataset.qtyInc);
      if (item) item.qty += 1;
      saveState();
      renderCart();
    } else if (dec) {
      const item = state.cart.find((c) => c.id === dec.dataset.qtyDec);
      if (item && item.qty > 1) item.qty -= 1;
      saveState();
      renderCart();
    } else if (rem) {
      state.cart = state.cart.filter((c) => c.id !== rem.dataset.removeItem);
      saveState();
      renderCart();
    } else if (tog) {
      const item = state.cart.find((c) => c.id === tog.dataset.toggleItem);
      if (item) item.selected = tog.checked;
      saveState();
      renderCart();
    } else if (e.target.id === 'apply-promo-btn') {
      const val = document.getElementById('promo-input').value.trim().toUpperCase();
      state.promoCode = val;
      if (val === 'PHOOL10' || val === 'TIHAR50') showToast(`Voucher ${val} applied!`);
      else showToast('Invalid voucher. Try PHOOL10 or TIHAR50');
      renderCart();
    } else if (e.target.id === 'proceed-checkout-btn') {
      cartDialog.close();
      openCheckout();
    }
  });

  function openQuickView(id) {
    const f = FLOWERS.find((x) => x.id === id);
    if (!f) return;
    document.getElementById('qv-title').textContent = f.name;
    document.getElementById('qv-body').innerHTML = `
      <div style="display:grid;gap:1rem;">
        <img src="${f.image}" alt="${f.name}" style="width:100%;max-height:280px;object-fit:cover;border-radius:var(--radius-md);">
        <div>
          <span style="color:var(--color-primary);font-weight:700;">${f.nepali} &bull; ${f.origin}</span>
          <h3 style="font-size:1.35rem;margin:0.25rem 0;">${f.name}</h3>
          <p style="color:var(--color-muted-foreground);">${f.desc}</p>
        </div>
        <div style="display:flex;align-items:baseline;gap:0.75rem;">
          <span class="price-current" style="font-size:1.5rem;">${formatNPR(f.price)}</span>
          <span class="price-old">${formatNPR(f.oldPrice)}</span>
          <span class="stars">&#9733; ${f.rating} (${f.sold} sold)</span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;">
          <button type="button" class="btn btn-primary" id="qv-add">Add to Cart</button>
          <button type="button" class="btn btn-accent" id="qv-buy">Buy Now</button>
        </div>
      </div>`;
    quickviewDialog.showModal();

    document.getElementById('qv-add').onclick = () => {
      addToCart(f.id, 1);
      quickviewDialog.close();
    };
    document.getElementById('qv-buy').onclick = () => {
      const exists = state.cart.find((c) => c.id === f.id);
      if (!exists) state.cart.push({ id: f.id, qty: 1, selected: true });
      else exists.selected = true;
      saveState();
      quickviewDialog.close();
      openCheckout();
    };
  }

  function openCheckout() {
    const { selectedItems, subtotal, discount, delivery, total } = calculateTotals();
    if (selectedItems.length === 0) {
      showToast('Please select at least one flower to checkout.');
      return;
    }
    document.getElementById('checkout-summary').innerHTML = `
      <div class="summary-row"><span>Items Subtotal</span><span>${formatNPR(subtotal)}</span></div>
      <div class="summary-row"><span>Discount</span><span>&minus; ${formatNPR(discount)}</span></div>
      <div class="summary-row"><span>Delivery</span><span>${delivery === 0 ? 'FREE' : formatNPR(delivery)}</span></div>
      <div class="summary-row summary-total"><span>Order Total</span><span>${formatNPR(total)}</span></div>`;
    checkoutDialog.showModal();
  }

  document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const { selectedItems, total } = calculateTotals();
    const orderId = `PHB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleString(),
      customer: document.getElementById('co-name').value.trim(),
      phone: document.getElementById('co-phone').value.trim(),
      city: document.getElementById('co-city').value.trim(),
      address: document.getElementById('co-address').value.trim(),
      slot: document.getElementById('co-slot').value,
      payment: form.querySelector('input[name="payment"]:checked').value,
      total,
      statusStep: 2, // 1: Placed, 2: Preparing Bouquet, 3: Out for Delivery, 4: Delivered
      items: selectedItems.map((c) => {
        const f = FLOWERS.find((x) => x.id === c.id);
        return { name: f.name, qty: c.qty, price: f.price };
      })
    };

    state.orders.unshift(newOrder);
    state.cart = state.cart.filter((c) => !c.selected);
    saveState();
    form.reset();
    checkoutDialog.close();
    showToast(`Order ${orderId} placed! Preparing your fresh flowers.`);
    openOrders();
  });

  function openOrders() {
    const body = document.getElementById('orders-body');
    if (state.orders.length === 0) {
      body.innerHTML = `<p style="text-align:center;padding:2rem 0;color:var(--color-muted-foreground);">No orders yet. Place your first flower order to track delivery here.</p>`;
    } else {
      body.innerHTML = state.orders
        .map(
          (o) => `
        <div class="summary-box" style="gap:0.6rem;">
          <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;">
            <strong>Order #${o.id}</strong>
            <span style="color:var(--color-primary);font-weight:700;">${o.payment}</span>
          </div>
          <div style="font-size:0.85rem;color:var(--color-muted-foreground);">
            ${o.date} &bull; ${o.slot}<br>
            Deliver to: ${o.customer} (${o.phone}), ${o.address}, ${o.city}
          </div>
          <div class="track-steps">
            <div class="track-step ${o.statusStep >= 1 ? 'done' : ''}">1. Placed</div>
            <div class="track-step ${o.statusStep >= 2 ? 'done' : ''}">2. Crafting</div>
            <div class="track-step ${o.statusStep >= 3 ? 'done' : ''}">3. On Way</div>
            <div class="track-step ${o.statusStep >= 4 ? 'done' : ''}">4. Delivered</div>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span>${o.items.map((i) => `${i.qty}x ${i.name}`).join(', ')}</span>
            <strong style="color:var(--color-accent);">${formatNPR(o.total)}</strong>
          </div>
        </div>`
        )
        .join('');
    }
    ordersDialog.showModal();
  }

  // ========================================================================
  // Interactive Leaflet Map & Current Location Pinning
  // ========================================================================
  let map;
  let marker;

  function renderFallbackMap() {
    const mapEl = document.getElementById('shop-map');
    if (!mapEl || typeof L !== 'undefined') return;
    const { lat, lng, label } = state.location;
    mapEl.innerHTML = `
      <div style="height:100%;min-height:360px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem;text-align:center;background:radial-gradient(circle at 50% 40%, #d1fae5 0%, #ecfdf5 65%, #a7f3d0 100%);color:#064e3b;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="#ea580c" stroke="#064e3b" stroke-width="1.5" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3" fill="#ffffff"/></svg>
        <h3 style="margin:0.75rem 0 0.35rem;">Phoolbari Express Shop Pin</h3>
        <p style="max-width:34ch;font-size:0.95rem;margin-bottom:0.5rem;">${label}</p>
        <code style="background:#ffffff;padding:0.35rem 0.75rem;border-radius:999px;border:1px solid #a7f3d0;font-weight:700;">${lat.toFixed(5)}, ${lng.toFixed(5)}</code>
      </div>`;
  }

  function initMap() {
    const mapEl = document.getElementById('shop-map');
    if (!mapEl) return;
    if (typeof L === 'undefined') {
      renderFallbackMap();
      updateLocationUI();
      return;
    }

    const { lat, lng, label } = state.location;
    map = L.map(mapEl).setView([lat, lng], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(`<strong>Phoolbari Flower Shop</strong><br>${label}`).openPopup();
    updateLocationUI();
  }

  function updateLocationUI() {
    const { lat, lng, label, isUserPinned } = state.location;
    document.getElementById('header-location-label').textContent = isUserPinned
      ? `Pinned: ${label.split(',')[0]}`
      : 'Pin Current Location';
    document.getElementById('loc-title').textContent = isUserPinned
      ? `Phoolbari Express Hub at Your Location`
      : `Default Hub: ${label}`;
    document.getElementById('loc-address').textContent = label;
    document.getElementById('loc-coords').textContent = `GPS: ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    document.getElementById('gmaps-link').href = `https://maps.google.com/?q=${lat},${lng}`;

    if (map && marker) {
      map.setView([lat, lng], 15);
      marker.setLatLng([lat, lng]);
      marker.bindPopup(`<strong>Phoolbari Flower Shop</strong><br>${label}`).openPopup();
    } else {
      renderFallbackMap();
    }
  }

  async function pinCurrentLocation(fillCheckout = false) {
    if (!('geolocation' in navigator)) {
      showToast('Geolocation is not supported by your browser.');
      return;
    }
    showToast('Detecting your current location...');
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        let label = `Current Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );
          if (res.ok) {
            const data = await res.json();
            if (data.display_name) label = data.display_name;
          }
        } catch {
          // Graceful fallback to coordinates
        }

        state.location = { lat, lng, label, isUserPinned: true };
        saveState();
        updateLocationUI();

        if (fillCheckout) {
          document.getElementById('co-address').value = label;
          const parts = label.split(',').map((s) => s.trim());
          if (parts.length >= 2) {
            document.getElementById('co-city').value = parts[parts.length - 3] || parts[0];
          }
        }
        showToast('Phoolbari Shop pinned to your current location!');
      },
      () => {
        showToast('Location permission denied. Showing Kathmandu Valley hub.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  // ========================================================================
  // Dialog Helpers, Light-Dismiss Fallback & Form Validation Sync
  // ========================================================================
  document.getElementById('open-cart-btn').addEventListener('click', () => {
    renderCart();
    cartDialog.showModal();
  });
  document.getElementById('open-orders-btn').addEventListener('click', openOrders);
  document.getElementById('open-orders-top-btn').addEventListener('click', openOrders);

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-close-dialog]')) {
      e.target.closest('dialog')?.close();
    }
  });

  // Fallback for browsers without <dialog closedby="any">
  if (!('closedBy' in HTMLDialogElement.prototype)) {
    document.querySelectorAll('dialog[closedby="any"]').forEach((dialog) => {
      dialog.addEventListener('click', (event) => {
        if (event.target !== dialog) return;
        const r = dialog.getBoundingClientRect();
        const inside =
          r.top <= event.clientY &&
          event.clientY <= r.bottom &&
          r.left <= event.clientX &&
          event.clientX <= r.right;
        if (!inside) dialog.close();
      });
    });
  }

  // :user-invalid ARIA sync & fallback
  document.querySelectorAll('input, select, textarea').forEach((el) => {
    if (!el.hasAttribute('aria-invalid')) el.setAttribute('aria-invalid', 'false');
  });
  document.addEventListener(
    'blur',
    (e) => {
      const el = e.target;
      if (!el.matches?.('input, select, textarea')) return;
      const invalid = el.matches(':user-invalid') || (!CSS.supports('selector(:user-invalid)') && !el.validity.valid);
      el.setAttribute('aria-invalid', invalid ? 'true' : 'false');
      if (!CSS.supports('selector(:user-invalid)')) {
        el.classList.toggle('user-invalid-fallback', invalid);
      }
    },
    true
  );

  // Location & Promo & Theme Listeners
  document.getElementById('header-locate-btn').addEventListener('click', () => {
    pinCurrentLocation(false);
    document.getElementById('location-section').scrollIntoView({ behavior: 'smooth' });
  });
  document.getElementById('hero-locate-btn').addEventListener('click', () => {
    pinCurrentLocation(false);
    document.getElementById('location-section').scrollIntoView({ behavior: 'smooth' });
  });
  document.getElementById('detect-location-btn').addEventListener('click', () => pinCurrentLocation(false));
  document.getElementById('autofill-loc-btn').addEventListener('click', () => pinCurrentLocation(true));

  document.getElementById('copy-promo-btn').addEventListener('click', () => {
    state.promoCode = 'PHOOL10';
    showToast('Promo code PHOOL10 applied for 10% OFF!');
  });

  const themeBtn = document.getElementById('theme-toggle-btn');
  themeBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeBtn.textContent = isDark ? 'Dark Mode' : 'Light Mode';
  });

  // Flash Countdown Timer
  let secsLeft = 5 * 3600 + 42 * 60 + 18;
  setInterval(() => {
    if (secsLeft <= 0) secsLeft = 6 * 3600;
    secsLeft--;
    const h = String(Math.floor(secsLeft / 3600)).padStart(2, '0');
    const m = String(Math.floor((secsLeft % 3600) / 60)).padStart(2, '0');
    const s = String(secsLeft % 60).padStart(2, '0');
    document.getElementById('cd-hours').textContent = h;
    document.getElementById('cd-mins').textContent = m;
    document.getElementById('cd-secs').textContent = s;
  }, 1000);

  // Initialize App
  updateHeaderBadges();
  renderProducts();
  window.addEventListener('load', initMap);
})();
