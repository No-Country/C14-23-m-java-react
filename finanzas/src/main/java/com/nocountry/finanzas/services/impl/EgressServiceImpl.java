package com.nocountry.finanzas.services.impl;

import com.nocountry.finanzas.entities.Egress;
import com.nocountry.finanzas.entities.EgressCategory;
import com.nocountry.finanzas.repositories.EgressRepository;
import com.nocountry.finanzas.services.EgressCategoryService;
import com.nocountry.finanzas.services.EgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class EgressServiceImpl implements EgressService {

    @Autowired
    private EgressRepository egressRepository;

    @Autowired
    private EgressCategoryService egressCategoryService;

    @Transactional
    @Override
    public Egress createdEgress(Egress egress) {
        EgressCategory egressCategory = egressCategoryService.createEgressCategory(egress.getEgressCategory());
        egress.setEgressCategory(egressCategory);

        //Hacer verificaciones de campos nulos? correctos? ver requerimientos

        return egressRepository.save(egress);
    }

    @Transactional
    @Override
    public Egress updateEgress(Egress egress) {
        //Hacer verificaciones de campos nulos? correctos? ver requerimientos

        egressCategoryService.updateEgressCategory(egress.getEgressCategory());
        return egressRepository.save(egress);
    }

    @Transactional(readOnly = true)
    @Override
    public List<Egress> getAllEgress() {

        return egressRepository.findAll();
    }

    @Transactional(readOnly = true)
    @Override
    public Egress getEgressById(Long id) {

        return egressRepository.findById(id).orElse(null);
    }

    @Transactional
    @Override
    public void deleteEgressById(Long id) {
        egressRepository.deleteById(id);
        egressCategoryService.deleteEgressCategoryById(id);
    }

}
