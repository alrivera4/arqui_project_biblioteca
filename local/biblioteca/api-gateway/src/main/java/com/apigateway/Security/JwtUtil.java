package com.apigateway.Security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

    // Generar una clave secreta segura de 256 bits para HS256
    private static final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // Método para generar el token
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .signWith(SECRET_KEY)  // Usando la clave generada
                .compact();
    }

    // Método para extraer las claims del token
    public Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)  // Usando la misma clave para validar
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Método para verificar si el token ha expirado
    public Boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }
}

