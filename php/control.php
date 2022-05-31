<?php
	# Sala de control de tráfico (By: MaToLeOt) control.php
	header('Content-Type: text/html; charset=utf-8');

	#si se ha presionado el button pone todo en rojo	
	$fp=fopen("presionado.dat", "r");
	$dato=fgets($fp);
	fclose($fp);
	if($dato=="1"){
		exec("sudo python ../py/all_red_on.py");	echo "button_all_red_on_OK";
		$fp=fopen("presionado.dat", "w");
		fwrite($fp, "0");
		fclose($fp);
		exit();
	}

	switch($_REQUEST[comando]){
		# todo off
		case "all_off":		exec("sudo python ../py/all_off.py");
							echo "all_off_OK";	
							exec("sudo python ../py/button_control_off.py");			
							break;
		# manual
		case "manual_on":	exec("sudo python ../py/all_off.py");		
							echo "manual_on_OK";
							exec("sudo python ../py/button_control_off.py");
							break;
		# auto
		case "auto_on":		exec("sudo python ../py/all_off.py");	
							echo "auto_on_OK";
							break;
		# N=NORTH (NORTE)
		case "n_red_on":		exec("sudo python ../py/n_red_on.py");		echo "n_red_on_OK";		break;
		case "n_yellow_on":	exec("sudo python ../py/n_yellow_on.py");	echo "n_yellow_on_OK";	break;
		case "n_green_on":	exec("sudo python ../py/n_green_on.py");	echo "n_green_on_OK";	break;
		# S=SOUTH (SUR)
		case "s_red_on":		exec("sudo python ../py/s_red_on.py");		echo "s_red_on_OK";		break;
		case "s_yellow_on":	exec("sudo python ../py/s_yellow_on.py");	echo "s_yellow_on_OK";	break;
		case "s_green_on":	exec("sudo python ../py/s_green_on.py");	echo "s_green_on_OK";	break;
		# E=EAST (ESTE)
		case "e_red_on":		exec("sudo python ../py/e_red_on.py");		echo "e_red_on_OK";		break;
		case "e_yellow_on":	exec("sudo python ../py/e_yellow_on.py");	echo "e_yellow_on_OK";	break;
		case "e_green_on":	exec("sudo python ../py/e_green_on.py");	echo "e_green_on_OK";	break;
		# W=WEST (OESTE)		
		case "w_red_on":		exec("sudo python ../py/w_red_on.py");		print "w_red_on_OK";		break;
		case "w_yellow_on":	exec("sudo python ../py/w_yellow_on.py");	echo "w_yellow_on_OK";	break;
		case "w_green_on":	exec("sudo python ../py/w_green_on.py");	echo "w_green_on_OK";	break;
		#N, S, E, y W Red
		case "all_red_on":		exec("sudo python ../py/all_red_on.py");		echo "all_red_on_OK";		break;
		case "all_red_off":		exec("sudo python ../py/all_red_off.py");		echo "all_red_off_OK";		break;
		#N, S, E, y W Yellow
		case "all_yellow_on":	exec("sudo python ../py/all_yellow_on.py");	echo "all_yellow_on_OK";	break;
		case "all_yellow_off":	exec("sudo python ../py/all_yellow_off.py");	echo "all_yellow_off_OK";	break;
		# buzzer
		case "buzzer_5_on":	exec("sudo python ../py/buzzer_5_on.py");	echo "buzzer_5_on_OK";	break;
		case "buzzer_10_on":	exec("sudo python ../py/buzzer_10_on.py");	echo "buzzer_10_on_OK";	break;
		case "buzzer_on":		exec("sudo python ../py/buzzer_on.py");		echo "buzzer_on_OK";		break;
		case "buzzer_off":	exec("sudo python ../py/buzzer_off.py");		echo "buzzer_off_OK";		break;
		# button
		case "button_setup":	exec("sudo python ../py/button_control_on.py");	echo "button_setup_OK";	break;
		# contestación por defecto
		default:	print "ERROR_comando_NO_reconocido";										break;
	}
?>
