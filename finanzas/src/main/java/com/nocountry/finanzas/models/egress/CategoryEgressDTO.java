package com.nocountry.finanzas.models.egress;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CategoryEgressDTO {

    @NotBlank(message = "El nombre de la categoria del gasto no debe estar vacio")
    private String name;
}
