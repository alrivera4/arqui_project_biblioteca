package com.apigateway.Security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
//import org.springframework.security.web.server.context.SecurityContextServerWebExchangeWebFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

/*@Component
public class JwtAuthenticationFilter extends SecurityContextServerWebExchangeWebFilter {

    private final String SECRET_KEY = "miClaveSecretaJWT123";

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String authHeader = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            Claims claims = Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token)
                    .getBody();

            // Establecer el contexto de seguridad (si es necesario)
            String username = claims.getSubject();
            System.out.println("Usuario autenticado: " + username);
        }

        return chain.filter(exchange);
    }
}*/
