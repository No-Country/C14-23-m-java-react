package com.nocountry.finanzas.services.impl;

import com.nocountry.finanzas.entities.User;
import com.nocountry.finanzas.exceptions.BadRequestException;
import com.nocountry.finanzas.exceptions.EmailAlreadyExistsException;
import com.nocountry.finanzas.exceptions.InvalidEmailType;
import com.nocountry.finanzas.exceptions.NotFoundException;
import com.nocountry.finanzas.models.user.Mapper;
import com.nocountry.finanzas.models.user.UserLoggingDTO;
import com.nocountry.finanzas.models.user.UserRequestDTO;
import com.nocountry.finanzas.models.user.UserLoggingResponse;
import com.nocountry.finanzas.models.user.UserResponseDTO;
import com.nocountry.finanzas.repositories.UserRepository;
import com.nocountry.finanzas.services.UserService;
import com.nocountry.finanzas.validators.BirthdayValidator;
import com.nocountry.finanzas.validators.EmailValidator;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final EmailValidator emailValidator;

    private final BirthdayValidator birthdayValidator;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, EmailValidator emailValidator, BirthdayValidator birthdayValidator) {
        this.userRepository = userRepository;
        this.emailValidator = emailValidator;
        this.birthdayValidator = birthdayValidator;
    }


    @Transactional
    @Override
    public UserResponseDTO saveUser(UserRequestDTO userRequestDTO) throws EmailAlreadyExistsException, InvalidEmailType, BadRequestException {
        doEmailValidation(userRequestDTO.getEmail());
        doBirthdayValidation(userRequestDTO.getBirthday_date());

        User user = Mapper.userRequestDTOToUser(userRequestDTO);

        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            throw new EmailAlreadyExistsException("El email ya está registrado.");
        }

        userRepository.save(user);

        return Mapper.userToUserResponseDto(user);
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
    public UserResponseDTO updateUser(Long id, UserRequestDTO userRequestDTO) throws NotFoundException {
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

    @Transactional
    @Override
    public UserLoggingResponse loggingUser(UserLoggingDTO userLoggingDTO) throws BadRequestException, NotFoundException {
        Optional<User> userOptional = userRepository.findById(userLoggingDTO.getIdUser());

        if (userOptional.isEmpty()){
            throw new NotFoundException("Could not found user");
        }

        boolean isEmailCorrect = userOptional.get().getEmail().equalsIgnoreCase(userLoggingDTO.getEmail());
        boolean isPasswordCorrect = userOptional.get().getPassword().equals(userLoggingDTO.getPassword());

        UserLoggingResponse response = Mapper.userToUserLoggingResponseDto(userOptional.get());

        if (isEmailCorrect && isPasswordCorrect) {
            userOptional.get().setCountLogging(userOptional.get().getCountLogging() + 1);
            userRepository.save(userOptional.get());

            response.setErrorMessage(null);
        } else {
            response.setErrorMessage("Credenciales incorrectas. Verifica tu correo electrónico y contraseña.");
        }

        return response;
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
