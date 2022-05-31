# -*- coding: utf-8 -*-

# Web Sala de Control de Tráfico (-_-) Marcos Leirós (n_yellow_on.py)

import PiTraffic

# Bloque declaración constantes
NorthRed = PiTraffic.Traffic("NORTH", "RED")
NorthYellow = PiTraffic.Traffic("NORTH", "YELLOW")
NorthGreen = PiTraffic.Traffic("NORTH", "GREEN")

# Bloque funciones
def North_Red_Off():
    NorthRed.off()    
def North_Green_Off():
    NorthGreen.off()     
def North_Yellow_On():
    NorthYellow.on()

# Bloque acción
North_Red_Off()
North_Green_Off()
North_Yellow_On()
