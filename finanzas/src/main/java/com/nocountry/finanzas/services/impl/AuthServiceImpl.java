package com.nocountry.finanzas.services.impl;

import com.nocountry.finanzas.entities.User;
import com.nocountry.finanzas.entities.enums.Countries;
import com.nocountry.finanzas.entities.enums.Role;
import com.nocountry.finanzas.exceptions.BadRequestException;
import com.nocountry.finanzas.exceptions.EmailAlreadyExistsException;
import com.nocountry.finanzas.exceptions.InvalidEmailType;
import com.nocountry.finanzas.models.auth.AuthResponse;
import com.nocountry.finanzas.models.auth.AuthenticationRequest;
import com.nocountry.finanzas.models.auth.RegisterRequest;
import com.nocountry.finanzas.repositories.UserRepository;
import com.nocountry.finanzas.services.AuthService;
import com.nocountry.finanzas.validators.BirthdayValidator;
import com.nocountry.finanzas.validators.EmailValidatorLocal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    private final EmailValidatorLocal emailValidator;

    private final BirthdayValidator birthdayValidator;


    @Override
    public AuthResponse register(RegisterRequest request) throws BadRequestException, InvalidEmailType, EmailAlreadyExistsException {
        doEmailValidation(request.getEmail());
        doBirthdayValidation(request.getBirthdayDate());
        doUserExistingValidator(request.getEmail());

        System.out.println("Toda slas validaciones ok.. estamos enn el service ");
        String passw = passwordEncoder.encode(request.getPassword1());
        System.out.println("password encriptado: " + passw);

        var user = User.builder()
                .name(request.getName())
                .last_name(request.getLastName())
                .email(request.getEmail())
                .birthday_date(request.getBirthdayDate())
                .password(passwordEncoder.encode(request.getPassword1()))
                .country(Countries.valueOf(request.getCountry()))
                .role(Role.USER)
                .accumulatedSavings(0.0)
                .countLogging(0)
                .totalIncome(0.0)
                .build();

        System.out.println(" Antes del save repository");
        userRepository.save(user);
        System.out.println("Despues del save repository");
        var jwtToken = jwtService.generateToken(user);
        System.out.println("Despues de generar el token");
        return AuthResponse.builder()
                .token(jwtToken).build();
    }

    @Override
    public AuthResponse authenticate(AuthenticationRequest request) throws BadRequestException {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword1()
                )
        );

        // agarro el email del usuario de la base de datos, y no el q me envian para crear el token
        var user = userRepository.findUserByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);

        return AuthResponse.builder().token(jwtToken).build();
    }


    private void doEmailValidation(String email) throws InvalidEmailType {
        if (!emailValidator.isEmailValid(email)) {
            throw new InvalidEmailType("El email ingresa no posee una estructura valida.");
        }
    }

    private void doBirthdayValidation(LocalDate birthday) throws BadRequestException {
        if (!birthdayValidator.isOldest18Years(birthday)) {
            throw new BadRequestException("La fecha ingresada no es mayor de 18 años.");
        }

        if (birthdayValidator.isOlderOfYear1900(birthday)) {
            throw new BadRequestException("La fecha ingresada es anterior al año 1900");
        }
    }

    private void doUserExistingValidator(String email) throws EmailAlreadyExistsException {
        Optional<User> existingUser = userRepository.findUserByEmail(email);

        if (existingUser.isPresent()) {
            throw new EmailAlreadyExistsException("El email ya está registrado.");
        }
    }

}
