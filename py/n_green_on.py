# -*- coding: utf-8 -*-

# Web Sala de Control de Tráfico (-_-) Marcos Leirós (n_green_on.py)

import PiTraffic

# Bloque declaración constantes
NorthRed = PiTraffic.Traffic("NORTH", "RED")
NorthYellow = PiTraffic.Traffic("NORTH", "YELLOW")
NorthGreen = PiTraffic.Traffic("NORTH", "GREEN")

# Bloque funciones
def North_Red_Off():
    NorthRed.off()
def North_Yellow_Off():
    NorthYellow.off()
def North_Green_On():
    NorthGreen.on()     

# Bloque acción
North_Red_Off()
North_Yellow_Off()
North_Green_On()

