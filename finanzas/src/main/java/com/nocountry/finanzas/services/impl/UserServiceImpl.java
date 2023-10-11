package com.nocountry.finanzas.services.impl;

import com.nocountry.finanzas.entities.User;
import com.nocountry.finanzas.models.Mapper;
import com.nocountry.finanzas.models.request.UserRequestDTO;
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
        User user = User.builder()
                .name(userRequestDTO.getName())
                .last_name(userRequestDTO.getLast_name())
                .email(userRequestDTO.getEmail())
                .password(userRequestDTO.getPassword())
                .birthday_date(userRequestDTO.getBirthday_date())
                .build();

        userRepository.save(user);

        return Mapper.userToUserResponseDto(user);
    }

    @Override
    public User getUserById(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.orElse(null);
    }

    @Override
    public UserResponseDTO getUserDtoById(Long id) {
        return null;
    }

    @Transactional
    @Override
    public UserResponseDTO updateUser(Long id, UserRequestDTO userRequestDTO) {
        User userToEdit = getUserById(id);

        userToEdit.setName(userRequestDTO.getName());
        userToEdit.setLast_name(userRequestDTO.getLast_name());
        userToEdit.setEmail(userRequestDTO.getEmail());
        userToEdit.setPassword(userRequestDTO.getPassword());
        userToEdit.setBirthday_date(userRequestDTO.getBirthday_date());

        return Mapper.userToUserResponseDto(userToEdit);
    }
}
