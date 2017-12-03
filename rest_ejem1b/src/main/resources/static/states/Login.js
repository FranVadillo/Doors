var Doors = {};

Doors.Login = function(game){
	var jugador;
};

Doors.Login.prototype = {
	create: function(){
		game.listaPartidas = [];
		var nombre = prompt("Introduce tu nombre", "Jugador");
		jugador = {
			nombre: nombre
		};
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
		   game.state.start('Lobby');
		 })

	}

	/*
//GET {id}
$.ajax({
   url: 'http://localhost:8080/jugadores'
  }).done(function (jugadores) {
   console.log('Jugadores loaded: ' + JSON.stringify(jugadores));
   
  });*/

};