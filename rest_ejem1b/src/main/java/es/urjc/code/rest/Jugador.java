package es.urjc.code.rest;

public class Jugador {
	private long id;
	private String nombre = ""; 
	//se pueden añadir puntos
	
	//CONSTRUCTORES
	public Jugador() {
		this.id = -1;
	}
	public Jugador(String name) {
		this.id = -1;
		this.nombre = name;
	}

	//GETS
	public long getId() {
		return this.id;
	}
	
	//SETS
	public void setId(long index) {
		this.id = index;
	}
}
