package com.nocountry.finanzas.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
@Table(name = "tbl_egress_category")
public class EgressCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    protected Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "name")
    protected CategoryEnum name;

    @Column(name = "description")
    protected String description;

    public EgressCategory() {
    }

    public EgressCategory(CategoryEnum name) {
        this.name = name;
    }

}
