package es.urjc.code.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JugadorController {

	private Map<Long, Jugador> jugadoresLobby = new HashMap<Long, Jugador>();
	private AtomicLong prevId = new AtomicLong();
	
	//GETS
	 @RequestMapping(value = "/jugador/get/{id}", method = RequestMethod.GET)
	 public ResponseEntity<Jugador> getJugador(@PathVariable long id) {
	  Jugador j = jugadoresLobby.get(id);
	  if (j != null) {
	   return new ResponseEntity<>(j, HttpStatus.OK);
	  } else {
	   return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	  }
	 }

	
	//POSTS
	@RequestMapping(value = "/jugador/create", method = RequestMethod.POST)
	public ResponseEntity<Jugador> addJugador(@RequestBody Jugador j){
		long id = this.prevId.getAndIncrement();
		j.setId(id);
		this.jugadoresLobby.put(id, j);
		return new ResponseEntity<Jugador>(j, HttpStatus.CREATED);
	}
	
}
