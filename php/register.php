<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load the PHPMailer library
require '../PHPMailer/src/PHPMailer.php';
require '../PHPMailer/src/Exception.php';
require '../PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $errorMSG = ""; // Inicializar mensaje de error

    // Validar reCAPTCHA
    if (!isset($_POST['g-recaptcha-response'])) {
        $errorMSG .= "Por favor, verifica que no eres un robot.";
    }

    // Validar otros campos y preparar los datos para su inserción
    $name = isset($_POST["name"]) ? $_POST["name"] : null;
    $email = isset($_POST["email"]) ? $_POST["email"] : null;
    $phone = isset($_POST["phone"]) ? $_POST["phone"] : null;
    $message = isset($_POST["message"]) ? $_POST["message"] : null;

    // Validar el formato del correo electrónico
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errorMSG .= "Formato de correo inválido.";
    }
    //$host = "localhost";
    //$username = "tsnegoc9_tsnegoc9";
    //$password = "#Caballito2023";
    //$database = "tsnegoc9_subscription";
    // Crear una conexión a la base de datos
   // $conn = new mysqli($host, $username, $password, $database);

    // Verificar la conexión
    //if ($conn->connect_error) {
        //echo json_encode(array("error" => "Ocurrió un error. Por favor, inténtelo de nuevo más tarde."));
        //exit;
    //}

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
        $mail->Subject = 'Nuevo mensaje recibido desde peruexperiences.com';
        $mail->Body = "Nombres: $name\nEmail: $email\nphone: $phone\nMensaje: $message";

        // Enviar el correo electrónico
        $mail->send();

        // Insertar los datos en la base de datos
        //$insert_stmt = $conn->prepare("INSERT INTO clientes_oracle (nombre, apellido, ruc, empresa, sector, web, email) VALUES (?, ?, ?, ?, ?, ?, ?)");
       // $insert_stmt->bind_param("sssssss", $nombre, $apellido, $ruc, $empresa, $sector, $web, $email);
       // $insert_stmt->execute();

        // Cerrar las conexiones
        //$insert_stmt->close();
        //$conn->close();

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
