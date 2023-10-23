package com.nocountry.finanzas.services;

import com.nocountry.finanzas.exceptions.BadRequestException;
import com.nocountry.finanzas.models.income.IncomeDTO;

import java.util.List;

public interface IncomeService {

    public List<IncomeDTO> listIncome();

    public IncomeDTO findById(Long id);

    public IncomeDTO save (IncomeDTO income) throws BadRequestException;

    public void delete(Long id);

    public IncomeDTO updateIncome(IncomeDTO requestDTO);
}
