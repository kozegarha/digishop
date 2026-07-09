// =======================
// PRODUCTS
// =======================

const productsContainer = document.getElementById("products");

function renderProducts(data = products) {

    if (!productsContainer) return;

    productsContainer.innerHTML = "";

    data.forEach(product => {

        productsContainer.innerHTML += `
        <div class="product-card" onclick="openProduct(${product.id})">

            <span class="discount">%${product.discount}</span>

            <img src="${product.image}" alt="${product.title}">

            <h3>${product.title}</h3>

            <div class="prices">

                <span class="old-price">
                    ${product.oldPrice.toLocaleString()} تومان
                </span>

                <span class="price">
                    ${product.price.toLocaleString()} تومان
                </span>

            </div>

          <button class="add-btn" onclick="addToCart(event, ${product.id})">
    افزودن به سبد خرید
</button>

        </div>
       ` ;

    });

}

renderProducts();


// =======================
// OPEN PRODUCT
// =======================

function openProduct(id){

    window.location.href = `product.html?id=${id}`;

}


// =======================
// CART
// =======================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount(){

    const cartCount = document.querySelector(".cart-count");

    if(!cartCount) return;

    let total = 0;

    cart.forEach(item => {

        total += item.qty || 1;

    });

    cartCount.textContent = total;

}

function addToCart(event,id){

    event.stopPropagation();

    const product = products.find(p => p.id === id);

    const existing = cart.find(p => p.id === id);

    if(existing){

        existing.qty++;

    }else{

        cart.push({

            ...product,

            qty:1

        });

    }

    localStorage.setItem("cart",JSON.stringify(cart));

    updateCartCount();

}

updateCartCount();

window.openProduct = openProduct;
window.addToCart = addToCart;


// =======================
// HERO SLIDER
// =======================

const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

function showSlide(index){

    slides.forEach(slide=>{

        slide.classList.remove("active");

    });

    if(slides[index]){

        slides[index].classList.add("active");

    }

}

document.querySelector(".next")?.addEventListener("click",()=>{

    currentSlide++;

    if(currentSlide >= slides.length){

        currentSlide = 0;

    }

    showSlide(currentSlide);

});

document.querySelector(".prev")?.addEventListener("click",()=>{

    currentSlide--;

    if(currentSlide < 0){

        currentSlide = slides.length-1;

    }

    showSlide(currentSlide);

});

if(slides.length){

setInterval(()=>{

    currentSlide++;

    if(currentSlide >= slides.length){

        currentSlide = 0;

    }

    showSlide(currentSlide);

},4000);

}
// =======================
// SEARCH
// =======================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const value = this.value.trim().toLowerCase();

        const filtered = products.filter(product =>
            product.title.toLowerCase().includes(value)
        );

        renderProducts(filtered);

    });

}


// =======================
// PRODUCT FILTER
// =======================

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.dataset.category;

        if (category === "all") {

            renderProducts(products);

        } else {

            const filteredProducts = products.filter(product => {
                return product.category === category;
            });

            renderProducts(filteredProducts);

        }

    });

});


// =======================
// PAGE LOAD
// =======================

document.addEventListener("DOMContentLoaded", () => {

    updateCartCount();

    if (productsContainer) {
        renderProducts(products);
    }

});
// =======================
// DARK MODE
// =======================

const themeBtn = document.getElementById("themeBtn");

if(localStorage.getItem("theme") === "dark"){

    document.body.classList.add("dark");

    if(themeBtn){
        themeBtn.textContent = "☀️";
    }

}

themeBtn?.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme","dark");

        themeBtn.textContent="☀️";

    }else{

        localStorage.setItem("theme","light");

        themeBtn.textContent="🌙";

    }

});