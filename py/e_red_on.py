# -*- coding: utf-8 -*-

# Web Sala de Control de Tráfico (-_-) Marcos Leirós (e_red_on.py)

import PiTraffic

# Bloque declaración constantes
EastRed = PiTraffic.Traffic("EAST", "RED")
EastYellow = PiTraffic.Traffic("EAST", "YELLOW")
EastGreen = PiTraffic.Traffic("EAST", "GREEN")

# Bloque funciones 
def East_Yellow_Off():
    EastYellow.off()
def East_Green_Off():
    EastGreen.off()    
def East_Red_On():
    EastRed.on()    

# Bloque acción
East_Yellow_Off() 
East_Green_Off()
East_Red_On()

