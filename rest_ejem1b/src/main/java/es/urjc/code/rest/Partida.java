package es.urjc.code.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Component;

@Component 
public class Partida {

	private CopyOnWriteArrayList<Jugador> listaJugadores = new CopyOnWriteArrayList<Jugador>();
	private long idPartida;
	private int nJugadores = 0;
	private int[] emojis = new int[3];
	
	//CONSTRUCTORES
	public Partida() {}
	
	//GETS
	public ArrayList<Jugador> getListaJugadores() {
		return new ArrayList<Jugador>(this.listaJugadores);
	}
	public long getIdPartida() {
		return this.idPartida;
	}
	public int[] getEmojis() {
		return emojis;
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
	
	//Otros metodos
	public void addJugador(Jugador j) {
		this.listaJugadores.add(j);
		this.nJugadores++;
	}
	public void generarEmojis(){
		for(int i = 0; i<emojis.length;i++) {
			emojis[i] = (int)Math.floor((Math.random() * 23));
		}		
	}
	public void sacarJugador(long id) {
		for(Jugador j : listaJugadores) {
			if(j.getId() == id) {
				listaJugadores.remove(j);
				this.nJugadores--;
			}
		}
	}
}
