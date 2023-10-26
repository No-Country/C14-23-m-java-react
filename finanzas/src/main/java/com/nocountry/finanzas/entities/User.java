package com.nocountry.finanzas.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.nocountry.finanzas.entities.enums.Countries;
import com.nocountry.finanzas.entities.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(name = "tbl_user")
public class User implements UserDetails {
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

    @Column(name="password1", nullable = false)
    private String password;

    @Column(name="date", nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate birthday_date;

    @Column(name="country", nullable = false)
    private Countries country;

    @Column(name = "total_income")
    private Double totalIncome;

    private Integer countLogging;

    @Column(name = "accumulated_savings")
    private Double accumulatedSavings;

    @Column(name = "role")
    @Enumerated(EnumType.ORDINAL)
    private Role role;

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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
