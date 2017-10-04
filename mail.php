<?php
	$destino = "dreaphtme@gmail.com";
	$from    = $_GET['name'];
	$subject = $_GET['name']." quiere contactarte";
	$message = "Correo electronico: ".$_GET['email'];
	$header  = "From: ".$_GET['email']."\r\n";
	$header .= "MIME-Version: 1.0\r\n";
    mail($destino,$subject,$message,$header);

	$destino = $_GET['email'];
	$from    = $_GET['name'];
	$subject = "¡ Hola, ".$from." !";
	$message = "¿En que puedo ayudarte?";
	$header  = "From: dreaphtme@gmail.com\r\n";
	$header .= "MIME-Version: 1.0\r\n";
    mail($destino,$subject,$message,$header);
?>