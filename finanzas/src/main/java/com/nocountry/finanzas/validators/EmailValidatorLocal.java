package com.nocountry.finanzas.validators;

import lombok.Data;
import org.springframework.stereotype.Component;
import org.apache.commons.validator.routines.EmailValidator;

@Data
@Component
public class EmailValidatorLocal {

    EmailValidator emailValidator = EmailValidator.getInstance();

    public boolean isEmailValid(String email) {

        return emailValidator.isValid(email);
    }

    /*
    Especificación de RFC 5322
    Una dirección de correo electrónico consta de dos partes principales: el nombre local (parte antes del signo '@') y el dominio (parte después del signo '@'). Algunas de las reglas clave son las siguientes:

    Nombre local (parte antes del '@'):
        Puede contener letras (a-z, A-Z), dígitos (0-9) y ciertos caracteres especiales como ".", "-", "_", y "+".
        Debe comenzar con una letra (a-z, A-Z) o algún otro carácter válido como ".", "-", "_", o "+".
        No debe comenzar con un número (0-9).
        Puede contener letras, dígitos y los caracteres especiales permitidos.
        No debe contener espacios en blanco.
        No debe contener dos o más puntos consecutivos.

    Dominio (parte después del '@'):
        Puede contener letras (a-z, A-Z), dígitos (0-9) y el guion (-).
        No debe contener espacios en blanco.
        Debe tener al menos un punto (.) que separa etiquetas (por ejemplo, "example.com").
     */

}
