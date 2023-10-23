package com.nocountry.finanzas.models.income;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CategoryIncomeDTO {

    @NotBlank(message = "El nombre de la categoria del ingreso no debe estar vacio")
    private String name;
}
