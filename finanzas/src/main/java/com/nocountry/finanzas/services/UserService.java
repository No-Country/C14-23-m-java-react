package com.nocountry.finanzas.services;

import com.nocountry.finanzas.entities.User;
import com.nocountry.finanzas.exceptions.BadRequestException;
import com.nocountry.finanzas.exceptions.EmailAlreadyExistsException;
import com.nocountry.finanzas.exceptions.InvalidEmailType;
import com.nocountry.finanzas.exceptions.NotFoundException;
import com.nocountry.finanzas.models.user.SavingsDTO;
import com.nocountry.finanzas.models.user.*;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    public UserResponseDTO saveUser(UserRequestDTO userRequestDTO) throws InvalidEmailType, EmailAlreadyExistsException, BadRequestException;

    public User getUserById(Long id) throws NotFoundException;

    public UserResponseDTO getUserDtoById(Long id);

    public UserResponseDTO updateUser(Long id, UserUpdateRequestDTO userRequestDTO) throws NotFoundException, EmailAlreadyExistsException, InvalidEmailType;

    public UserResponseDTO updatePasswordUser(Long id, UserPasswordUpdateDTO passwordUpdateDTO) throws BadRequestException, NotFoundException;

    public void deleteUser(Long id);

    public UserResponseDTO loggingUser(UserLoggingDTO userLoggingDTO) throws BadRequestException, NotFoundException;

    UserResponseDTO addSavings(SavingsDTO toSaving) throws NotFoundException;

    UserResponseDTO revertSavings(Long id);

    public void logOut(Long id) throws NotFoundException;

}
