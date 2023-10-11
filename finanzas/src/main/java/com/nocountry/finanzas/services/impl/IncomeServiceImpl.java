package com.nocountry.finanzas.services.impl;

import com.nocountry.finanzas.entities.Income;
import com.nocountry.finanzas.repositories.IncomeRepository;
import com.nocountry.finanzas.services.IncomeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import org.springframework.transaction.annotation.Transactional;

@AllArgsConstructor
@Service
public class IncomeServiceImpl implements IncomeService {

    private final IncomeRepository repository;

    @Transactional(readOnly = true)
    @Override
    public List<Income> listIncome() {
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    @Override
    public Income findById(Long id) {
        return this.repository.findById(id).orElse(null);
    }

    @Transactional
    @Override
    public Income save(Income income) {
        this.repository.save(income);
        return income;
    }


    @Transactional
    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
