document.addEventListener("DOMContentLoaded", function () {
    // const valorPagoInput = document.getElementById("valorPagoInput");
    // paypal.Buttons({
    //     createOrder: function (data, actions) {
    //         const valorPago = valorPagoInput.value;
    //         return actions.order.create({
    //             purchase_units: [{
    //                 amount: {
    //                     value: valorPago,
    //                 },
    //             }],
    //         });
    //     },
    //     onApprove: function (data, actions) {
    //         return actions.order.capture().then(function (details) {
                // const valorPago = details.purchase_units[0].amount.value;
                const valorPago = "5"; 
                const cancelado = "si"; 
                document.getElementById("valorPago").value = valorPago;
                document.getElementById("cancelado").value = cancelado;
                // alert("Transacción completada por " + details.payer.name.given_name);
                const formulario = document.getElementById("FormRegisterTour");
                formulario.addEventListener("submit", function (event) {
                    event.preventDefault();
                    mostrarCargaBoton(true); // Mostrar animación de carga en el botón
                    guardarForm();
                });
    //         });
    //     },
    //   })
    //   .render("#paypal-button-container");
  });
  
  function guardarForm() {
    const fecha = document.getElementById("fecha").value.trim();
    const hora = document.getElementById("hora").value.trim();
    const personas = document.getElementById("personas").value.trim();
    const nacionalidad = document.getElementById("nacionalidad").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const alojamiento = document.getElementById("alojamiento").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const whatsapp = document.getElementById("whatsapp").value.trim();
    const idioma = document.getElementById("idioma").value.trim();
    const servicio = document.getElementById("servicio").value.trim();
    const valorPago = document.getElementById("valorPago").value.trim();
    const cancelado = document.getElementById("cancelado").value.trim();

    const params = `fecha=${encodeURIComponent(fecha)}&hora=${encodeURIComponent(hora)}&personas=${encodeURIComponent(personas)}&nacionalidad=${encodeURIComponent(nacionalidad)}&nombre=${encodeURIComponent(nombre)}&alojamiento=${encodeURIComponent(alojamiento)}&correo=${encodeURIComponent(correo)}&whatsapp=${encodeURIComponent(whatsapp)}&idioma=${encodeURIComponent(idioma)}&servicio=${encodeURIComponent(servicio)}&valorPago=${encodeURIComponent(valorPago)}&cancelado=${encodeURIComponent(cancelado)}`;

    if (!fecha || !hora || !personas || !nacionalidad || !nombre || !whatsapp || !correo) {
        mostrarMensaje("Por favor, complete todos los campos.", "alert-danger-contact");
        mostrarCargaBoton(false);
        return;
    }

    enviarRegistro(params);
}
  
  function enviarRegistro(params) {
    const xhr = new XMLHttpRequest();
    const url = "php/procesar_registro_tour.php";
  
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          procesarDatos(xhr.responseText);
        } else {
          mostrarMensaje(
            "Ocurrió un error en la comunicación con el servidor.",
            "alert-danger-contact"
          );
          mostrarCargaBoton(false); // Ocultar animación de carga en el botón
        }
      }
    };
  
    xhr.onerror = function () {
      mostrarMensaje(
        "Ocurrió un error en la comunicación con el servidor.",
        "alert-danger-contact"
      );
      mostrarCargaBoton(false); // Ocultar animación de carga en el botón
    };
  
    xhr.send(params);
  }
  
  function procesarDatos(responseText) {
    try {
      const response = JSON.parse(responseText);
  
      if (response.error) {
        mostrarMensaje(response.error, "alert-danger-contact");
      } else if (response.info) {
        mostrarMensaje(response.info, "alert-success-contact");
        setTimeout(function () {
          window.location.href = "https://peruexperiences-transfersandtours.com/";
        }, 3500);
      } else if (response.success) {
        mostrarMensaje(response.success, "alert-success-contact");
        setTimeout(function () {
          window.location.href = "https://peruexperiences-transfersandtours.com/";
        }, 3500);
      }
    } catch (error) {
      mostrarMensaje(
        "Ocurrió un error al procesar la respuesta del servidor.",
        "alert-danger-contact"
      );
    } finally {
      mostrarCargaBoton(false);
      formulario.reset();
    }
  }
  
  function mostrarCargaBoton(estado) {
    const botonEnviar = document.querySelector('button[type="submit"]');
    if (estado) {
      botonEnviar.innerHTML =
        '<i class="fas fa-sync-alt fa-spin"></i> Enviando...';
      botonEnviar.disabled = true;
    } else {
      botonEnviar.innerHTML = "Enviar";
      botonEnviar.disabled = false;
    }
  }
  
  function mostrarMensaje(mensaje, clase) {
    const mensajeExito = document.getElementById("mensajeExito");
    mensajeExito.textContent = mensaje;
    mensajeExito.classList.remove("alert-success-contact", "alert-danger-contact");
    mensajeExito.classList.add(clase);
    mensajeExito.style.display = "block";
  
    setTimeout(function () {
      mensajeExito.style.display = "none";
    }, 3000);
  }
  