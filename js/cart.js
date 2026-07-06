// گرفتن سبد خرید از حافظه
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");

function renderCart(){

    if(!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index)=>{

        total += item.price * item.qty;

        cartItems.innerHTML += `
        
        <div class="cart-item">

            <img src="${item.image}" width="80">

            <div>
                <h4>${item.title}</h4>
                <p>${item.price.toLocaleString()} تومان</p>
            </div>

            <div class="qty">

                <button onclick="decrease(${index})">-</button>

                <span>${item.qty}</span>

                <button onclick="increase(${index})">+</button>

            </div>

            <button onclick="removeItem(${index})">حذف</button>

        </div>

        `;
    });

    totalPriceEl.textContent = total.toLocaleString();

    updateCartCount();

}


// افزایش تعداد
function increase(index){
    cart[index].qty++;
    updateCart();
}

// کاهش تعداد
function decrease(index){
    if(cart[index].qty > 1){
        cart[index].qty--;
    }else{
        cart.splice(index,1);
    }
    updateCart();
}

// حذف محصول
function removeItem(index){
    cart.splice(index,1);
    updateCart();
}


// آپدیت کل
function updateCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}


// آپدیت شمارنده هدر
function updateCartCount(){

    const el = document.querySelector(".cart-count");

    if(!el) return;

    let total = 0;

    cart.forEach(i => total += i.qty);

    el.textContent = total;

}


// شروع
renderCart();
updateCartCount();