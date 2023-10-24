package com.nocountry.finanzas.models.user;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UserResponseDTO {
    private Long idUser;
    private String name;
    private String last_name;
    private String email;
    private LocalDate birthday_date;
    private Double totalIncome;
    private Double accumulatedSavings;
}