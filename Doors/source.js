var game = new Phaser.Game(1024, 576, Phaser.AUTO, '', {preload: preload, create: create, update: update});

function preload() {
    	game.load.image('fondo', 'assets/fondo.png');
    	game.load.image('puerta0', 'assets/puerta0.png');
    	game.load.image('puerta1', 'assets/puerta1.png');
    	game.load.image('puerta2', 'assets/puerta2.png');	
    	game.load.image('emoji1', 'assets/emoji1.png');
	game.load.image('emoji2', 'assets/emoji2.png');
    	game.load.image('emoji1Destacado', 'assets/emoji1Destacado.png');
	game.load.image('emoji2Destacado', 'assets/emoji2Destacado.png');
	game.load.image('flecha', 'assets/flechita.png');
}

function create(){
	game.add.sprite(0, 0, 'fondo');

	//JUGADORES
	j0 = Jugador(0);
	j1 = Jugador(1);
	j2 = Jugador(2);
	
	//FLECHA
	//flecha = new Flecha(40, 90);

	//ICONOS
	i0 = new Icono(10,10,0);
	i1 = new Icono(100,10,1);
	x = 40;
	var iconos = [i0, i1];
	/*for(var i = 0; i < 2; i++){
		iconos[i].getSpriteIcono().inputEnabled = true;
		iconos[i].getSpriteIcono().events.onInputDown.add(flecha.moverFlecha, this, 0, 200);
		x += 90;
	}*/

	//PUERTAS
	p0 = new Puerta(50,200,0);
	p1 = new Puerta(500,200,0);
	p2 = new Puerta(200,200,0);
	p3 = new Puerta(800,200,0);
	var puertas = [p0, p1, p2, p3];
	/*for(var i = 0; i < 4; i++){
		puertas[i].getSpritePuerta().inputEnabled = true;
		puertas[i].getSpritePuerta().events.onInputDown.add(eliminarSprite, this);
	}*/
}

function update(){

}

function eliminarSprite(sprite){

    	sprite.destroy();


}

function Puerta (x, y, tipo){
	var spritePuerta;
	this.tipo = tipo;
	this.x = x;
	this.y = y;
	sprite = 0;
	switch(sprite){
		case 0: this.spritePuerta = game.add.sprite(x, y, 'puerta0');
			break;
	}
	this.spritePuerta.inputEnabled = true;
	this.spritePuerta.events.onInputDown.add(eliminarSprite, this);
	this.getSpritePuerta = function(){
		return this.spritePuerta;
	}

}

function Icono(x,y,sprite){
	var spriteIcono;
	this.sprite = sprite;
	this.x = x;
	this.y = y;
	switch(sprite){
		case 0: this.spriteIcono = game.add.sprite(x, y, 'emoji1');
			this.spriteIcono.loadTexture('emoji2');
			break;
		case 1: this.spriteIcono = game.add.sprite(x, y, 'emoji2');
			break;
	}
	/*this.spriteIcono.inputEnabled = true;
	this.spriteIcono.events.onInputDown.add(this.remarcarIcono, this, 0);
	this.remarcarIcono = function(){
		
	}*/

}

function Jugador(tipo){
	this.tipo = tipo;
	if(tipo != 0) this.vidas = 5;
}
/*
function Flecha(x, y){
	var spriteFlecha;
	this.x = x;
	this.y = y;
	this.spriteFlecha = game.add.sprite(x, y, 'flecha');

	this.moverFlecha = function(parametroAbsurdo, parametroAbsurdo2, pos){
		this.spriteFlecha.x = pos
	}
}
*/
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
si la puerta era de tipo dañiña baja la vida y se reproduce algún sonido
el fondo cambia
jugador tipo 1 ve los sprites de las puertas cambiados y coloca iconos
el otro jugador elige una puerta y pasa
si la puerta era de tipo dañiña baja la vida y se reproduce algún sonido
el fondo cambia

acaba cuando muere uno de los jugadores o cuando pasen x turnos*/
