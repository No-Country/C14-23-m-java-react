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
import com.nocountry.finanzas.models.user.Mapper;
import com.nocountry.finanzas.models.user.UserResponseDTO;
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

    private final AuthenticationManager authenticationManager;

    private final EmailValidatorLocal emailValidator;

    private final BirthdayValidator birthdayValidator;


    @Override
    public void register(RegisterRequest request) throws BadRequestException, InvalidEmailType, EmailAlreadyExistsException {
        doEmailValidation(request.getEmail());
        doBirthdayValidation(request.getBirthdayDate());
        doUserExistingValidator(request.getEmail());

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

        userRepository.save(user);
    }

    @Override
    public UserResponseDTO authenticate(AuthenticationRequest request) {

        Optional<User> existingUser = userRepository.findUserByEmail(request.getEmail());

        if (existingUser.isPresent()) {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword1()
                    )
            );
        }

        return Mapper.userToUserResponseDto(existingUser.get());
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
