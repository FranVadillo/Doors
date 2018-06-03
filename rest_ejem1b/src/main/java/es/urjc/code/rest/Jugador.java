package es.urjc.code.rest;

public class Jugador {
	private long id;
	private String nombre; 
	private int puntos;
	//se pueden añadir puntos
	
	//CONSTRUCTORES
	 public Jugador() {}

	//GETS
	public long getId() {
		return this.id;
	}
	
	//SETS
	public void setId(long index) {
		this.id = index;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public int getPuntos() {
		return puntos;
	}

	public void setPuntos(int puntos) {
		this.puntos = puntos;
	}
}
