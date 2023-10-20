package com.nocountry.finanzas.models.request;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserRequestDTO {

    @NotBlank(message = "El nombre no puede estar vacio")
    @Size(min = 2, max = 45, message = "El nombre debe poseer un minimo de 2 caracteres y maximo de 45.")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "El nombre solo debe contener letras y espacios")
    private String name;

    @NotBlank(message = "El apellido no puede estar vacio")
    @Size(min = 2, max = 45, message = "El apellido debe poseer un minimo de 2 caracteres y maximo de 45.")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "El apellido solo debe contener letras y espacios")
    private String last_name;

    @NotEmpty(message = "Este campo es obligatorio")
    @Email(message = "El mail ingresado no es valido")
    @Size(min = 11, max = 255, message = "El email debe poseer un minimo de 11 caracteres y maximo de 255.")
    private String email;

    @NotBlank(message = "Este campo es obligatorio")
    @Size(min = 8, max = 45, message = "La contraseña debe poseer un minimo de 8 caracteres y maximo de 45.")
    private String password;

    @NotNull(message = "Este campo es obligatorio")
    private LocalDate birthday_date;

    @NotBlank(message = "Este campo es obligatorio")
    @Pattern(regexp = "^[a-zA-Z]+$", message = "El pais solo debe contener letras")
    private String country;
}
