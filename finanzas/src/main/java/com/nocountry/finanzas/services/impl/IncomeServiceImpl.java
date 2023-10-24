package com.nocountry.finanzas.services.impl;

import com.nocountry.finanzas.entities.Income;
import com.nocountry.finanzas.entities.IncomeCategory;
import com.nocountry.finanzas.entities.User;
import com.nocountry.finanzas.entities.enums.CategoryIncomeEnum;
import com.nocountry.finanzas.exceptions.BadRequestException;
import com.nocountry.finanzas.models.income.IncomeDTO;
import com.nocountry.finanzas.models.income.MapperIncome;
import com.nocountry.finanzas.repositories.IncomeCategoryRepository;
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

    private final IncomeCategoryRepository incomeCategoryRepository;

    private final UserRepository userRepository;

    @Autowired
    public IncomeServiceImpl(IncomeRepository repository, MapperIncome mapperIncome, IncomeCategoryService incomeCategoryService,
                             UserRepository userRepository, IncomeCategoryRepository incomeCategoryRepository) {
        this.repository = repository;
        this.mapperIncome = mapperIncome;
        this.incomeCategoryService = incomeCategoryService;
        this.userRepository = userRepository;
        this.incomeCategoryRepository = incomeCategoryRepository;
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
    public IncomeDTO save(IncomeDTO incomeDTO) throws BadRequestException {
        Income income = mapperIncome.toIncome(incomeDTO);
        User user = userRepository.findById(income.getUser().getId()).get();

        CategoryIncomeEnum categoryIncomeEnum = searchCategoryEnumIncome(incomeDTO.getCategoryName());
        IncomeCategory incomeCategory = incomeCategoryRepository.findByName(categoryIncomeEnum);

        if (incomeCategory == null) {
            throw new BadRequestException("La categoría no existe: " + incomeDTO.getCategoryName());
        }

        income.setCategoryIncome(incomeCategory);
        income.setUser(user);
        repository.save(income);

        user.getIncomes().add(income);
        user.setTotalIncome(user.getTotalIncome() + income.getAmount());

        return mapperIncome.toIncomeDTO(income);
    }

    @Transactional
    @Override
    public void delete(Long id) {
        Income income = repository.findById(id).get();
        User user = userRepository.findById(income.getUser().getId()).get();

        user.setTotalIncome(user.getTotalIncome() - income.getAmount());
        user.getIncomes().remove(income);

        repository.deleteById(id);
    }

    @Transactional
    @Override
    public IncomeDTO updateIncome(IncomeDTO requestDTO) {
        Income income = mapperIncome.toIncome(requestDTO);
        incomeCategoryService.updateIncomeCategory(income.getCategoryIncome());
        repository.save(income);

        return mapperIncome.toIncomeDTO(income);
    }

    private CategoryIncomeEnum searchCategoryEnumIncome(String name) {
        for (CategoryIncomeEnum element: CategoryIncomeEnum.values()) {
            if (element.name().equalsIgnoreCase(name)) {
                return element;
            }
        }

        return CategoryIncomeEnum.OTROS;
    }

}
