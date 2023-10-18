package com.nocountry.finanzas.repositories;

import com.nocountry.finanzas.entities.Egress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EgressRepository extends JpaRepository<Egress, Long> {

}
