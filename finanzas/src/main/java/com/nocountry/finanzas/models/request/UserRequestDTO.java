package com.nocountry.finanzas.models.request;

import lombok.Data;

import java.time.LocalDate;
@Data
public class UserRequestDTO {
    private String name;
    private String last_name;
    private String email;
    private String password;
    private Double total_income;
    private LocalDate birthday_date;
}
