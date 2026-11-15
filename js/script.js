let loginForm = document.querySelector('.login-form');

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let userEmail = document.getElementById("email");
    let userPassword = document.getElementById("password");

    if (userEmail.value === "admin@gmail.com" && userPassword.value === "admin123") {
        window.location.href = "./pages/dashboard.html";
    }else{
        alert("email or password are incorrect ");
    }
})