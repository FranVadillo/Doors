$( "p" ).click(function() {
  $( this ).slideUp();
});

//ESTE C�DIGO CREA OBJETOS, PERFECTO PARA CUANDO TENGAMOS QUE CREAR PARTIDAS
$("<p class='seccion'>Esto es un div de secci�n</p><p>Este no lo es</p>")
  .filter(".seccion").click(function() {
    alert("Soy una secci�n!");
}).end().appendTo("#divPadre");