package com.nocountry.finanzas.controller;

import com.nocountry.finanzas.entities.Income;
import com.nocountry.finanzas.models.IncomeMapper;
import com.nocountry.finanzas.models.response.IncomeResponseDTO;
import com.nocountry.finanzas.services.IncomeService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/user")
public class IncomeController {

    private IncomeService incomeService;

    private IncomeMapper incomeMapper;

    //Listar
    @GetMapping("/income")
    public ResponseEntity<List<IncomeResponseDTO>> getAllIncome(){
        try{
            List<Income> getAllIncome = incomeService.listIncome();
            List<IncomeResponseDTO> responseDTO = incomeMapper.convertIncomeToListResponseDTO(getAllIncome);
            return ResponseEntity.ok(responseDTO);
        }
        catch (NoSuchElementException e){
            return ResponseEntity.notFound().build();
        }

    }

    //Busqueda por Id
    @GetMapping(path = "/income/{id}")
    public ResponseEntity<IncomeResponseDTO> getIncomeById(@PathVariable Long id) {
        try {
            Income getIncomeById = incomeService.findById(id);
            IncomeResponseDTO responseDTO = incomeMapper.convertIncomeToResponseDTO(getIncomeById);

            return ResponseEntity.ok(responseDTO);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    //Guardar Income
    @PostMapping(path = "/income", consumes = "application/json")
    public ResponseEntity<IncomeResponseDTO> createIncome(@RequestBody @Valid IncomeResponseDTO requestDTO) {
        try {
            Income income = incomeMapper.convertRequestDTOToIncome(requestDTO);
            Income createdIncome = incomeService.save(income);
            IncomeResponseDTO responseDTO = incomeMapper.convertIncomeToResponseDTO(createdIncome);

            return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    //Actualizar Income
    @PutMapping(path = "/income", consumes = "application/json")
    public ResponseEntity<IncomeResponseDTO> updateIncome(@RequestBody IncomeResponseDTO requestDTO){
        try {
            Income income = incomeMapper.convertRequestDTOToIncome(requestDTO);
            Income updatedIncome = incomeService.save(income);
            IncomeResponseDTO responseDTO = incomeMapper.convertIncomeToResponseDTO(updatedIncome);

            return new ResponseEntity<>(responseDTO, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    //Eliminar Ingreso
    @DeleteMapping(path = "/income/{id}")
    public ResponseEntity<Income> deleteIncomeById(@PathVariable Long id) {
        try {
            incomeService.delete(id);
            return ResponseEntity.ok().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
