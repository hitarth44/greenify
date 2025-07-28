/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== QUESTIONS ACCORDION ===============*/
const accordionItems = document.querySelectorAll('.questions__item')

accordionItems.forEach((item) =>{
    const accordionHeader = item.querySelector('.questions__header')

    accordionHeader.addEventListener('click', () =>{
        const openItem = document.querySelector('.accordion-open')

        toggleItem(item)

        if(openItem && openItem!== item){
            toggleItem(openItem)
        }
    })
})

const toggleItem = (item) =>{
    const accordionContent = item.querySelector('.questions__content')

    if(item.classList.contains('accordion-open')){
        accordionContent.removeAttribute('style')
        item.classList.remove('accordion-open')
    }else{
        accordionContent.style.height = accordionContent.scrollHeight + 'px'
        item.classList.add('accordion-open')
    }

}

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 400 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 400) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const badges = document.querySelectorAll('.cart__count');
  badges.forEach(b => {
    b.textContent = totalCount > 0 ? totalCount : '';
  });
}

function updateCartTotal() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalElem = document.getElementById("cart-total");

  if (!totalElem) return;

  if (cart.length === 0) {
    totalElem.innerHTML = ""; // ⛔ Clear everything if cart is empty
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  totalElem.innerHTML = `
    <p style="font-size: 1.2rem; font-weight: 600; margin-bottom: 1rem;">
      Total: $${total.toFixed(2)}
    </p>
    <button onclick="proceedToCheckout()" class="button button--flex" style="margin-top: 0.5rem;">
      Proceed to Checkout
    </button>
  `;
}


function buildCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");
  const totalElem = document.getElementById("cart-total");
  if (!container || !totalElem) return;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-message" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 40vh; width: 100%; text-align: center;">
        <h3 style="color: var(--title-color); font-size: 1.2rem; margin-bottom: 1rem;">🪴 Your cart is empty</h3>
        <a href="index.html#products" class="button button--flex">Shop Now</a>
      </div>
    `;
    totalElem.innerHTML = "";
    return;
  }

  cart.forEach(item => {
    const card = document.createElement("article");
    card.classList.add("product__card");
    card.innerHTML = `
      <div class="cart__img-wrapper">
        <div class="product__circle"></div>
        <img src="${item.img}" alt="${item.name}" class="product__img" />
      </div>
      <div class="cart__card-content" style="text-align: center;">
        <h3 class="product__title">${item.name}</h3>
        <span class="product__price">$${item.price.toFixed(2)}</span>
        <div class="cart__qty-controls">
          <button onclick="updateQty('${item.name}', -1)">−</button>
          <span>${item.quantity}</span>
          <button onclick="updateQty('${item.name}', 1)">+</button>
          <button onclick="removeItem('${item.name}')">🗑️</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  updateCartTotal();
}

function updateQty(name, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.map(item => {
    if (item.name === name) {
      item.quantity += change;
    }
    return item;
  }).filter(item => item.quantity > 0);
  localStorage.setItem("cart", JSON.stringify(cart));
  buildCart();
  updateCartCount();
}

function removeItem(name) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.name !== name);
  localStorage.setItem("cart", JSON.stringify(cart));
  buildCart();
  updateCartCount();
}

function proceedToCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("🛒 Your cart is empty.");
    return;
  }

  // Show modal
  document.getElementById("thankyou-modal").classList.remove("hidden");

  // Clear cart and update UI
  localStorage.removeItem("cart");
  buildCart();
  updateCartCount();
}

document.addEventListener("DOMContentLoaded", () => {
  buildCart();
  updateCartCount();
  updateCartTotal();
});

window.addEventListener("storage", (event) => {
  if (event.key === "cart") {
    buildCart();
    updateCartCount();
    updateCartTotal();
  }
});

function closeThankYou() {
  document.getElementById("thankyou-modal").classList.add("hidden");
}
