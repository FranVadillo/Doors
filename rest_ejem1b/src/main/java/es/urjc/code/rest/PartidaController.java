package es.urjc.code.rest;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PartidaController {
	
	@Autowired
	private ServicioPartida partidasService = new ServicioPartida();
	
	//GETS
	@RequestMapping(value = "/partidas", method = RequestMethod.GET)
	public ArrayList<Partida> getPartidas() {
		return this.partidasService.getPartidas();
	}
	@RequestMapping(value = "/partida/{id}", method = RequestMethod.GET)
	public Partida getPartida(@PathVariable("id") int index) {
		return this.partidasService.getPartida(index);
	}

	//POSTS
	@RequestMapping(value = "/partida/create", method = RequestMethod.POST)
	public ResponseEntity<Boolean> createPartida(@RequestBody Partida p){
		this.partidasService.createPartida(p);
		return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
	}
	//POST
	@RequestMapping(value = "/partida/add/{id}", method = RequestMethod.POST)
	public ResponseEntity<Partida> addJugadorAPartida(@PathVariable long id, @RequestBody Jugador j){
		this.partidasService.addJugadorAPartida(id, j);
		return new ResponseEntity<Partida>(this.partidasService.getPartida(id), HttpStatus.CREATED);
	}
	//PUT
	@PutMapping(value="/partida/out/{id}")
	public ResponseEntity<Boolean> sacaJugador(@PathVariable long id, @RequestBody Partida pActualizada) {
			this.partidasService.sacarJugador(pActualizada, id);
			return new ResponseEntity<Boolean>(true, HttpStatus.OK);
	}

	
}
