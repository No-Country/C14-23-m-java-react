package com.nocountry.finanzas.controller;

import com.nocountry.finanzas.exceptions.BadRequestException;
import com.nocountry.finanzas.exceptions.EmailAlreadyExistsException;
import com.nocountry.finanzas.exceptions.InvalidEmailType;
import com.nocountry.finanzas.models.auth.AuthResponse;
import com.nocountry.finanzas.models.auth.AuthenticationRequest;
import com.nocountry.finanzas.models.auth.RegisterRequest;
import com.nocountry.finanzas.services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    private final AuthService authService;

    @PostMapping(path = "/register", consumes = "application/json")
    public ResponseEntity<AuthResponse> register(@RequestBody @Valid RegisterRequest request) {
        try {
            AuthResponse response = authService.register(request);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (BadRequestException | InvalidEmailType e) {
            return ResponseEntity.badRequest().build();
        } catch (EmailAlreadyExistsException e) {
            throw new RuntimeException(e);
        }

    }

    @PostMapping(path = "/authenticate", consumes = "application/json")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody @Valid AuthenticationRequest request) {
        try {
            AuthResponse response = authService.authenticate(request);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().build();
        }
    }


}
