var game = new Phaser.Game(1024, 576, Phaser.AUTO, '', {preload: preload, create: create, update: update});

var iconos, puertas;

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
	
	//PUERTAS
	p0 = new Puerta(50,200,0, 0);
	p1 = new Puerta(500,200,0, 1);
	p2 = new Puerta(200,200,0, 2);
	p3 = new Puerta(800,200,0, 3);
	puertas = [p0, p1, p2, p3];
	for(var i = 0; i < 4; i++){
		puertas[i].getSpritePuerta().inputEnabled = true;
		puertas[i].getSpritePuerta().events.onInputDown.add(puertas[i].colocarEmoji, puertas[i]);
	}

	//ICONOS
	i0 = new Icono(10,10,0);
	i1 = new Icono(100,10,1);
	iconos = [i0, i1];
	for(var i = 0; i < 2; i++){
		iconos[i].getSpriteIcono().inputEnabled = true;
		iconos[i].getSpriteIcono().events.onInputDown.add(remarcarIcono, iconos[i], 0, iconos[i].getIndice(), iconos);
	}

}

function update(){

}

function eliminarSprite(sprite){

    	sprite.destroy();


}

function Puerta (x, y, tipo, ind){
	var spritePuerta;
	this.marcada = false;
	this.indice = ind;
	this.tipo = tipo;
	this.x = x;
	this.y = y;
	sprite = 0;
	switch(sprite){
		case 0: this.spritePuerta = game.add.sprite(this.x, this.y, 'puerta0');
			break;
	}

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
		case 0: this.spriteIcono = game.add.sprite(this.x, this.y, 'emoji1');
			break;
		case 1: this.spriteIcono = game.add.sprite(this.x, this.y, 'emoji2');
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
