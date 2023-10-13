package com.nocountry.finanzas.models;

import com.nocountry.finanzas.entities.CategoryEnum;
import com.nocountry.finanzas.entities.Egress;
import com.nocountry.finanzas.entities.EgressCategory;
import com.nocountry.finanzas.models.request.EgressRequestDTO;
import com.nocountry.finanzas.models.response.EgressResponseDTO;
import org.junit.Before;
import org.junit.Test;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

public class MapperEgressTest {

    private EgressMapper egressMapper;
    private final LocalDate date = LocalDate.of(2023, 10, 20);

    @Before
    public void setUp() {
        egressMapper = new EgressMapper();
    }

    @Test
    public void testConvertRequestDTOToEgress() {
        EgressRequestDTO requestDTO = new EgressRequestDTO();

        requestDTO.setId(1L);
        requestDTO.setAmount(1000.0);
        requestDTO.setDate(date);
        requestDTO.setDescription("Sample Description");

        requestDTO.setCategoryName("OTROS");
        requestDTO.setCategoryDescription("Category Description test");

        Egress egress = egressMapper.convertRequestDTOToEgress(requestDTO);

        assertEquals(requestDTO.getId(), egress.getId());
        assertEquals(requestDTO.getAmount(), egress.getAmount(), 0.01);
        assertEquals(requestDTO.getDate(), egress.getDate());
        assertEquals(requestDTO.getDescription(), egress.getDescription());

        assertEquals(CategoryEnum.OTROS, egress.getEgressCategory().getName());
        assertEquals(requestDTO.getCategoryDescription(), egress.getEgressCategory().getDescription());
    }

    @Test
    public void testConvertEgressToResponseDTO() {
        Egress egress = new Egress();
        EgressCategory egressCategory = new EgressCategory();

        egress.setId(1L);
        egress.setAmount(800.0);
        egress.setDate(date);
        egress.setDescription("Sample Description");

        egressCategory.setName(CategoryEnum.ENTRETENIMIENTO);
        egressCategory.setDescription("Category Description");
        egress.setEgressCategory(egressCategory);

        EgressResponseDTO responseDTO = egressMapper.convertEgressToResponseDTO(egress);

        assertEquals(egress.getId(), responseDTO.getId());
        assertEquals(egress.getAmount(), responseDTO.getAmount(), 0.01);
        assertEquals(egress.getDate(), responseDTO.getDate());
        assertEquals(egress.getDescription(), responseDTO.getDescription());

        assertEquals(CategoryEnum.ENTRETENIMIENTO.name(), responseDTO.getCategoryName());
        assertEquals(egress.getEgressCategory().getDescription(), responseDTO.getCategoryDescription());
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
        EgressCategory egressCategory2 = new EgressCategory(CategoryEnum.REGALO_CARIDAD);

        egress2.setId(2L);
        egress2.setAmount(5200.0);
        egress2.setDate(date.plusDays(2));
        egress2.setDescription("Description 2");
        egress2.setEgressCategory(egressCategory2);

        List<Egress> listEgress = new ArrayList<>();
        listEgress.add(egress1);
        listEgress.add(egress2);

        List<EgressResponseDTO> listResponse = egressMapper.convertEgressToListResponseDTO(listEgress);

        assertEquals(2, listResponse.size());

        EgressResponseDTO responseDTO1 = listResponse.get(0);
        assertEquals(egress1.getId(), responseDTO1.getId());
        assertEquals(egress1.getAmount(), responseDTO1.getAmount(), 0.01);
        assertEquals(egress1.getDate(), responseDTO1.getDate());
        assertEquals(egress1.getDescription(), responseDTO1.getDescription());
        assertEquals(egress1.getEgressCategory().getName().name(), responseDTO1.getCategoryName());
        assertEquals(egress1.getEgressCategory().getDescription(), responseDTO1.getCategoryDescription());

        EgressResponseDTO responseDTO2 = listResponse.get(1);
        assertEquals(egress2.getId(), responseDTO2.getId());
        assertEquals(egress2.getAmount(), responseDTO2.getAmount(), 0.01);
        assertEquals(egress2.getDate(), responseDTO2.getDate());
        assertEquals(egress2.getDescription(), responseDTO2.getDescription());
        assertEquals(egress2.getEgressCategory().getName().name(), responseDTO2.getCategoryName());
        assertEquals(egress2.getEgressCategory().getDescription(), responseDTO2.getCategoryDescription());
    }

    @Test
    public void testConvertEgressToListEmptyResponseDTO() {
        List<Egress> listEgress = new ArrayList<>();
        List<EgressResponseDTO> listResponse = egressMapper.convertEgressToListResponseDTO(listEgress);

        assertNotNull(listResponse);
        assertTrue(listResponse.isEmpty());
        assertEquals(0, listResponse.size());
    }

    @Test
    public void testConvertEgressToListResponseDTOWithNullList() {
        List<EgressResponseDTO> listResponse = egressMapper.convertEgressToListResponseDTO(null);
        assertNotNull(listResponse);
        assertTrue(listResponse.isEmpty());
    }

    @Test
    public void testSearchCategory() {
        EgressCategory egressCategory = egressMapper.searchCategory(CategoryEnum.OTROS.name(), "");
        assertEquals(CategoryEnum.OTROS, egressCategory.getName());
        assertEquals("", egressCategory.getDescription());

        EgressCategory egressCategory1 = egressMapper.searchCategory(CategoryEnum.VIVIENDA.name(), "Category Description");
        assertEquals(CategoryEnum.VIVIENDA, egressCategory1.getName());
        assertEquals("Category Description", egressCategory1.getDescription());

        EgressCategory egressCategory2 = egressMapper.searchCategory(CategoryEnum.ENTRETENIMIENTO.name(), "Cine");
        assertEquals(CategoryEnum.ENTRETENIMIENTO, egressCategory2.getName());
        assertEquals("Cine", egressCategory2.getDescription());

        EgressCategory egressCategory3 = egressMapper.searchCategory(CategoryEnum.EDUCACION.name(), "Cursito de java");
        assertEquals(CategoryEnum.EDUCACION, egressCategory3.getName());
        assertEquals("Cursito de java", egressCategory3.getDescription());

        EgressCategory egressCategory4 = egressMapper.searchCategory(CategoryEnum.CUIDADO_PERSONAL.name(), "Gym");
        assertEquals(CategoryEnum.CUIDADO_PERSONAL, egressCategory4.getName());
        assertEquals("Gym", egressCategory4.getDescription());

        EgressCategory egressCategory5 = egressMapper.searchCategory(CategoryEnum.GASTO_FIJO.name(), "Internet");
        assertEquals(CategoryEnum.GASTO_FIJO, egressCategory5.getName());
        assertEquals("Internet", egressCategory5.getDescription());
        }

    @Test
    public void testSearchCategoryInvalidName() {
        EgressCategory egressCategory = egressMapper.searchCategory("INVALID_CATEGORY", "Category Invalid Description.");
        assertNull(egressCategory.getName());
        assertEquals("Category Invalid Description.", egressCategory.getDescription());

        EgressCategory egressCategory2 = egressMapper.searchCategory("INVALID_CATEGORY_2", "");
        assertNull(egressCategory2.getName());
        assertEquals("", egressCategory2.getDescription());
    }
}
