// OMEGA X PEPTIDE storefront prototype
// Supabase setup later: add your project URL and anon key here.
const SUPABASE_URL = "";
const SUPABASE_ANON_KEY = "";

const products = [
  { name: "BPC157", strength: "10mg", price: 49.99 },
  { name: "CJC With DAC", strength: "5mg", price: 59.99 },
  { name: "GHKcu", strength: "50mg", price: 54.99 },
  { name: "Ipamorelin", strength: "10mg", price: 49.99 },
  { name: "Motsc", strength: "10mg", price: 64.99 },
  { name: "NAD+", strength: "500mg", price: 69.99 },
  { name: "Tesamorelin", strength: "10mg", price: 74.99 },
  { name: "Acetic Acid", strength: "10ml", price: 14.99 },
  { name: "Bacteriostatic Water", strength: "10ml", price: 12.99 }
];

let cart = [];

function money(n){ return `$${n.toFixed(2)}`; }
function renderProducts(){
  const grid = document.getElementById('productGrid');
  const q = (document.getElementById('search')?.value || '').toLowerCase();
  grid.innerHTML = products.filter(p => `${p.name} ${p.strength}`.toLowerCase().includes(q)).map((p, i) => `
    <article class="product-card">
      <div class="mock"><img src="assets/logo.png" alt="OMEGA X mark"></div>
      <h3>${p.name}</h3>
      <div class="meta">${p.strength} • Research Use Only</div>
      <div class="price">${money(p.price)}</div>
      <button class="primary" onclick="addToCart(${i})">Add to Cart</button>
    </article>
  `).join('');
}
function addToCart(i){ cart.push(products[i]); updateCart(); openCart(); }
function updateCart(){
  document.getElementById('cartCount').textContent = cart.length;
  const items = document.getElementById('cartItems');
  if(!cart.length){ items.innerHTML = '<p class="tiny">Your cart is empty.</p>'; }
  else { items.innerHTML = cart.map((p, i) => `<div class="cart-row"><span>${p.name} ${p.strength}</span><strong>${money(p.price)}</strong><button class="ghost" onclick="removeItem(${i})">Remove</button></div>`).join(''); }
  document.getElementById('cartTotal').textContent = money(cart.reduce((s,p)=>s+p.price,0));
}
function removeItem(i){ cart.splice(i,1); updateCart(); }
function openCart(){ document.getElementById('cartPanel').classList.remove('hidden'); updateCart(); }
function closeCart(){ document.getElementById('cartPanel').classList.add('hidden'); }
function openAuth(){ document.getElementById('authPanel').classList.remove('hidden'); }
function closeAuth(){ document.getElementById('authPanel').classList.add('hidden'); }
function checkout(){
  if(!cart.length){ alert('Your cart is empty.'); return; }
  if(!document.getElementById('ruoCheck').checked){ alert('Please confirm the research-use-only acknowledgment before checkout.'); return; }
  alert('Checkout placeholder ready. Next step: connect an approved payment gateway.');
}
renderProducts();
