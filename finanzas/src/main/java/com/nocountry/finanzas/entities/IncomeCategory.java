package com.nocountry.finanzas.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "tbl_income_category")
public class IncomeCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    protected Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "name")
    protected CategoryIncomeEnum name;

    public IncomeCategory() {
    }

    public IncomeCategory(CategoryIncomeEnum name) {
        this.name = name;
    }
}
