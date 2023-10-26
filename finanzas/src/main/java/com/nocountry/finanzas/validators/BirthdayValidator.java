package com.nocountry.finanzas.validators;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.Period;

@Data
@Component
public class BirthdayValidator {
    
    private LocalDate dateNow = LocalDate.now();

    public boolean isOldest18Years(LocalDate birthdayDate) {

        Period period = Period.between(birthdayDate, dateNow);

        return period.getYears() >= 18;
    }

    public boolean isOlderOfYear1900(LocalDate birthdayDate) {
        return birthdayDate.getYear() < 1900;
    }

}
