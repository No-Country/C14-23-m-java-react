package com.nocountry.finanzas.models.request;


import lombok.Data;

import java.time.LocalDate;

@Data
public class IncomeRequestDTO {
    private Double amount;
    private LocalDate date;
    private String description;

}
