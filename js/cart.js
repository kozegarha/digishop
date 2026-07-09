const cartProducts = document.getElementById("cartProducts");
const subtotal = document.getElementById("subtotal");
const totalPrice = document.getElementById("totalPrice");
const couponBtn = document.querySelector(".coupon-btn");
const couponInput = document.querySelector(".cart-summary input");

let discount = 1500000;
let couponDiscount = 0;

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function formatPrice(price){
    return price.toLocaleString("fa-IR") + " تومان";
}

function updateCart(){

    cartProducts.innerHTML = "";

    let total = 0;

    cart.forEach((item,index)=>{

        total += item.price * item.qty;

        cartProducts.innerHTML += `
        <div class="cart-item" data-index="${index}">

            <img src="${item.image}">

            <div class="cart-info">

                <h3>${item.title}</h3>

                <p>ارسال رایگان</p>

                <div class="qty">

                    <button class="plus">+</button>

                    <span class="count">${item.qty}</span>

                    <button class="minus">-</button>

                </div>

                <button class="remove">
                    <i class="fa-solid fa-trash"></i>
                    حذف
                </button>

            </div>

            <div class="cart-price">

                <h3>${formatPrice(item.price)}</h3>

            </div>

        </div>
        ;

    `});

    subtotal.innerHTML = formatPrice(total);

    totalPrice.innerHTML = formatPrice(total-discount-couponDiscount);

    localStorage.setItem("cart",JSON.stringify(cart));
}

updateCart();
// =====================
// نمایش سبد خرید
// =====================

function updateCart() {

    cartProducts.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.qty;

        cartProducts.innerHTML += `
        <div class="cart-item" data-index="${index}">

            <img src="${item.image}" alt="${item.title}">

            <div class="cart-info">

                <h3>${item.title}</h3>

                <p>ارسال رایگان</p>

                <div class="qty">

                    <button class="plus">+</button>

                    <span class="count">${item.qty}</span>

                    <button class="minus">-</button>

                </div>

                <button class="remove">
                    <i class="fa-solid fa-trash"></i>
                    حذف
                </button>

            </div>

            <div class="cart-price">

                <h3>${formatPrice(item.price)}</h3>

            </div>

        </div>
        ;

   ` });

    subtotal.innerHTML = formatPrice(total);

    totalPrice.innerHTML = formatPrice(total - discount - couponDiscount);

    localStorage.setItem("cart", JSON.stringify(cart));

    bindEvents();

}
// =====================
// رویدادهای سبد خرید
// =====================

function bindEvents() {

    // افزایش تعداد
    document.querySelectorAll(".plus").forEach(btn => {

        btn.onclick = function () {

            const index = Number(this.closest(".cart-item").dataset.index);

            cart[index].qty++;

            updateCart();

        };

    });

    // کاهش تعداد
    document.querySelectorAll(".minus").forEach(btn => {

        btn.onclick = function () {

            const index = Number(this.closest(".cart-item").dataset.index);

            if (cart[index].qty > 1) {

                cart[index].qty--;

            }

            updateCart();

        };

    });

    // حذف محصول
    document.querySelectorAll(".remove").forEach(btn => {

        btn.onclick = function () {

            const index = Number(this.closest(".cart-item").dataset.index);

            cart.splice(index, 1);

            updateCart();

        };

    });

}

// =====================
// کد تخفیف
// =====================

couponBtn.onclick = () => {

    const code = couponInput.value.trim();

    if (code === "SHOPX20") {

        couponDiscount = 500000;

        alert("کد تخفیف اعمال شد.");

    } else {

        couponDiscount = 0;

        alert("کد تخفیف نامعتبر است.");

    }

    updateCart();

};

// =====================
// پرداخت
// =====================

document.querySelector(".checkout").onclick = () => {

    alert("درگاه پرداخت به زودی اضافه می‌شود.");

};

// =====================
// شروع
// =====================

updateCart();