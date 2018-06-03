Doors.Instrucciones = function(game){
	
};
Doors.Instrucciones.prototype = {
		preload:function(){
			game.load.image('instrucciones','assets/instrucciones.png');
			game.load.image('botonVolver','assets/botonVolverAlMenu.png');
		},
		create:function(){
			this.add.sprite(0, 0, 'instrucciones');
			
			botonVolver = this.add.sprite(100, 350, 'botonVolver');
			botonVolver.inputEnabled = true;
			botonVolver.input.useHandCursor = true;
			botonVolver.events.onInputDown.add(this.volver, this);
		},
		volver: function(){
			this.state.start('Menu');
		}
}