package com.nocountry.finanzas.models.response;

import lombok.Data;

import java.time.LocalDate;

@Data
public class IncomeResponseDTO {

    private Long idIncome;
    private Double amount;
    private LocalDate date;
    private String description;

}
