Doors.Partida = function(game){
	var textJugadores, textVolver, textActualizar;
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
			if(this.listaJugadores.length == 3) sendMessage('empezarPartida',{idPartida:this.idPartida}); 
				//game.state.start('Menu');
			
			socket.onmessage = (message) => {
				
				var packet = JSON.parse(message.data);
				
				switch (packet.type) {
				case 'start':
					game.state.start('Juego');
					rol = packet.rol;
					break;
				case 'actualizaPartida': 
					that.actualizar();
					break;
				}
			}
		},
		actualizar: function(){
			game.state.start('Partida', true, false, that.idPartida);
		},
		volver: function(){
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
			var y = 70;
			//Texto jugadores
			for(var i = 0; i < that.listaJugadores.length; i++){
				textJugadores = that.add.text(40, y, that.listaJugadores[i].nombre, {fill: "#fff"});
				y += 40;
			}
			//Texto para volver al lobby
			textVolver = that.add.text(20, 200, 'Volver', {fill: "#fff"});
			textVolver.inputEnabled = true;
			textVolver.input.useHandCursor = true;
			textVolver.events.onInputDown.add(that.volver, that);
			
			textActualizar = that.add.text(200, 200, 'Actualizar', {fill:"#fff"});
			textActualizar.inputEnabled = true;
			textActualizar.input.useHandCursor = true;
			textActualizar.events.onInputDown.add(that.actualizar, that);
		},
		

		sacarJugador: function(){
			for(var i = 0; i < that.listaJugadores.length; i++){
				if(that.listaJugadores[i].id == game.idJugador) that.listaJugadores.splice(i, 1);
			}
			sendMessage('volverLobby',{idPartida: that.idPartida}); 
			/*
			partida = {
					listaJugadores : that.listaJugadores,
					nJugadores : that.listaJugadores.length,
					idPartida : that.idPartida
			};
			//PUT
				  $.ajax({
				   method: "PUT",
				   url: 'http://localhost:8080/partida/out/' + that.idPartida,
				   data: that.i,
				   processData: false,
				   headers: {
				    "Content-Type": "application/json"
				   }
				  }).done(function (booleano) {
				   console.log("Partida updated");
				  });*/

		},
	
};