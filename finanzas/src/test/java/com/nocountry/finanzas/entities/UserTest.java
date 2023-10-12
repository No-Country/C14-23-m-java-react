package com.nocountry.finanzas.entities;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class UserTest {

    private User user;
    @BeforeEach
    void setUp() {
        user = new User(1L,"Name","LastName","email@email.com","password", LocalDate.now());
    }

    @AfterEach
    void tearDown() {
        user = null;
    }

    @Test
    public void defaultConstructorTest(){
        User userDefault = new User();
    }
}