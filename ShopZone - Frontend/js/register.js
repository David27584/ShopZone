document.addEventListener("DOMContentLoaded", function (){

    const form = document.getElementById("formRegistro");

    form.addEventListener("submit" , function (e) {
        e.preventDefault();
        validarFormulario();
    });

    function validarFormulario() {
        const nombre = form.nombre.value.trim();
        const correo = form.correo.value.trim();
        const contrasena = form.contrasena.value;
        const confirmar = form.confirmar.value;
        const fechaNacimiento = form.fechaNacimiento.value;
        const pais = form.pais.value;
        const genero = form.genero.value;
        const terminos = form.terminos.checked;

        if (!nombre || !correo || !contrasena || !confirmar || !fechaNacimiento || !pais || !genero || !terminos) {
            alert ("Por favor, completa todos los campos")
            return;
        }

        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexCorreo.test(correo)) {
            alert ("Por favor, ingresa un correo electrónico válido.");
            return;
        }

        if (contrasena !== confirmar) {
            alert ("Las contraseñas no coinciden.");
            return;
        }

        alert ("Formulario válido. ¡Bienvenido a ShopZone!");
        form.reset();
    }

});