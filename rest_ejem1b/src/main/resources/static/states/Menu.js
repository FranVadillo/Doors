Doors.Menu = function(game){
	
};
Doors.Menu.prototype = {
		preload:function(){
			game.load.image('menu','assets/menu.png');
			game.load.image('botonIniciarJuego','assets/botonIniciarJuego.png');
			game.load.image('botonInstrucciones','assets/botonInstrucciones.png');
		},
		create:function(){
			this.add.sprite(0, 0, 'menu');
			
			botonIniciarJuego = this.add.sprite(100, 350, 'botonIniciarJuego');
			botonIniciarJuego.inputEnabled = true;
			botonIniciarJuego.input.useHandCursor = true;
			botonIniciarJuego.events.onInputDown.add(this.Juego, this);
			
			botonInstrucciones = this.add.sprite(100, 450, 'botonInstrucciones');
			botonInstrucciones.inputEnabled = true;
			botonInstrucciones.input.useHandCursor = true;
			botonInstrucciones.events.onInputDown.add(this.Instrucciones, this);
		},
		Juego: function(){
			this.state.start('Juego');
		},
		Instrucciones: function(){
			this.state.start('Instrucciones');
		}
};