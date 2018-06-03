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
		//JUGADORES
		//Se crean los jugadores
		jugador1 = new this.Jugador(2);
		jugador2 = new this.Jugador(3);

		//Decide que jugador es tu objetivo
		jugadorMorir = Math.floor((Math.random() * 2) + 2);
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
		icono0 = new this.Icono(10,10, Math.floor((Math.random() * 23)));
		icono1 = new this.Icono(110,10, Math.floor((Math.random() * 23)));
		icono2 = new this.Icono(210,10, Math.floor((Math.random() * 23)));
		iconos = [icono0, icono1, icono2];

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
		cartelJugadorMorir = game.add.text(350, 48, '', { fontSize: '20px', fill: '#000' });
		cartelJugadorSiguiente = game.add.text(350, 75, '', { fontSize: '18px', fill: '#000' });
		cartelJugadorFinal = game.add.text(100, 250, '', { fontSize: '27px', fill: '#FFF' });

	},
	update:function(){
		//Aumenta el alpha poco a poco para el fundido en negro
		if(oscureciendo){
			fadeBlack.alpha += 0.01;
			if(fadeBlack.alpha > 1){
				//jugador = 1;
				oscureciendo = false;
				fadeBlack.alpha = 0;
				jugador = 1;
			}
			
		}
		//Si están vivos se ejecutan sus códigos
		if(jugador1.vidas > 0 && jugador2.vidas > 0){
			if(state == "turnoJefe") this.turnoJefe();
			else if(state == "turnoJ2") this.turnoJugadores(jugador1);
			else if(state == "turnoJ3") this.turnoJugadores(jugador2);
		
		}else if(!oscureciendo){		
			if(jugador1.vidas > 0) this.final(jugador1);
			if(jugador2.vidas > 0) this.final(jugador2);
			fadeBlack.alpha = 1;
		}
		//console.log(botonPasarTurno);
	},
	Jugador: function(n){
		this.numero = n;
		this.vidas = 3;
	},
	Puerta: function(x, y, tipo, ind){
		this.marcada = false;
		this.x = x;
		this.y = y;
		this.spritePuerta = that.add.sprite(this.x, this.y, 'puerta0');
		this.spritePuerta.inputEnabled = true;
		this.spritePuerta.events.onInputDown.add(that.atravesarPuerta,that,0, this);
		function colocarEmoji(){
			for(var i = 0; i < iconos.length; i++){
				if(iconos[i].marcado && !this.marcada){
					that.resetIcono(iconos[i], iconos[i].indice);
					iconos[i].spriteIcono.x = x + 45;
					iconos[i].spriteIcono.y = y + 50;
					if(iconos[i].puertaAsignada != undefined) puertas[iconos[i].puertaAsignada].marcada = false;
					iconos[i].puertaAsignada = this.indice;
					this.marcada = true;
				}
			}
		}

		this.spritePuerta.events.onInputDown.add(colocarEmoji, this);
	},
	Icono: function(x,y,indice){
		//var spriteIcono;
		//var puertaAsignada;
		this.marcado = false;
		this.indice = indice;
		this.x = x;
		this.y = y;

		this.spriteIcono = game.add.sprite(this.x, this.y, 'iconos');
		this.spriteIcono.frame = indice;
		this.spriteIcono.inputEnabled = true;
		this.spriteIcono.events.onInputDown.add(remarcarIcono, this, 0, this.indice);

		function remarcarIcono(sprite, cursor){
			if(state == 'turnoJefe'){
				//Se resetean todos
				for(var i = 0; i < iconos.length; i++){
					that.resetIcono(iconos[i], iconos[i].indice);
				}
				this.spriteIcono.loadTexture('iconosDestacados');
				this.spriteIcono.frame = this.indice;
				this.marcado = true;
			}
		}
	},
	resetIcono: function(icono, indice){
		icono.marcado = false;
		icono.spriteIcono.loadTexture('iconos');
		icono.spriteIcono.frame = indice;
	},
	//Recibe la puerta
	atravesarPuerta: function(s,c, p){
		if(!pulsada){
			console.log(jugadorPrevio);
			//Dependiendo del tipo de puerta te produce un efecto u otro
			if(p.tipo == 1){
				//Pierdes medio corazón
				if(state == "turnoJ2") jugador1.vidas -= 0.5;
				else if(state == "turnoJ3") jugador2.vidas -= 0.5;		
				fadeBlack.loadTexture('rojo');
			}else if(p.tipo == 2){
				//Pierdes un corazón
				if(state == "turnoJ2") jugador1.vidas -= 1;
				else if(state == "turnoJ3") jugador2.vidas -= 1;	
				else jugador1.vidas -= 1;	
				fadeBlack.loadTexture('rojo');
			}else{
				fadeBlack.loadTexture('negro');
			}
			oscureciendo = true;

			//Se desmarcan todas las puertas
			for(var i = 0; i < puertas.length; i++){
				puertas[i].marcada = false;
			}
	
			//Se borran los iconos y se generan nuevos
			icono0.spriteIcono.destroy();
			icono1.spriteIcono.destroy();
			icono2.spriteIcono.destroy();
			icono0 = new that.Icono(10,10, Math.floor((Math.random() * 23)));
			icono1 = new that.Icono(110,10, Math.floor((Math.random() * 23)));
			icono2 = new that.Icono(210,10, Math.floor((Math.random() * 23)));
			iconos = [icono0, icono1, icono2];

			pulsada = true;
			state = "turnoJefe";
		}
	},
	turnoJefe: function(){
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
					//Va vaciando el array de forma aleatoria
					puertas[i].tipo = parseInt(arrayTipoPuerta.splice(Math.floor((Math.random() * arrayTipoPuerta.length)),1));
					//Dependiendo del tipo de puerta elige un nombre u otro
					puertas[i].spritePuerta.loadTexture(arraySpritePuerta[puertas[i].tipo]);

				}
			}
			//Muestra el objetivo
			cartelJugador.text = 'JUGADOR 1';
			cartelJugadorMorir.text = 'Debes acabar con el jugador ' + jugadorMorir;
			if(jugadorPrevio == 2) cartelJugadorSiguiente.text = 'El siguiente jugador es el jugador 3';
			else if(jugadorPrevio == 3) cartelJugadorSiguiente.text = 'El siguiente jugador es el jugador 2';

			function pasarTurno(){
				//Dependiendo del jugador que haya jugado antes el siguiente turno se le asigna a uno u otro
				if(jugadorPrevio == 2) state = "turnoJ3";
				else if(jugadorPrevio == 3) state = "turnoJ2";
				botonPasarTurno.destroy();
				botonPasarTurno = undefined;
				pulsada = false;
			}

	},
	turnoJugadores: function(j){
		if(arrayTipoPuerta.length < 4)	{
			arrayTipoPuerta = [0,0,1,2];
		}

		for(i = 0; i < 5;i++){
			//Coloca corazones según las vidas que tengas
			if(i < Math.floor(j.vidas)){
				arrayVidas[i].loadTexture('corazon');
			}else if(Math.floor(j.vidas) < j.vidas && i == Math.floor(j.vidas)){
				arrayVidas[i].loadTexture('medioCorazon');
			}else{
				arrayVidas[i].loadTexture('noCorazon');
			}	
		}

		//Se actualiza jugadorPrevio
		jugadorPrevio = j.numero;

		cartelJugadorMorir.text = '';
		cartelJugadorSiguiente.text = '';

		//Se le coloca el sprite básico de la puerta a todas
		for(var i = 0; i < 4; i++){
			puertas[i].spritePuerta.loadTexture('puerta0');
		}

		//Cartel que indica de quien es el turno
		if(j.numero == 2) cartelJugador.text = 'JUGADOR 2';
		if(j.numero == 3) cartelJugador.text = 'JUGADOR 3';
	},
	final: function(j){
		icono0.spriteIcono.destroy();
		icono1.spriteIcono.destroy();
		icono2.spriteIcono.destroy();
		cartelJugador.text = '';
		//Si logras el objetivo da un ganador y si no el otro
		if(j.numero != jugadorMorir){
			cartelJugadorFinal.text = 'Gana el jugador ' + j.numero;
		}else{
			cartelJugadorFinal.text = 'Ganan los jugadores 1 y ' + j.numero;
		}
		
	}
}