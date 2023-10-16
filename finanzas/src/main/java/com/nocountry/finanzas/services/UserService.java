package com.nocountry.finanzas.services;

import com.nocountry.finanzas.entities.User;
import com.nocountry.finanzas.exceptions.NotFoundException;
import com.nocountry.finanzas.models.request.UserRequestDTO;
import com.nocountry.finanzas.models.response.UserResponseDTO;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    public UserResponseDTO saveUser (UserRequestDTO userRequestDTO);
    public User getUserById(Long id)throws NotFoundException;
    public UserResponseDTO getUserDtoById(Long id);
    public UserResponseDTO updateUser(Long id,UserRequestDTO userRequestDTO) throws NotFoundException;

    public void deleteUser(Long id);
}
