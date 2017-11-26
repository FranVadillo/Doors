var nombre = prompt("Please enter your name", "Nombre");

jugador = {
	id: 0,
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
   console.log("Jugador created: " + JSON.stringify(jugador));
 });
/*
//GET
$.ajax({
   url: 'http://localhost:8080/partida/0'
  }).done(function (jugadores) {
   console.log('Jugadores loaded: ' + JSON.stringify(jugador));
 });*/