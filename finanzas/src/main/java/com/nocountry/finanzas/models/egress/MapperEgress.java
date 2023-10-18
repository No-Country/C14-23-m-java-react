package com.nocountry.finanzas.models.egress;

import com.nocountry.finanzas.entities.CategoryEnum;
import com.nocountry.finanzas.entities.Egress;
import com.nocountry.finanzas.entities.EgressCategory;
import com.nocountry.finanzas.entities.User;
import com.nocountry.finanzas.validators.NullListException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MapperEgress {

    public Egress toEgress(EgressDTO egressDTO) {
        Egress egress = new Egress();

        if (egressDTO.getIdEgress() != null) {
            egress.setId(egressDTO.getIdEgress());
        }

        egress.setAmount(egressDTO.getAmount());
        egress.setDate(egressDTO.getDate());
        egress.setDescription(egressDTO.getDescription());
        egress.setEgressCategory(searchCategory(egressDTO.getCategoryName()));

        if (egressDTO instanceof CreateEgressDTO) {
            User user = new User();
            user.setId(((CreateEgressDTO) egressDTO).getIdUser());

            egress.setUser(user);
        }

        return egress;
    }

    public EgressDTO toDTO(Egress egress) {
        EgressDTO egressDTO = new EgressDTO();

        egressDTO.setIdEgress(egress.getId());
        egressDTO.setAmount(egress.getAmount());
        egressDTO.setDate(egress.getDate());
        egressDTO.setDescription(egress.getDescription());


        egressDTO.setCategoryName(egress.getEgressCategory().getName().name());

        return egressDTO;
    }


    public List<EgressDTO> egressDTOList(List<Egress> egressList) {
        ArrayList<EgressDTO> listResponse = new ArrayList<>();
        EgressDTO egressDTO;

        try {
            if (egressList == null) {
                throw new NullListException("La lista de Egress es nula.");
            }

            for (Egress egress: egressList) {
                egressDTO = toDTO(egress);
                listResponse.add(egressDTO);
            }
        } catch(NullListException e) {
            System.out.println("Error: La lista de Egress es nula. Por favor, proporcione una lista válida.");
        }

        return listResponse;
    }

    public EgressCategory searchCategory(String name) {
        EgressCategory egressCategory = new EgressCategory();

        for (CategoryEnum element : CategoryEnum.values()) {
            if (element.name().equalsIgnoreCase(name)) {
                egressCategory.setName(element);
            }
        }

        return egressCategory;
    }


}
