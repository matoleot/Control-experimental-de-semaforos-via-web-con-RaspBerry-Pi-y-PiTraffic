# -*- coding: utf-8 -*-

# Web Sala de Control de Tráfico (-_-) Marcos Leirós (e_green_on.py)

import PiTraffic

# Bloque declaración constantes
EastRed = PiTraffic.Traffic("EAST", "RED")
EastYellow = PiTraffic.Traffic("EAST", "YELLOW")
EastGreen = PiTraffic.Traffic("EAST", "GREEN")

# Bloque funciones
def East_Red_Off():
    EastRed.off()      
def East_Yellow_Off():
    EastYellow.off()   
def East_Green_On():
    EastGreen.on() 

# Bloque acción
East_Red_Off()
East_Yellow_Off()
East_Green_On()

