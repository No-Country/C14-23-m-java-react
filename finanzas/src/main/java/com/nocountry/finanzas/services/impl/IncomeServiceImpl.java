package com.nocountry.finanzas.services.impl;

import com.nocountry.finanzas.entities.Income;
import com.nocountry.finanzas.entities.IncomeCategory;
import com.nocountry.finanzas.entities.User;
import com.nocountry.finanzas.models.income.IncomeDTO;
import com.nocountry.finanzas.models.income.MapperIncome;
import com.nocountry.finanzas.repositories.IncomeRepository;
import com.nocountry.finanzas.repositories.UserRepository;
import com.nocountry.finanzas.services.IncomeCategoryService;
import com.nocountry.finanzas.services.IncomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import org.springframework.transaction.annotation.Transactional;

@Service
public class IncomeServiceImpl implements IncomeService {

    private final IncomeRepository repository;

    private final MapperIncome mapperIncome;

    private final IncomeCategoryService incomeCategoryService;

    private final UserRepository userRepository;

    @Autowired
    public IncomeServiceImpl(IncomeRepository repository, MapperIncome mapperIncome, IncomeCategoryService incomeCategoryService, UserRepository userRepository) {
        this.repository = repository;
        this.mapperIncome = mapperIncome;
        this.incomeCategoryService = incomeCategoryService;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    @Override
    public List<IncomeDTO> listIncome() {

        return mapperIncome.incomeDTOList(repository.findAll());
    }

    @Transactional(readOnly = true)
    @Override
    public IncomeDTO findById(Long id) {

        return mapperIncome.toIncomeDTO(repository.findById(id).get());
    }

    @Transactional
    @Override
    public IncomeDTO save(IncomeDTO incomeDTO) {
        Income income = mapperIncome.toIncome(incomeDTO);
        User user = userRepository.findById(income.getUser().getId()).get();

        IncomeCategory incomeCategory = incomeCategoryService.createIncomeCategory(income.getCategoryIncome());
        income.setCategoryIncome(incomeCategory);
        income.setUser(user);
        repository.save(income);

        user.getIncomes().add(income);
        user.setTotalIncome(user.getTotalIncome() + income.getAmount()); // deberia de actualizar esto en la bd?

        return mapperIncome.toIncomeDTO(income);
    }


    @Transactional
    @Override
    public void delete(Long id) {
        Income income = repository.findById(id).get();
        User user = userRepository.findById(income.getUser().getId()).get();
        user.getIncomes().remove(income);
        // tambien deberia de restar el monto del ingreso al borrarlo??? Lo mismo en egress

        repository.deleteById(id);
        incomeCategoryService.deleteIncomeCategoryById(id);
        //ver como borrar q no sea x el id, porq no siempre va a ser el mismo id q el income
    }



}
