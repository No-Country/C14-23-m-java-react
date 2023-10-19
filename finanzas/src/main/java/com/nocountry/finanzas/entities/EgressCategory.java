package com.nocountry.finanzas.entities;

import com.nocountry.finanzas.entities.enums.CategoryEnum;
import jakarta.persistence.*;
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

    public EgressCategory() {
    }

    public EgressCategory(CategoryEnum name) {
        this.name = name;
    }

}
