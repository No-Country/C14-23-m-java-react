package com.nocountry.finanzas.models.user;

import com.nocountry.finanzas.entities.enums.Countries;
import com.nocountry.finanzas.entities.User;

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
        user.setCountry(searchCountry(userRequestDTO.getCountry()));
        user.setTotalIncome(0.0);
        user.setAccumulatedSavings(0.0);
        user.setIsLogging(false);

        return user;
    }

    public static UserResponseDTO userToUserResponseDto(User user){

        UserResponseDTO userResponseDTO = new UserResponseDTO();

        userResponseDTO.setIdUser(user.getId());
        userResponseDTO.setName(user.getName());
        userResponseDTO.setLast_name(user.getLast_name());
        userResponseDTO.setEmail(user.getEmail());
        userResponseDTO.setBirthday_date(user.getBirthday_date());
        userResponseDTO.setTotalIncome(user.getTotalIncome());
        userResponseDTO.setAccumulatedSavings(user.getAccumulatedSavings());

        return userResponseDTO;
    }

    public static List<UserResponseDTO> usersToUserResponseDTOList(List<User> userList){
        List<UserResponseDTO> userResponseDTOList = new ArrayList<>();
        for (User user:userList) {
            userResponseDTOList.add(userToUserResponseDto(user));
        }
        return userResponseDTOList;
    }

    public static Countries searchCountry(String country) {

        for (Countries element : Countries.values()) {
            if (element.name().equalsIgnoreCase(country)) {
                return element;
            }
        }
        return Countries.ARGENTINA;
    }

}
