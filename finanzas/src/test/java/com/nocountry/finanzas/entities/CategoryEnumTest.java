package com.nocountry.finanzas.entities;

import com.nocountry.finanzas.entities.enums.CategoryEnum;
import org.junit.Test;
import static org.junit.Assert.*;

public class CategoryEnumTest {

    @Test
    public void enumValuesTest() {
        assertEquals("ALIMENTACION", CategoryEnum.ALIMENTACION.name());
        assertEquals("VIVIENDA", CategoryEnum.VIVIENDA.name());
        assertEquals("TRANSPORTE", CategoryEnum.TRANSPORTE.name());
        assertEquals("ENTRETENIMIENTO", CategoryEnum.ENTRETENIMIENTO.name());
        assertEquals("SALUD_CUIDADO_PERSONAL", CategoryEnum.SALUD_CUIDADO_PERSONAL.name());
        assertEquals("EDUCACION", CategoryEnum.EDUCACION.name());
        assertEquals("VESTIMENTA", CategoryEnum.VESTIMENTA.name());
        assertEquals("AHORRO_INVERSION", CategoryEnum.INVERSION.name());
        assertEquals("VIAJE_VACACIONES", CategoryEnum.VIAJE_VACACIONES.name());
        assertEquals("OTROS", CategoryEnum.OTROS.name());
    }

    @Test
    public void enumValuesCountTest() {
        assertEquals(11, CategoryEnum.values().length);
    }

    @Test
    public void enumValueOfTest() {
        assertEquals(CategoryEnum.ALIMENTACION, CategoryEnum.valueOf("ALIMENTACION"));
        assertEquals(CategoryEnum.VIVIENDA, CategoryEnum.valueOf("VIVIENDA"));
        assertEquals(CategoryEnum.TRANSPORTE, CategoryEnum.valueOf("TRANSPORTE"));
        assertEquals(CategoryEnum.ENTRETENIMIENTO, CategoryEnum.valueOf("ENTRETENIMIENTO"));
        assertEquals(CategoryEnum.SALUD_CUIDADO_PERSONAL, CategoryEnum.valueOf("SALUD_CUIDADO_PERSONAL"));
        assertEquals(CategoryEnum.EDUCACION, CategoryEnum.valueOf("EDUCACION"));
        assertEquals(CategoryEnum.VESTIMENTA, CategoryEnum.valueOf("VESTIMENTA"));
        assertEquals(CategoryEnum.INVERSION, CategoryEnum.valueOf("AHORRO_INVERSION"));
        assertEquals(CategoryEnum.VIAJE_VACACIONES, CategoryEnum.valueOf("VIAJE_VACACIONES"));
        assertEquals(CategoryEnum.OTROS, CategoryEnum.valueOf("OTROS"));
    }
}
