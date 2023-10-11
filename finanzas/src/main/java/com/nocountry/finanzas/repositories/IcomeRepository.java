package com.nocountry.finanzas.repositories;

import com.nocountry.finanzas.entities.Income;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IcomeRepository extends JpaRepository<Income, Long> {
}
