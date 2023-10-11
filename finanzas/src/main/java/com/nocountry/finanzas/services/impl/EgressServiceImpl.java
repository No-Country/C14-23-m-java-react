package com.nocountry.finanzas.services.impl;

import com.nocountry.finanzas.entities.Egress;
import com.nocountry.finanzas.entities.EgressCategory;
import com.nocountry.finanzas.repositories.EgressRepository;
import com.nocountry.finanzas.services.EgressCategoryService;
import com.nocountry.finanzas.services.EgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EgressServiceImpl implements EgressService {

    @Autowired
    private EgressRepository egressRepository;

    @Autowired
    private EgressCategoryService egressCategoryService;

    private final List<Egress> listEgress = new ArrayList<>();

    @Override
    public Egress createdEgress(Egress egress) {
        Egress newEgress = new Egress();
        EgressCategory egressCategory;

        egressCategory = egressCategoryService.createEgressCategory(egress.getEgressCategory());

        newEgress.setAmount(egress.getAmount());
        newEgress.setDate(egress.getDate());
        newEgress.setEgressCategory(egressCategory);

        if (egress.getDescription() != null) {
            newEgress.setDescription(egress.getDescription());
        }

        egressRepository.save(newEgress);
        listEgress.add(newEgress);

        return newEgress;
    }

    @Override
    public Egress updateEgress(Egress egress) {

        return null;
    }

    @Override
    public List<Egress> getAllEgress() {
        return listEgress;
    }

    @Override
    public Egress getEgressById(Long id) {

        for (Egress egress: listEgress) {
            if (egress.getId().equals(id)) {
                return egress;
            }
        }

        //ver como controlar si el id no existe
        return null;
    }

    @Override
    public void deleteEgressById(Long id) {
        egressRepository.deleteById(id);
        listEgress.removeIf(egress -> egress.getId().equals(id));
    }
}
