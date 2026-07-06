const params = new URLSearchParams(window.location.search);

const id = Number(params.get("id"));

const product = products.find(p => p.id === id);

if (!product) {

    document.body.innerHTML = 
        <div class="container" style="padding:60px;text-align:center;">
            <h2>محصول پیدا نشد!</h2>
            <a href="index.html">بازگشت به صفحه اصلی</a>
        </div>
    ;

} else {

    document.getElementById("productImg").src = product.image;

    document.getElementById("productTitle").textContent = product.title;

    document.getElementById("productPrice").textContent =
        product.price.toLocaleString() + " تومان";

}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.getElementById("addToCartBtn")?.addEventListener("click", () => {

    const existing = cart.find(item => item.id === product.id);

    if (existing) {

        existing.qty++;

    } else {

        cart.push({
            ...product,
            qty: 1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("محصول به سبد خرید اضافه شد.");

});