package es.urjc.code.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Component;

@Component 
public class Partida {

	private Map<Long, Jugador> listaJugadores = new HashMap<Long, Jugador>();
	private AtomicLong prevId = new AtomicLong();
	private long idPartida;
	private int nJugadores = 0;

	//CONSTRUCTORES
	public Partida() {}
	public Partida(Jugador j0) {
		long id = this.prevId.getAndIncrement();
		j0.setId(id);
		this.listaJugadores.put(id, j0);
		this.idPartida = -1;
		nJugadores++;
	}
	
	//GETS
	public ArrayList<Jugador> getJugadores() {
		return new ArrayList<Jugador>(this.listaJugadores.values());
	}
	public long getIdPartida() {
		return this.idPartida;
	}
	
	//SETS
	public void addJugador(Jugador j) {
		long id = this.prevId.getAndIncrement();
		j.setId(id);
		this.listaJugadores.put(id, j);
		nJugadores++;
	}
	public void setId(long index) {
		this.idPartida = index;
	}
	
}
