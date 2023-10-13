package com.nocountry.finanzas.services;

import com.nocountry.finanzas.entities.User;
import com.nocountry.finanzas.models.request.UserRequestDTO;
import com.nocountry.finanzas.models.response.UserResponseDTO;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    public UserResponseDTO saveUser (UserRequestDTO userRequestDTO);
    public User getUserById(Long id);
    public UserResponseDTO getUserDtoById(Long id);
    public UserResponseDTO updateUser(Long id,UserRequestDTO userRequestDTO);

    public void deleteUser(Long id);
}
