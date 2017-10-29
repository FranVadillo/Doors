var game = new Phaser.Game(1024, 576, Phaser.AUTO, '', {preload: preload, create: create, update: update});

var iconos, puertas;

var fadeBlack,oscureciendo;
var jugador, jugadorMorir, jugadorPrevio;
var cartelJugador, cartelJugadorMorir,cartelJugadorFinal;
var j2,j3;
var rightKey;
var arrayTipoPuerta,arrayTipoPuertaMaster,arraySpritePuerta,arrayVidas;
var botonPasarTurno;
var menu;

function preload() {
    game.load.image('fondo', 'assets/fondo.png');
    game.load.image('puerta0', 'assets/puerta0.png');
    game.load.image('puerta1', 'assets/puerta1.png');
	game.load.image('puerta2', 'assets/puerta2.png');	
	game.load.image('puerta3', 'assets/puerta3.png');	
    game.load.image('emoji1', 'assets/emoji1.png');
	game.load.image('emoji2', 'assets/emoji2.png');
    game.load.image('emoji1Destacado', 'assets/emoji1Destacado.png');
	game.load.image('emoji2Destacado', 'assets/emoji2Destacado.png');
	game.load.image('flecha', 'assets/flechita.png');
	game.load.image('negro','assets/negro.png')
	game.load.image('rojo','assets/rojo.png')
	game.load.image('corazon','assets/corazonEntero.png')
	game.load.image('medioCorazon','assets/medioCorazon.png')
	game.load.image('noCorazon','assets/corazonTransparente.png')
	game.load.image('menu','assets/menu.png')
	game.load.image('botonIniciarJuego','assets/botonIniciarJuego.png');
	game.load.image('botonInstrucciones','assets/botonInstrucciones.png');
	game.load.spritesheet('iconos', 'assets/SpriteSheetEmojis.png', 102, 100,23);
}

function create(){
	
	game.add.sprite(0, 0, 'fondo');

	//JUGADORES
	j2 = new Jugador(2);
	j3 = new Jugador(3);
	jugador = 1;
	jugadorMorir = Math.floor((Math.random() * 2) + 2);
	jugadorPrevio = 3;
	
	//PUERTAS
	arrayTipoPuertaMaster = [0,0,1,2];
	arrayTipoPuerta = [0,0,1,2];
	//tipoPuerta.splice(Math.floor((Math.random() * tipoPuerta.length + 1)),1);
	p0 = new Puerta(50,200,0, 0);	
	p1 = new Puerta(500,200,0, 1);
	p2 = new Puerta(200,200,0, 2);
	p3 = new Puerta(800,200,0, 3);
	puertas = [p0, p1, p2, p3];
	for(var i = 0; i < 4; i++){
		puertas[i].getSpritePuerta().inputEnabled = true;
		puertas[i].getSpritePuerta().events.onInputDown.add(puertas[i].colocarEmoji, puertas[i]);
	}

	arraySpritePuerta = ['puerta3','puerta1','puerta2','puerta0'];


	//ICONOS
	i0 = new Icono(10,10,0);
	i1 = new Icono(100,10,1);
	iconos = [i0, i1];
	for(var i = 0; i < 2; i++){
		iconos[i].getSpriteIcono().inputEnabled = true;
		iconos[i].getSpriteIcono().input.useHandCursor = true;
		iconos[i].getSpriteIcono().events.onInputDown.add(remarcarIcono, iconos[i], 0, iconos[i].getIndice(), iconos);
	}

	//Vidas
	var v0 = game.add.sprite(910,24,'flecha');
	var v1 = game.add.sprite(860,24,'flecha');
	var v2 = game.add.sprite(810,24,'flecha');
	var v3 = game.add.sprite(760,24,'flecha');
	var v4 = game.add.sprite(710,24,'flecha');
	arrayVidas = [v0,v1,v2,v3,v4];



	fadeBlack = game.add.sprite(0,0,'negro');
	fadeBlack.alpha = 0;
	oscureciendo = false;

	menu = true;

	botonPasarTurno = undefined;
	//rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	rigtKey = false;
	cartelJugador = game.add.text(400, 16, '', { fontSize: '32px', fill: '#000' });
	cartelJugadorMorir = game.add.text(350, 48, '', { fontSize: '20px', fill: '#000' });
	cartelJugadorFinal = game.add.text(100, 250, '', { fontSize: '27px', fill: '#FFF' });

	//menú
	menuFondo = game.add.sprite(0, 0, 'menu');
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
	menuFondo.destroy();
	botonIniciarJuego.destroy();
	botonInstrucciones.destroy();
	menu = false;
}

function instrucciones(){


}


function update(){

	if(menu == false){


		if(oscureciendo == true){
			fadeBlack.alpha += 0.01;
			if(fadeBlack.alpha > 1){
				jugador = 1;
				oscureciendo = false;
				fadeBlack.alpha = 0;
			}
		}
	
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

function eliminarSprite(s,c,p){
	//console.log(p.tipo);
	if(jugador == 2){
		if(p.tipo == 1){
			j2.vidas -= 0.5;
			fadeBlack.loadTexture('rojo');
		}else if(p.tipo == 2){
			j2.vidas -= 1;
			fadeBlack.loadTexture('rojo');
		}else{
			fadeBlack.loadTexture('negro');
		}
		oscureciendo = true;

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
	}


}

function Puerta (x, y, tipo, ind){

	this.marcada = false;
	this.indice = ind;
	this.tipo = tipo;
	this.x = x;
	this.y = y;
	this.spritePuerta = game.add.sprite(this.x, this.y, 'puerta0');


	this.spritePuerta.events.onInputDown.add(eliminarSprite,this,0,this);

	this.getSpritePuerta = function(){
		return this.spritePuerta;
	}
	this.desmarcar = function(){
		this.marcada = false;
	}
	this.colocarEmoji = function(){
		for(var i = 0; i < 2; i++){
			if(iconos[i].getMarcado() && !this.marcada){
				iconos[i].resetIcono(iconos[i].getIndice());
				iconos[i].moveTo(x, y);
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
	switch(indice){
		case 0: this.spriteIcono = game.add.sprite(this.x, this.y, 'iconos');
				this.spriteIcono.frame = 15;
			break;
		case 1: this.spriteIcono = game.add.sprite(this.x, this.y, 'iconos');
				this.spriteIcono.frame = 22;
			break;
	}
	
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
		switch(indice){
			case 0: this.spriteIcono.loadTexture('emoji1');
				break;
			case 1: this.spriteIcono.loadTexture('emoji2');
				break;
		}
	}

}

function remarcarIcono(sprite, cursor, indice){
	for(var i = 0; i < 2; i++){
		iconos[i].resetIcono(iconos[i].getIndice());
	}
	switch(indice){
		case 0: this.getSpriteIcono().loadTexture('emoji1Destacado');
			this.marcar();
			break;
		case 1: this.getSpriteIcono().loadTexture('emoji2Destacado');
			this.marcar()
			break;
	}
}

function Jugador(n){
	this.numero = n;
	this.vidas = 5;
}

function jugador1(){
	if(botonPasarTurno == undefined){
	this.botonPasarTurno;
	this.botonPasarTurno = game.add.sprite(900,525,'flecha');
	this.botonPasarTurno.inputEnabled = true;
	}

	for(i = 0; i<=4;i++){
			arrayVidas[i].loadTexture('noCorazon'); 
	}

	if(arrayTipoPuerta.length > 0){
		for(var i = 0; i < 4; i++){
			puertas[i].tipo = parseInt(arrayTipoPuerta.splice(Math.floor((Math.random() * arrayTipoPuerta.length)),1));
			puertas[i].getSpritePuerta().loadTexture(arraySpritePuerta[puertas[i].tipo]);
			puertas[i].spritePuerta.input.useHandCursor = false;
			//console.log(puertas[i].tipo);

		}
}
	cartelJugador.text = 'JUGADOR 1';
	cartelJugadorMorir.text = 'Debes acabar con el jugador ' + jugadorMorir;

	this.pasarTurno = function(){
		if(jugadorPrevio == 2)jugador = 3;
		if(jugadorPrevio == 3)jugador = 2;
		botonPasarTurno.destroy();
		botonPasarTurno = undefined;

	}
	this.botonPasarTurno.events.onInputDown.add(this.pasarTurno);


}


function jugador2_3(j){

	if(arrayTipoPuerta.length < 4)	{
		arrayTipoPuerta = arrayTipoPuertaMaster.slice();
		//console.log(arrayTipoPuerta);
	}
	//console.log(j2.vidas);
	//console.log(j3.vidas);

	for(i = 0; i<=4;i++){
		if(i < Math.floor(j.vidas)){
			arrayVidas[i].loadTexture('corazon');
		}else if(Math.floor(j.vidas) < j.vidas && i == Math.floor(j.vidas)){
			arrayVidas[i].loadTexture('medioCorazon');
		}else{
			arrayVidas[i].loadTexture('noCorazon');
		}	
	}

	jugadorPrevio = j.numero;
	cartelJugadorMorir.text = '';

	for(var i = 0; i < 4; i++){
		puertas[i].spritePuerta.loadTexture('puerta0');
		puertas[i].spritePuerta.input.useHandCursor = true;
	}

	if(j.numero == 2){
	
		cartelJugador.text = 'JUGADOR 2';

	}

	if(j.numero == 3){
	
		cartelJugador.text = 'JUGADOR 3';
	
	}

}


function final(j){
	cartelJugador.text = '';
	if(j.numero != jugadorMorir){
		cartelJugadorFinal.text = 'Gana el jugador ' + j.numero;
	}else{
		cartelJugadorFinal.text = 'Ganan los jugadores 1 y ' + j.numero;
	}
	
}

/*objeto puerta
	tipo (3 tipos)
	icono
objeto icono
	tipo (distintos iconos)
objeto jugador
	tipo (3 tipos)
	vidas?

partida-> 4 puertas distintas cada ronda
	  3 jugadores
	  x iconos se resetean cada ronda


jugador tipo 1 ve los sprites de las puertas cambiados y coloca iconos
jugador tipo 2 o 3 (aleatorio) elige una puerta y pasa
si la puerta era de tipo da�i�a baja la vida y se reproduce alg�n sonido
el fondo cambia
jugador tipo 1 ve los sprites de las puertas cambiados y coloca iconos
el otro jugador elige una puerta y pasa
si la puerta era de tipo da�i�a baja la vida y se reproduce alg�n sonido
el fondo cambia

acaba cuando muere uno de los jugadores o cuando pasen x turnos*/
