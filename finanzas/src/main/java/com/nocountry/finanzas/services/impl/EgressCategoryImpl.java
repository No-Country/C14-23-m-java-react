package com.nocountry.finanzas.services.impl;

import com.nocountry.finanzas.entities.CategoryEnum;
import com.nocountry.finanzas.entities.EgressCategory;
import com.nocountry.finanzas.repositories.EgressCategoryRepository;
import com.nocountry.finanzas.services.EgressCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;


@Service
public class EgressCategoryImpl implements EgressCategoryService {

    @Autowired
    private EgressCategoryRepository repository;

    @Transactional
    @Override
    public EgressCategory createEgressCategory(EgressCategory egressCategory) {
        //Hacer verificaciones de campos nulos? correctos? ver requerimientos
        return repository.save(egressCategory);
    }

    @Transactional(readOnly = true)
    @Override
    public EgressCategory getEgressCategoryById(Long id) {

        return repository.findById(id).orElse(null);
    }

    @Transactional(readOnly = true)
    @Override
    public List<EgressCategory> getAllEgressCategories() {

        return repository.findAll();
    }

    @Transactional
    @Override
    public void deleteEgressCategoryById(Long id) {

        repository.deleteById(id);
    }

    @Transactional
    @Override
    public EgressCategory updateEgressCategory(EgressCategory egressCategory) {
        //Hacer verificaciones de campos nulos? correctos? ver requerimientos
        System.out.println(" El id del category ");
        return repository.save(egressCategory);
    }

    private CategoryEnum searchCategory(String name) {

        for (CategoryEnum element : CategoryEnum.values()) {
            if (element.name().equalsIgnoreCase(name)) {
                return element;
            }
        }

        // controlar q pasa si no existe el enum indicado
        return null;
    }

}
