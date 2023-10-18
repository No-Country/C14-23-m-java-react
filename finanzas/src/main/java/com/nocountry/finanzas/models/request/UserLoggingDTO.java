package com.nocountry.finanzas.models.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserLoggingDTO {

    @NotNull(message = "El id del usuario no debe ser null")
    private Long idUser;

    @NotEmpty(message = "Este campo email es obligatorio")
    @Email(message = "El mail ingresado no es valido")
    private String email;

    @NotEmpty(message = "Este campo  password es obligatorio")
    private String password;

}
