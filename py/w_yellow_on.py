# -*- coding: utf-8 -*-

# Web Sala de Control de Tráfico (-_-) Marcos Leirós (w_yellow_on.py)

import PiTraffic

# Bloque declaración constantes
WestRed = PiTraffic.Traffic("WEST", "RED")
WestYellow = PiTraffic.Traffic("WEST", "YELLOW")
WestGreen = PiTraffic.Traffic("WEST", "GREEN")

# Bloque funciones
def West_Red_Off():
    WestRed.off() 
def West_Green_Off():
    WestGreen.off()     
def West_Yellow_On():
    WestYellow.on() 

# Bloque acción
West_Red_Off()
West_Green_Off()
West_Yellow_On()

