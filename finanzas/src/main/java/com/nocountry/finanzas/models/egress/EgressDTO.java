package com.nocountry.finanzas.models.egress;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
public class EgressDTO {

    private Long id;

    @NotNull(message = "El monto ingresado del gasto no debe ser nulo")
    @Digits(integer = 8, fraction = 2, message = "El número debe tener un máximo de 8 dígitos antes de la coma y 2 decimales después de la coma.")
    private Double amount;

    @NotNull(message = "La fecha en la que se realiza el gasto no puede estar vacio")
    private LocalDate date;

    @Size(min = 0, max = 255, message = "La descripción no debe superar los 255 caracteres.")
    private String description;

    @NotBlank(message = "El nombre de la categoria del gasto no debe estar vacio")
    private String categoryName;

}
