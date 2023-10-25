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

    List<Egress> findAllByUserId(Long id);

    @Query("SELECT e FROM Egress e WHERE e.user = :id AND MONTH (e.date) = MONTH (:mes)")
    List<Egress> findByMonth (@Param("id") Long id,@Param("mes")LocalDate mes);

    @Query("SELECT e FROM Egress  e WHERE e.user = :id AND e.egressCategory = :egressCategory")
    List<Egress> findEgressByCategoryId(@Param("id") Long id, Long egressCategory);

    @Query("SELECT e FROM Egress e WHERE e.user = :id AND MONTH(e.date) = MONTH(:mes) AND e.egressCategory = :egressCategory")
    List<Egress> findByMonthAndCategory(@Param("id") Long id,@Param("mes") LocalDate mes, @Param("egressCategory") Long egressCategory);
}
