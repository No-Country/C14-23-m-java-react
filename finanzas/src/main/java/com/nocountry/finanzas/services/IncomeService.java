package com.nocountry.finanzas.services;

import com.nocountry.finanzas.entities.Income;

import java.util.List;

public interface IncomeService {

    public List<Income> listIncome();

    public Income findById(Long id);

    Income save (Income income);

    void delete(Long id);
}
