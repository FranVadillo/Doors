package es.urjc.code.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Component;

@Component 
public class Partida {

	private ArrayList<Jugador> listaJugadores = new ArrayList<Jugador>();
	private long idPartida;
	private int nJugadores = 0;

	//CONSTRUCTORES
	public Partida() {}
	
	//GETS
	public ArrayList<Jugador> getListaJugadores() {
		return this.listaJugadores;
	}
	public long getIdPartida() {
		return this.idPartida;
	}

	public void addJugador(Jugador j) {
		this.listaJugadores.add(j);
		this.nJugadores++;
	}
	
	//SETS
	public void setId(long index) {
		this.idPartida = index;
	}
	public int getnJugadores() {
		return nJugadores;
	}
	public void setnJugadores(int nJugadores) {
		this.nJugadores = nJugadores;
	}
	
}
