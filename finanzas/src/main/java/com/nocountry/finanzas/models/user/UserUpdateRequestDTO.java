package com.nocountry.finanzas.models.user;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UserUpdateRequestDTO {

    @Size(min = 2, max = 45, message = "El nombre debe poseer un minimo de 2 caracteres y maximo de 45.")
    @Pattern(regexp = "^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]*$", message = "El nombre solo debe contener letras y espacios")
    private String name;

    @Size(min = 2, max = 45, message = "El apellido debe poseer un minimo de 2 caracteres y maximo de 45.")
    @Pattern(regexp = "^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]*$", message = "El apellido solo debe contener letras y espacios")
    private String last_name;

    @Email(message = "El mail ingresado no es valido")
    @Size(min = 11, max = 200, message = "El email debe poseer un minimo de 11 caracteres y maximo de 255.")
    private String email;

}
