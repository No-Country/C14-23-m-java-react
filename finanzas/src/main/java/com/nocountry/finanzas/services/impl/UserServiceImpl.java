package com.nocountry.finanzas.services.impl;

import com.nocountry.finanzas.entities.User;
import com.nocountry.finanzas.exceptions.BadRequestException;
import com.nocountry.finanzas.exceptions.NotFoundException;
import com.nocountry.finanzas.models.Mapper;
import com.nocountry.finanzas.models.request.UserLoggingDTO;
import com.nocountry.finanzas.models.request.UserRequestDTO;
import com.nocountry.finanzas.models.response.UserLoggingResponse;
import com.nocountry.finanzas.models.response.UserResponseDTO;
import com.nocountry.finanzas.repositories.UserRepository;
import com.nocountry.finanzas.services.UserService;
import jakarta.transaction.Transactional;
import org.hibernate.type.format.jackson.JacksonIntegration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Transactional
    @Override
    public UserResponseDTO saveUser(UserRequestDTO userRequestDTO) {
        User user = Mapper.userRequestDTOToUser(userRequestDTO);

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

        UserLoggingResponse response = (UserLoggingResponse) Mapper.userToUserResponseDto(userOptional.get());

        if (isEmailCorrect && isPasswordCorrect) {
            response.setErrorMessage(null);
        } else {
            response.setErrorMessage("Credenciales incorrectas. Verifica tu correo electrónico y contraseña.");
        }

        return response;
    }

}
