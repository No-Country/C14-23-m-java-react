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
    public ResponseEntity<?> register(@RequestBody @Valid RegisterRequest request) throws BadRequestException {
        try {
            authService.register(request);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (BadRequestException | InvalidEmailType e) {
            throw new BadRequestException(e.getMessage());
        } catch (EmailAlreadyExistsException e) {
            throw new RuntimeException(e);
        }

    }

    @PostMapping(path = "/authenticate")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody @Valid AuthenticationRequest request) throws BadRequestException {
        try {
            System.out.println("en el controller con la request: " + request.toString());
            AuthResponse response = authService.authenticate(request);
            System.out.println("En el controller todo ok por enviar respuesta");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (BadRequestException e) {
            throw new BadRequestException(e.getMessage());
        }
    }


}
