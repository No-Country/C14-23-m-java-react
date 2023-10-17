package com.nocountry.finanzas.models.response;

import lombok.Data;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Data
public class UserResponseDTO {
    private String name;
    private String last_name;
    private String email;
    private LocalDate birthday_date;
}
