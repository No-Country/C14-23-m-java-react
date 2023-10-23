package com.nocountry.finanzas.repositories;

import com.nocountry.finanzas.entities.EgressCategory;
import com.nocountry.finanzas.entities.enums.CategoryEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EgressCategoryRepository extends JpaRepository<EgressCategory, Long> {

    EgressCategory findByName(CategoryEnum name);

}
