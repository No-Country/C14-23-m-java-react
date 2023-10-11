package com.nocountry.finanzas.services.impl;

import com.nocountry.finanzas.entities.CategoryEnum;
import com.nocountry.finanzas.entities.EgressCategory;
import com.nocountry.finanzas.repositories.EgressCategoryRepository;
import com.nocountry.finanzas.services.EgressCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EgressCategoryImpl implements EgressCategoryService {

    @Autowired
    private EgressCategoryRepository repository;

    private final ArrayList<EgressCategory> listEgressCategories = new ArrayList<>();

    @Override
    public EgressCategory createEgressCategory(EgressCategory egressCategory) {
        EgressCategory newEgressCategory = new EgressCategory(searchCategory(egressCategory.getName().name()));

        if (egressCategory.getDescription() != null) {
            newEgressCategory.setDescription(egressCategory.getDescription());
        }

        repository.save(newEgressCategory);
        listEgressCategories.add(newEgressCategory);

        return newEgressCategory;
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

    @Override
    public EgressCategory getEgressCategoryById(Long id) {
        for (EgressCategory egressCategory: listEgressCategories) {
            if (egressCategory.getId().equals(id)) {
                return egressCategory;
            }
        }
        return null;
    }

    @Override
    public List<EgressCategory> getAllEgressCategories() {

        return listEgressCategories;
    }

    @Override
    public void deleteEgressCategoryById(Long id) {
        repository.deleteById(id);
        listEgressCategories.removeIf(egress -> egress.getId().equals(id));
    }

    @Override
    public EgressCategory updateEgressCategory(Long id, String name, String description) {

        EgressCategory egressCategory = getEgressCategoryById(id);

        if (name != null) {
            egressCategory.setName(searchCategory(name));
        }
        if (description != null) {
            egressCategory.setDescription(description);
        }

        // algun cambio en la lista de categorias?
        return repository.save(egressCategory);
    }


}
