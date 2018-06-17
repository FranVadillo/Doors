var Doors = {};
var rol;

Doors.Login = function(game){
	var jugador;
};

function sendMessage(action, data){
	let msg = {
		action: action,
		data: data
	};
	socket.send(JSON.stringify(msg));
};

Doors.Login.prototype = {
	create: function(){
		game.listaPartidas = [];

		var nombre = prompt("Introduce tu nombre", "Jugador");
		jugador = {
			nombre: nombre
		}
		
		console.log(nombre);
		sendMessage('nombreJugador',{nombre:nombre});
		game.state.start('Lobby');
		
	},


};	

/*		//POST
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
		   game.state.start('Lobby');
		 })

	}
*/
