# -*- coding: utf-8 -*-

# Web Sala de Control de Tráfico (-_-) Marcos Leirós (s_yellow_on.py)

import PiTraffic

# Bloque declaración constantes
SouthRed = PiTraffic.Traffic("SOUTH", "RED")
SouthYellow = PiTraffic.Traffic("SOUTH", "YELLOW")
SouthGreen = PiTraffic.Traffic("SOUTH", "GREEN")

# Bloque funciones
def South_Red_Off():
    SouthRed.off()         
def South_Green_Off():
    SouthGreen.off()
def South_Yellow_On():
    SouthYellow.on()

# Bloque acción
South_Red_Off()
South_Green_Off()
South_Yellow_On()
