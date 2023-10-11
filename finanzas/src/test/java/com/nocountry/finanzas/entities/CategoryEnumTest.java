package com.nocountry.finanzas.entities;

import org.junit.Test;
import static org.junit.Assert.*;

public class CategoryEnumTest {

    @Test
    public void enumValuesTest() {
        assertEquals("ALIMENTACION", CategoryEnum.ALIMENTACION.name());
        assertEquals("VIVIENDA", CategoryEnum.VIVIENDA.name());
        assertEquals("TRANSPORTE", CategoryEnum.TRANSPORTE.name());
        assertEquals("ENTRETENIMIENTO", CategoryEnum.ENTRETENIMIENTO.name());
        assertEquals("SALUD_BIENESTAR", CategoryEnum.SALUD_BIENESTAR.name());
        assertEquals("EDUCACION", CategoryEnum.EDUCACION.name());
        assertEquals("VESTIMENTA", CategoryEnum.VESTIMENTA.name());
        assertEquals("CUIDADO_PERSONAL", CategoryEnum.CUIDADO_PERSONAL.name());
        assertEquals("GASTO_FIJO", CategoryEnum.GASTO_FIJO.name());
        assertEquals("AHORRO_INVERSION", CategoryEnum.AHORRO_INVERSION.name());
        assertEquals("REGALO_CARIDAD", CategoryEnum.REGALO_CARIDAD.name());
        assertEquals("VIAJE_VACACIONES", CategoryEnum.VIAJE_VACACIONES.name());
        assertEquals("OTROS", CategoryEnum.OTROS.name());
    }

    @Test
    public void enumValuesCountTest() {
        assertEquals(13, CategoryEnum.values().length);
    }

    @Test
    public void enumValueOfTest() {
        assertEquals(CategoryEnum.ALIMENTACION, CategoryEnum.valueOf("ALIMENTACION"));
        assertEquals(CategoryEnum.VIVIENDA, CategoryEnum.valueOf("VIVIENDA"));
        assertEquals(CategoryEnum.TRANSPORTE, CategoryEnum.valueOf("TRANSPORTE"));
        assertEquals(CategoryEnum.ENTRETENIMIENTO, CategoryEnum.valueOf("ENTRETENIMIENTO"));
        assertEquals(CategoryEnum.SALUD_BIENESTAR, CategoryEnum.valueOf("SALUD_BIENESTAR"));
        assertEquals(CategoryEnum.EDUCACION, CategoryEnum.valueOf("EDUCACION"));
        assertEquals(CategoryEnum.VESTIMENTA, CategoryEnum.valueOf("VESTIMENTA"));
        assertEquals(CategoryEnum.CUIDADO_PERSONAL, CategoryEnum.valueOf("CUIDADO_PERSONAL"));
        assertEquals(CategoryEnum.GASTO_FIJO, CategoryEnum.valueOf("GASTO_FIJO"));
        assertEquals(CategoryEnum.AHORRO_INVERSION, CategoryEnum.valueOf("AHORRO_INVERSION"));
        assertEquals(CategoryEnum.REGALO_CARIDAD, CategoryEnum.valueOf("REGALO_CARIDAD"));
        assertEquals(CategoryEnum.VIAJE_VACACIONES, CategoryEnum.valueOf("VIAJE_VACACIONES"));
        assertEquals(CategoryEnum.OTROS, CategoryEnum.valueOf("OTROS"));
    }
}
