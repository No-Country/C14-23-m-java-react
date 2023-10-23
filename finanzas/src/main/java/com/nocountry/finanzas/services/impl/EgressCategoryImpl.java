package com.nocountry.finanzas.services.impl;

import com.nocountry.finanzas.entities.enums.CategoryEnum;
import com.nocountry.finanzas.entities.EgressCategory;
import com.nocountry.finanzas.repositories.EgressCategoryRepository;
import com.nocountry.finanzas.services.EgressCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;


@Service
public class EgressCategoryImpl implements EgressCategoryService {

    private final EgressCategoryRepository repository;

    @Autowired
    public EgressCategoryImpl(EgressCategoryRepository repository){
        this.repository = repository;
    }

    @Transactional
    @Override
    public EgressCategory createEgressCategory(String name) {
        EgressCategory newCategory = searchCategory(name);
        return repository.save(newCategory);
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

        return repository.save(egressCategory);
    }

    private EgressCategory searchCategory(String name) {

        for (CategoryEnum element : CategoryEnum.values()) {
            if (element.name().equalsIgnoreCase(name)) {
                return new EgressCategory(element);
            }
        }

        return null;
    }


}
