package com.nocountry.finanzas.repositories;

import com.nocountry.finanzas.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
