package com.nocountry.finanzas.repositories;

import com.nocountry.finanzas.entities.IncomeCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IncomeCategoryRepository extends JpaRepository<IncomeCategory,Long>  {

    IncomeCategory findByName(String name);

}
