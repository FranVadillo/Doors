/*$( "p" ).click(function() {
  $( this ).slideUp();
});

//ESTE CÓDIGO CREA OBJETOS, PERFECTO PARA CUANDO TENGAMOS QUE CREAR PARTIDAS
$("<p class='seccion'>Esto es un div de sección</p><p>Este no lo es</p>")
  .filter(".seccion").click(function() {
    alert("Soy una sección!");
}).end().appendTo("#divPadre");
*/

var indice = 0

$( "#creacion" ).click(function() {
  	$("<p class='seccion'> </p>").text("Partida " + indice)
  	.filter(".seccion").click(function() {
    	alert("Nueva partida!");
	}).end().appendTo("#divPadre");
	indice++;
});
