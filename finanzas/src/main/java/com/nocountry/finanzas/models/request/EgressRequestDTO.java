package com.nocountry.finanzas.models.request;

import com.nocountry.finanzas.entities.Egress;
import lombok.Data;

import java.time.LocalDate;

@Data
public class EgressRequestDTO {

    private Double amount;
    private LocalDate date;
    private String description;

    private String categoryName;
    private String categoryDescription;

}
