package com.nocountry.finanzas.controller;

import com.nocountry.finanzas.entities.IncomeCategory;
import com.nocountry.finanzas.exceptions.BadRequestException;
import com.nocountry.finanzas.exceptions.NotFoundException;
import com.nocountry.finanzas.models.egress.CustomSearchDTO;
import com.nocountry.finanzas.models.income.CategoryIncomeDTO;
import com.nocountry.finanzas.models.income.CreateIncomeDTO;
import com.nocountry.finanzas.models.income.IncomeDTO;
import com.nocountry.finanzas.services.IncomeCategoryService;
import com.nocountry.finanzas.services.IncomeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/user")
public class IncomeController {

    private final IncomeService incomeService;

    private final IncomeCategoryService incomeCategoryService;

    @Autowired
    public IncomeController(IncomeService incomeService, IncomeCategoryService incomeCategoryService) {
        this.incomeService = incomeService;
        this.incomeCategoryService = incomeCategoryService;
    }

    //Listar
    /*
    NO DEBERIAMOS DE USAR ESE ENDPOINT, PORQ DA TOOODOS LOS INGRESOS, NO IMPORTA EL USUARIO

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
    */

    //Busqueda por Id
    @GetMapping(path = "/income/{id}")
    public ResponseEntity<IncomeDTO> getIncomeById(@PathVariable Long id) {
        try {
            IncomeDTO getIncomeById = incomeService.findById(id);

            return ResponseEntity.ok(getIncomeById);
        } catch (NoSuchElementException | NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping(path = "/{idUser}/list/income")
    public ResponseEntity<List<IncomeDTO>> getIncomeByUser(@PathVariable Long idUser) {
        try {
            List<IncomeDTO> incomeDto = incomeService.getIncomeByUser(idUser);
            return new ResponseEntity<>(incomeDto, HttpStatus.OK);
        } catch (NoSuchElementException | NotFoundException e) {
            throw new NoSuchElementException(e.getMessage());
        }
    }

    //Guardar Income
    @PostMapping(path = "/income")
    public ResponseEntity<IncomeDTO> createIncome(@RequestBody @Valid CreateIncomeDTO requestDTO) throws BadRequestException  {
        try {
            IncomeDTO responseDTO = incomeService.save(requestDTO);

            return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
        } catch (NoSuchElementException | NotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    //Actualizar Income
    @PutMapping(path = "/income")
    public ResponseEntity<IncomeDTO> updateIncome(@RequestBody IncomeDTO requestDTO){
        try {
            IncomeDTO updatedIncome = incomeService.updateIncome(requestDTO);

            return new ResponseEntity<>(updatedIncome, HttpStatus.OK);
        } catch (NoSuchElementException | NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    //Eliminar Ingreso
    @DeleteMapping(path = "/income/{id}")
    public ResponseEntity<IncomeDTO> deleteIncomeById(@PathVariable Long id) {
        try {
            incomeService.delete(id);
            return ResponseEntity.ok().build();
        } catch (NoSuchElementException | NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(path = "/income/category")
    public ResponseEntity<IncomeCategory> createCategory(@RequestBody CategoryIncomeDTO category) {
        try {
            IncomeCategory incomeCategory = incomeCategoryService.createIncomeCategory(category);
            return new ResponseEntity<>(incomeCategory, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping(path = "/income/month/{id}")
    public ResponseEntity<List<IncomeDTO>> incomeByMonthAndCategory(@PathVariable Long id,
                                                                    @RequestBody CustomSearchDTO customSearchDTO){
        try {
            return ResponseEntity.ok().body(incomeService.findByMonthAndCategory(id,customSearchDTO));
        }catch (DataAccessException | NotFoundException e){
            return ResponseEntity.badRequest().build();
        }

    }
}
