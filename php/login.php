<?php
	# Sala de control de tráfico (By: MaToLeOt) login.php
	session_cache_limiter('nocache,private');
	session_start();
	$_SESSION['permiso']=false;
?>
<!DOCTYPE html>
<html lang="es-ES">
	<head>
		<title>Sala de Tr&aacute;fico</title>
		<meta name="viewport" content="width=device-width, user-scalable=no">
		<meta charset="utf-8">
		<link rel="stylesheet" href="../css/login.css">
		<script language="javascript">function redirigir_index(){location.href="../index.html";}</script>
		<link rel="icon" type="image/png" href="../img/semaicon.png">
	</head>

	<body>
		<?php
			include("datos_conexion.inc.php");

			$mysqlid = new mysqli($mysql_server, $mysql_login, $mysql_pass, 'pitraffic');
			$mysqlid -> set_charset("utf8");

			$sentencia = "SELECT usuario, clave FROM usuarios;";
			$registros = $mysqlid->query($sentencia);

			$permiso=false;
			if(isset($_POST['usuario']) and isset($_POST['clave']) and count($_POST)==2) {
 				while($registro = $registros->fetch_object()){
					if($registro->usuario==$_POST['usuario'] && $registro->clave==$_POST['clave']){
						$permiso = true;	
						$_SESSION['permiso']=true; 
						$_SESSION['usuario']=$_POST['usuario'] ; 

						#header("Location: salatrafico.php?".session_name()."=".session_id());
						header("Location: salatrafico.php");
						die();
					}
 				}
			}
			if(!$permiso) {
				echo "<h1>ACCESO DENEGADO</h1>";
				echo "<div id='wrapperprohibido'>";
        				echo "<img src='../img/direccion_prohibida.gif' id='prohibido' alt='Prohibido' />";
      				echo "</div>";
				echo "<script language='javascript'>setTimeout(redirigir_index,7000);</script>";	
			}
		?>
	</body>
</html>

