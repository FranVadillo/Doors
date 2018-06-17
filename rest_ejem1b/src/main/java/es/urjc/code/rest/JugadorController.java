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
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@RestController
public class JugadorController{

//	private Map<Long, Jugador> jugadoresLobby = new HashMap<Long, Jugador>();
	private AtomicLong prevId = new AtomicLong();

	/*
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

	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

		try {
			
			long id = Long.valueOf(session.getId());
			String payload = message.getPayload();			
			Jugador j = new Jugador(id, payload, session);
			this.jugadoresLobby.put(id, j);


		} catch (Exception e) {
			System.err.println("Exception processing message " + message.getPayload());
			e.printStackTrace(System.err);
		}
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {

		System.out.println("Connection closed. Session " + session.getId());

	}
*/	
}
