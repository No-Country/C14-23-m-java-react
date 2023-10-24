package com.nocountry.finanzas.repositories;

import com.nocountry.finanzas.entities.Egress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EgressRepository extends JpaRepository<Egress, Long> {

    @Query("SELECT e FROM Egress e WHERE MONTH (e.date) = MONTH (:mes)")
    List<Egress> findByMont (@Param("mes")LocalDate mes);

}
