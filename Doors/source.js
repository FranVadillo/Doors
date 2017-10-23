var game = new Phaser.Game(1024, 576, Phaser.AUTO, '', {preload: preload, create: create, update: update});

function preload() {
    game.load.image('fondo', 'assets/fondo.png');
    game.load.image('puerta0', 'assets/puerta0.png');
    game.load.image('puerta1', 'assets/puerta1.png');
    game.load.image('puerta2', 'assets/puerta2.png');
}

function create(){
	game.add.sprite(0, 0, 'fondo');
	j0 = Jugador(0);
	j1 = Jugador(1);
	j2 = Jugador(2);
	p0 = Puerta(50,200,0);
	p1 = Puerta(500,200,0);
	p2 = Puerta(200,200,0);
	p3 = Puerta(800,200,0);
}

function update(){

}

function Puerta(/*x e y no se pasarán como parámetros al final*/x, y, tipo){
	this.tipo = tipo;
	this.x = x;
	this.y = y;
	sprite = 0;
	switch(sprite){
		case 0: game.add.sprite(x, y, 'puerta0');
			break;
	}
}

function Icono(sprite){
	this.sprite = sprite;
	switch(sprite){
		case 0: game.add.sprite();
			break;
	}
}

function Jugador(tipo){
	this.tipo = tipo;
	if(tipo != 0) this.vidas = 5;
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
si la puerta era de tipo dañiña baja la vida y se reproduce algún sonido
el fondo cambia
jugador tipo 1 ve los sprites de las puertas cambiados y coloca iconos
el otro jugador elige una puerta y pasa
si la puerta era de tipo dañiña baja la vida y se reproduce algún sonido
el fondo cambia

acaba cuando muere uno de los jugadores o cuando pasen x turnos*/
