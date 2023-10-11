package com.nocountry.finanzas.models.response;


import lombok.Data;

import java.time.LocalDate;

@Data
public class EgressResponseDTO {

    private Long id;
    private Double amount;
    private LocalDate date;
    private String description;

    private String categoryName;
    private String categoryDescription;

}
