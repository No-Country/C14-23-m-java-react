package com.nocountry.finanzas.services;

import com.nocountry.finanzas.entities.EgressCategory;
import com.nocountry.finanzas.models.egress.CategoryEgressDTO;

import java.util.List;

public interface EgressCategoryService {

    public EgressCategory createEgressCategory(CategoryEgressDTO category);

    public EgressCategory getEgressCategoryById(Long id);

    public List<EgressCategory> getAllEgressCategories();

    public void deleteEgressCategoryById(Long id);

    public EgressCategory updateEgressCategory(EgressCategory egressCategory);

}
