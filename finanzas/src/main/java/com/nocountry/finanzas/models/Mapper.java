package com.nocountry.finanzas.models;

import com.nocountry.finanzas.entities.User;
import com.nocountry.finanzas.models.request.UserRequestDTO;
import com.nocountry.finanzas.models.response.UserResponseDTO;

import java.util.ArrayList;
import java.util.List;

public class Mapper {

    public static User userRequestDTOToUser(UserRequestDTO userRequestDTO){

        User user = new User();

        user.setName(userRequestDTO.getName());
        user.setLast_name(userRequestDTO.getLast_name());
        user.setEmail(userRequestDTO.getEmail());
        user.setPassword(userRequestDTO.getPassword());
        user.setBirthday_date(userRequestDTO.getBirthday_date());

        return user;
    }

    public static UserResponseDTO userToUserResponseDto(User user){

        UserResponseDTO userResponseDTO = new UserResponseDTO();

        userResponseDTO.setIdUser(user.getIdUser());
        userResponseDTO.setName(user.getName());
        userResponseDTO.setLast_name(user.getLast_name());
        userResponseDTO.setEmail(user.getEmail());
        userResponseDTO.setBirthday_date(user.getBirthday_date());

        return userResponseDTO;
    }

    public static List<UserResponseDTO> usersToUserResponseDTOList(List<User> userList){
        List<UserResponseDTO> userResponseDTOList = new ArrayList<>();
        for (User user:userList) {
            userResponseDTOList.add(userToUserResponseDto(user));
        }
        return userResponseDTOList;
    }

}
