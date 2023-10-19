package com.nocountry.finanzas.models.income;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateIncomeDTO extends IncomeDTO {

    @NotNull(message = "El ID del usuario no puede estar vacio.")
    private Long idUser;

}
