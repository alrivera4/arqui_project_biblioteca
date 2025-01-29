/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.apigateway.Security;

/**
 *
 * @author USER
 */




import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserCredentials credentials) {
        System.out.println("Solicitud recibida: " + credentials.getUsername());
        if ("dmrodriguez9".equals(credentials.getUsername()) && "123456".equals(credentials.getPassword())) {
            String token = jwtUtil.generateToken(credentials.getUsername());
            return ResponseEntity.ok().body("{\"token\":\"" + token + "\"}");
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }

}
