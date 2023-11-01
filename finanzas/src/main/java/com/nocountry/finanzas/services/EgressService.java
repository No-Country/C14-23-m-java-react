package com.nocountry.finanzas.services;

import com.nocountry.finanzas.entities.Egress;
import com.nocountry.finanzas.exceptions.BadRequestException;
import com.nocountry.finanzas.exceptions.NotFoundException;
import com.nocountry.finanzas.models.egress.CreateEgressDTO;
import com.nocountry.finanzas.models.egress.CustomSearchDTO;
import com.nocountry.finanzas.models.egress.EgressDTO;
import jakarta.annotation.Nullable;

import java.util.List;
import java.util.Optional;

public interface EgressService {

    public EgressDTO createdEgress(CreateEgressDTO egressDTO) throws BadRequestException, NotFoundException;

    public EgressDTO updateEgress(EgressDTO egressDTO) throws NotFoundException;

    public List<EgressDTO> getAllEgress();

    public EgressDTO getEgressById(Long id) throws NotFoundException;

    public void deleteEgressById(Long id) throws NotFoundException;

    public List<EgressDTO> getEgressByUser(Long id) throws NotFoundException;

    public List<EgressDTO> findByMontAndCategory(Long id, CustomSearchDTO customSearchDTO) throws NotFoundException;

    /*public List<EgressDTO> getAllEgressPageable(Long userId, Integer page );*/


}
