package com.example.chat.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;


@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config){
        // El servidor enviará mensajes a los clientes que escuchen en "/topic"
        config.enableSimpleBroker("/topic");// se usa como estandar asi que lo dejo asi son mensajes del ervidor al cliente
        // Los mensajes que envíen los clientes al servidor empezarán por "/app"
        config.setApplicationDestinationPrefixes("/app");// lo mismo esta es lo que encia el cliente son mensajes del cliente al servidor
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry){
        // Esta es la URL donde el frontend se conectará
        registry.addEndpoint("/chat-socket").setAllowedOriginPatterns("*").withSockJS();
        //setAllowedOrigins("*"): Permite que cualquier web se conecte (útil en desarrollo).
        //withSockJS(): Es un "plan B". Si el navegador del usuario es viejo y no soporta WebSockets modernos,
        // usa esto para que el chat siga funcionando.
    }
}
