package com.nocountry.finanzas.models.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserPasswordUpdateDTO {

    @NotBlank(message = "Este campo es obligatorio")
    @Size(min = 8, max = 45, message = "La contraseña debe poseer un minimo de 8 caracteres y maximo de 45.")
    private String currentPassword;

    @NotBlank(message = "Este campo es obligatorio")
    @Size(min = 8, max = 45, message = "La contraseña debe poseer un minimo de 8 caracteres y maximo de 45.")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W).+$", message = "La contraseña debe contener al menos una letra en minúscula, una en mayúscula, un número y un símbolo.")
    private String newPassword;

}
