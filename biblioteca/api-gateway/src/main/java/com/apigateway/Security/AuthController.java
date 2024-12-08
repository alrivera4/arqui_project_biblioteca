/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.apigateway.Security;

/**
 *
 * @author USER
 */


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserCredentials credentials) {
        System.out.println("Username: " + credentials.getUsername());
        System.out.println("Password: " + credentials.getPassword());

        if (credentials != null && "dmrodriguez9".equals(credentials.getUsername()) && "123456".equals(credentials.getPassword())) {
            String token = jwtUtil.generateToken(credentials.getUsername());
            return ResponseEntity.ok().body("Bearer " + token);
        } else {
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }
    }

}
