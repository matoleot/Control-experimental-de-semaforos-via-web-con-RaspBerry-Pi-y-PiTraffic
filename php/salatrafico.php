<?php
	# Sala de control de tráfico (By: MaToLeOt) salatrafico.php
	session_cache_limiter('nocache,private');
	session_start();

	$permiso="";
	if($_SESSION) {
		$permiso=$_SESSION['permiso'];
		$usuario=$_SESSION['usuario'];
	}else{
		header("Location: ../index.html");
		die();
	}
?>

<!DOCTYPE html>
<!--	Sala de control de tráfico (By: MaToLeOt) salatrafico.php -->
<html lang="es-ES">

	<head>
		<title>Sala de Tr&aacute;fico</title>
      		<meta charset="UTF-8" />
      		<meta name="author" content="Marcos Leiros" />
      		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes" />
		<meta http-equiv="Cache-Control" content="no-store" />
		<meta http-equiv="Cache-Control" content="no-cache" />
		<meta http-equiv="Pragma" content="no-cache" />
		<link rel="stylesheet" type="text/css" href="../css/salatrafico.css" media="screen" />
		<link rel="icon" type="image/png" href="../img/semaicon.png">
		<script type="text/javascript " src="../js/salatrafico.js" ></script >
   	</head>

	<body>

		<?php
			if(!$permiso) {
				header("Location: ../index.html");
				die();	
			}	
		?>

	 	<h3>
			Bienvenido Sr. <?php echo $usuario; ?>
		</h3>

		<table>
			<tr><td>
				<div id='automanrst'>
					<div class='container1'>
						Man
						<label class='switch'>
							<input type='checkbox' id='automan' onchange='setTimeout(() => { validar_automan(this.checked); }, 200); ' />
							<div class='slider round'></div>
						</label>
						Aut
					</div>
					<div class='container2'>
  						<button class='btn rounded' value='all_off' onclick='llamadaAjax(this.value);'><span class='text-green'>Reset</span></button>
					</div>
				</div>
			</td></tr>

			<tr><td>
				<div>
               				<span class='semaforonseo'>Sem&aacute;foro Norte</span>
				</div>
				<div id='norte'  class='container' >
					<form class='form' >
						<input type='radio' class='radiosem' name='nor' id='norter' value='n_red_on' /><label class='four col' for='norter'>Rojo</label>
						<input type='radio' class='radiosem' name='nor' id='nortea' value='n_yellow_on' /><label class='four col' for='nortea'>Amarillo</label>
						<input type='radio' class='radiosem' name='nor' id='nortev' value='n_green_on' /><label class='four col' for='nortev'>Verde</label>
					</form>
				</div>
			</td></tr>

			<tr><td>
				<div>
               				<span class='semaforonseo'>Sem&aacute;foro Sur</span>
				</div>
				<div id='sur'  class='container' >
					<form class='form' >
						<input type='radio' class='radiosem' name='sur' id='surr' value='s_red_on' /><label class='four col' for='surr'>Rojo</label>
						<input type='radio' class='radiosem' name='sur' id='sura' value='s_yellow_on' /><label class='four col' for='sura'>Amarillo</label>
						<input type='radio' class='radiosem' name='sur' id='surv' value='s_green_on' /><label class='four col' for='surv'>Verde</label>
					</form>
				</div>
			</td></tr>

			<tr><td>
				<div>
               				<span class='semaforonseo'>Sem&aacute;foro Este</span>
				</div>
				<div id='este'  class='container' >
					<form class='form' >
						<input type='radio' class='radiosem' name='este' id='ester' value='e_red_on' /><label class='four col' for='ester'>Rojo</label>
						<input type='radio' class='radiosem' name='este' id='estea' value='e_yellow_on' /><label class='four col' for='estea'>Amarillo</label>
						<input type='radio' class='radiosem' name='este' id='estev' value='e_green_on' /><label class='four col' for='estev'>Verde</label>
					</form>
				</div>
			</td></tr>

			<tr><td>
				<div>
               				<span class='semaforonseo'>Sem&aacute;foro Oeste</span>
				</div>
				<div id='oeste'  class='container' >
					<form class='form' >
						<input type='radio' class='radiosem' name='oeste' id='oester' value='w_red_on' /><label class='four col' for='oester'>Rojo</label>
						<input type='radio' class='radiosem' name='oeste' id='oestea' value='w_yellow_on' /><label class='four col' for='oestea'>Amarillo</label>
						<input type='radio' class='radiosem' name='oeste' id='oestev' value='w_green_on' /><label class='four col' for='oestev'>Verde</label>
					</form>
				</div>
			</td></tr>

			<tr><td>
				<div id='semaforos'>
					<canvas id='semN' width='50' height='140'></canvas>
					<canvas id='semS' width='50' height='140'></canvas>
					<canvas id='semE' width='50' height='140'></canvas>
					<canvas id='semW' width='50' height='140'></canvas>
				</div>
			</td></tr>
		
			<tr><td>
				<div id='dselect'>
					<span>R/V</span><select class='stiempo' id='stiempoRV' onchange='scambiarRV(this.options[this.selectedIndex].value);'>
							<option value='5000' selected>5 Seg</option>
							<option value='15000'>15 Seg</option>
							<option value='30000'>30 Seg</option>
							<option value='50000'>50 Seg</option></select>
					<span>A</span><select class='stiempo' id='stiempoA' onchange='scambiarA(this.options[this.selectedIndex].value);'>
							<option value='3000' selected>3 Seg</option>
							<option value='5000'>5 Seg</option>
							<option value='8000'>8 Seg</option></select>
					<span>TR</span><select class='stiempo' id='stiempoTR' onchange='scambiarTR(this.options[this.selectedIndex].value);'>
							<option value='0' selected>0 Seg</option>
							<option value='1000'>1 Seg</option>
							<option value='2000'>2 Seg</option>
							<option value='3000'>3 Seg</option> </select>
				</div>
			</td></tr>

			<tr><td>
				<div id='total'>
					<div id='wrappercheks'>
							<span>Pri</span><input type='checkbox' id='pcheck' class='pie' onchange='ccambiarPRI(this.checked);' />
							<span>Eme</span><input type='checkbox' id='echeck' class='pie' onchange='cemergency(this.checked);' />
							<span>Mut</span><input type='checkbox' id='mcheck' class='pie' onchange='cmute(this.checked);' />
							<span>Buz</span><input type='checkbox' id='bcheck' class='pie' onchange='csonido(this.checked);' />
					</div>
					<br />
					<div id='salir'>
						<form action="cerrar_sesion.php"><input type="submit" value="Salir" /></form>
					</div>
				</div>

				<div id='imgbuzzer'>
					<img id='ibuzz' src='../img/buzzer-icon.png' alt='Sonido' />
				</div>
			</td></tr>
		</table>

	</body>
</html>
