var game = new Phaser.Game(1024, 576, Phaser.AUTO, '', {preload: preload, create: create, update: update});

var iconos, puertas;

var fadeBlack,oscureciendo;
var jugador, jugadorMorir, jugadorPrevio;
var cartelJugador, cartelJugadorMorir,cartelJugadorFinal;
var j2,j3;
var arrayTipoPuerta,arrayTipoPuertaMaster,arraySpritePuerta,arrayVidas;
var botonPasarTurno;
var menu;
var pulsada;

function preload() {
    	game.load.image('fondo', 'assets/fondo.png');
    	game.load.image('puerta0', 'assets/puerta0.png');
    	game.load.image('puerta1', 'assets/puerta1.png');
	game.load.image('puerta2', 'assets/puerta2.png');	
	game.load.image('puerta3', 'assets/puerta3.png');	
	game.load.image('flecha', 'assets/flechita.png');
	game.load.image('negro','assets/negro.png');
	game.load.image('rojo','assets/rojo.png');
	game.load.image('corazon','assets/corazonEntero.png');
	game.load.image('medioCorazon','assets/medioCorazon.png');
	game.load.image('noCorazon','assets/corazonTransparente.png');
	game.load.image('menu','assets/menu.png');
	game.load.image('instrucciones','assets/instrucciones.png');
	game.load.image('botonIniciarJuego','assets/botonIniciarJuego.png');
	game.load.image('botonInstrucciones','assets/botonInstrucciones.png');
	game.load.image('botonVolver','assets/botonVolverAlMenu.png');
	game.load.image('botonPasar','assets/botonPasarTurno.png')
	game.load.spritesheet('iconos', 'assets/SpriteSheetEmojis.png', 102, 100,23);
	game.load.spritesheet('iconosDestacados', 'assets/SpriteSheetEmojisDestacados.png', 102, 100, 23);
}

function create(){
	
	game.add.sprite(0, 0, 'fondo');

	//JUGADORES
	//Se crean los jugadores
	j2 = new Jugador(2);
	j3 = new Jugador(3);
	//Indica el jugador activo
	jugador = 1;
	//Decide que jugador es tu objetivo
	jugadorMorir = Math.floor((Math.random() * 2) + 2);
	//Memoria de que jugador era el anterior para saber cual es el siguiente
	jugadorPrevio = 3;
	
	//PUERTAS
	//Array del que se saca el orden de las puertas
	arrayTipoPuerta = [0,0,1,2];
	
	p0 = new Puerta(50,215,0, 0);	
	p1 = new Puerta(300,200,0, 1);
	p2 = new Puerta(550,215,0, 2);
	p3 = new Puerta(800,200,0, 3);
	puertas = [p0, p1, p2, p3];
	for(var i = 0; i < puertas.length; i++){
		puertas[i].getSpritePuerta().inputEnabled = true;
		puertas[i].getSpritePuerta().events.onInputDown.add(puertas[i].colocarEmoji, puertas[i]);
	}
	//Se guardan los nombres de las puertas para acceder luego desde el loadTexture
	arraySpritePuerta = ['puerta3','puerta1','puerta2','puerta0'];


	//ICONOS
	i0 = new Icono(10,10, Math.floor((Math.random() * 23)));
	i1 = new Icono(110,10, Math.floor((Math.random() * 23)));
	i2 = new Icono(210,10, Math.floor((Math.random() * 23)));
	iconos = [i0, i1, i2];
	for(var i = 0; i < iconos.length; i++){
		iconos[i].getSpriteIcono().inputEnabled = true;
		iconos[i].getSpriteIcono().events.onInputDown.add(remarcarIcono, iconos[i], 0, iconos[i].getIndice());
	}

	//Vidas
	var v0 = game.add.sprite(910,24,'noCorazon');
	var v1 = game.add.sprite(860,24,'noCorazon');
	var v2 = game.add.sprite(810,24,'noCorazon');
	var v3 = game.add.sprite(760,24,'noCorazon');
	var v4 = game.add.sprite(710,24,'noCorazon');
	arrayVidas = [v0, v1, v2, v3, v4];

	//Variables para el difuminado tanto a negro como a rojo
	fadeBlack = game.add.sprite(0,0,'negro');
	fadeBlack.alpha = 0;
	oscureciendo = false;

	//Indica si el menú está activo
	menu = true;

	//Botón de pasar turno
	botonPasarTurno = undefined;
	pulsada = false;

	//Textos
	cartelJugador = game.add.text(400, 16, '', { fontSize: '32px', fill: '#000' });
	cartelJugadorMorir = game.add.text(350, 48, '', { fontSize: '20px', fill: '#000' });
	cartelJugadorSiguiente = game.add.text(350, 75, '', { fontSize: '18px', fill: '#000' });
	cartelJugadorFinal = game.add.text(100, 250, '', { fontSize: '27px', fill: '#FFF' });

	//Menú
	//Se crea una imagen encima del juego
	menuFondo = game.add.sprite(0, 0, 'menu');
	//Botones del menú
	botonIniciarJuego = game.add.sprite(100, 350, 'botonIniciarJuego');
	botonIniciarJuego.inputEnabled = true;
	botonIniciarJuego.input.useHandCursor = true;
	botonIniciarJuego.events.onInputDown.add(iniciarJuego);
	
	botonInstrucciones = game.add.sprite(100, 450, 'botonInstrucciones');
	botonInstrucciones.inputEnabled = true;
	botonInstrucciones.input.useHandCursor = true;
	botonInstrucciones.events.onInputDown.add(instrucciones);
}

function iniciarJuego(){
	//Destruye el menú y sus botones para poder empezar el juego
	menuFondo.destroy();
	botonIniciarJuego.destroy();
	botonInstrucciones.destroy();
	menu = false;
}

function instrucciones(){
	menuFondo.destroy();
	botonIniciarJuego.destroy();
	botonInstrucciones.destroy();
	menuInstrucciones = game.add.sprite(0, 0, 'instrucciones');
	botonVolver = game.add.sprite(780, 520, 'botonVolver');
	botonVolver.inputEnabled = true;
	botonVolver.input.useHandCursor = true;
	botonVolver.events.onInputDown.add(volverAlMenu);
}

function volverAlMenu(){
	menuInstrucciones.destroy();
	botonVolver.destroy();

	menuFondo = game.add.sprite(0, 0, 'menu');
	//Botones del menú
	botonIniciarJuego = game.add.sprite(100, 350, 'botonIniciarJuego');
	botonIniciarJuego.inputEnabled = true;
	botonIniciarJuego.input.useHandCursor = true;
	botonIniciarJuego.events.onInputDown.add(iniciarJuego);
	
	botonInstrucciones = game.add.sprite(100, 450, 'botonInstrucciones');
	botonInstrucciones.inputEnabled = true;
	botonInstrucciones.input.useHandCursor = true;
	botonInstrucciones.events.onInputDown.add(instrucciones);
}

function update(){

	if(menu == false){
		//Aumenta el alpha poco a poco para el fundido en negro
		if(oscureciendo == true){
			fadeBlack.alpha += 0.01;
			if(fadeBlack.alpha > 1){
				//jugador = 1;
				oscureciendo = false;
				fadeBlack.alpha = 0;
				jugador = 1;
			}
			
		}
		//Si están vivos se ejecutan sus códigos
		if(j2.vidas > 0 && j3.vidas > 0){
			if(jugador == 1) jugador1();
			if(jugador == 2) jugador2_3(j2);
			if(jugador == 3) jugador2_3(j3);
		
		}else if(oscureciendo == false){		
			if(j2.vidas > 0)final(j2);
			if(j3.vidas > 0)final(j3);
			fadeBlack.alpha = 1;
		}
	}
}

//Recibe la puerta
function atravesarPuerta(s,c,p){

	if(!pulsada){
		//Dependiendo del jugador que seas entra a un if o a otro
		if(jugador == 2){
			//Dependiendo del tipo de puerta te produce un efecto u otro
			if(p.tipo == 1){
				//Pierdes medio corazón
				j2.vidas -= 0.5;
				fadeBlack.loadTexture('rojo');
			}else if(p.tipo == 2){
				//Pierdes un corazón
				j2.vidas -= 1;
				fadeBlack.loadTexture('rojo');
			}else{
				fadeBlack.loadTexture('negro');
			}
			oscureciendo = true;

			//Se desmarcan todas las puertas
			for(var i = 0; i < puertas.length; i++){
				puertas[i].desmarcar();
			}
	
			//Se borran los iconos y se generan nuevos
			i0.getSpriteIcono().destroy();
			i1.getSpriteIcono().destroy();
			i2.getSpriteIcono().destroy();
			i0 = new Icono(10,10, Math.floor((Math.random() * 23)));
			i1 = new Icono(110,10, Math.floor((Math.random() * 23)));
			i2 = new Icono(210,10, Math.floor((Math.random() * 23)));
			iconos = [i0, i1, i2];
			for(var i = 0; i < iconos.length; i++){
				iconos[i].getSpriteIcono().inputEnabled = true;
				iconos[i].getSpriteIcono().events.onInputDown.add(remarcarIcono, iconos[i], 0, iconos[i].getIndice());
			}
		
			pulsada = true;

		}else if(jugador == 3){
			if(p.tipo == 1){
				j3.vidas -= 0.5;
				fadeBlack.loadTexture('rojo');
			}else if(p.tipo == 2){
				j3.vidas -= 1;
				fadeBlack.loadTexture('rojo');
			}else{
				fadeBlack.loadTexture('negro');
			}
			oscureciendo = true;

			for(var i = 0; i < puertas.length; i++){
				puertas[i].desmarcar();
			}		

			i0.getSpriteIcono().destroy();
			i1.getSpriteIcono().destroy();
			i2.getSpriteIcono().destroy();
			i0 = new Icono(10,10, Math.floor((Math.random() * 23)));
			i1 = new Icono(110,10, Math.floor((Math.random() * 23)));
			i2 = new Icono(210,10, Math.floor((Math.random() * 23)));
			iconos = [i0, i1, i2];
			for(var i = 0; i < iconos.length; i++){
				iconos[i].getSpriteIcono().inputEnabled = true;
				iconos[i].getSpriteIcono().events.onInputDown.add(remarcarIcono, iconos[i], 0, iconos[i].getIndice());
			}

			pulsada = true;
		}

	}
}

function Puerta (x, y, tipo, ind){

	this.marcada = false;
	this.indice = ind;
	this.tipo = tipo;
	this.x = x;
	this.y = y;

	this.spritePuerta = game.add.sprite(this.x, this.y, 'puerta0');

	this.spritePuerta.events.onInputDown.add(atravesarPuerta,this,0,this);

	this.getSpritePuerta = function(){
		return this.spritePuerta;
	}
	this.desmarcar = function(){
		this.marcada = false;
	}
	this.colocarEmoji = function(){
		for(var i = 0; i < iconos.length; i++){
			if(iconos[i].getMarcado() && !this.marcada){
				iconos[i].resetIcono(iconos[i].getIndice());
				iconos[i].moveTo(x + 45, y + 50);
				if(iconos[i].getPuertaAsignada() != undefined) puertas[iconos[i].getPuertaAsignada()].desmarcar();
				iconos[i].setPuertaAsignada(this.indice);
				this.marcada = true;
			}
		}
	}

}

function Icono(x,y,indice){
	var spriteIcono;
	var puertaAsignada;
	this.marcado = false;
	this.indice = indice;
	this.x = x;
	this.y = y;

	this.spriteIcono = game.add.sprite(this.x, this.y, 'iconos');
	this.spriteIcono.frame = indice;

	this.getSpriteIcono = function(){ return this.spriteIcono; }
	this.getIndice = function(){ return this.indice; }
	this.getMarcado = function(){ return this.marcado; }
	this.getPuertaAsignada = function(){ return this.puertaAsignada; }

	this.setPuertaAsignada = function(ind){ this.puertaAsignada = ind; }

	this.moveTo = function(px, py){
		this.spriteIcono.x = px;
		this.spriteIcono.y = py;
	}
	this.marcar = function(){
		this.marcado = true;
	}
	this.resetIcono = function(indice){
		this.marcado = false;
		this.getSpriteIcono().loadTexture('iconos');
		this.spriteIcono.frame = indice;
	}

}

function remarcarIcono(sprite, cursor, indice){
	if(jugador == 1){
		for(var i = 0; i < iconos.length; i++){
			iconos[i].resetIcono(iconos[i].getIndice());
		}
		this.getSpriteIcono().loadTexture('iconosDestacados');
		this.spriteIcono.frame = indice;
		this.marcar();
	}
}

//Crea al jugador con sus vidas
function Jugador(n){
	this.numero = n;
	this.vidas = 5;
}

//Turno del jugador 1
function jugador1(){
	//Si no hay botón para pasar de turno lo crea
	if(botonPasarTurno == undefined){
		this.botonPasarTurno;
		this.botonPasarTurno = game.add.sprite(850,525,'botonPasar');
		this.botonPasarTurno.inputEnabled = true;
	}

	//Deja de mostrar las vidas
	for(i = 0; i<=4;i++){
			arrayVidas[i].loadTexture('noCorazon'); 
	}

	//Mientras haya elementos en el array
	if(arrayTipoPuerta.length > 0){
		for(var i = 0; i < 4; i++){
			//Va vaciando el array de forma aleatoria
			puertas[i].tipo = parseInt(arrayTipoPuerta.splice(Math.floor((Math.random() * arrayTipoPuerta.length)),1));
			//Dependiendo del tipo de puerta elige un nombre u otro
			puertas[i].getSpritePuerta().loadTexture(arraySpritePuerta[puertas[i].tipo]);

		}
}
	//Muestra el objetivo
	cartelJugador.text = 'JUGADOR 1';
	cartelJugadorMorir.text = 'Debes acabar con el jugador ' + jugadorMorir;
	if(jugadorPrevio == 2) cartelJugadorSiguiente.text = 'El siguiente jugador es el jugador 3';
	else if(jugadorPrevio == 3) cartelJugadorSiguiente.text = 'El siguiente jugador es el jugador 2';

	this.pasarTurno = function(){
		//Dependiendo del jugador que haya jugado antes el siguiente turno se le asigna a uno u otro
		if(jugadorPrevio == 2)jugador = 3;
		if(jugadorPrevio == 3)jugador = 2;
		botonPasarTurno.destroy();
		botonPasarTurno = undefined;
		pulsada = false;
	}
	//Función del botón
	this.botonPasarTurno.events.onInputDown.add(this.pasarTurno);

}


function jugador2_3(j){

	if(arrayTipoPuerta.length < 4)	{
		arrayTipoPuerta = arrayTipoPuerta = [0,0,1,2];
	}

	for(i = 0; i < 5;i++){
		//Coloca corazones según las vidas que tengas
		if(i < Math.floor(j.vidas)){
			arrayVidas[i].loadTexture('corazon');
		}else if(Math.floor(j.vidas) < j.vidas && i == Math.floor(j.vidas)){
			arrayVidas[i].loadTexture('medioCorazon');
		}else{
			arrayVidas[i].loadTexture('noCorazon');
		}	
	}

	//Se actualiza jugadorPrevio
	jugadorPrevio = j.numero;

	cartelJugadorMorir.text = '';
	cartelJugadorSiguiente.text = '';

	//Se le coloca el sprite básico de la puerta a todas
	for(var i = 0; i < 4; i++){
		puertas[i].spritePuerta.loadTexture('puerta0');
	}

	//Cartel que indica de quien es el turno
	if(j.numero == 2) cartelJugador.text = 'JUGADOR 2';
	if(j.numero == 3) cartelJugador.text = 'JUGADOR 3';

}


function final(j){
	cartelJugador.text = '';
	//Si logras el objetivo da un ganador y si no el otro
	if(j.numero != jugadorMorir){
		cartelJugadorFinal.text = 'Gana el jugador ' + j.numero;
	}else{
		cartelJugadorFinal.text = 'Ganan los jugadores 1 y ' + j.numero;
	}
	
}


/*
Si esta desmarcado, se marca con su mismo icono
Se coloca en la puerta
Al acabar el turno se eliminan y se generan 3 nuevos
Esos 3 se meten en el array 
*/