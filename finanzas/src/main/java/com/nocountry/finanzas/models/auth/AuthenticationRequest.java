package com.nocountry.finanzas.models.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationRequest {

    @NotEmpty(message = "Este campo email es obligatorio")
    @Email(message = "El mail ingresado no es valido")
    private String email;

    @NotEmpty(message = "Este campo  password es obligatorio")
    private String password1;

}
