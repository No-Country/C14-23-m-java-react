package com.nocountry.finanzas.services;

import com.nocountry.finanzas.exceptions.BadRequestException;
import com.nocountry.finanzas.exceptions.EmailAlreadyExistsException;
import com.nocountry.finanzas.exceptions.InvalidEmailType;
import com.nocountry.finanzas.models.auth.AuthResponse;
import com.nocountry.finanzas.models.auth.AuthenticationRequest;
import com.nocountry.finanzas.models.auth.RegisterRequest;

public interface AuthService {

    void register(RegisterRequest request) throws BadRequestException, InvalidEmailType, EmailAlreadyExistsException;

    AuthResponse authenticate(AuthenticationRequest request) throws BadRequestException;

}
