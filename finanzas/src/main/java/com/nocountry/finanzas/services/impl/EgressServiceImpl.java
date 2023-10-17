package com.nocountry.finanzas.services.impl;

import com.nocountry.finanzas.entities.Egress;
import com.nocountry.finanzas.entities.EgressCategory;
import com.nocountry.finanzas.entities.User;
import com.nocountry.finanzas.models.EgressMapper;
import com.nocountry.finanzas.models.request.egress.EgressRequestDTO;
import com.nocountry.finanzas.models.response.egress.EgressResponseDTO;
import com.nocountry.finanzas.repositories.EgressRepository;
import com.nocountry.finanzas.repositories.UserRepository;
import com.nocountry.finanzas.services.EgressCategoryService;
import com.nocountry.finanzas.services.EgressService;
import com.nocountry.finanzas.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EgressServiceImpl implements EgressService {

    private final EgressRepository egressRepository;

    private final EgressCategoryService egressCategoryService;

    private final EgressMapper egressMapper;

    private final UserRepository userRepository;

    @Autowired
    public EgressServiceImpl(EgressRepository egressRepository, EgressCategoryService egressCategoryService, EgressMapper egressMapper, UserRepository userRepository) {
        this.egressRepository = egressRepository;
        this.egressCategoryService = egressCategoryService;
        this.egressMapper = egressMapper;
        this.userRepository = userRepository;

    }

    @Transactional
    @Override
    public EgressResponseDTO createdEgress(EgressRequestDTO egressRequestDTO) {
        Egress egress = egressMapper.convertRequestDTOToEgress(egressRequestDTO);
        User user = userRepository.findById(egress.getUser().getId()).get();

        EgressCategory egressCategory = egressCategoryService.createEgressCategory(egress.getEgressCategory());
        egress.setEgressCategory(egressCategory);
        egress.setUser(user);
        egressRepository.save(egress);

        //Hacer verificaciones de campos nulos? correctos? ver requerimientos

        return egressMapper.convertEgressToResponseDTO(egress);
    }

    @Transactional
    @Override
    public EgressResponseDTO updateEgress(EgressRequestDTO egressRequestDTO) {
        //Hacer verificaciones de campos nulos? correctos? ver requerimientos
        Egress egress = egressMapper.convertRequestDTOToEgress(egressRequestDTO);

        egressCategoryService.updateEgressCategory(egress.getEgressCategory());
        egressRepository.save(egress);
        return egressMapper.convertEgressToResponseDTO(egress);
    }

    @Transactional(readOnly = true)
    @Override
    public List<EgressResponseDTO> getAllEgress() {

        return egressMapper.convertEgressToListResponseDTO(egressRepository.findAll());
    }

    @Transactional(readOnly = true)
    @Override
    public EgressResponseDTO getEgressById(Long id) {

        return egressMapper.convertEgressToResponseDTO(egressRepository.findById(id).orElse(null));
    }

    @Transactional
    @Override
    public void deleteEgressById(Long id) {
        egressRepository.deleteById(id);
        egressCategoryService.deleteEgressCategoryById(id);
    }

}
