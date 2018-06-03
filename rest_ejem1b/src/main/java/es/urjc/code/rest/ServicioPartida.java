package es.urjc.code.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Component;

@Component 
public class ServicioPartida {
	
	private Map<Long, Partida> partidas = new HashMap<Long, Partida>();
	private AtomicLong prevId = new AtomicLong();
	
	//CONSTRUCTORES
	public ServicioPartida() {}
	
	//GETS
	public ArrayList<Partida> getPartidas(){
		return new ArrayList<Partida>(this.partidas.values());
	}
	public Partida getPartida(long id) {
		return this.partidas.get(id);
	}

	//SETS
	public void createPartida(Partida p) {
		long id = this.prevId.getAndIncrement();
		p.setId(id);
		this.partidas.put(id, p);
	}
	public void addJugadorAPartida(long index, Jugador j) {
		this.partidas.get(index).addJugador(j);
	}
	
	//PUT
	public void sacarJugador(Partida p, long idP) {
		//this.partidas.get(idP).setnJugadores(this.partidas.get(idP).getnJugadores() - 1);
		this.partidas.put(idP, p);
	}
}
