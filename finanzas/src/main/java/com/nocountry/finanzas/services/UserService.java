package com.nocountry.finanzas.services;

import com.nocountry.finanzas.entities.User;
import com.nocountry.finanzas.exceptions.BadRequestException;
import com.nocountry.finanzas.exceptions.EmailAlreadyExistsException;
import com.nocountry.finanzas.exceptions.InvalidEmailType;
import com.nocountry.finanzas.exceptions.NotFoundException;
import com.nocountry.finanzas.models.egress.SavingsDTO;
import com.nocountry.finanzas.models.user.UserRequestDTO;
import com.nocountry.finanzas.models.user.UserResponseDTO;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    public UserResponseDTO saveUser(UserRequestDTO userRequestDTO) throws InvalidEmailType, EmailAlreadyExistsException, BadRequestException;

    public User getUserById(Long id) throws NotFoundException;

    public UserResponseDTO getUserDtoById(Long id);

    public UserResponseDTO updateUser(Long id,UserRequestDTO userRequestDTO) throws NotFoundException, InvalidEmailType, BadRequestException;

    public void deleteUser(Long id);

    UserResponseDTO addSavings(SavingsDTO savingsDTO);
}
