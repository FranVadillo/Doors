
Doors.Partida = function(game){
	var textJugadores, textVolver;
	var listaJugadores;
	var idPartida;
	var that;
};

Doors.Partida.prototype = {
		
		init: function(index){
			this.idPartida = index;
		},
		create: function(){
			that = this;
			this.listaJugadores = [];
			this.guardarJugadores();
		},
		update: function(){
			if(this.listaJugadores.length == 3) game.state.start('Menu');
		},
		actualizar: function(){
			console.log("actualizando");
			game.state.start('Partida', true, false, that.idPartida);
		},
		volver: function(){
			console.log("vuelvo");
			that.sacarJugador();
			game.state.start('Lobby');
		},
		guardarJugadores: function(){
			$.ajax({
				   url: 'http://localhost:8080/partida/' + that.idPartida
				  }).done(function (partida) {  		
					  		that.listaJugadores = partida.listaJugadores.slice();
					  		that.crearTextos();
				  })
		},
		crearTextos: function(){
			var y = 10;
			//Texto jugadores
			for(var i = 0; i < that.listaJugadores.length; i++){
				textJugadores = that.add.text(40, y, that.listaJugadores[i].nombre, {fill: "#fff"});
				y += 10;
			}
			//Texto para volver al lobby
			textVolver = that.add.text(200, 200, 'Volver', {fill: "#fff"});
			textVolver.inputEnabled = true;
			textVolver.input.useHandCursor = true;
			textVolver.events.onInputDown.add(that.volver, that);
			
			textActualizar = that.add.text(200, 20, 'Actualizar', {fill:"#fff"});
			textActualizar.inputEnabled = true;
			textActualizar.input.useHandCursor = true;
			textActualizar.events.onInputDown.add(that.actualizar, that);
		},
		sacarJugador: function(){
			for(var i = 0; i < that.listaJugadores.length; i++){
				if(that.listaJugadores[i].id == game.idJugador) that.listaJugadores.splice(i, 1);
			}
			console.log(that.listaJugadores.length);
			partida = {
					listaJugadores : that.listaJugadores,
					nJugadores : that.listaJugadores.length,
					idPartida : that.idPartida
			};
			//PUT
				  $.ajax({
				   method: "PUT",
				   url: 'http://localhost:8080/partida/out/' + that.idPartida,
				   data: JSON.stringify(partida),
				   processData: false,
				   headers: {
				    "Content-Type": "application/json"
				   }
				  }).done(function (booleano) {
				   console.log("Partida updated");
				  });

		}
};