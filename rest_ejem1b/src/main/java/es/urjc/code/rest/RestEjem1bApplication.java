package es.urjc.code.rest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@EnableWebSocket
public class RestEjem1bApplication  implements WebSocketConfigurer {
	public static void main(String[] args) {
		SpringApplication.run(RestEjem1bApplication.class, args);
	}
	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(partidaController(), "/login");
	}

	@Bean
	public WebSocketHandler partidaController() {
		return new PartidaController();
	}
}
