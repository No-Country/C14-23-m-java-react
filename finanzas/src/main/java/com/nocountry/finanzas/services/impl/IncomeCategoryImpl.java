package com.nocountry.finanzas.services.impl;

import com.nocountry.finanzas.entities.IncomeCategory;
import com.nocountry.finanzas.entities.enums.CategoryIncomeEnum;
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
    public IncomeCategory createIncomeCategory(String name) {
        System.out.println("Name en el service: " + name);
        IncomeCategory newCategory = searchCategory(name);
        System.out.println("Name ya como un income category: " + newCategory.getName().name());
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

    private IncomeCategory searchCategory(String name) {
        IncomeCategory incomeCategory = new IncomeCategory();

        System.out.println("Nmae en el search: " + name);

        for (CategoryIncomeEnum element: CategoryIncomeEnum.values()) {
            System.out.println("Element en el for: " + element.name());
            if (element.name().equalsIgnoreCase(name)) {
                System.out.println("Element en el if: " + element.name());
                incomeCategory.setName(element);
            }
        }
        return incomeCategory;
    }


}
