package es.urjc.code.rest;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import org.json.*;

@RestController
public class PartidaController extends TextWebSocketHandler{
	
	private Map<Long, Jugador> jugadoresLobby = new HashMap<Long, Jugador>();
	private int turno = 1;
	
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
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

		try {		
			String payload = message.getPayload();	
			JSONObject obj = new JSONObject(payload);
			String action = obj.getString("action");
			Long idPartida;
			
			//Se asigna un rol a cada jugador
			//Se le pasa el rol a cada uno
			synchronized(this) {
			switch (action) {
			case "nombreJugador":
				long id = Long.valueOf(session.getId());
				String nombre = obj.getJSONObject("data").getString("nombre");
				Jugador j = new Jugador(id, nombre, session);
				this.jugadoresLobby.put(id, j);						
				break;
			case "entrarPartida":
				String index = obj.getJSONObject("data").getString("index");
				partidasService.addJugadorAPartida(Long.valueOf(index),jugadoresLobby.get(Long.valueOf(session.getId())));
				for(Jugador jugadorLobby : jugadoresLobby.values()) {
					if(jugadorLobby.getId() != Long.valueOf(session.getId())) jugadorLobby.sendMessage("{\"type\": \"refresh\"}");
				}
				break;
			case "volverLobby":
				idPartida = Long.valueOf(obj.getJSONObject("data").getString("idPartida"));
				partidasService.getPartida(idPartida).sacarJugador(Long.valueOf(session.getId()));
				for(Jugador jugadorLobby : jugadoresLobby.values()) {
					if(jugadorLobby.getId() != Long.valueOf(session.getId())) jugadorLobby.sendMessage("{\"type\": \"refresh\"}");
				}
				for(Jugador jugadorPartida : partidasService.getPartida(idPartida).getListaJugadores()){
							jugadorPartida.sendMessage(String.format("{\"type\": \"actualizaPartida\"}"));

						}
				break;
			case "empezarPartida":
				idPartida = Long.valueOf(obj.getJSONObject("data").getString("idPartida"));
				ArrayList<Integer> posiblesRoles = new ArrayList<Integer>(
				Arrays.asList(0, 1, 2));
				for(Jugador jugadorPartida : partidasService.getPartida(idPartida).getListaJugadores()) {
					jugadorPartida.setPartidaActualId(idPartida);
					int random = (int)Math.floor(Math.random()*posiblesRoles.size());
					int  rol = posiblesRoles.get(random);
					posiblesRoles.remove(random);					
					jugadorPartida.sendMessage(String.format("{\"type\": \"start\",\"rol\": \"%d\"}",rol));
				}
				partidasService.getPartida(idPartida).generarEmojis();
				break;
			case "crearPartida":
				Partida p = new Partida();
				partidasService.createPartida(p);
				for(Jugador jugadorLobby : jugadoresLobby.values()) {
					jugadorLobby.sendMessage("{\"type\": \"refresh\"}");
				}
				break;
			case "finalizar":				
				for(Jugador jugadorPartida : partidasService.getPartida(
					jugadoresLobby.get(Long.valueOf(session.getId())).getPartidaActualId()).getListaJugadores()) {
						jugadorPartida.sendMessage("{\"type\": \"finalizar\"}");					
					}
				break;
			case "moverEmoji":
				String x = obj.getJSONObject("data").getString("x");
				String y = obj.getJSONObject("data").getString("y");
				String indice = obj.getJSONObject("data").getString("indice");
				for(Jugador jugadorPartida : partidasService.getPartida(
					jugadoresLobby.get(Long.valueOf(session.getId())).getPartidaActualId()).getListaJugadores()) {
						jugadorPartida.sendMessage(String.format("{\"type\": \"moverEmoji\",\"x\": \"%s\",\"y\": \"%s\",\"indice\": \"%s\"}",x,y,indice));					
					}
				break;
			case "actualizarIconos":
				idPartida = jugadoresLobby.get(Long.valueOf(session.getId())).getPartidaActualId();
				partidasService.getPartida(idPartida).generarEmojis();
				int[] emojisAct =  partidasService.getPartida(jugadoresLobby.get(Long.valueOf(session.getId())).getPartidaActualId()).getEmojis();
				for(Jugador jugadorPartida : partidasService.getPartida(
					jugadoresLobby.get(Long.valueOf(session.getId())).getPartidaActualId()).getListaJugadores()) {
						jugadorPartida.sendMessage(String.format("{\"type\": \"crearIconos\",\"i1\": \"%d\",\"i2\":\"%d\",\"i3\":\"%d\"}",emojisAct[0],emojisAct[1],emojisAct[2]));					
				}
			
				break;
			case "atravesada":
				for(Jugador jugadorPartida : partidasService.getPartida(
					jugadoresLobby.get(Long.valueOf(session.getId())).getPartidaActualId()).getListaJugadores()) {
						jugadorPartida.sendMessage("{\"type\": \"atravesada\"}");					
					}
				break;
			case "pasarTurno":
				if(turno == 1) turno = 2;
				else turno = 1;
				for(Jugador jugadorPartida : partidasService.getPartida(
					jugadoresLobby.get(Long.valueOf(session.getId())).getPartidaActualId()).getListaJugadores()) {
						jugadorPartida.sendMessage(String.format("{\"type\": \"pasarTurno\",\"turno\": \"%d\"}",turno));

					}
				break;
			case "crearIconos":
				int[] emojis =  partidasService.getPartida(jugadoresLobby.get(Long.valueOf(session.getId())).getPartidaActualId()).getEmojis();
				for(Jugador jugadorPartida : partidasService.getPartida(
					jugadoresLobby.get(Long.valueOf(session.getId())).getPartidaActualId()).getListaJugadores()) {
						jugadorPartida.sendMessage(String.format("{\"type\": \"crearIconos\",\"i1\": \"%d\",\"i2\":\"%d\",\"i3\":\"%d\"}",emojis[0],emojis[1],emojis[2]));					
				}
				break;
			case "puertasMalas":
				//JSONArray puertas = obj.getJSONObject("data").getJSONArray("puertas");
				String indicePuerta = obj.getJSONObject("data").getString("indice");
				String tipo = obj.getJSONObject("data").getString("tipo");
				for(Jugador jugadorPartida : partidasService.getPartida(
					jugadoresLobby.get(Long.valueOf(session.getId())).getPartidaActualId()).getListaJugadores()) {
						jugadorPartida.sendMessage(String.format("{\"type\": \"puertasMalas\",\"indice\": \"%s\", \"tipo\": \"%s\"}",indicePuerta,tipo));					
				}
			}
			}
		} catch (Exception e) {
			System.err.println("Exception processing message " + message.getPayload());
			e.printStackTrace(System.err);
		}
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {

		System.out.println("Connection closed. Session " + session.getId());

	}
	
	public void refreshLobby() throws Exception{
		for(Jugador jugadorLobby : jugadoresLobby.values()) {
			jugadorLobby.sendMessage("{\"type\": \"refresh\"}");
		}
	}

		
}
