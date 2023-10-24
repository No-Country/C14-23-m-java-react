package com.nocountry.finanzas.services.impl;

import com.nocountry.finanzas.entities.IncomeCategory;
import com.nocountry.finanzas.entities.enums.CategoryIncomeEnum;
import com.nocountry.finanzas.models.income.CategoryIncomeDTO;
import com.nocountry.finanzas.repositories.IncomeCategoryRepository;
import com.nocountry.finanzas.services.IncomeCategoryService;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncomeCategoryImpl implements IncomeCategoryService {

    private final IncomeCategoryRepository repository;

    @Autowired
    public IncomeCategoryImpl(IncomeCategoryRepository repository) {
        this.repository = repository;
    }

    @Transactional
    @Override
    public IncomeCategory createIncomeCategory(CategoryIncomeDTO category) {

        IncomeCategory newCategory = searchCategory(category.getName());
        return repository.save(newCategory);
    }

    @Transactional(readOnly = true)
    @Override
    public IncomeCategory getIncomeCategoryById(Long id) {

        return repository.findById(id).get();
    }

    @Transactional(readOnly = true)
    @Override
    public List<IncomeCategory> getAllCategories() {

        return repository.findAll();
    }

    @Transactional
    @Override
    public void deleteIncomeCategoryById(Long id) {

        repository.deleteById(id);
    }

    @Transactional
    @Override
    public IncomeCategory updateIncomeCategory(IncomeCategory incomeCategory) {

        return repository.save(incomeCategory);
    }

    private IncomeCategory searchCategory(String name) {

        for (CategoryIncomeEnum element: CategoryIncomeEnum.values()) {
            if (element.name().equalsIgnoreCase(name)) {
                return new IncomeCategory(element);
            }
        }

        return new IncomeCategory(CategoryIncomeEnum.OTROS);
    }


}
