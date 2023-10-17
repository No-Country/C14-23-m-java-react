package com.nocountry.finanzas.services.impl;

import com.nocountry.finanzas.entities.Egress;
import com.nocountry.finanzas.entities.EgressCategory;
import com.nocountry.finanzas.entities.User;
import com.nocountry.finanzas.models.egress.CreateEgressDTO;
import com.nocountry.finanzas.models.egress.EgressDTO;
import com.nocountry.finanzas.models.egress.MapperEgress;
import com.nocountry.finanzas.repositories.EgressRepository;
import com.nocountry.finanzas.repositories.UserRepository;
import com.nocountry.finanzas.services.EgressCategoryService;
import com.nocountry.finanzas.services.EgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EgressServiceImpl implements EgressService {

    private final EgressRepository egressRepository;

    private final EgressCategoryService egressCategoryService;

    private final MapperEgress egressMapper;

    private final UserRepository userRepository;

    @Autowired
    public EgressServiceImpl(EgressRepository egressRepository, EgressCategoryService egressCategoryService, MapperEgress egressMapper, UserRepository userRepository) {
        this.egressRepository = egressRepository;
        this.egressCategoryService = egressCategoryService;
        this.egressMapper = egressMapper;
        this.userRepository = userRepository;

    }

    @Transactional
    @Override
    public EgressDTO createdEgress(CreateEgressDTO egressDTO) {
        Egress egress = egressMapper.toEgress(egressDTO);
        User user = userRepository.findById(egress.getUser().getId()).get();

        EgressCategory egressCategory = egressCategoryService.createEgressCategory(egress.getEgressCategory());
        egress.setEgressCategory(egressCategory);
        egress.setUser(user);
        egressRepository.save(egress);

        //Hacer verificaciones de campos nulos? correctos? ver requerimientos

        return egressMapper.toDTO(egress);
    }

    @Transactional
    @Override
    public EgressDTO updateEgress(EgressDTO egressDTO) {
        //Hacer verificaciones de campos nulos? correctos? ver requerimientos
        Egress egress = egressMapper.toEgress(egressDTO);

        egressCategoryService.updateEgressCategory(egress.getEgressCategory());
        egressRepository.save(egress);
        return egressMapper.toDTO(egress);
    }

    @Transactional(readOnly = true)
    @Override
    public List<EgressDTO> getAllEgress() {

        return egressMapper.egressDTOList(egressRepository.findAll());
    }

    @Transactional(readOnly = true)
    @Override
    public EgressDTO getEgressById(Long id) {

        return egressMapper.toDTO(egressRepository.findById(id).orElse(null));
    }

    @Transactional
    @Override
    public void deleteEgressById(Long id) {
        egressRepository.deleteById(id);
        egressCategoryService.deleteEgressCategoryById(id);
    }

}
