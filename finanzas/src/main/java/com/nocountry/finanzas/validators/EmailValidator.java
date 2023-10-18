package com.nocountry.finanzas.validators;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class EmailValidator {

    public boolean isEmailValid(String email) {
        if (!email.contains("@")) {
            return false;
        }
        if (!email.contains(".")) {
            return false;
        }
        if (email.endsWith("@")) {
            return false;
        }
        if (email.contains(" ")) {
            return false;
        }
        if (email.length() > 255) {
            return false;
        }

        return true;
    }

}
