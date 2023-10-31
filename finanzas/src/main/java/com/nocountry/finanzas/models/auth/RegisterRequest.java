/*package com.nocountry.finanzas.models.auth;

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

    // Expresion regular para aceptar todo tipo de letras:   " ^[\p{L}\s]+$ "
    // tener en cuenta para el portugues y otros idiomas si se agregan mas paises.

    @NotBlank(message = "El nombre no puede estar vacio")
    @Size(min = 2, max = 45, message = "El nombre debe poseer un mínimo de 2 caracteres y máximo de 45.")
    @Pattern(regexp = "^[a-zA-ZáéíóúÁÉÍÓÚ\\s]+$", message = "El nombre solo debe contener letras y espacios")
    private String name;

    @NotBlank(message = "El apellido no puede estar vacio")
    @Size(min = 2, max = 45, message = "El apellido debe poseer un mínimo de 2 caracteres y máximo de 45.")
    @Pattern(regexp = "^[a-zA-ZáéíóúÁÉÍÓÚ\\s]+$", message = "El apellido solo debe contener letras y espacios")
    private String lastName;

    @NotEmpty(message = "Este campo es obligatorio")
    @Email(message = "El mail ingresado no es valido")
    @Size(min = 11, max = 200, message = "El email debe poseer un mínimo de 11 caracteres y máximo de 200.")
    private String email;

    @NotBlank(message = "Este campo es obligatorio")
    @Size(min = 8, max = 45, message = "La contraseña debe poseer un minimo de 8 caracteres y maximo de 45.")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W).+$", message = "La contraseña debe contener al menos una letra en minúscula, una en mayúscula, un número y un símbolo.")
    private String password1;

    @NotNull(message = "Este campo es obligatorio")
    private LocalDate birthdayDate;

    @NotBlank(message = "Este campo es obligatorio")
    @Pattern(regexp = "^[a-zA-Z]+$", message = "El pais solo debe contener letras")
    private String country;

}
*/