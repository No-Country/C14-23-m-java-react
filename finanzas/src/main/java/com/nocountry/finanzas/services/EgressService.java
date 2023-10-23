package com.nocountry.finanzas.services;

import com.nocountry.finanzas.exceptions.BadRequestException;
import com.nocountry.finanzas.models.egress.CreateEgressDTO;
import com.nocountry.finanzas.models.egress.EgressDTO;

import java.util.List;

public interface EgressService {

    public EgressDTO createdEgress(CreateEgressDTO egressDTO) throws BadRequestException;

    public EgressDTO updateEgress(EgressDTO egressDTO);

    public List<EgressDTO> getAllEgress();

    public EgressDTO getEgressById(Long id);

    public void deleteEgressById(Long id);

    public List<EgressDTO> getEgressByUser(Long id);

}
