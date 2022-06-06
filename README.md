# Experimental control of traffic lights via web with RaspBerry Pi and PiTraffic

# Control experimental de semáforos vía web con RaspBerry Pi y PiTraffic

### Description (English)
The present final project of the Computer Engineering Degree is developed in the field of web development, with the final 
objective of experimentally controlling, through a web browser, four traffic lights with three lights each (red, yellow and
green), at a crossroads of four streets.

The famous Raspberry Pi 3 model B minicomputer has been chosen as the web server, because its expansion connector known as
GPIO is used to physically connect the four traffic lights. To facilitate the electrical assembly, the PiTraffic hat from 
SB Components has been used, since it allows these traffic lights to be incorporated simply by plugging this card on top of
the RPi, also adding a buzzer and a button. The buzzer is used to warn that the traffic lights have turned yellow and are going to turn red,
and the button is used so that a pedestrian can press and turn all the traffic lights red for a moment.

This system has three modes, manual, automatic and emergency mode. In manual mode we can turn on the lamps of all the traffic
lights independently at will, the automatic mode non-stop performs a traffic light cycle appropriate for the street under study,
and the emergency mode makes all the traffic lights flash yellow endlessly, sounding the buzzer every time. switched on. 
The ignition times when working in automatic mode, are modifiable by the user through selects. In addition, it has a control 
to reset the system, another to put the east-west street in priority (giving this address twice as much time as the north-south street), 
and the possibility of putting the buzzer on mute, so that do not bother.

### Description (Spanish)
El presente trabajo final de Grado de Ingeniería en Informática, se desarrolla en el campo de desarrollo web, con el objetivo final
de controlar experimentalmente mediante un navegador web, cuatro semáforos de tres luces cada uno (rojo, amarillo y verde), 
en un cruce de cuatro calles.

Como servidor web se ha escogido el famoso minicomputador Raspberry Pi 3 modelo B, debido a que se emplea su conector de expansión 
conocido como GPIO, para conectar físicamente los cuatro semáforos. Para facilitar el montaje eléctrico, se ha empleado el sombrero 
PiTraffic de SB Components, ya que permite incorporar dichos semáforos simplemente enchufando esta tarjeta encima de la RPi, añadiendo 
además un zumbador y un pulsador. El zumbador se emplea para avisar de que los semáforos se han puesto en amarillo y van a pasar a rojo, 
y el pulsador se usa para que un peatón pueda pulsar y poner todos los semáforos en rojo unos instantes. 

Este sistema posee tres modos, el manual, el automático y el modo emergencia. En modo manual podemos encender a voluntad las lámparas 
de todos los semáforos independientemente, el modo automático realiza sin parar un ciclo semafórico apropiado para la calle en estudio, 
y el modo emergencia hace parpadear sin fin todos los semáforos en amarillo, sonando el zumbador a cada encendido. Los tiempos de encendido
cuando trabaja en el modo automático, son modificables por parte del usuario por medio de selects. Además, tiene un control para resetear 
el sistema, otro para poner la calle este-oeste en prioridad (dando a esta dirección el doble de tiempo que a la calle norte-sur), y la 
posibilidad de poner el zumbador en mute, para que no moleste.

### Getting Started:

##### Command line Git
Open your terminal, navigate to your working directory, use `git clone` to get a copy of the repo.

```
$ git clone https://github.com/matoleot/Control-experimental-de-semaforos-via-web-con-RaspBerry-Pi-y-PiTraffic.git
```

### Goals
The goals of this project are:
* Meet Raspberry Pi and PiTraffic.
* Use the browser to control traffic lights.
* Use HTML, CSS, JS, PHP, MySQL and Python.

### Links
* [URL]

[URL]: <https://github.com/matoleot/Control-experimental-de-semaforos-via-web-con-RaspBerry-Pi-y-PiTraffic>
