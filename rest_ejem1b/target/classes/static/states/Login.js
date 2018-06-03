var Doors = {};

Doors.Login = function(game){
	
};

Doors.Login.prototype = {
	
	create: function(){
		var nombre = prompt("Introduce tu nombre", "Jugador");
		jugador = {
			nombre: nombre
		}

		//POST
		$.ajax({
		   method: "POST",
		   url: 'http://localhost:8080/jugador/create',
		   data: JSON.stringify(jugador),
		   processData: false,
		   headers: {
		    "Content-Type": "application/json"
		   }
		  }).done(function (jugador) {
		   console.log("Jugador created");
		   game.idJugador = jugador.id;
		   console.log(game.idJugador);
		 })
		 this.state.start('Lobby');
	}
	
	
};