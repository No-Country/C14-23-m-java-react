package com.nocountry.finanzas.models.auth;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

    @NotBlank(message = "El nombre no puede estar vacio")
    @Size(min = 2, max = 45, message = "El nombre debe poseer un minimo de 2 caracteres y maximo de 45.")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "El nombre solo debe contener letras y espacios")
    private String name;

    @NotBlank(message = "El apellido no puede estar vacio")
    @Size(min = 2, max = 45, message = "El apellido debe poseer un minimo de 2 caracteres y maximo de 45.")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "El apellido solo debe contener letras y espacios")
    private String lastName;

    @NotEmpty(message = "Este campo es obligatorio")
    @Email(message = "El mail ingresado no es valido")
    @Size(min = 11, max = 200, message = "El email debe poseer un minimo de 11 caracteres y maximo de 255.")
    private String email;

    @NotBlank(message = "Este campo es obligatorio")
    @Size(min = 8, max = 45, message = "La contraseña debe poseer un minimo de 8 caracteres y maximo de 45.")
    private String password1;

    @NotNull(message = "Este campo es obligatorio")
    private LocalDate birthdayDate;

    @NotBlank(message = "Este campo es obligatorio")
    @Pattern(regexp = "^[a-zA-Z]+$", message = "El pais solo debe contener letras")
    private String country;

}
