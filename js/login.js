const form = document.getElementById("loginForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    if(email === "" || password === ""){

        alert("لطفاً همه فیلدها را پر کنید.");

        return;

    }

    localStorage.setItem("userEmail", email);

    alert("ورود با موفقیت انجام شد.");

    window.location.href = "index.html";

});