package com.nocountry.finanzas.services;

import com.nocountry.finanzas.entities.EgressCategory;

import java.util.List;

public interface EgressCategoryService {

    public EgressCategory createEgressCategory(EgressCategory egressCategory);

    public EgressCategory getEgressCategoryById(Long id);

    public List<EgressCategory> getAllEgressCategorys();

    public void deleteEgressCategoryById(Long id);
}
