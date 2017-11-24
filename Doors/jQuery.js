$( "p" ).click(function() {
  $( this ).slideUp();
});

//ESTE CÓDIGO CREA OBJETOS, PERFECTO PARA CUANDO TENGAMOS QUE CREAR PARTIDAS
$("<p class='seccion'>Esto es un div de sección</p><p>Este no lo es</p>")
  .filter(".seccion").click(function() {
    alert("Soy una sección!");
}).end().appendTo("#divPadre");