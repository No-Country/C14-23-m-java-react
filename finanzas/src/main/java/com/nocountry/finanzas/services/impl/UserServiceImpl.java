package com.nocountry.finanzas.services.impl;

import com.nocountry.finanzas.config.PasswordConfig;
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

    private final PasswordConfig passwordConfig;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, EmailValidatorLocal emailValidator,
                           BirthdayValidator birthdayValidator, PasswordConfig passwordConfig) {
        this.userRepository = userRepository;
        this.emailValidator = emailValidator;
        this.birthdayValidator = birthdayValidator;
        this.passwordConfig = passwordConfig;
    }


    @Transactional
    @Override
    public UserResponseDTO saveUser(UserRequestDTO userRequestDTO) throws EmailAlreadyExistsException, InvalidEmailType, BadRequestException {
        doEmailValidation(userRequestDTO.getEmail());
        doBirthdayValidation(userRequestDTO.getBirthday_date());
        doEmailAlreadyExits(userRequestDTO.getEmail());

        User user = Mapper.userRequestDTOToUser(userRequestDTO);

        String passwordEncode  = passwordConfig.passwordEncoder().encode(userRequestDTO.getPassword());
        user.setPassword(passwordEncode);

        userRepository.save(user);

        return Mapper.userToUserResponseDto(user);
    }

    @Transactional
    @Override
    public UserResponseDTO loggingUser(UserLoggingDTO userLoggingDTO) throws BadRequestException, NotFoundException {
        Optional<User> userOptional = userRepository.findByEmail(userLoggingDTO.getEmail());
        isPresentUser(userOptional);

        User user = userOptional.get();

        boolean isEmailCorrect = user.getEmail().equalsIgnoreCase(userLoggingDTO.getEmail());
        boolean isPasswordCorrect = checkPassword(userLoggingDTO.getPassword(), user.getPassword());

        if (!isEmailCorrect && !isPasswordCorrect) {
            throw new BadRequestException("El usuario o contraseña no son correctos");
        }

        userOptional.get().setIsLogging(1);
        userRepository.save(user);

        return Mapper.userToUserResponseDto(user);
    }

    @Override
    public User getUserById(Long id) throws NotFoundException {
        Optional<User> userOptional = userRepository.findById(id);
        isPresentUser(userOptional);

        return userOptional.get();
    }

    @Override
    public UserResponseDTO getUserDtoById(Long id) {
        return null;
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
            isPresentUser(existingUser);

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

    public void doEmailValidation(String email) throws InvalidEmailType {

        if (!emailValidator.isEmailValid(email)) {
            throw new InvalidEmailType("El email ingresa no posee una estructura valida.");
        }

    }

    public void doEmailAlreadyExits(String email) throws EmailAlreadyExistsException {
        Optional<User> existingUser = userRepository.findByEmail(email);

        if (existingUser.isPresent()) {
            throw new EmailAlreadyExistsException("El email ya está registrado.");
        }
    }

    public void doBirthdayValidation(LocalDate birthday) throws BadRequestException {

        if (!birthdayValidator.isOldest18Years(birthday)) {
            throw new BadRequestException("La fecha ingresada no es mayor de 18 años.");
        }
    }

    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return passwordConfig.passwordEncoder().matches(rawPassword, encodedPassword);
    }

    public void isPresentUser(Optional<User> user) throws NotFoundException {
        if (user.isEmpty()){
            throw new NotFoundException("Could not found user");
        }
    }

}
