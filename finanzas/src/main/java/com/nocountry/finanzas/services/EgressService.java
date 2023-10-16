package com.nocountry.finanzas.services;

import com.nocountry.finanzas.models.request.egress.EgressRequestDTO;
import com.nocountry.finanzas.models.response.egress.EgressResponseDTO;

import java.util.List;

public interface EgressService {

    public EgressResponseDTO createdEgress(EgressRequestDTO egressRequestDTO);

    public EgressResponseDTO updateEgress(EgressRequestDTO egressRequestDTO);

    public List<EgressResponseDTO> getAllEgress();

    public EgressResponseDTO getEgressById(Long id);

    public void deleteEgressById(Long id);

}
