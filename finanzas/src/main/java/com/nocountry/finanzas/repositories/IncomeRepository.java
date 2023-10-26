package com.nocountry.finanzas.repositories;

import com.nocountry.finanzas.entities.Egress;
import com.nocountry.finanzas.entities.Income;
import com.nocountry.finanzas.models.income.IncomeDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

public interface IncomeRepository extends JpaRepository<Income,Long> {

    List<Income> findAllByUserId(Long id);

    @Query("SELECT i FROM Income i WHERE i.user.id = :id AND MONTH (i.date) = MONTH (:mes)")
    List<Income> findByMonth (@Param("id") Long id, @Param("mes") LocalDate mes);

    @Query("SELECT i FROM Income i WHERE i.user.id = :id AND i.categoryIncome.id = :categoryIncome")
    List<Income> findIncomeByCategoryId(@Param("id") Long id, Long categoryIncome);

    @Query("SELECT i FROM Income i WHERE i.user.id = :id AND MONTH(i.date) = MONTH(:mes) AND i.categoryIncome.id = :categoryIncome")
    List<Income> findByMonthAndCategory(@Param("id") Long id,@Param("mes") LocalDate mes, @Param("categoryIncome") Long categoryIncome);

}
