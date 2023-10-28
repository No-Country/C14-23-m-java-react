package com.nocountry.finanzas.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.nocountry.finanzas.entities.enums.Countries;
import jakarta.persistence.*;
import jakarta.validation.constraints.Digits;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(name = "tbl_user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="name", nullable = false)
    private String name;

    @Column(name="last_name", nullable = false)
    private String last_name;

    @Column(name="email", nullable = false)
    private String email;

    @Column(name="password", nullable = false)
    private String password;

    @Column(name="date", nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate birthday_date;

    @Column(name="country", nullable = false)
    private Countries country;

    @Column(name = "total_income")
    @Digits(integer = Integer.MAX_VALUE, fraction = 2)
    private Double totalIncome;

    private Integer countLogging;

    @Column(name = "accumulated_savings")
    private Double accumulatedSavings;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Egress> egresses = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Income> incomes = new ArrayList<>();


    public void addEgress(Egress egress){
        egresses.add(egress);
    }

    public void removeEgress(Egress egress){
        egresses.remove(egress);
    }

    public void addIncome(Income income){
        incomes.add(income);
    }

    public void removeIncome(Income income){
        incomes.remove(income);
    }

}
