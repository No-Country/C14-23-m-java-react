package com.nocountry.finanzas.models.user;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SavingsDTO {

    @NotNull(message = "El ID del usuario no puede estar vacio.")
    private Long idUser;

    @NotNull(message = "El monto ingresado del gasto no debe ser nulo")
    @DecimalMin(value = "0.01", inclusive = true, message = "El número debe ser mayor o igual a 0.01 y tener un máximo de 2 decimales.")
    @Digits(integer = 10, fraction = 2, message = "El número debe tener 2 decimales después de la coma como maximo.")
    private Double toSaving;

}
