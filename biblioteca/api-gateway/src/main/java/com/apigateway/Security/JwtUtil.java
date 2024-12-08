package com.apigateway.Security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    // Método para generar un token JWT
    public String generateToken(String username) {
        // Configura la expiración del token (por ejemplo, 1 hora)
        long expirationTime = 1000 * 60 * 60;  // 1 hora
        Date expirationDate = new Date(System.currentTimeMillis() + expirationTime);

        return Jwts.builder()
                .setSubject(username)  // El nombre de usuario que va en el token
                .setIssuedAt(new Date())  // Fecha de emisión
                .setExpiration(expirationDate)  // Fecha de expiración
                .signWith(SignatureAlgorithm.HS256, secret)  // Firma con la clave secreta
                .compact();  // Genera el token en formato compactado
    }

    // Método para validar un token JWT
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Método para extraer los Claims (información) del token
    public Claims extractClaims(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    // Método para obtener el nombre de usuario desde el token
    public String getUsername(String token) {
        return extractClaims(token).getSubject();
    }
}
