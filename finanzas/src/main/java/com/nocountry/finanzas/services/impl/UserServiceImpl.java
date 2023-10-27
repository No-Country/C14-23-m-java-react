package com.nocountry.finanzas.services.impl;

import com.nocountry.finanzas.entities.User;
import com.nocountry.finanzas.exceptions.BadRequestException;
import com.nocountry.finanzas.exceptions.EmailAlreadyExistsException;
import com.nocountry.finanzas.exceptions.InvalidEmailType;
import com.nocountry.finanzas.exceptions.NotFoundException;
import com.nocountry.finanzas.models.user.SavingsDTO;
import com.nocountry.finanzas.models.user.*;
import com.nocountry.finanzas.repositories.UserRepository;
import com.nocountry.finanzas.services.UserService;
import com.nocountry.finanzas.validators.BirthdayValidator;
import com.nocountry.finanzas.validators.EmailValidatorLocal;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final EmailValidatorLocal emailValidator;

    private final BirthdayValidator birthdayValidator;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, EmailValidatorLocal emailValidator, BirthdayValidator birthdayValidator) {
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

    @Transactional
    @Override
    public UserResponseDTO updateUser(Long id, UserUpdateRequestDTO userRequestDTO) throws NotFoundException, EmailAlreadyExistsException, InvalidEmailType {
        User userToEdit = getUserById(id);

        if (userRequestDTO.getName() != null && userRequestDTO.getLast_name() != null) {
            userToEdit.setName(userRequestDTO.getName());
            userToEdit.setLast_name(userRequestDTO.getLast_name());
        }

        if (userRequestDTO.getEmail() != null) {
            doEmailValidation(userRequestDTO.getEmail());
            Optional<User> existingUser = userRepository.findByEmail(userRequestDTO.getEmail());

            if (existingUser.isPresent()) {
                throw new EmailAlreadyExistsException("El email ya está registrado.");
            }

            userToEdit.setEmail(userRequestDTO.getEmail());
        }

        userRepository.save(userToEdit);

        return Mapper.userToUserResponseDto(userToEdit);
    }

    @Transactional
    @Override
    public UserResponseDTO updatePasswordUser(Long id, UserPasswordUpdateDTO passwordUpdateDTO) throws BadRequestException, NotFoundException {
        User userToEdit = getUserById(id);

        if (passwordUpdateDTO.getCurrentPassword().equals(userToEdit.getPassword())) {
            userToEdit.setPassword(passwordUpdateDTO.getNewPassword());
            userRepository.save(userToEdit);

        } else {
            throw new BadRequestException("La contraseña original ingresada es incorrecta.");
        }

        return Mapper.userToUserResponseDto(userToEdit);
    }

    @Transactional
    @Override
    public void deleteUser(Long id) throws NotFoundException {

        if(userRepository.findById(id).isPresent()){
            userRepository.deleteById(id);
        }else {
            throw new NotFoundException("No se encuentra para eliminar el usuario con el id "+id);
        }
    }

    @Transactional
    @Override
    public UserLoggingResponse loggingUser(UserLoggingDTO userLoggingDTO) throws BadRequestException, NotFoundException {
        Optional<User> userOptional = userRepository.findById(userLoggingDTO.getIdUser());

        if (userOptional.isEmpty()){
            throw new NotFoundException("No se pudo encontrar el usuario");
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

    @Override
    public UserResponseDTO addSavings(SavingsDTO toSaving) throws NotFoundException {

        User user = userRepository.findById(toSaving.getIdUser()).get();

        if (toSaving.getToSaving() > user.getTotalIncome()) {
            throw new NotFoundException("No hay fondos suficientes para invertir en ahorros.");
        }
        user.setAccumulatedSavings(toSaving.getToSaving());

        userRepository.save(user);
        return Mapper.userToUserResponseDto(user);
    }

    @Override
    public UserResponseDTO revertSavings(Long id) {
        User user = userRepository.findById(id).get();

        user.setAccumulatedSavings(0.0);

        userRepository.save(user);
        return Mapper.userToUserResponseDto(user);
    }

    private void doEmailValidation(String email) throws InvalidEmailType {

        if (!emailValidator.isEmailValid(email)) {
            throw new InvalidEmailType("El email ingresado no posee una estructura valida.");
        }
    }

    private void doBirthdayValidation(LocalDate birthday) throws BadRequestException {

        if (!birthdayValidator.isOldest18Years(birthday)) {
            throw new BadRequestException("La fecha ingresada no es mayor de 18 años.");
        }
    }

}
