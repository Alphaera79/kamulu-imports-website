/* =========================================================
   KAMULU IMPORTS LTD (MONROSS BUILDING) — Catalogue script
   =========================================================
   This file loads product data from products/products.json
   and builds the product cards on the page automatically.

   To add, edit, or remove a product, you only need to edit
   products/products.json — you never need to touch this file
   or index.html. See products/README.md for instructions.
   ========================================================= */

const PRODUCTS_URL = 'products/products.json';

function buildPhotoMarkup(product) {
  const images = Array.isArray(product.images) ? product.images.filter(Boolean) : [];

  if (images.length === 0) {
    // No photo available — fall back to the emoji icon
    const badge = product.bulky ? '<span class="bulky-badge">🚚 Bulky</span>' : '';
    return `<div class="product-icon-wrap">${escapeHtml(product.icon || '📦')} ${badge}</div>`;
  }

  const badge = product.bulky ? '<span class="bulky-badge">🚚 Bulky</span>' : '';
  const altText = escapeHtml(product.name);

  if (images.length === 1) {
    return `<div class="product-icon-wrap has-photo">
      <img class="product-photo" src="${escapeHtml(images[0])}" alt="${altText}" />
      ${badge}
    </div>`;
  }

  const mosaicClass = images.length >= 4 ? 'mosaic-4' : 'mosaic-2';
  const imgTags = images.slice(0, 4)
    .map(src => `<img src="${escapeHtml(src)}" alt="${altText}" />`)
    .join('');

  return `<div class="product-icon-wrap has-photo">
    <div class="photo-mosaic ${mosaicClass}">${imgTags}</div>
    ${badge}
  </div>`;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = String(str);
  return div.innerHTML;
}

function buildProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.dataset.category = product.category || 'other';

  const priceText = product.price ? `KES ${product.price}` : '—';
  const unitText = product.unit ? ` / ${product.unit}` : '';

  card.innerHTML = `
    ${buildPhotoMarkup(product)}
    <div class="product-body">
      <div class="product-name">${escapeHtml(product.name)}</div>
      <div class="product-desc">${escapeHtml(product.description || '')}</div>
      <div class="price-row">
        <span class="price-label">Price (KES):</span>
        <span class="price-slot">${escapeHtml(priceText + unitText)}</span>
      </div>
    </div>
  `;
  return card;
}

async function loadProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  try {
    const res = await fetch(PRODUCTS_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch ' + PRODUCTS_URL);
    const products = await res.json();

    grid.innerHTML = '';
    if (!Array.isArray(products) || products.length === 0) {
      grid.innerHTML = '<p class="products-empty">No products have been added yet.</p>';
      return;
    }

    products.forEach(product => grid.appendChild(buildProductCard(product)));
  } catch (err) {
    console.error(err);
    grid.innerHTML =
      '<p class="products-empty">Could not load the product list. If you are viewing this file ' +
      'directly on your computer, please open it through a web server instead (see products/README.md).</p>';
  }
}

// Category filtering — works on whatever cards are currently in the grid
function filterProducts(category, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.product-card').forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

document.addEventListener('DOMContentLoaded', loadProducts);
