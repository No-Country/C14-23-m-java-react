package com.nocountry.finanzas.models;

import com.nocountry.finanzas.entities.enums.CategoryEnum;
import com.nocountry.finanzas.entities.Egress;
import com.nocountry.finanzas.entities.EgressCategory;
import com.nocountry.finanzas.models.egress.EgressDTO;
import com.nocountry.finanzas.models.egress.MapperEgress;
import org.junit.Before;
import org.junit.Test;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

public class MapperEgressTest {

    private MapperEgress egressMapper;
    private final LocalDate date = LocalDate.of(2023, 10, 20);

    @Before
    public void setUp() {
        egressMapper = new MapperEgress();
    }

    @Test
    public void testConvertDTOToEgress() {
        EgressDTO requestDTO = new EgressDTO();

        requestDTO.setAmount(1000.0);
        requestDTO.setDate(date);
        requestDTO.setDescription("Sample Description");

        requestDTO.setCategoryName("OTROS");

        Egress egress = egressMapper.toEgress(requestDTO);

        assertEquals(requestDTO.getAmount(), egress.getAmount(), 0.01);
        assertEquals(requestDTO.getDate(), egress.getDate());
        assertEquals(requestDTO.getDescription(), egress.getDescription());

        assertEquals(CategoryEnum.OTROS, egress.getEgressCategory().getName());
    }

    @Test
    public void testConvertEgressToResponseDTO() {
        Egress egress = new Egress();
        EgressCategory egressCategory = new EgressCategory();

        egress.setAmount(800.0);
        egress.setDate(date);
        egress.setDescription("Sample Description");

        egressCategory.setName(CategoryEnum.ENTRETENIMIENTO);
        egress.setEgressCategory(egressCategory);

        EgressDTO responseDTO = egressMapper.toDTO(egress);

        assertEquals(egress.getAmount(), responseDTO.getAmount(), 0.01);
        assertEquals(egress.getDate(), responseDTO.getDate());
        assertEquals(egress.getDescription(), responseDTO.getDescription());

        assertEquals(CategoryEnum.ENTRETENIMIENTO.name(), responseDTO.getCategoryName());
    }

    @Test
    public void testConvertEgressToListResponseDTO() {
        Egress egress1 = new Egress();
        EgressCategory egressCategory1 = new EgressCategory(CategoryEnum.EDUCACION);

        egress1.setId(1L);
        egress1.setAmount(1800.0);
        egress1.setDate(date.plusDays(1));
        egress1.setDescription("Description 1");
        egress1.setEgressCategory(egressCategory1);

        Egress egress2 = new Egress();
        EgressCategory egressCategory2 = new EgressCategory(CategoryEnum.SALUD_CUIDADO_PERSONAL);

        egress2.setId(2L);
        egress2.setAmount(5200.0);
        egress2.setDate(date.plusDays(2));
        egress2.setDescription("Description 2");
        egress2.setEgressCategory(egressCategory2);

        List<Egress> listEgress = new ArrayList<>();
        listEgress.add(egress1);
        listEgress.add(egress2);

        List<EgressDTO> listResponse = egressMapper.egressDTOList(listEgress);

        assertEquals(2, listResponse.size());

        EgressDTO responseDTO1 = listResponse.get(0);
        assertEquals(egress1.getAmount(), responseDTO1.getAmount(), 0.01);
        assertEquals(egress1.getDate(), responseDTO1.getDate());
        assertEquals(egress1.getDescription(), responseDTO1.getDescription());
        assertEquals(egress1.getEgressCategory().getName().name(), responseDTO1.getCategoryName());

        EgressDTO responseDTO2 = listResponse.get(1);
        assertEquals(egress2.getAmount(), responseDTO2.getAmount(), 0.01);
        assertEquals(egress2.getDate(), responseDTO2.getDate());
        assertEquals(egress2.getDescription(), responseDTO2.getDescription());
        assertEquals(egress2.getEgressCategory().getName().name(), responseDTO2.getCategoryName());
    }

    @Test
    public void testConvertEgressToListEmptyResponseDTO() {
        List<Egress> listEgress = new ArrayList<>();
        List<EgressDTO> listResponse = egressMapper.egressDTOList(listEgress);

        assertNotNull(listResponse);
        assertTrue(listResponse.isEmpty());
        assertEquals(0, listResponse.size());
    }

    @Test
    public void testConvertEgressToListResponseDTOWithNullList() {
        List<EgressDTO> listResponse = egressMapper.egressDTOList(null);
        assertNotNull(listResponse);
        assertTrue(listResponse.isEmpty());
    }

    @Test
    public void testSearchCategory() {
        EgressCategory egressCategory = egressMapper.searchCategory(CategoryEnum.OTROS.name());
        assertEquals(CategoryEnum.OTROS, egressCategory.getName());

        EgressCategory egressCategory1 = egressMapper.searchCategory(CategoryEnum.VIVIENDA.name());
        assertEquals(CategoryEnum.VIVIENDA, egressCategory1.getName());

        EgressCategory egressCategory2 = egressMapper.searchCategory(CategoryEnum.ENTRETENIMIENTO.name());
        assertEquals(CategoryEnum.ENTRETENIMIENTO, egressCategory2.getName());

        EgressCategory egressCategory3 = egressMapper.searchCategory(CategoryEnum.EDUCACION.name());
        assertEquals(CategoryEnum.EDUCACION, egressCategory3.getName());

        EgressCategory egressCategory4 = egressMapper.searchCategory(CategoryEnum.SALUD_CUIDADO_PERSONAL.name());
        assertEquals(CategoryEnum.SALUD_CUIDADO_PERSONAL, egressCategory4.getName());

        EgressCategory egressCategory5 = egressMapper.searchCategory(CategoryEnum.SERVICIOS.name());
        assertEquals(CategoryEnum.SERVICIOS, egressCategory5.getName());
        }

    @Test
    public void testSearchCategoryInvalidName() {
        EgressCategory egressCategory = egressMapper.searchCategory("INVALID_CATEGORY");
        assertNull(egressCategory.getName());

        EgressCategory egressCategory2 = egressMapper.searchCategory("");
        assertNull(egressCategory2.getName());

    }
}
