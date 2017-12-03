Doors.Lobby = function(game){
	var textCrear, textPartida;
	var y;
	var player;
	var that;
};
Doors.Lobby.prototype = {

	create: function(){
		that = this;

		$.ajax({
			   url: 'http://localhost:8080/jugador/get/' + game.idJugador
		}).done(function (jugadorAct) {
				  that.player = jugadorAct;
				  	console.log(that.player);
		});

		this.guardarPartida();

		//Crea texto "Crear partida"
		textCrear = this.add.text(40, 40, 'Crear partida', {fill: "#fff"});
		textCrear.inputEnabled = true;
		textCrear.input.useHandCursor = true;
		textCrear.events.onInputDown.add(this.crearPartida, that);
	},
	actualizar: function(){
		console.log("actualizando");
		game.state.start('Lobby');
	},
	guardarPartida: function(){
		$.ajax({
			   url: 'http://localhost:8080/partidas'
			  }).done(function (partidas) {
				  game.listaPartidas = partidas.slice();
				  that.crearTexto();
			  })
	},
	crearPartida: function(){	
		if(game.listaPartidas.length >= 8){ 
			alert("No se pueden crear mas partidas");
		}else{
			partida = {};		
			//POST crear partida
			$.ajax({
				   method: "POST",
				   url: 'http://localhost:8080/partida/create',
				   data: JSON.stringify(partida),
				   processData: false,
				   headers: {
					   "Content-Type": "application/json"
				   }
			}).done(function (booleano) {
				    console.log("Partida created");
			})	
			game.state.start('Lobby');
		}
	},
	entrarPartida: function(a, b, index){
		if(game.listaPartidas[index].nJugadores >= 3){
			alert("Numero maximo de jugadores");
			game.state.start('Lobby');
		}
		else{
			$.ajax({
				   method: "POST",
				   url: 'http://localhost:8080/partida/add/' + index,
				   data: JSON.stringify(that.player),
				   processData: false,
				   headers: {
					   "Content-Type": "application/json"
				   }
			}).done(function (partida) {
				
				    console.log("Has entrado a partida");
					game.state.start('Partida', true, false, index);
			})	
		}
	},
	crearTexto: function(){
		var y = 70;

		//TEXTO PARTIDAS
		for(var i = 0; i < game.listaPartidas.length; i++){
			textPartida = that.add.text(40, y, 'Partida ' + game.listaPartidas[i].idPartida + "                 " + game.listaPartidas[i].nJugadores +"/3 jugadores", {fill: "#fff"});
			textPartida.inputEnabled = true;
			textPartida.input.useHandCursor = true;
			textPartida.events.onInputDown.add(that.entrarPartida, that, 0, game.listaPartidas[i].idPartida);
		    y += 50;
		}
		y = 70;
		
		textActualizar = that.add.text(200, 20, 'Actualizar', {fill:"#fff"});
		textActualizar.inputEnabled = true;
		textActualizar.input.useHandCursor = true;
		textActualizar.events.onInputDown.add(that.actualizar, that);
	},
	actualizarJugador(){
		console.log(game.idJugador);
		$.ajax({
			   url: 'http://localhost:8080/jugador/get/' + game.idJugador
			  }).done(function (jugador) {
				  that.jugador = this.jugador;
			  });
	}
};