package com.nocountry.finanzas.models.egress;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class EgressDTO {

    private Long idEgress;

    @NotNull(message = "El monto ingresado del gasto no debe ser nulo")
    @DecimalMin(value = "0.01", inclusive = true, message = "El número debe ser mayor o igual a 0.01 y tener un máximo de 2 decimales.")
    @Digits(integer = Integer.MAX_VALUE, fraction = 0, message = "El número debe tener 2 decimales después de la coma como maximo.")
    private Double amount;

    @NotNull(message = "La fecha en la que se realiza el gasto no puede estar vacio")
    private LocalDate date;

    @Size(min = 0, max = 255, message = "La descripción no debe superar los 255 caracteres.")
    private String description;

    @NotBlank(message = "El nombre de la categoria del gasto no debe estar vacio")
    private String categoryName;

}
