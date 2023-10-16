package com.nocountry.finanzas.models.response.egress;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
public class EgressResponseDTO {

    private Long id;

    @NotBlank(message = "El monto ingresado del gasto no debe estar vacio")
    private Double amount;

    @NotBlank(message = "La fecha en la que se realiza el gasto no puede estar vacio")
    private LocalDate date;

    @Size(min = 0, max = 255, message = "La descripción no debe superar los 255 caracteres.")
    private String description;


    @NotBlank(message = "El nombre de la categoria del gasto no debe estar vacio")
    private String categoryName;

    @Size(min = 0, max = 255, message = "La descripción  de la categoria no debe superar los 255 caracteres.")
    private String categoryDescription;

}
