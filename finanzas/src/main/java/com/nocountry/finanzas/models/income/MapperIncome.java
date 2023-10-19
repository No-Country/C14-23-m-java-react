package com.nocountry.finanzas.models.income;

import com.nocountry.finanzas.entities.enums.CategoryIncomeEnum;
import com.nocountry.finanzas.entities.Income;
import com.nocountry.finanzas.entities.IncomeCategory;
import com.nocountry.finanzas.entities.User;
import com.nocountry.finanzas.validators.NullListException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MapperIncome {

    public Income toIncome(IncomeDTO incomeDTO) {
        Income income = new Income();

        if (incomeDTO.getIdIncome() != null) {
            income.setId(incomeDTO.getIdIncome());
        }

        income.setAmount(incomeDTO.getAmount());
        income.setDate(incomeDTO.getDate());
        income.setDescription(incomeDTO.getDescription());
        income.setCategoryIncome(searchIncomeCategory(incomeDTO.getCategoryName()));

        if (incomeDTO instanceof CreateIncomeDTO) {
            User user = new User();
            user.setId(((CreateIncomeDTO) incomeDTO).getIdUser());

            income.setUser(user);
        }

        return income;
    }

    public IncomeDTO toIncomeDTO(Income income) {
        IncomeDTO incomeDTO = new IncomeDTO();

        incomeDTO.setIdIncome(income.getId());
        incomeDTO.setAmount(income.getAmount());
        incomeDTO.setDate(income.getDate());
        incomeDTO.setDescription(income.getDescription());
        incomeDTO.setCategoryName(income.getCategoryIncome().getName().name());

        return incomeDTO;
    }

    public List<IncomeDTO> incomeDTOList(List<Income> incomeList) {
        ArrayList<IncomeDTO> listResponse = new ArrayList<>();
        IncomeDTO incomeDTO;

        try {
            if (incomeList == null) {
                throw new NullListException("La lista de Egress es nula.");
            }
            for (Income income : incomeList) {
                incomeDTO = toIncomeDTO(income);
                listResponse.add(incomeDTO);
            }
        } catch(NullListException e) {
            System.out.println("Error: La lista de Income es nula. Por favor, proporcione una lista válida.");
        }

        return listResponse;
    }

    public IncomeCategory searchIncomeCategory(String name) {
        IncomeCategory incomeCategory = new IncomeCategory();

        for (CategoryIncomeEnum element: CategoryIncomeEnum.values()) {
            if (element.name().equalsIgnoreCase(name)) {
                incomeCategory.setName(element);
            }
        }

        return incomeCategory;
    }

}
