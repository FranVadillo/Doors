package es.urjc.code.rest;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

public class Jugador {
	private long id;
	private String nombre; 
	private int puntos;
	private final WebSocketSession session;
	private Long partidaActualId;
	//se pueden añadir puntos
	
	//CONSTRUCTORES
	 public Jugador(long id, String nombre, WebSocketSession session) {
		 this.id = id;
		 this.nombre = nombre;
		 this.session = session;
	 }
	 
	protected void sendMessage(String msg) throws Exception {
			this.session.sendMessage(new TextMessage(msg));
		}

	//GETS
	public long getId() {
		return this.id;
	}
	public Long getPartidaActualId(){
		return this.partidaActualId;
	}
	public String getNombre() {
		return nombre;
	}
	public int getPuntos() {
		return puntos;
	}
	//SETS
	public void setId(long index) {
		this.id = index;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public void setPartidaActualId(Long p) {
		this.partidaActualId = p;
	}
	public void setPuntos(int puntos) {
		this.puntos = puntos;
	}

}
