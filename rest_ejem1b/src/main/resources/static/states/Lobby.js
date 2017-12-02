Doors.Lobby = function(game){
	
};
Doors.Lobby.prototype = {
	preload: function(){
		var indice;
		var j0;
		var arrayPartidas;
		var text;
	},
	create: function(){
		this.indice = -1;
		this.arrayPartidas;
		//INICIALIZA J0
		$.ajax({
			url: 'http://localhost:8080/jugador/get/' + game.idJugador,
			}).done(function (jugador) {
				Doors.Lobby.prototype.j0 = jugador;
		});
		
		text = this.add.text(40, 40, 'Crear partida', {fill: '#ffffff'});
		text.inputEnabled = true;
		text.input.useHandCursor = true;
		text.events.onInputDown.add(this.crearPartida, this);
		
	},
	update: function(){
		this.mostrarPartidas(this.arrayPartidas);
	},
		
		crearPartida: function(){
			//POST
			$.ajax({
				method: "POST",
				url: 'http://localhost:8080/partida/create',
				data: JSON.stringify(Doors.Lobby.prototype.j0),
				processData: false,
				headers: {
					"Content-Type": "application/json"
				}
			}).done(function (partida) {
				Doors.Lobby.prototype.guardarPartida(partida);
			});
					
		},
		
		guardarPartida: function(partida){
			Doors.Lobby.prototype.arrayPartidas.push(partida);
		},
		
		listaPartidas: function(){
			$.ajax({
				url: 'http://localhost:8080/partidas'
				}).done(function (partidas) {
					Doors.Lobby.prototype.arrayPartidas = partidas;
			});
		},
		
		 addJugador:function(a, b, c, index, j){
			//PUT
				$.ajax({
				   method: "POST",
				   url: 'http://localhost:8080/partida/add/' + index,
				   data: JSON.stringify(j),
				   processData: false,
				   headers: {
				    "Content-Type": "application/json"
				   }
				  }).done(function (booleano) {
				   console.log("Jugador created: " + JSON.stringify(booleano));
				 });
		},
		mostrarPartidas: function(){
			var y = 40;
			for(var i = 0; i < Doors.Lobby.prototype.arrayPartidas.length; i++){
				text.Doors.Lobby.prototype.add.text(40, y, 'Partida ' + Doors.Lobby.prototype.arrayPartidas[i].idPartida, {fill: '#ffffff'});
				text.inputEnabled = true;
				text.input.useHandCursor = true;
				text.events.onInputDown.add(Doors.Lobby.prototype.addJugador, Doors.Lobby.prototype, 0, Doors.Lobby.prototype.arrayPartidas[i].idPartida, Doors.Lobby.prototype.j0);
				y += 40;
			}
		}
};