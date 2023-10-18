package com.nocountry.finanzas.repositories;

import com.nocountry.finanzas.entities.Income;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface IncomeRepository extends JpaRepository<Income,Long> {
}
