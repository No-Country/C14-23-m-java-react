package com.nocountry.finanzas.models.response;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Data
public class IncomeResponseDTO {

    private Long id;
    private Double amount;
    private LocalDate date;
    private String description;

}
