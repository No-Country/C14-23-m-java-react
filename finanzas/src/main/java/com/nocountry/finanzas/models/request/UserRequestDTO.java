package com.nocountry.finanzas.models.request;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserRequestDTO {

    @NotBlank(message = "El nombre no puede estar vacio")
    private String name;

    @NotBlank(message = "El apellido no puede estar vacio")
    private String last_name;

    @NotEmpty(message = "Este campo es obligatorio")
    @Email(message = "El mail ingresado no es valido")
    private String email;

    private String password;

    private LocalDate birthday_date;
}
