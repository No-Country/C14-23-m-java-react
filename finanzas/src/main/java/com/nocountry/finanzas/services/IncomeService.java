package com.nocountry.finanzas.services;

import com.nocountry.finanzas.exceptions.BadRequestException;
import com.nocountry.finanzas.exceptions.NotFoundException;
import com.nocountry.finanzas.models.egress.CustomSearchDTO;
import com.nocountry.finanzas.models.income.CreateIncomeDTO;
import com.nocountry.finanzas.models.income.IncomeDTO;

import java.util.List;

public interface IncomeService {

    public List<IncomeDTO> listIncome();

    public IncomeDTO findById(Long id) throws NotFoundException;

    public IncomeDTO save (CreateIncomeDTO income) throws BadRequestException, NotFoundException;

    public void delete(Long id) throws NotFoundException;

    public IncomeDTO updateIncome(IncomeDTO requestDTO) throws NotFoundException;

    public List<IncomeDTO> findByMonthAndCategory(Long id, CustomSearchDTO customSearchDTO) throws NotFoundException;

    public List<IncomeDTO> getIncomeByUser(Long idUser) throws NotFoundException;
}
