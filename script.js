const WHATSAPP_NUMBER = '5541997749722'; // número do WhatsApp exibido no rodapé

const cart = [];
const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const cartDrawer = document.querySelector('#cartDrawer');
const overlay = document.querySelector('#overlay');
const cartItems = document.querySelector('#cartItems');
const cartEmpty = document.querySelector('#cartEmpty');
const cartCount = document.querySelector('#cartCount');
const cartTotal = document.querySelector('#cartTotal');
const toast = document.querySelector('#toast');
let cartReturnFocus = null;


function openCart() {
  cartReturnFocus = document.activeElement;
  cartDrawer.removeAttribute('inert');
  cartDrawer.classList.add('open');
  overlay.classList.add('show');
  cartDrawer.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
  document.querySelector('#closeCart').focus();
}

function closeCart() {
  cartDrawer.classList.remove('open');
  overlay.classList.remove('show');
  cartDrawer.setAttribute('aria-hidden', 'true');
  cartDrawer.setAttribute('inert', '');
  document.body.classList.remove('no-scroll');
  if (cartReturnFocus?.isConnected) cartReturnFocus.focus();
}

document.querySelector('#openCart').addEventListener('click', openCart);
document.querySelector('#closeCart').addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);

function addToCart(name, price) {
  const item = cart.find(product => product.name === name);
  if (item) item.qty += 1;
  else cart.push({ name, price, qty: 1 });
  updateCart();
  showToast();
}

function changeQty(name, delta) {
  const item = cart.find(product => product.name === name);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart.splice(cart.indexOf(item), 1);
  updateCart();
}

function removeItem(name) {
  const index = cart.findIndex(product => product.name === name);
  if (index >= 0) cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = '';
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  cartCount.textContent = totalQty;
  cartTotal.textContent = money.format(totalPrice);
  cartEmpty.style.display = cart.length ? 'none' : 'grid';

  cart.forEach(item => {
    const element = document.createElement('div');
    element.className = 'cart-item';
    element.innerHTML = `
      <div>
        <h4>${item.name}</h4>
        <small>${money.format(item.price)} por cento (100 unidades)</small>
        <div class="qty">
          <button aria-label="Diminuir quantidade">−</button>
          <strong>${item.qty}</strong>
          <button aria-label="Aumentar quantidade">+</button>
        </div>
      </div>
      <div class="cart-item-subtotal">
        <strong>${money.format(item.price * item.qty)}</strong>
        <button class="remove">remover</button>
      </div>`;
    const [minus, plus] = element.querySelectorAll('.qty button');
    minus.addEventListener('click', () => changeQty(item.name, -1));
    plus.addEventListener('click', () => changeQty(item.name, 1));
    element.querySelector('.remove').addEventListener('click', () => removeItem(item.name));
    cartItems.appendChild(element);
  });
}

function showToast() {
  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

document.querySelectorAll('.add-btn').forEach(button => {
  button.addEventListener('click', () => addToCart(button.dataset.name, Number(button.dataset.price)));
});

function openWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

document.querySelector('#checkoutBtn').addEventListener('click', () => {
  if (!cart.length) {
    showToastMessage('Adicione pelo menos um item.');
    return;
  }
  const lines = cart.map(item => `• ${item.qty} cento${item.qty > 1 ? 's' : ''} (${item.qty * 100} unidades) de ${item.name} — ${money.format(item.price * item.qty)}`);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const notes = document.querySelector('#cartNotes').value.trim();
  const preferences = notes ? `\n\nSabores e observações: ${notes}` : '';
  openWhatsApp(`Olá! Gostaria de fazer este pedido:\n\n${lines.join('\n')}\n\nTotal estimado: ${money.format(total)}${preferences}\n\nPode me confirmar os sabores, a disponibilidade, o prazo e a entrega?`);
});

function showToastMessage(text) {
  toast.textContent = text;
  showToast();
  setTimeout(() => toast.textContent = 'Item adicionado ao pedido.', 2000);
}

// Ampliação acessível da imagem do catálogo.
const catalogDialog = document.querySelector('#catalogDialog');
const openCatalog = () => catalogDialog.showModal();
document.querySelector('#openCatalog').addEventListener('click', openCatalog);
document.querySelector('#openCatalogImage').addEventListener('click', openCatalog);
document.querySelector('#closeCatalog').addEventListener('click', () => catalogDialog.close());
catalogDialog.addEventListener('click', event => {
  if (event.target === catalogDialog) catalogDialog.close();
});

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const mobileNavQuery = window.matchMedia('(max-width: 980px)');
function closeMenu() {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
  mainNav.inert = mobileNavQuery.matches;
}
function syncMenu() {
  if (mobileNavQuery.matches) closeMenu();
  else {
    mainNav.classList.remove('open');
    mainNav.inert = false;
  }
}
menuToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  mainNav.inert = !open;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => {
  if (mobileNavQuery.matches && mainNav.classList.contains('open') && !event.target.closest('.nav-wrap')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  if (cartDrawer.classList.contains('open')) closeCart();
  if (mainNav.classList.contains('open')) { closeMenu(); menuToggle.focus(); }
});
if (mobileNavQuery.addEventListener) mobileNavQuery.addEventListener('change', syncMenu);
else mobileNavQuery.addListener(syncMenu);
syncMenu();

document.querySelector('#quoteForm').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = data.get('name');
  const phone = data.get('phone');
  const type = data.get('type');
  const date = data.get('date') || 'a combinar';
  const message = data.get('message') || 'Sem observações adicionais.';
  openWhatsApp(`Olá! Meu nome é ${name}.\n\nGostaria de solicitar um orçamento.\nTipo: ${type}\nData desejada: ${date}\nTelefone: ${phone}\nDetalhes: ${message}`);
});

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.03, rootMargin: '0px 0px -20px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}

document.querySelector('#year').textContent = new Date().getFullYear();
updateCart();
