# -*- coding: utf-8 -*-

# Web Sala de Control de Tráfico (-_-) Marcos Leirós (all_yellow_off.py)

import PiTraffic

# Bloque declaración constantes
SouthRed = PiTraffic.Traffic("SOUTH", "RED")
SouthYellow = PiTraffic.Traffic("SOUTH", "YELLOW")
SouthGreen = PiTraffic.Traffic("SOUTH", "GREEN")
EastRed = PiTraffic.Traffic("EAST", "RED")
EastYellow = PiTraffic.Traffic("EAST", "YELLOW")
EastGreen = PiTraffic.Traffic("EAST", "GREEN")
NorthRed = PiTraffic.Traffic("NORTH", "RED")
NorthYellow = PiTraffic.Traffic("NORTH", "YELLOW")
NorthGreen = PiTraffic.Traffic("NORTH", "GREEN")
WestRed = PiTraffic.Traffic("WEST", "RED")
WestYellow = PiTraffic.Traffic("WEST", "YELLOW")
WestGreen = PiTraffic.Traffic("WEST", "GREEN")
Buzz = PiTraffic.Buzzer()

# Bloque acción
WestYellow.off()
EastYellow.off()
NorthYellow.off()
SouthYellow.off()
WestRed.off()
WestGreen.off()
EastRed.off()
EastGreen.off()
NorthRed.off()
NorthGreen.off()
SouthRed.off()
SouthGreen.off()

