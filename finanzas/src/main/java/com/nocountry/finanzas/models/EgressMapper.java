package com.nocountry.finanzas.models;

import com.nocountry.finanzas.entities.CategoryEnum;
import com.nocountry.finanzas.entities.Egress;
import com.nocountry.finanzas.entities.EgressCategory;
import com.nocountry.finanzas.models.request.egress.EgressRequestDTO;
import com.nocountry.finanzas.models.response.egress.EgressResponseDTO;
import com.nocountry.finanzas.validators.NullListException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class EgressMapper {

    public Egress convertRequestDTOToEgress(EgressRequestDTO requestDTO) {
        Egress egress = new Egress();
        EgressCategory egressCategory = searchCategory(requestDTO.getCategoryName(), requestDTO.getCategoryDescription());

        egress.setId(requestDTO.getId());
        egress.setAmount(requestDTO.getAmount());
        egress.setDate(requestDTO.getDate());
        egress.setDescription(requestDTO.getDescription());
        egress.setEgressCategory(egressCategory);

        return egress;
    }

    public EgressResponseDTO convertEgressToResponseDTO(Egress egress) {
        EgressResponseDTO responseDTO = new EgressResponseDTO();

        responseDTO.setId(egress.getId());
        responseDTO.setAmount(egress.getAmount());
        responseDTO.setDate(egress.getDate());
        responseDTO.setDescription(egress.getDescription());

        responseDTO.setCategoryName(egress.getEgressCategory().getName().name());
        responseDTO.setCategoryDescription(egress.getEgressCategory().getDescription());

        return responseDTO;
    }

    public List<EgressResponseDTO> convertEgressToListResponseDTO(List<Egress> listEgress) {
        ArrayList<EgressResponseDTO> listResponse = new ArrayList<>();
        EgressResponseDTO responseDTO;

        try {
            if (listEgress == null) {
                throw new NullListException("La lista de Egress es nula.");
            }

            for (Egress egress: listEgress) {
                responseDTO = convertEgressToResponseDTO(egress);
                listResponse.add(responseDTO);
            }
        } catch(NullListException e) {
            System.out.println("Error: La lista de Egress es nula. Por favor, proporcione una lista válida.");
        }

        return listResponse;
    }

    public EgressCategory searchCategory(String name, String description) {
        EgressCategory egressCategory = new EgressCategory();

        egressCategory.setDescription(description);

        for (CategoryEnum element : CategoryEnum.values()) {
            if (element.name().equalsIgnoreCase(name)) {
                egressCategory.setName(element);
            }
        }

        return egressCategory;
    }

}
