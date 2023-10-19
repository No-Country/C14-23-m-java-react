package com.nocountry.finanzas.controller;

import com.nocountry.finanzas.models.income.IncomeDTO;
import com.nocountry.finanzas.services.IncomeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/user")
public class IncomeController {

    private final IncomeService incomeService;

    @Autowired
    public IncomeController(IncomeService incomeService) {
        this.incomeService = incomeService;
    }

    //Listar
    @GetMapping("/income")
    public ResponseEntity<List<IncomeDTO>> getAllIncome(){
        try{
            List<IncomeDTO> getAllIncome = incomeService.listIncome();

            return ResponseEntity.ok(getAllIncome);
        }
        catch (NoSuchElementException e){
            return ResponseEntity.notFound().build();
        }

    }

    //Busqueda por Id
    @GetMapping(path = "/income/{id}")
    public ResponseEntity<IncomeDTO> getIncomeById(@PathVariable Long id) {
        try {
            IncomeDTO getIncomeById = incomeService.findById(id);

            return ResponseEntity.ok(getIncomeById);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    //Guardar Income
    @PostMapping(path = "/income", consumes = "application/json")
    public ResponseEntity<IncomeDTO> createIncome(@RequestBody @Valid IncomeDTO requestDTO) {
        try {
            IncomeDTO responseDTO = incomeService.save(requestDTO);

            return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    //Actualizar Income
    @PutMapping(path = "/income", consumes = "application/json")
    public ResponseEntity<IncomeDTO> updateIncome(@RequestBody IncomeDTO requestDTO){
        try {
            IncomeDTO updatedIncome = incomeService.save(requestDTO);

            return new ResponseEntity<>(updatedIncome, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    //Eliminar Ingreso
    @DeleteMapping(path = "/income/{id}")
    public ResponseEntity<IncomeDTO> deleteIncomeById(@PathVariable Long id) {
        try {
            incomeService.delete(id);
            return ResponseEntity.ok().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
