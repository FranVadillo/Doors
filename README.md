# Doors
Guillermo Pitarque (g.pitarque@alumnos.urjc.es / GitHub:Knainwud) & Francisco Javier Vadillo (fj.vadillo@alumnos.urjc.es / GitHub:FranVadillo)

Nombre: Doors

Número de jugadores: 3

https://www.youtube.com/watch?v=bAhw3g7Md54&feature=youtu.be

Resumen: A lo largo del juego, dos de los tres jugadores tendrán que ir atravesando puertas utilizando las indicaciones del tercer jugador. Una puerta puede ser 
	"segura", por lo que al atravesarla no pasará nada, o dañina, por lo que el jugador que la atraviese perderá una cantidad de puntos de vida. Esto sólo
	lo sabrá de antemano el jugador 3 (guía). El guía tendrá como misión acabar con uno de los otros dos jugadores y lograr que el otro sobreviva, y su única
	forma de conseguirlo será mediante la colocación de iconos en las puertas con los que podrá advertir o engañar al jugador al que le toque atravesarla.
	Los jugadores no sabrán si son la víctima o el protegido por lo que estará en su mano confiar o no en el guía que tendrá que tener ese factor en cuenta
	a la hora de mentir o no. Si el guía acaba con la víctima antes de que muera el protegido, logrará la victoria, en caso contrario ganará la víctima.


Flujo de una partida: 

[![](https://i.gyazo.com/9fb10b72730b09da46b46a95871a1515.png)]()

Menú sencillo con opción de jugar y de ver las instrucciones.

[![](https://i.gyazo.com/19117cc7837a85574eebe4137947b58f.png)]()
_________________________________________________________________________________________
Al comienzo de cada turno, el guía colocará los iconos que vea convenientes en cada puerta. Una vez termine de colocarlos, será el turno de uno de los otros dos jugadores, que se irán alternando.

[![](https://i.gyazo.com/f4cf4f8eadea9ea93bcde2d8336753fb.png)]()
_________________________________________________________________________________________
El jugador correspondiente elegirá una puerta por la que pasar y al hacerlo recibirá, o no, daño (si recibe daño, el otro jugador recibirá algún tipo de indicación sobre ello, pero no la cantidad de vida que ha perdido).
	
[![](https://i.gyazo.com/01bf5241f2d3c09cfba8ec9b05d9b56f.png)]()
_________________________________________________________________________________________
Una vez hecho esto, nos encontraremos ante un nuevo juego de puertas, el guía volverá a colocar los iconos y esta vez será el turno del otro jugador, y así sucesivamente hasta que uno de ellos muera.
	
[![](https://i.gyazo.com/d0b7c04aeca0e93a18680b547cb1601d.png)]()

_________________________________________________________________________________________

Diadrama de clases

[![](https://i.gyazo.com/49f50b61e4c42a4efa2a7f7fcf90f24e.png)]()

_________________________________________________________________________________________

Protocolo de websockets

Se mandan mensajes que comunican el cliente y el servidor mediante websockets. Estos mensajes utilizan un formato JSON para su facil interpretación por parte de ambos. Internamente todos comparte un campo "type", donde se indica el tipo de mensaje, y un campo data, que incluye todos los datos que se quieran comunicar.

Tipos de mensaje:

nombreJugador: envía el nombre desde cliente y crea un objeto Jugador con ese nombre.

crearPartida: crea una partida.

entrarPartida: introduce al jugador en una partida.

empezarPartida: inicia el juego para una determinada partida.

finalizar: comunica que la partida ha terminado.

moverEmoji: se utiliza para transmitir el movimiento de los iconos sobre las puertas.

pasarTurno: comunica que un jugador ha terminado su turno.

puertasMalas: indica que puertas son las que te penalizan.

crear iconos: genera los iconos que se han de colocar.

actualizarIconos: una vez acabado un turno, cambia los iconos.

atravesada: indica que has atravesado una puerta.

volverLobby: indica que un jugador ha vuelto al lobby.
