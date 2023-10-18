package com.nocountry.finanzas.models.egress;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateEgressDTO extends EgressDTO {

    @NotNull(message = "El ID del usuario no puede estar vacio.")
    private Long userId;

}
