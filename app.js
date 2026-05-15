const products = [
  { name: 'BPC157', size: '10mg', price: 49.99 },
  { name: 'CJC With DAC', size: '5mg', price: 59.99 },
  { name: 'GHKcu', size: '50mg', price: 44.99 },
  { name: 'Ipamorelin', size: '10mg', price: 54.99 },
  { name: 'Motsc', size: '10mg', price: 69.99 },
  { name: 'NAD+', size: '500mg', price: 79.99 },
  { name: 'Tesamorelin', size: '10mg', price: 89.99 },
  { name: 'Acetic Acid', size: '10ml', price: 14.99 },
  { name: 'Bacteriostatic Water', size: '10ml', price: 12.99 }
];

let cart = [];
const productGrid = document.getElementById('productGrid');
const search = document.getElementById('search');
const cartBackdrop = document.getElementById('cartBackdrop');
const loginBackdrop = document.getElementById('loginBackdrop');
const money = n => `$${n.toFixed(2)}`;

function renderProducts(list = products) {
  productGrid.innerHTML = list.map((p, i) => `
    <article class="product-card">
      <div class="product-media"><div class="mini-vial"><img src="assets/logo.png" alt=""></div></div>
      <div class="product-copy">
        <h3>${p.name}</h3>
        <p>${p.size} • Research Use Only</p>
        <div class="product-bottom"><strong>${money(p.price)}</strong><button onclick="addToCart(${products.indexOf(p)})">Add</button></div>
      </div>
    </article>`).join('');
}

function addToCart(index) {
  const found = cart.find(item => item.name === products[index].name);
  found ? found.qty++ : cart.push({ ...products[index], qty: 1 });
  updateCart();
  openCart();
}

function updateCart() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  ['cartCount','cartCount2'].forEach(id => document.getElementById(id).textContent = count);
  document.getElementById('cartItems').innerHTML = cart.length ? cart.map((item, idx) => `
    <div class="cart-item">
      <div class="cart-thumb"><img src="assets/logo.png" alt=""></div>
      <div><h4>${item.name}</h4><p>${item.size} • Qty ${item.qty}</p></div>
      <strong>${money(item.price * item.qty)}</strong>
      <button aria-label="Remove ${item.name}" onclick="removeItem(${idx})">Remove</button>
    </div>`).join('') : '<div class="empty-cart">Your cart is empty.</div>';
  document.getElementById('cartTotal').textContent = money(cart.reduce((sum, item) => sum + item.price * item.qty, 0));
}

function removeItem(index) {
  cart.splice(index, 1); updateCart();
}
function openCart(){ cartBackdrop.classList.add('show'); document.body.classList.add('no-scroll'); }
function closeCart(){ cartBackdrop.classList.remove('show'); document.body.classList.remove('no-scroll'); }
function openLogin(){ loginBackdrop.classList.add('show'); document.body.classList.add('no-scroll'); }
function closeLogin(){ loginBackdrop.classList.remove('show'); document.body.classList.remove('no-scroll'); }

document.getElementById('openCart').onclick = openCart;
document.getElementById('openCart2').onclick = openCart;
document.getElementById('mobileCart').onclick = openCart;
document.getElementById('closeCart').onclick = closeCart;
document.getElementById('loginBtn').onclick = openLogin;
document.getElementById('closeLogin').onclick = closeLogin;
document.getElementById('menuBtn').onclick = () => document.getElementById('mobileMenu').classList.add('show');
document.getElementById('closeMenu').onclick = () => document.getElementById('mobileMenu').classList.remove('show');
document.querySelectorAll('.mobile-menu a').forEach(a => a.onclick = () => document.getElementById('mobileMenu').classList.remove('show'));
cartBackdrop.addEventListener('click', e => { if (e.target === cartBackdrop) closeCart(); });
loginBackdrop.addEventListener('click', e => { if (e.target === loginBackdrop) closeLogin(); });
search.addEventListener('input', e => renderProducts(products.filter(p => `${p.name} ${p.size}`.toLowerCase().includes(e.target.value.toLowerCase()))));
document.getElementById('checkoutBtn').onclick = () => {
  const ack = document.getElementById('ackCheck');
  if (!cart.length) return alert('Your cart is empty.');
  if (!ack.checked) return alert('Please confirm the research-use acknowledgement before continuing.');
  alert('Checkout placeholder ready. Connect an approved payment processor when available.');
};
renderProducts(); updateCart();
