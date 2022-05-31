# -*- coding: utf-8 -*-

# Web Sala de Control de Tráfico (-_-) Marcos Leirós (button_control_on.py)

import PiTraffic
import time

# Bloque declaración constantes
Buzz = PiTraffic.Buzzer()
Btn=PiTraffic.Button()

# Bloque métodos
def sonar(tim):
	Buzz.on()
	time.sleep(tim)
	Buzz.off()

# Bloque acción
file1=open("presionado.dat", "w")	
file1.write("0")
file1.close()
file2=open("button.dat", "w")	
file2.write("1")
file2.close()

while(True):
	time.sleep(8)
	file3=open("button.dat", "r")	
	dato=file3.read(1)
	file3.close()
	if(dato=='0'):
		break;
	Btn.press()
	if(Btn.Pressed==True):
		file4=open("presionado.dat", "w")	
		file4.write("1")
		file4.close()
		sonar(3)
