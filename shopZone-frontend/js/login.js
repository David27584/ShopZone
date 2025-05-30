document.addEventListener("DOMContentLoaded", function () {
    
    const form = document.getElementById("formLogin");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        validarLogin();
    })

    function validarLogin() {
        const correo = form.correo.value.trim();
        const contrasena = form.contrasena.value.trim();

        if (correo === "" || contrasena === "") {
            alert ("Por favor completa todos los campos.")
            return;
        }

        alert("Inicio de sesión exitoso.")
    }

})