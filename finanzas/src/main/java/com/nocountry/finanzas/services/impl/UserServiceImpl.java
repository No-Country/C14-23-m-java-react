package com.nocountry.finanzas.services.impl;

import com.nocountry.finanzas.entities.User;
import com.nocountry.finanzas.exceptions.BadRequestException;
import com.nocountry.finanzas.exceptions.EmailAlreadyExistsException;
import com.nocountry.finanzas.exceptions.InvalidEmailType;
import com.nocountry.finanzas.exceptions.NotFoundException;
import com.nocountry.finanzas.models.auth.AuthenticationRequest;
import com.nocountry.finanzas.models.egress.SavingsDTO;
import com.nocountry.finanzas.models.user.Mapper;
import com.nocountry.finanzas.models.user.UserRequestDTO;
import com.nocountry.finanzas.models.user.UserResponseDTO;
import com.nocountry.finanzas.repositories.UserRepository;
import com.nocountry.finanzas.services.UserService;
import com.nocountry.finanzas.validators.BirthdayValidator;
import com.nocountry.finanzas.validators.EmailValidatorLocal;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final EmailValidatorLocal emailValidator;

    private final BirthdayValidator birthdayValidator;


    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, EmailValidatorLocal emailValidator,
                           BirthdayValidator birthdayValidator, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.emailValidator = emailValidator;
        this.birthdayValidator = birthdayValidator;
        this.passwordEncoder = passwordEncoder;
    }


    @Transactional
    @Override
    public void saveUser(UserRequestDTO userRequestDTO) throws EmailAlreadyExistsException, InvalidEmailType, BadRequestException {
        doEmailValidation(userRequestDTO.getEmail());
        doBirthdayValidation(userRequestDTO.getBirthday_date());

        User user = Mapper.userRequestDTOToUser(userRequestDTO);

        Optional<User> existingUser = userRepository.findUserByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            throw new EmailAlreadyExistsException("El email ya está registrado.");
        }

        String passwordEncriptada = passwordEncoder.encode(userRequestDTO.getPassword());
        user.setPassword(passwordEncriptada);

        userRepository.save(user);
    }

    @Transactional
    @Override
    public UserResponseDTO authenticateUser(AuthenticationRequest request) throws BadRequestException {
        Optional<User> existingUser = userRepository.findUserByEmail(request.getEmail());

        if (existingUser.isEmpty()) {
            throw new BadRequestException("El email ingresado no esta registrado.");
        }

        if (!passwordEncoder.matches(request.getPassword1(), existingUser.get().getPassword())) {
            throw new BadRequestException("La contraseña ngresada es incorrecta.");
        }

        return Mapper.userToUserResponseDto(existingUser.get());
    }

    @Override
    public User getUserById(Long id) throws NotFoundException {
        Optional<User> userOptional = userRepository.findById(id);

        if (userOptional.isEmpty()){
            throw new NotFoundException("Could not found user");
        }
        return userOptional.get();
    }

    @Override
    public UserResponseDTO getUserDtoById(Long id) {
        return null;
    }

    @Transactional
    @Override
    public UserResponseDTO updateUser(Long id, UserRequestDTO userRequestDTO) throws NotFoundException, InvalidEmailType, BadRequestException {
        doEmailValidation(userRequestDTO.getEmail());
        doBirthdayValidation(userRequestDTO.getBirthday_date());

        User userToEdit = getUserById(id);

        userToEdit.setName(userRequestDTO.getName());
        userToEdit.setLast_name(userRequestDTO.getLast_name());
        userToEdit.setEmail(userRequestDTO.getEmail());
        userToEdit.setPassword(userRequestDTO.getPassword());
        userToEdit.setBirthday_date(userRequestDTO.getBirthday_date());

        return Mapper.userToUserResponseDto(userToEdit);
    }

    @Transactional
    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserResponseDTO addSavings(SavingsDTO toSaving) throws NotFoundException {

        User user = userRepository.findById(toSaving.getIdUser()).get();

        if (toSaving.getToSaving() > user.getTotalIncome()) {
            throw new NotFoundException("No hay fondos suficientes para invertir en ahorros.");
        }
        user.setAccumulatedSavings(user.getAccumulatedSavings() + toSaving.getToSaving());
        user.setTotalIncome(user.getTotalIncome() - toSaving.getToSaving());

        userRepository.save(user);
        return Mapper.userToUserResponseDto(user);
    }

    @Override
    public UserResponseDTO revertSavings(Long id) {
        User user = userRepository.findById(id).get();

        user.setTotalIncome(user.getTotalIncome() + user.getAccumulatedSavings());
        user.setAccumulatedSavings(0.0);

        userRepository.save(user);
        return Mapper.userToUserResponseDto(user);
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
    }

}
