Doors.JuegoBien = function(game){
	var iconos, puertas;
	var fadeBlack,oscureciendo;
	var jugadorMorir, jugadorPrevio;
	var cartelJugador, cartelJugadorMorir,cartelJugadorFinal;
	var jugador1, jugador2;
	var arrayTipoPuerta,arrayTipoPuertaMaster,arraySpritePuerta,arrayVidas;
	var botonPasarTurno;
	var pulsada;
	var state;
	var vida0, vida1, vida2, vida3, vida4;
	var puerta0, puerta1, puerta2, puerta3;
	var icono0, icono1, icono2;
	var that;
	var vidas;
	var turno;
	var done;
}
Doors.JuegoBien.prototype = {
	preload:function(){
		game.load.image		('fondo', 'assets/fondo.png');
	    game.load.image		('puerta0', 'assets/puerta0.png');
	    game.load.image		('puerta1', 'assets/puerta1.png');
		game.load.image		('puerta2', 'assets/puerta2.png');	
		game.load.image		('puerta3', 'assets/puerta3.png');	
		game.load.image		('flecha', 'assets/flechita.png');
		game.load.image		('negro','assets/negro.png');
		game.load.image		('rojo','assets/rojo.png');
		game.load.image		('corazon','assets/corazonEntero.png');
		game.load.image		('medioCorazon','assets/medioCorazon.png');
		game.load.image		('noCorazon','assets/corazonTransparente.png');
		game.load.image		('botonPasar','assets/botonPasarTurno.png')
		game.load.spritesheet	('iconos', 'assets/SpriteSheetEmojis.png', 102, 100,23);
		game.load.spritesheet	('iconosDestacados', 'assets/SpriteSheetEmojisDestacados.png', 102, 100, 23);
	},
	create:function(){

		that = this;
		this.add.sprite(0, 0, 'fondo');
		state = "turnoJefe";
		turno = 0;
		vidas = 3;
		muerto = false;
		done = false;
		
		//Decide que jugador es tu objetivo
		jugadorMorir = Math.floor((Math.random() * 2) + 1);
		//El server tiene que saber esto
		
		//Memoria de que jugador era el anterior para saber cual es el siguiente
		jugadorPrevio = 3;
		
		//PUERTAS
		//Array del que se saca el orden de las puertas
		arrayTipoPuerta = [0,0,1,2];
		
		puerta0 = new this.Puerta(50,215,0, 0);
		puerta1 = new this.Puerta(300,200,0, 1);
		puerta2 = new this.Puerta(550,215,0, 2);
		puerta3 = new this.Puerta(800,200,0, 3);
		puertas = [puerta0, puerta1, puerta2, puerta3];

		//Se guardan los nombres de las puertas para acceder luego desde el loadTexture
		arraySpritePuerta = ['puerta0','puerta1','puerta2','puerta3'];

		//ICONOS
		icono0 = new this.Icono(10,10, 0);
		icono1 = new this.Icono(110,10, 0);
		icono2 = new this.Icono(210,10, 0);
		iconos = [icono0, icono1, icono2];
		sendMessage('crearIconos');

		//Vidas
		vida0 = game.add.sprite(910,24,'noCorazon');
		vida1 = game.add.sprite(860,24,'noCorazon');
		vida2 = game.add.sprite(810,24,'noCorazon');
		vida3 = game.add.sprite(760,24,'noCorazon');
		vida4 = game.add.sprite(710,24,'noCorazon');
		arrayVidas = [vida0, vida1, vida2, vida3, vida4];

		//Variables para el difuminado tanto a negro como a rojo
		fadeBlack = game.add.sprite(0, 0, 'negro');
		fadeBlack.alpha = 0;
		oscureciendo = false;

		//Bot�n de pasar turno
		botonPasarTurno = undefined;
		pulsada = true;

		//Textos
		cartelJugador = game.add.text(400, 16, '', { fontSize: '32px', fill: '#000' });
		cartelJugador.text = 'JUGADOR ' + rol;
		cartelJugadorMorir = game.add.text(350, 48, '', { fontSize: '20px', fill: '#000' });
		cartelJugadorSiguiente = game.add.text(350, 75, '', { fontSize: '18px', fill: '#000' });
		cartelJugadorFinal = game.add.text(100, 250, '', { fontSize: '27px', fill: '#FFF' });

	},
	update:function(){
		if(rol != 0){
			for(i = 0; i < 5;i++){
				//Coloca corazones según las vidas que tengas
				if(i < Math.floor(vidas)){
					arrayVidas[i].loadTexture('corazon');
				}else if(Math.floor(vidas) < vidas && i == Math.floor(vidas)){
					arrayVidas[i].loadTexture('medioCorazon');
				}else{
					arrayVidas[i].loadTexture('noCorazon');
				}	
			}
		}
		//Aumenta el alpha poco a poco para el fundido en negro
		if(oscureciendo){
			fadeBlack.alpha += 0.01;
			if(fadeBlack.alpha > 1){
				oscureciendo = false;
				fadeBlack.alpha = 0;
				state = "turnoJefe";
			}
			
		}
		//Si están vivos se ejecutan sus códigos
		if(!oscureciendo){
			if(vidas > 0){
				if(state == "turnoJefe") this.turnoJefe();
				else if(state == "turnoJ2" || state == "turnoJ3") this.turnoJugadores();
			}else{	
				//Se avisa de que memuerto
				muerto = true;
				this.final();
				fadeBlack.alpha = 1;
				sendMessage('finalizar');
			}
		}
		socket.onmessage = (message) => {
			
			var packet = JSON.parse(message.data);
			
			switch (packet.type) {
				case 'finalizar':
					that.final();		
					break;
				case 'crearIconos':
					this.resetIcono(iconos[0],packet.i1);
					this.resetIcono(iconos[1],packet.i2);
					this.resetIcono(iconos[2],packet.i3);
					break;
				case 'moverEmoji':
					iconos[packet.indice].spriteIcono.x = packet.x;
					iconos[packet.indice].spriteIcono.y = packet.y;
					break;
				case 'atravesada':
					turno = 0;
					state = "turnoJefe";
					that.atravesada();				
					break;		
				case 'pasarTurno':
					turno = packet.turno;
					if(turno == 1) state = "turnoJ2";
					else state = "turnoJ3";
					pulsada = false;
					cartelJugadorSiguiente.text = "Turno del jugador " + turno;
					break;		
				case 'puertasMalas':
					puertas[packet.indice].tipo = packet.tipo;			
					break;
			}
		}
	},

	Puerta: function(x, y, tipo, ind){
		this.marcada = false;
		this.x = x;
		this.y = y;
		this.spritePuerta = that.add.sprite(this.x, this.y, 'puerta0');
		this.spritePuerta.inputEnabled = true;
		this.spritePuerta.events.onInputDown.add(that.atravesarPuerta,that,0, this);
		this.spritePuerta.events.onInputDown.add(colocarEmoji, this);
		
		function colocarEmoji(){
			for(var i = 0; i < iconos.length; i++){
				if(iconos[i].marcado && !this.marcada){
					that.resetIcono(iconos[i], iconos[i].indice);
					//Se coloca el emoji a todos los jugadores
					this.marcada = true;
					//Enviarse un mensaje con la posicion e indice del emoji
					sendMessage('moverEmoji', {x: x + 45, y: y + 50, indice: i});
				}
			}
		}

	},
	Icono: function(x,y,indice){

		this.marcado = false;
		this.indice = indice;
		this.x = x;
		this.y = y;

		this.spriteIcono = game.add.sprite(this.x, this.y, 'iconos');
		this.spriteIcono.frame = indice;
		this.spriteIcono.inputEnabled = true;
		this.spriteIcono.events.onInputDown.add(remarcarIcono, this, 0, this.indice);
		
		function remarcarIcono(sprite, cursor){
			if(state == 'turnoJefe' && rol == 0){
				//Se resetean todos
				for(var i = 0; i < iconos.length; i++){
					that.resetIcono(iconos[i], parseInt(iconos[i].indice));
				}
				this.spriteIcono.loadTexture('iconosDestacados');
				this.spriteIcono.frame = this.indice;
				this.marcado = true;
			}
		}
	},
	resetIcono: function(icono, indice){
		if(icono.spriteIcono != null){
			icono.marcado = false;
			icono.spriteIcono.loadTexture('iconos');
			icono.spriteIcono.frame = parseInt(indice);
			icono.indice = indice;
		}
	},
	//Recibe la puerta
	atravesarPuerta: function(s,c, p){
		if(rol == turno){
			if(!pulsada){
				//Dependiendo del tipo de puerta te produce un efecto u otro
				if(p.tipo == 1){
					//Pierdes medio corazón
					vidas -= 0.5;	
					fadeBlack.loadTexture('rojo');
				}else if(p.tipo == 2){
					//Pierdes un corazón
					vidas -= 1;	
					fadeBlack.loadTexture('rojo');
				}else{
					fadeBlack.loadTexture('negro');
				}
				sendMessage('atravesada');
			}
		}
	},
	atravesada: function(){
		oscureciendo = true;

		//Se desmarcan todas las puertas
		for(var i = 0; i < puertas.length; i++){
			puertas[i].marcada = false;
		}

		//Se borran los iconos y se generan nuevos
		icono0.spriteIcono.destroy();
		icono1.spriteIcono.destroy();
		icono2.spriteIcono.destroy();
		icono0 = new this.Icono(10,10, 0);
		icono1 = new this.Icono(110,10, 0);
		icono2 = new this.Icono(210,10, 0);
		iconos = [icono0, icono1, icono2];
		if(rol == 0) sendMessage('actualizarIconos');
		cartelJugadorSiguiente.text = "Turno del jugador 0";
		pulsada = true;
		done = false;
	},
	turnoJefe: function(){
		if(rol == 0 && !done){
			done = true;
			//Si no hay botón para pasar de turno lo crea
			if(botonPasarTurno == undefined){
				botonPasarTurno = game.add.sprite(850,525,'botonPasar');
				botonPasarTurno.inputEnabled = true;
				botonPasarTurno.events.onInputDown.add(pasarTurno,this);
			}

			//Deja de mostrar las vidas
			for(i = 0; i<=4;i++){
				arrayVidas[i].loadTexture('noCorazon'); 
			}

			//Mientras haya elementos en el array
			if(arrayTipoPuerta.length > 0){
				for(var i = 0; i < 4; i++){
					if(puertas[i].spritePuerta != null){
						//Va vaciando el array de forma aleatoria
						puertas[i].tipo = parseInt(arrayTipoPuerta.splice(Math.floor((Math.random() * arrayTipoPuerta.length)),1));
						//Dependiendo del tipo de puerta elige un nombre u otro
						puertas[i].spritePuerta.loadTexture(arraySpritePuerta[puertas[i].tipo]);
					}
				}			
			}
			//Muestra el objetivo
			cartelJugadorMorir.text = 'Debes acabar con el jugador ' + jugadorMorir;
			if(jugadorPrevio == 2){
				cartelJugadorSiguiente.text = 'El siguiente jugador es el jugador 2';
				jugadorPrevio = 3;
			}
			else if(jugadorPrevio == 3){
				cartelJugadorSiguiente.text = 'El siguiente jugador es el jugador 1';
				jugadorPrevio = 2;
			}

			function pasarTurno(){
				//Dependiendo del jugador que haya jugado antes el siguiente turno se le asigna a uno u otro
				//Se avisa a todos del nuevo turno
				sendMessage("pasarTurno");
				botonPasarTurno.destroy();
				botonPasarTurno = undefined;
				if(arrayTipoPuerta.length < 4)	{
					arrayTipoPuerta = [0,0,1,2];
				}
				for(var i = 0; i < 4; i++){
					sendMessage('puertasMalas', {indice: i, tipo: puertas[i].tipo});
				}			
			}
		}
	},
	turnoJugadores: function(){
		if(rol == turno){	
			cartelJugadorMorir.text = '';
			cartelJugadorSiguiente.text = '';
		
			//Se le coloca el sprite básico de la puerta a todas
			for(var i = 0; i < 4; i++){
				puertas[i].spritePuerta.loadTexture('puerta0');
			}
		}
	},
	final: function(){
		icono0.spriteIcono.destroy();
		icono1.spriteIcono.destroy();
		icono2.spriteIcono.destroy();
		puerta0.spritePuerta.destroy();
		puerta1.spritePuerta.destroy();
		puerta2.spritePuerta.destroy();
		puerta3.spritePuerta.destroy();
		
		cartelJugador.text = '';
		cartelJugadorSiguiente.text = '';

		if(muerto) cartelJugadorFinal.text = 'Has perdido';
		else{
			fadeBlack = game.add.sprite(0, 0, 'negro');
			cartelJugadorFinal = game.add.text(100, 250, '', { fontSize: '27px', fill: '#FFF' });
			cartelJugadorFinal.text = 'Has ganado';
		}

	}
}