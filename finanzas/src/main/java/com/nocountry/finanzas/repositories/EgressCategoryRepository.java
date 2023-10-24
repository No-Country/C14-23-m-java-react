package com.nocountry.finanzas.repositories;

import com.nocountry.finanzas.entities.Egress;
import com.nocountry.finanzas.entities.EgressCategory;
import com.nocountry.finanzas.entities.enums.CategoryEnum;
import org.springframework.cglib.core.Local;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EgressCategoryRepository extends JpaRepository<EgressCategory, Long> {

    EgressCategory findByName(CategoryEnum name);

    @Query("SELECT e FROM Egress e WHERE MONTH(e.date) = MONTH(:mes)")
    List<Egress> findByMonth (@Param("mes")LocalDate mes);

}
