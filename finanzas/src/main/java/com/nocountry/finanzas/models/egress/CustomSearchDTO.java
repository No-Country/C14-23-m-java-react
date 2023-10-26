package com.nocountry.finanzas.models.egress;

import jakarta.annotation.Nullable;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CustomSearchDTO {

    @Nullable
    private Long categoryId;
    @Nullable
    private Integer month;
}
