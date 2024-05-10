document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('FormRegisterContact');

    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        const response = grecaptcha.getResponse();

        if (response.length === 0) {
            mostrarMensaje('Verifica que no eres un robot.', 'alert-danger-contact');
        } else {
            mostrarCargaBoton(true); // Mostrar animación de carga en el botón
            guardarForm();
        }
    });
});

function guardarForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    const params = `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&message=${encodeURIComponent(message)}`;

    if (!name || !email || !phone || !message) {
        mostrarMensaje('Por favor, complete todos los campos.', 'alert-danger-contact');
        mostrarCargaBoton(false); // Ocultar animación de carga en el botón
        return;
    }

    enviarRegistro(params);
}

function enviarRegistro(params) {
    const xhr = new XMLHttpRequest();
    const url = "php/register.php";

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                procesarDatos(xhr.responseText);
            } else {
                mostrarMensaje('Ocurrió un error en la comunicación con el servidor.', 'alert-danger-contact');
                mostrarCargaBoton(false); // Ocultar animación de carga en el botón
                //console.error("Error de comunicación con el servidor:", xhr.status, xhr.statusText);
            }
        }
    };

    xhr.onerror = function () {
        mostrarMensaje('Ocurrió un error en la comunicación con el servidor.', 'alert-danger-contact');
        mostrarCargaBoton(false); // Ocultar animación de carga en el botón
        //console.error("Error de comunicación con el servidor:", xhr.status, xhr.statusText);
    };

    xhr.send(params);
}

function procesarDatos(responseText) {
    try {
        const response = JSON.parse(responseText);

        if (response.error) {
            mostrarMensaje(response.error, 'alert-danger-contact');
        } else if (response.info) {
            mostrarMensaje(response.info, 'alert-success-contact');
            setTimeout(function() {
                window.location.href = 'https://peruexperiences-transfersandtours.com/';
            }, 3500);
        } else if (response.success) {
            mostrarMensaje(response.success, 'alert-success-contact');
            setTimeout(function() {
                window.location.href = 'https://peruexperiences-transfersandtours.com/';
            }, 3500);
        }
    } catch (error) {
        //console.error("Error al analizar la respuesta JSON:", error);
        mostrarMensaje('Ocurrió un error al procesar la respuesta del servidor.', 'alert-danger');
    } finally {
        mostrarCargaBoton(false); 
        formulario.reset();
    }
}

function mostrarCargaBoton(estado) {
    const botonEnviar = document.querySelector('button[type="submit"]');
    if (estado) {
        botonEnviar.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> Enviando...';
        botonEnviar.disabled = true;
    } else {
        botonEnviar.innerHTML = 'Enviar';
        botonEnviar.disabled = false;
    }
}

function mostrarMensaje(mensaje, clase) {
    const mensajeExito = document.getElementById('mensajeExito');
    mensajeExito.textContent = mensaje;
    mensajeExito.classList.remove('alert-success-contact', 'alert-danger-contact');
    mensajeExito.classList.add(clase);
    mensajeExito.style.display = 'block';

    setTimeout(function() {
        mensajeExito.style.display = 'none';
    }, 3000);
}
