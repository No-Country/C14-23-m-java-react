package com.nocountry.finanzas.services;

import com.nocountry.finanzas.entities.IncomeCategory;

import java.util.List;

public interface IncomeCategoryService {

    IncomeCategory createIncomeCategory(IncomeCategory incomeCategory);

    IncomeCategory getIncomeCategoryById(Long id);

    List<IncomeCategory> getAllCategories();

    void deleteIncomeCategoryById(Long id);


}
