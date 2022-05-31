// Sala de control de tráfico (By: MaToLeOt) salatrafico.js

// bloque variables globales e iniciaciones --------------------------
window.onload = function(){
	//obtengo contexto canvas semáforo N
	canvasN = document.getElementById('semN');
	ctxN = canvasN.getContext('2d');
	//obtengo contexto canvas semáforo S
	canvasS = document.getElementById('semS');
	ctxS= canvasS.getContext('2d');
	//obtengo contexto canvas semáforo E
	canvasE = document.getElementById('semE');
	ctxE = canvasE.getContext('2d');
	//obtengo contexto canvas semáforo W
	canvasW = document.getElementById('semW');
	ctxW = canvasW.getContext('2d');

	//listeners varios
	//apaga todo si salimos
	window.addEventListener("unload", (event) => {
		resetear(true);
		todo_off();
		llamadaAjax("all_off");
		console.log("Evento unload en window salatrafico");
	});
	//obtiene los 12 radios y asocia evento
	radiosems=document.getElementsByClassName('radiosem');
	for(var i=0; i<radiosems.length; i++){
		radiosems[i].addEventListener("click", validar);
	}

 	//variables para elmodo automático y emergencia
	id_timeout_ajax=null;	//id del setTimeout ajax
	id_automatico=null;	//id del setTimeout auto
	id_emergencia=null;	//id del setTimeout emer
	ciclo=1;				//ciclo inicial
	mTiempo=8000;		//variable auxiliar
	mTiempoRV=5000;	//tiempo de rojo y verde
	mTiempoA=3000;	//tiempo en amarillo
	mTiempoTR=0;		//tiempo todo en rojo
	prioridad=false;		//estado prioridad
	mute=false;			//estado mute

	//inicio siempre todo reseteado y en manual
	resetear(true);
	todo_off();
	llamadaAjax("manual_on");
}
// -------------------------------------------------------------------

// bloque validar radios y checkbox automan --------------------------
function validar_automan(estado){ //a true si automático	
	if(estado){
		if(document.getElementById('echeck').checked){
			document.getElementById('automan').checked =false;
			alert("No se puede usar este control estando en\nmodo emergencia (Eme), desáctivelo primero. \n");
		}else{
			llamadaAjax("auto_on");
		}
	}else{
		llamadaAjax("manual_on");
	}
}

function validar(cmd){ //manda comando si manual
	if(document.getElementById('automan').checked || document.getElementById('echeck').checked){
		resetear(false);
		alert("No se puede usar este control estando en\nmodo automático o emergencia (Aut/Eme). \n");
	}else{
		if(cmd=="buzzer_on" || cmd=="buzzer_off"){		
			llamadaAjax(cmd);
		}else{
			llamadaAjax(cmd.target.value);
		}
	}
}
// -------------------------------------------------------------------

// bloque de comunicación asíncrona ----------------------------------
function llamadaAjax(cmd){ //servicio asíncrono para mandar comandos al servidor
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			analizaRespuestaAjax(this.responseText);
  		}
	};
	xhr.open('POST', 'control.php');
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.send("comando=" + cmd);

	console.log("---> Mandado: comando=" + cmd);
}

function analizaRespuestaAjax(msg){ //analiza comandos recibidos y actúa en consecuencia
	//let msglen=msg.length;
	//console.log("Longitud del comando recibido: " + msglen);
	//msg=msg.substring(0, msglen-3);
	
	console.log("<--- Recibido mensaje: " + msg);

	if(msg=="all_off_OK") {//OJO recepcion de msgs
		resetear(true);	//true para que resetee checkbox automático y tiempos
		emergencia_off();
	}else if(msg=="manual_on_OK"){
		resetear(false);
	}

	if(msg=="all_off_OK" || msg=="manual_on_OK") {
		tauto_off();
		todo_off();
		setTimeout(() => { todo_off(); }, 250);	/* seguridad */
	}

	if(msg=="auto_on_OK") tauto_on();

	switch(msg){ //analiza respuesta y pinta semáforos canvas
		case "button_all_red_on_OK":	//todos rojo button on
			x_rojo_on(ctxN);
			x_rojo_on(ctxS);
			x_rojo_on(ctxE);
			x_rojo_on(ctxW);
			console.log("*** Button presionado, encendiendo todos los semáforos en rojo para que pase el peatón ***");
			ciclo=0; // pone el ciclo especial de todo en rojo por button presionado
			break;
		case "n_red_on_OK":		//norte rojo on
			x_rojo_on(ctxN);
			console.log("Encendido semáforo norte rojo");
			break;
		case "n_yellow_on_OK":	//norte amarillo on
			x_amarillo_on(ctxN);
			console.log("Encendido semáforo norte amarillo");
			break;
		case "n_green_on_OK":	//norte verde on
			x_verde_on(ctxN); 
			console.log("Encendido semáforo norte verde");
			break;
		case "s_red_on_OK":		//sur rojo on
			x_rojo_on(ctxS);
			console.log("Encendido semáforo sur rojo");
			break;
		case "s_yellow_on_OK":	//sur amarillo on
			x_amarillo_on(ctxS);
			console.log("Encendido semáforo sur amarillo");
			break;
		case "s_green_on_OK":		//sur verde on
			x_verde_on(ctxS); 
			console.log("Encendido semáforo sur verde");
			break;
		case "e_red_on_OK":		//este rojo on
			x_rojo_on(ctxE);
			console.log("Encendido semáforo este rojo");
			break;
		case "e_yellow_on_OK":	//este amarillo on
			x_amarillo_on(ctxE);
			console.log("Encendido semáforo este amarillo");
			break;
		case "e_green_on_OK":	//este verde on
			x_verde_on(ctxE); 
			console.log("Encendido semáforo este verde");
			break;
		case "w_red_on_OK":		//oeste rojo on
			x_rojo_on(ctxW);
			console.log("Encendido semáforo oeste rojo");
			break;
		case "w_yellow_on_OK":	//oeste  amarillo on
			x_amarillo_on(ctxW);
			console.log("Encendido semáforo oeste amarillo");
			break;
		case "w_green_on_OK":	//oeste verde on
			x_verde_on(ctxW);
			console.log("Encendido semáforo oeste verde");
			break;
		case "all_red_on_OK":		//todos rojo on
			x_rojo_on(ctxN);
			x_rojo_on(ctxS);
			x_rojo_on(ctxE);
			x_rojo_on(ctxW);
			console.log("Encendidos todos los semáforos en rojo");
			break;
		case "all_yellow_on_OK":	//todos amarillo on
			x_amarillo_on(ctxN);
			x_amarillo_on(ctxS);
			x_amarillo_on(ctxE);
			x_amarillo_on(ctxW);
			console.log("Encendidos todos los semáforos en amarillo");
			break;
		case "all_yellow_off_OK":	//todos amarillo off
			todo_off();
			console.log("Apagados todos los semáforos en amarillo");
			break;
		case "buzzer_on_OK":		//sonido manual on
			document.getElementById('ibuzz').style.visibility="visible";	//visualiza buzzer (suena en el servidor)
			new Audio("../mp3/zumbador_pitraffic.mp3").play();		//suena sonido en el cliente
			console.log("Buzzer manual sonando");
			break;
		case "buzzer_off_OK":		//sonido manual off
			document.getElementById('ibuzz').style.visibility="hidden";	//invisibiliza buzzer (ya no suena)
			console.log("Buzzer manual apagado");
			break;
		}
}
// -------------------------------------------------------------------

// bloque resetear ---------------------------------------------------
function resetear(rst){	//desactiva los radio, desactiva checkbox buzzer, oculta buzzer y otros
	for(var i=0; i<radiosems.length; i++){
		radiosems[i].checked=false;
	}

	document.getElementById('bcheck').checked=false;

        document.getElementById('imgbuzzer').style.visibility="hidden";

	if(rst){//a true se ha usado el radio de reset para mandar el comando all_off
		//desactiva checkbox automan, prioridad, emergencia y mute
		document.getElementById('automan').checked = false;
		document.getElementById('pcheck').checked = false;
		document.getElementById('echeck').checked = false;
		document.getElementById('mcheck').checked = false;

		//resetea variables tiempos, selects, prioridad y mute
		ciclo=1;
		mTiempo=8000;
		mTiempoRV=5000;
		mTiempoA=3000;
		mTiempoTR=0;
		document.getElementById('stiempoRV').value=mTiempoRV; 
		document.getElementById('stiempoA').value=mTiempoA; 
		document.getElementById('stiempoTR').value=mTiempoTR; 
		prioridad=false;
		mute=false;
	}
}
// -------------------------------------------------------------------

// bloque sonido buzzer ----------------------------------------------
function csonido(estado){	//gestiona el checkbox del buzzer
	if(estado){
		validar("buzzer_on");
	}else{
		validar("buzzer_off");
	}
}

function cmute(estado){	//cambia estado mute
	if(estado){	
		mute=true;
		console.log("Mute activado");
	}	
	else{
		mute=false;
		console.log("Mute desactivado");
	}
}

function sonido_temporal(){	//manda sonar buzzer temporal en servidor, visualiza y suena buzzer cliente
	llamadaAjax("buzzer_5_on");	//manda sonar zumbador en el servidor
	document.getElementById('ibuzz').style.visibility="visible";	//visualiza buzzer en pantalla ciente
	new Audio("../mp3/zumbador_pitraffic.mp3").play();		//suena sonido en el cliente
	setTimeout(() => {document.getElementById('ibuzz').style.visibility="hidden";}, 1750); //al tiempo invisibiliza
	console.log("Activando Buzzer temporalmente");
}
// -------------------------------------------------------------------

// bloque emergencia -------------------------------------------------
function cemergency(estado){	//gestiona el checkbox de emergencia
	if(document.getElementById('automan').checked){
		alert("No se puede usar este control, ponga antes el modo manual \n");
		document.getElementById('echeck').checked=false;
	}else{
		if(estado){
			mTiempo=2100;
			ciclo=1;
			emergencia_on();
			console.log("Modo emergencia activado");		
		}else{
			mTiempo=8000;
			ciclo=1;
			emergencia_off();
			console.log("Modo emergencia desactivado");	
		}
	}
}

function emergencia_on(){		//enciende emergencia
	resetear(false);
	ciclo=1;
	emergencia_roll();
}

function emergencia_off(){		//apaga emergencia
	window.clearTimeout(id_emergencia);
	document.getElementById('echeck').checked = false;
	llamadaAjax("all_yellow_off");
}

function emergencia_roll(){ 	//rueda emergencia
	switch(ciclo){
		case 1:	//todo amarillo
			llamadaAjax("all_yellow_on");
			if(!mute){
				sonido_temporal();	//suena y se visualiza en el cliente
			}
			mTiempo=2000;
			ciclo=2;
			break;
		case 2:	//todo apagado
			llamadaAjax("all_yellow_off");
			mTiempo=1000;
			ciclo=1;
			break;
	}	

	id_emergencia = window.setTimeout(emergencia_roll, mTiempo);	//espera siguiente estado de emergencia
}
// -------------------------------------------------------------------

// bloque automático -------------------------------------------------
function scambiarRV(tim){//cambia tiempo rojo y verde
	mTiempoRV=tim;
	console.log("Tiempo en Rojo y Verde cambiado a: " + tim/1000 + " segundos");
}

function scambiarA(tim){	//cambia tiempo amarillo
	mTiempoA=tim;
	console.log("Tiempo en Amarillo cambiado a: " + tim/1000 + " segundos");
}

function scambiarTR(tim){	//cambia todo en rojo
	mTiempoTR=tim;
	console.log("Tiempo especial de todos en Rojo cambiado a: " + tim/1000 + " segundos");
}

function ccambiarPRI(estado){	//cambia prioridad
	if(estado){	
		prioridad=true;
		console.log("Prioridad semáforos este/oeste activada");
	}	
	else{
		prioridad=false;
		console.log("Prioridad semáforos este/oeste desactivada");
	}
}

function tauto_on(){		//enciende automático
	resetear(false);
	ciclo=1;
	llamadaAjax("button_setup");
	auto_roll();
}

function tauto_off(){		//apaga automático
	window.clearTimeout(id_automatico);
	todo_off();
}

function auto_roll(){ 		//rueda automática
	console.log("Pasando por el ciclo: " + ciclo);
	switch(ciclo){
		case 0:	//Button presionado. Todo en rojo
			mTiempo=15000;
			ciclo=1;
			break;
		case 1:	//norte y sur en verde
			llamadaAjax("n_green_on");
			llamadaAjax("s_green_on");
			llamadaAjax("e_red_on");
			llamadaAjax("w_red_on");
			mTiempo=mTiempoRV;
			ciclo=2;
			break;
		case 2:	//norte y sur en amarillo
			llamadaAjax("n_yellow_on");
			llamadaAjax("s_yellow_on");
			llamadaAjax("e_red_on");
			llamadaAjax("w_red_on");
			if(!mute){
				sonido_temporal();			//suena y se visualiza en el cliente
			}
			mTiempo=mTiempoA;
			mTiempoTR != 0 ?  ciclo=3 : ciclo=4
			break;
		case 3:	//todo rojo (opcional según TR) 
			llamadaAjax("all_red_on");
			mTiempo=mTiempoTR;
			ciclo=4;
			break;
		case 4:	//este en verde
			llamadaAjax("n_red_on");
			llamadaAjax("s_red_on");
			llamadaAjax("e_green_on");
			llamadaAjax("w_red_on");
			prioridad==true ? mTiempo=mTiempoRV*2 : mTiempo=mTiempoRV; // tiempo según prioridad
			ciclo=5;
			break;
		case 5:	//este amarillo
			llamadaAjax("n_red_on");
			llamadaAjax("s_red_on");
			llamadaAjax("e_yellow_on");
			llamadaAjax("w_red_on");
			if(!mute){
				sonido_temporal();			//suena y se visualiza en el cliente
			}
			mTiempo=mTiempoA;
			mTiempoTR != 0 ?  ciclo=6 : ciclo=7	//a 0 se salta todo en rojo (TR)
			break;
		case 6:	//todo rojo (opcional según TR)
			llamadaAjax("all_red_on");
			mTiempo=mTiempoTR;
			ciclo=7;
			break;
		case 7:	//oeste en verde
			llamadaAjax("n_red_on");
			llamadaAjax("s_red_on");
			llamadaAjax("e_red_on");
			llamadaAjax("w_green_on");
			prioridad==true ? mTiempo=mTiempoRV*2 : mTiempo=mTiempoRV; //tiempo según prioridad
			ciclo=8;
			break;
		case 8:	//oeste amarillo
			llamadaAjax("n_red_on");
			llamadaAjax("s_red_on");
			llamadaAjax("e_red_on");
			llamadaAjax("w_yellow_on");
			if(!mute){
				sonido_temporal();			//suena y se visualiza en el cliente
			}
			mTiempo=mTiempoA;
			mTiempoTR != 0 ?  ciclo=9 : ciclo=1	//a 0 se salta todo en rojo (TR)
			break;
		case 9:	//todo rojo (opcional según TR) 
			llamadaAjax("all_red_on");
			mTiempo=mTiempoTR;
			ciclo=1;
			break;
	}	

	id_automatico = window.setTimeout(auto_roll, mTiempo);	//espera siguiente estado de automático
}
// -------------------------------------------------------------------

// bloque de dibujo semáforos en el canvas ---------------------------
function todo_off(){		//todos semáforos apagados
	//inicio canvas semáforo norte
	canvasN.style.borderRadius = "15px";
	ctxN.fillStyle="rgb(100, 100,100)";
        ctxN.fillRect(0, 0, 50, 140);
	//norte rojo off
	ctxN.beginPath();
	ctxN.strokeStyle="rgb(255, 255, 255)";
	ctxN.arc(25, 25, 20, 0, 2 * Math.PI);
	ctxN.stroke();
	//norte amarillo off
	ctxN.beginPath();
	ctxN.strokeStyle="rgb(255, 255, 255)";
	ctxN.arc(25, 70, 20, 0, 2 * Math.PI);
	ctxN.stroke();
	//norte verde off
	ctxN.beginPath();
	ctxN.strokeStyle="rgb(255, 255, 255)";
	ctxN.arc(25, 115, 20, 0, 2 * Math.PI);
	ctxN.stroke();

	//inicio canvas semáforo sur
	canvasS.style.borderRadius = "15px";
	ctxS.fillStyle="rgb(100, 100,100)";
        ctxS.fillRect(0, 0, 50, 140);
	//sur rojo off
	ctxS.beginPath();
	ctxS.strokeStyle="rgb(255, 255, 255)";
	ctxS.arc(25, 25, 20, 0, 2 * Math.PI);
	ctxS.stroke();
	//sur amarillo off
	ctxS.beginPath();
	ctxS.strokeStyle="rgb(255, 255, 255)";
	ctxS.arc(25, 70, 20, 0, 2 * Math.PI);
	ctxS.stroke();
	//sur verde off
	ctxS.beginPath();
	ctxS.strokeStyle="rgb(255, 255, 255)";
	ctxS.arc(25, 115, 20, 0, 2 * Math.PI);
	ctxS.stroke();

	//inicio canvas semáforo este
	canvasE.style.borderRadius = "15px";
	ctxE.fillStyle="rgb(100, 100,100)";
        ctxE.fillRect(0, 0, 50, 140);
	//este rojo off
	ctxE.beginPath();
	ctxE.strokeStyle="rgb(255, 255, 255)";
	ctxE.arc(25, 25, 20, 0, 2 * Math.PI);
	ctxE.stroke();
	//este amarillo off
	ctxE.beginPath();
	ctxE.strokeStyle="rgb(255, 255, 255)";
	ctxE.arc(25, 70, 20, 0, 2 * Math.PI);
	ctxE.stroke();
	//este verde off
	ctxE.beginPath();
	ctxE.strokeStyle="rgb(255, 255, 255)";
	ctxE.arc(25, 115, 20, 0, 2 * Math.PI);
	ctxE.stroke();

	//inicio canvas semáforo oeste
	canvasW.style.borderRadius = "15px";
	ctxW.fillStyle="rgb(100, 100,100)";
        ctxW.fillRect(0, 0, 50, 140);
	//oeste rojo off
	ctxW.beginPath();
	ctxW.strokeStyle="rgb(255, 255, 255)";
	ctxW.arc(25, 25, 20, 0, 2 * Math.PI);
	ctxW.stroke();
	//oeste amarillo off
	ctxW.beginPath();
	ctxW.strokeStyle="rgb(255, 255, 255)";
	ctxW.arc(25, 70, 20, 0, 2 * Math.PI);
	ctxW.stroke();
	//oeste verde off
	ctxW.beginPath();
	ctxW.strokeStyle="rgb(255, 255, 255)";
	ctxW.arc(25, 115, 20, 0, 2 * Math.PI);
	ctxW.stroke();
}

function x_rojo_on(ctx){		//x rojo on
	ctx.fillStyle="rgb(100, 100,100)";
        ctx.fillRect(0, 0, 50, 140);
	//rojo on
	ctx.beginPath();
	ctx.fillStyle="rgb(255, 0, 0)";
	ctx.arc(25, 25, 20, 0, 2 * Math.PI);
	ctx.fill();	
	//amarillo off
	ctx.beginPath();
	ctx.strokeStyle="rgb(255, 255, 255)";
	ctx.arc(25, 70, 20, 0, 2 * Math.PI);
	ctx.stroke();
	//verde off
	ctx.beginPath();
	ctx.strokeStyle="rgb(255, 255, 255)";
	ctx.arc(25, 115, 20, 0, 2 * Math.PI);
	ctx.stroke();
}

function x_amarillo_on(ctx){	//x amarillo on
	ctx.fillStyle="rgb(100, 100,100)";
        ctx.fillRect(0, 0, 50, 140);
	//rojo off
	ctx.beginPath();
	ctx.strokeStyle="rgb(255, 255, 255)";
	ctx.arc(25, 25, 20, 0, 2 * Math.PI);
	ctx.stroke();	
	//amarillo on
	ctx.beginPath();
	ctx.fillStyle="rgb(255, 255, 0)";
	ctx.arc(25, 70, 20, 0, 2 * Math.PI);
	ctx.fill();
	//verde off
	ctx.beginPath();
	ctx.strokeStyle="rgb(255, 255, 255)";
	ctx.arc(25, 115, 20, 0, 2 * Math.PI);
	ctx.stroke();
}

function x_verde_on(ctx){		//x verde on
	ctx.fillStyle="rgb(100, 100,100)";
        ctx.fillRect(0, 0, 50, 140);
	//rojo off
	ctx.beginPath();
	ctx.strokeStyle="rgb(255, 255, 255)";
	ctx.arc(25, 25, 20, 0, 2 * Math.PI);
	ctx.stroke();
	//amarillo off
	ctx.beginPath();
	ctx.strokeStyle="rgb(255, 255, 255)";
	ctx.arc(25, 70, 20, 0, 2 * Math.PI);
	ctx.stroke();
	//verde on
	ctx.beginPath();
	ctx.fillStyle="rgb(0, 255, 0)";
	ctx.arc(25, 115, 20, 0, 2 * Math.PI);
	ctx.fill();
}
// -------------------------------------------------------------------

// THE END - By: MaToLeOt --------------------------------------------

