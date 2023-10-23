package com.nocountry.finanzas.entities;

import com.nocountry.finanzas.entities.enums.CategoryEnum;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.time.LocalDate;

import static org.junit.Assert.*;

public class EgressTest {
/*
    private Egress egress;

    @Before
    public void setUp() {
        EgressCategory category = new EgressCategory(CategoryEnum.ALIMENTACION);
        LocalDate date = LocalDate.of(2023, 10, 24);
        egress = new Egress(1000.0 , date, category);
    }

    @After
    public void tearDown() {
        egress = null;
    }

    @Test
    public void defaultConstructorTest() {
        Egress egressDefault = new Egress();

        assertNotNull(egressDefault);

        assertNull(egressDefault.getId());
        assertNull(egressDefault.getAmount());
        assertNull(egressDefault.getDate());
        assertNull(egressDefault.getDescription());
        assertNull(egressDefault.getEgressCategory());
    }

    @Test
    public void getterTest() {
        assertNotNull(egress);
        assertNull(egress.getId());
        assertNull(egress.getDescription());

        assertEquals(1000.0, (double) egress.getAmount(), 0.000001);

        assertEquals(24, egress.getDate().getDayOfMonth());
        assertEquals(10, egress.getDate().getMonthValue());
        assertEquals(2023, egress.getDate().getYear());

        assertEquals(CategoryEnum.ALIMENTACION, egress.getEgressCategory().name);
    }

    @Test
    public void setterTest() {
        LocalDate newDate = LocalDate.of(2023, 10, 20);
        EgressCategory newCategory = new EgressCategory(CategoryEnum.TRANSPORTE);

        egress.setAmount(2000.0);
        egress.setDate(newDate);
        egress.setEgressCategory(newCategory);

        assertEquals(2000.0, (double) egress.getAmount(), 0.000001);

        assertEquals(newDate, egress.getDate());
        assertEquals(20, egress.getDate().getDayOfMonth());
        assertEquals(10, egress.getDate().getMonthValue());
        assertEquals(2023, egress.getDate().getYear());

        assertEquals(newCategory, egress.getEgressCategory());
    }

    @Test
    public void descriptionValidationTest() {
        egress.setDescription("Descripción válida");
        assertEquals("Descripción válida", egress.getDescription());
    }

    @Test
    public void validationTypes() {
        LocalDate date2 = LocalDate.of(2023, 10, 13);
        EgressCategory category2 = new EgressCategory(CategoryEnum.ALIMENTACION);
        category2.setId(2L);

        Egress egress2 = new Egress(1200.0 , date2, category2);
        egress2.setId(1L);
        egress2.setDescription("Description egress test");

        assertTrue(egress2.getId() instanceof Long);
        assertTrue(egress2.getAmount() instanceof Double);
        assertTrue(egress2.getDate() instanceof LocalDate);
        assertTrue(egress2.getDescription() instanceof String);
        assertTrue(egress2.getEgressCategory() instanceof EgressCategory);
        assertTrue(egress2.getEgressCategory().getId() instanceof  Long);
        assertTrue(egress2.getEgressCategory().getName() instanceof CategoryEnum);
    }
*/
}
