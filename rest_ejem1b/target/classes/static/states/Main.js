var game = new Phaser.Game(1024, 576, Phaser.AUTO);

game.idJugador;
game.listaPartidas;

game.state.add('Login', Doors.Login);
game.state.add('Lobby', Doors.Lobby);
game.state.add('Partida', Doors.Partida);
game.state.add('Menu', Doors.Menu);
game.state.add('Instrucciones', Doors.Instrucciones);
game.state.add('Juego', Doors.JuegoBien); 

var socket;
this.connect();

function connect() {
	
	socket = new WebSocket("ws://localhost:8080/login");

	socket.onopen = () => {
		console.log('Info: WebSocket connection opened.');	
		game.state.start('Login');

	}

	socket.onclose = () => {
		console.log('Info: WebSocket closed.');
	}

}