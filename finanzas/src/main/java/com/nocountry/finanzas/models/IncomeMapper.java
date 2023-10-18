package com.nocountry.finanzas.models;

import com.nocountry.finanzas.entities.Income;
import com.nocountry.finanzas.models.response.IncomeResponseDTO;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class IncomeMapper {

    public Income convertRequestDTOToIncome(IncomeResponseDTO requestDTO) {
        Income income = new Income();

        income.setAmount(requestDTO.getAmount());
        income.setDate(requestDTO.getDate());
        income.setDescription(requestDTO.getDescription());

        return income;
    }

    public IncomeResponseDTO convertIncomeToResponseDTO(Income income) {
        IncomeResponseDTO responseDTO = new IncomeResponseDTO();

        responseDTO.setId(income.getIdIncome());
        responseDTO.setAmount(income.getAmount());
        responseDTO.setDate(income.getDate());
        responseDTO.setDescription(income.getDescription());

        return responseDTO;
    }

    public List<IncomeResponseDTO> convertIncomeToListResponseDTO(List<Income> listIncome) {
        ArrayList<IncomeResponseDTO> listResponse = new ArrayList<>();
        IncomeResponseDTO responseDTO;

        for (Income income: listIncome) {
            responseDTO = convertIncomeToResponseDTO(income);
            listResponse.add(responseDTO);
        }

        return listResponse;
    }

}
