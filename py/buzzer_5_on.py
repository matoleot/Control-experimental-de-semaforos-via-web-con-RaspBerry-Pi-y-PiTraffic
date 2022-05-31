# -*- coding: utf-8 -*-

# Web Sala de Control de Tráfico (-_-) Marcos Leirós (buzzer_5_on.py)

import PiTraffic
import time

# Bloque declaración constantes
Buzz = PiTraffic.Buzzer()

# Bloque acción
Buzz.on()
time.sleep(0.2)
Buzz.off()
time.sleep(0.2)
Buzz.on()
time.sleep(0.2)
Buzz.off()
time.sleep(0.2)
Buzz.on()
time.sleep(0.2)
Buzz.off()
time.sleep(0.2)
Buzz.on()
time.sleep(0.2)
Buzz.off()
time.sleep(0.2)
Buzz.on()
time.sleep(0.2)
Buzz.off()

