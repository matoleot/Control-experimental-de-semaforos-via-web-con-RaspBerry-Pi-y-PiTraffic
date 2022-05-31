# -*- coding: utf-8 -*-

# Web Sala de Control de Tráfico (-_-) Marcos Leirós (e_yellow_on.py)

import PiTraffic

# Bloque declaración constantes
EastRed = PiTraffic.Traffic("EAST", "RED")
EastYellow = PiTraffic.Traffic("EAST", "YELLOW")
EastGreen = PiTraffic.Traffic("EAST", "GREEN")

# Bloque funciones
def East_Red_Off():
    EastRed.off()       
def East_Green_Off():
    EastGreen.off()
def East_Yellow_On():
    EastYellow.on()    

# Bloque acción
East_Red_Off()
East_Green_Off()
East_Yellow_On()

