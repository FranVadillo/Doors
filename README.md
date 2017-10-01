# Doors
Guillermo Pitarque (g.pitarque@alumnos.urjc.es / GitHub:Knainwud) & Francisco Javier Vadillo (fj.vadillo@alumnos.urjc.es / GitHub:FranVadillo)

Nombre: Doors

Número de jugadores: 3

Resumen: A lo largo del juego, dos de los tres jugadores tendrán que ir atravesando puertas utilizando las indicaciones del tercer jugador. Una puerta puede ser 
	"segura", por lo que al atravesarla no pasará nada, o dañina, por lo que el jugador que la atraviese perderá una cantidad de puntos de vida. Esto sólo
	lo sabrá de antemano el jugador 3 (guía). El guía tendrá como misión acabar con uno de los otros dos jugadores y lograr que el otro sobreviva, y su única
	forma de conseguirlo será mediante la colocación de iconos en las puertas con los que podrá advertir o engañar al jugador al que le toque atravesarla.
	Los jugadores no sabrán si son la víctima o el protegido por lo que estará en su mano confiar o no en el guía que tendrá que tener ese factor en cuenta
	a la hora de mentir o no. Si el guía acaba con la víctima antes de que muera el protegido, logrará la victoria, en caso contrario ganará la víctima.


Flujo de una partida: al comenzar la partida se asignará su rol a cada jugador. Al comienzo de cada turno, el guía colocará los iconos que vea convenientes en cada
	puerta. Una vez termine de colocarlos, será el turno de uno de los otros dos jugadores, que se irán alternando. El jugador correspondiente elegirá una puerta 
	por la que pasar y al hacerlo recibirá, o no, daño (si recibe daño, el otro jugador recibirá algún tipo de indicación sobre ello, pero no la cantidad de vida
	que ha perdido). Una vez hecho esto, nos encontraremos ante un nuevo juego de puertas, el guía volverá a colocar los iconos y esta vez será el turno del otro
	jugador, y así sucesivamente hasta que uno de ellos muera.
