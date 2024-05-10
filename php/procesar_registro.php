<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load the PHPMailer library
require '../PHPMailer/src/PHPMailer.php';
require '../PHPMailer/src/Exception.php';
require '../PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $errorMSG = "";

    // Validar otros campos y preparar los datos para su inserción
    $fecha_llegada = isset($_POST["fecha_llegada"]) ? $_POST["fecha_llegada"] : null;
    $hora_llegada = isset($_POST["hora_llegada"]) ? $_POST["hora_llegada"] : null;
    $destino = isset($_POST["destino"]) ? $_POST["destino"] : null;
    $num_personas = isset($_POST["num_personas"]) ? $_POST["num_personas"] : null;
    $informacion_extra = isset($_POST["informacion_extra"]) ? $_POST["informacion_extra"] : null;
    $nombre = isset($_POST["nombre"]) ? $_POST["nombre"] : null;
    $apellido = isset($_POST["apellido"]) ? $_POST["apellido"] : null;
    $correo = isset($_POST["correo"]) ? $_POST["correo"] : null;
    $whatsapp = isset($_POST["whatsapp"]) ? $_POST["whatsapp"] : null;
    $telefono = isset($_POST["telefono"]) ? $_POST["telefono"] : null;
    $idioma = isset($_POST["idioma"]) ? $_POST["idioma"] : null;
    $servicio = isset($_POST["servicio"]) ? $_POST["servicio"] : null;
    $valorPago = isset($_POST["valorPago"]) ? $_POST["valorPago"] : null;
    $cancelado = isset($_POST["cancelado"]) ? $_POST["cancelado"] : null;

    // Validar el formato del correo electrónico
    if (empty($correo) || !filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        $errorMSG .= "Formato de correo inválido.";
    }
    // $host = "localhost";
    // $username = "tsnegoc9_tsnegoc9";
    // $password = "#Caballito2023";
    // $database = "tsnegoc9_subscription";
    // // Crear una conexión a la base de datos
    // $conn = new mysqli($host, $username, $password, $database);

    // // Verificar la conexión
    // if ($conn->connect_error) {
    //     echo json_encode(array("error" => "Ocurrió un error. Por favor, inténtelo de nuevo más tarde."));
    //     exit;
    // }

    try {
        // Configuración de PHPMailer
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = 'mail.tsn-cloud.com';
        $mail->SMTPSecure = 'tls';
        $mail->SMTPAuth = true;
        $mail->Port = 587;
        $mail->Username = 'tsnegoc9';
        $mail->Password = '#TSnegocios2024';

        // Establecer el remitente
        $mail->setFrom('ventas@tsn-cloud.com', 'PERU EXPERIENCES');

        // Establecer la dirección de correo electrónico del destinatario
        $mail->addAddress('reservacion@peruexperiences-transfersandtours.com');

        // Asunto y cuerpo del correo electrónico
        $mail->Subject = 'Nuevo mensaje recibido desde PERU EXPERIENCES.com';
        $mail->Body = "Servicio: $servicio\nvalorPago: $valorPago\ncancelado: $cancelado\nfecha_llegada: $fecha_llegada\nhora_llegada: $hora_llegada\ndestino: $destino\nnum_personas: $num_personas\ninformacion_extra: $informacion_extra\nnombre: $nombre\napellido: $apellido\ncorreo: $correo\nwhatsapp: $whatsapp\ntelefono: $telefono\nidioma: $idioma";

        // Enviar el correo electrónico
        $mail->send();

        // Insertar los datos en la base de datos
        // $insert_stmt = $conn->prepare("INSERT INTO reservas (fecha_llegada, hora_llegada, destino, num_personas, informacion_extra, nombre, apellido, correo, whatsapp,telefono,idioma) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        // $insert_stmt->bind_param("sssssss", $fecha_llegada, $hora_llegada, $destino, $num_personas, $informacion_extra, $nombre, $apellido, $correo, $whatsapp, $telefono, $idioma);
        // $insert_stmt->execute();

        // // Cerrar las conexiones
        // $insert_stmt->close();
        // $conn->close();

        echo json_encode(array("success" => "Mensaje enviado con éxito."));
    } catch (Exception $e) {
        // Manejar errores de PHPMailer
        $error_message = "Error al enviar el correo electrónico: " . $mail->ErrorInfo;
        echo json_encode(array("error" => $error_message));
        // Imprimir el error en la consola del navegador
        //echo "<script>console.error('Error en el envío del correo electrónico:', " . json_encode($error_message) . ");</script>";
    }
} else {
    echo json_encode(array("error" => "Método no permitido."));
}
