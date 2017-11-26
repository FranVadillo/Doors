var indice = 0

var j0 = $.ajax({
			 url: 'http://localhost:8080/jugador/get',
			 data: 0
			}).done(function (jugadores) {
				console.log('Jugadores loaded: ' + JSON.stringify(jugador));
			});

$( "#creacion" ).click(function() {
  	$("<p class='seccion'> </p>").text("Partida " + indice)
  	.filter(".seccion").click(function() {
  	//POST
  		$.ajax({
  		   method: "POST",
  		   url: 'http://localhost:8080/partida/create',
  		   data: j0,
  		   processData: false,
  		   headers: {
  		    "Content-Type": "application/json"
  		   }
  		  }).done(function (jugador) {
  		   console.log("Jugador created: " + JSON.stringify(jugador));
  		 });
	}).end().appendTo("#divPadre");
});
