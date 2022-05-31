# -*- coding: utf-8 -*-

# Web Sala de Control de Tráfico (-_-) Marcos Leirós (w_green_on.py)

import PiTraffic

# Bloque declaración constantes
WestRed = PiTraffic.Traffic("WEST", "RED")
WestYellow = PiTraffic.Traffic("WEST", "YELLOW")
WestGreen = PiTraffic.Traffic("WEST", "GREEN")

# Bloque funciones
def West_Red_Off():
    WestRed.off()
def West_Yellow_Off():
    WestYellow.off()
def West_Green_On():
    WestGreen.on()     

# Bloque acción
West_Red_Off()
West_Yellow_Off()
West_Green_On()

