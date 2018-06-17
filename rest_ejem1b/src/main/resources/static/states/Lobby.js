Doors.Lobby = function(game){
	var textCrear, textPartida;
	var player;
	var that;
};


Doors.Lobby.prototype = {

	create: function(){
		that = this;

		this.guardarPartida();

		//Crea texto "Crear partida"
		textCrear = this.add.text(40, 40, 'Crear partida', {fill: "#fff"});
		textCrear.inputEnabled = true;
		textCrear.input.useHandCursor = true;
		textCrear.events.onInputDown.add(this.crearPartida, that);
		
	},
	
	update: function(){
	
		socket.onmessage = (message) => {
		
			var packet = JSON.parse(message.data);
		
			switch (packet.type) {
			case 'refresh':
				this.actualizar();					
				break;
			}
		}
	},
	actualizar: function(){
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
		if(game.listaPartidas.length >= 9){ 
			alert("No se pueden crear mas partidas");
		}else{
			partida = {};		
			sendMessage('crearPartida');
		}
	},
	entrarPartida: function(a, b, index){
		if(game.listaPartidas[index].nJugadores >= 3){
			alert("Numero maximo de jugadores");
			game.state.start('Lobby');
		}
		else{
			sendMessage('entrarPartida',{index:index});
		    console.log("Has entrado a partida");			
		    game.state.start('Partida', true, false, index);
		}
	},
	
	
	crearTexto: function(){
		var y = 100;

		//TEXTO PARTIDAS
		for(var i = 0; i < game.listaPartidas.length; i++){
			textPartida = that.add.text(40, y, 'Partida ' + game.listaPartidas[i].idPartida + "                 " + game.listaPartidas[i].nJugadores +"/3 jugadores", {fill: "#fff"});
			textPartida.inputEnabled = true;
			textPartida.input.useHandCursor = true;
			textPartida.events.onInputDown.add(that.entrarPartida, that, 0, game.listaPartidas[i].idPartida);
		    y += 50;
		}
		y = 70;
		
		textActualizar = that.add.text(750, 500, 'Actualizar', {fill:"#fff"});
		textActualizar.inputEnabled = true;
		textActualizar.input.useHandCursor = true;
		textActualizar.events.onInputDown.add(that.actualizar, that);
	}
	
};

