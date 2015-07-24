<?php
/*
*    mail.php
*    Envio de datos al mail.
*/
function SendEmail($FromName, $FromEmail, $ToEmail, $Subject, $Message, $ReplyTo = '', $RecipientCC = '', $RecipientBCC = '') {
		//para el envio en formato HTML
		$Headers = "MIME-Version: 1.0\r\n";
		$Headers .= "Content-type: text/html; charset=utf-8\r\n";
		$Headers .= "From: $FromName <$FromEmail>\r\n";
		if($ReplyTo != ""):
		$Headers .= "Reply-To: $ReplyTo\r\n";
		else:
		$Headers .= "Reply-To: $FromName <$FromEmail>\r\n";
		endif;
		$Headers .= "Return-path: $FromName <$FromEmail>\r\n";
		$Headers .= "Organization: $FromName\r\n";
		if($RecipientCC != ""):
		$Headers .= "Cc: $RecipientCC\r\n";
		endif;
		if($RecipientBCC != ""):
		$Headers .= "Bcc: $RecipientBCC\r\n";
		endif;

		return mail($ToEmail,$Subject,$Message,$Headers);
}
// Guardamos el tipo de form en una variable para poder comprobar el tipo.
$form = $_POST['form'];

if( $form == "contacto" ) {

	$FromName  = $_POST["nombre"];
	$FromEmail = $_POST["mail"];
	$ReplyTo   = $FromEmail;
	$ToEmail = "info@isisa.com.ar";
	$Subject   = "Consulta desde el formulario de contato web isisa.com.ar";
	// Datos sobre la persona
	$consulta = $_POST['consulta'];
	// Mensaje
	$Message  = "Nombre de contacto: $FromName <$FromEmail>\r\n";
	$Message .= "Email: $FromEmail\r\n";
	$Message .= "Consulta: $consulta";
	// Mostramos el tipo de mensaje que se va a enviar.
	echo nl2br($Message);

	return SendEmail($FromName, $FromEmail, $ToEmail, $Subject, nl2br($Message), $ReplyTo);
}

?>