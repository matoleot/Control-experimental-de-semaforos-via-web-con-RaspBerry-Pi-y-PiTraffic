<?php
	# Sala de control de tráfico (By: MaToLeOt) cerrar_sesion.php
	session_start();
	session_destroy();
	header("Location: ../index.html");
	die();
?>
