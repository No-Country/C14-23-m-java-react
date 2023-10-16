package com.nocountry.finanzas.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "tbl_egress")
public class Egress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    protected Long id;

    @Column(name = "amount", nullable = false)
    protected Double amount;

    @Column(name = "date", nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    protected LocalDate date;

    @Column(name = "description")
    protected String description;

    @ManyToOne
    protected EgressCategory egressCategory;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public Egress(){
    }

    public Egress(Double amount, LocalDate date, EgressCategory egressCategory) {
        this.amount = amount;
        this.date = date;
        this.egressCategory = egressCategory;
    }

}
