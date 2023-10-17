package com.nocountry.finanzas.entities;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class EgressCategoryTest {

    private EgressCategory egressCategory;

    @Before
    public void setUp() {
        egressCategory = new EgressCategory(CategoryEnum.ALIMENTACION);
    }

    @After
    public void tearDown() {
        egressCategory = null;
    }

    @Test
    public void defaultConstructorTest() {
        EgressCategory egressCategoryDefault = new EgressCategory();

        assertNotNull(egressCategoryDefault);

        assertNull(egressCategoryDefault.getId());
        assertNull(egressCategoryDefault.getName());
    }

    @Test
    public void getterTest() {
        assertEquals(CategoryEnum.ALIMENTACION, egressCategory.getName());
        assertNull(egressCategory.getId());
    }

    @Test
    public void setterTest() {
        assertNull(egressCategory.getId());

        egressCategory.setName(CategoryEnum.AHORRO_INVERSION);
        assertEquals(CategoryEnum.AHORRO_INVERSION, egressCategory.getName());

        egressCategory.setName(CategoryEnum.EDUCACION);
        assertEquals(CategoryEnum.EDUCACION, egressCategory.getName());

        egressCategory.setName(CategoryEnum.ENTRETENIMIENTO);
        assertEquals(CategoryEnum.ENTRETENIMIENTO, egressCategory.getName());

        egressCategory.setName(CategoryEnum.SERVICIOS);
        assertEquals(CategoryEnum.SERVICIOS, egressCategory.getName());

        egressCategory.setName(CategoryEnum.OTROS);
        assertEquals(CategoryEnum.OTROS, egressCategory.getName());

        assertNull(egressCategory.getId());
    }

    @Test
    public void validationTypes() {
        EgressCategory egressCategory1 = new EgressCategory(CategoryEnum.ALIMENTACION);

        assertNull(egressCategory1.getId());

        egressCategory1.setId(1L);

        assertTrue(egressCategory1.getId() instanceof Long);
        assertTrue(egressCategory1.getName() instanceof CategoryEnum);
    }

}
