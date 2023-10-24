package com.nocountry.finanzas.models.user;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UserResponseDTO {
    private Long idUser;
    private String name;
    private String lastName;
    private String email;
    private LocalDate birthdayDate;
    private Double totalIncome;
    private String country;
    private Double accumulatedSavings;
}
