package com.nocountry.finanzas.services;

import com.nocountry.finanzas.entities.IncomeCategory;
import com.nocountry.finanzas.models.income.CategoryIncomeDTO;

import java.util.List;

public interface IncomeCategoryService {

    IncomeCategory createIncomeCategory(CategoryIncomeDTO category);

    IncomeCategory getIncomeCategoryById(Long id);

    List<IncomeCategory> getAllCategories();

    void deleteIncomeCategoryById(Long id);

    IncomeCategory updateIncomeCategory(IncomeCategory incomeCategory);

}
