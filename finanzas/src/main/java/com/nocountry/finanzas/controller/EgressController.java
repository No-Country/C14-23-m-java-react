package com.nocountry.finanzas.controller;

import com.nocountry.finanzas.entities.Egress;
import com.nocountry.finanzas.entities.EgressCategory;
import com.nocountry.finanzas.exceptions.BadRequestException;
import com.nocountry.finanzas.exceptions.NotFoundException;
import com.nocountry.finanzas.models.egress.CategoryEgressDTO;
import com.nocountry.finanzas.models.egress.CreateEgressDTO;
import com.nocountry.finanzas.models.egress.CustomSearchDTO;
import com.nocountry.finanzas.models.egress.EgressDTO;
import com.nocountry.finanzas.services.EgressCategoryService;
import com.nocountry.finanzas.services.EgressService;
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
public class EgressController {

    private final EgressService egressService;

    private final EgressCategoryService egressCategoryService;

    @Autowired
    public EgressController(EgressService egressService, EgressCategoryService egressCategoryService) {
        this.egressService = egressService;
        this.egressCategoryService = egressCategoryService;
    }

    @GetMapping(path = "/egress/{id}")
    public ResponseEntity<EgressDTO> getEgressById(@PathVariable Long id) {
        try {
            EgressDTO responseDTO = egressService.getEgressById(id);
            return ResponseEntity.ok(responseDTO);
        } catch (NoSuchElementException | NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /*
    @GetMapping(path = "/egress")
    public ResponseEntity<List<EgressDTO>> getAllEgress() {
        try {
            List<EgressDTO> responseDTO = egressService.getAllEgress();
            return ResponseEntity.ok(responseDTO);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }
    NO DEBERIAMOS DE USAR ESE ENDPOINT, PORQ DA TOOODOS LOS EGRESOS, NO IMPORTA EL USUARIO
     */

    @GetMapping(path = "{idUser}/list/egress")
    public ResponseEntity<List<EgressDTO>> getEgressByUser(@PathVariable Long idUser) {
        try {
            List<EgressDTO> egressDTO = egressService.getEgressByUser(idUser);
            return ResponseEntity.ok(egressDTO);
        } catch (NoSuchElementException | NotFoundException e) {
            throw new NoSuchElementException(e.getMessage());
        }
    }

    @PostMapping(path = "/egress", consumes = "application/json")
    public ResponseEntity<EgressDTO> createEgress(@RequestBody @Valid CreateEgressDTO egressDTO) throws BadRequestException {
        try {
            EgressDTO responseDTO = egressService.createdEgress(egressDTO);
            return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
        } catch (NoSuchElementException | NotFoundException e) {
            throw new NoSuchElementException(e.getMessage());
        } catch (BadRequestException e) {
            throw new BadRequestException(e.getMessage());
        }
    }

    @PutMapping(path = "/egress", consumes = "application/json")
    public ResponseEntity<EgressDTO> updateEgress(@RequestBody @Valid EgressDTO egressDTO){
        try {
            EgressDTO responseDTO = egressService.updateEgress(egressDTO);
            return new ResponseEntity<>(responseDTO, HttpStatus.OK);
        } catch (NoSuchElementException | NotFoundException e) {
            throw new NoSuchElementException(e.getMessage());
        }
    }

    @DeleteMapping(path = "/egress/{id}")
    public ResponseEntity<Egress> deleteEgressById(@PathVariable Long id) {
        try {
            egressService.deleteEgressById(id);
            return ResponseEntity.ok().build();
        } catch (NoSuchElementException | NotFoundException e) {
            throw new NoSuchElementException(e.getMessage());
        }
    }

    @PostMapping(path = "/egress/category", consumes = "application/json")
    public ResponseEntity<EgressCategory> createCategory(@RequestBody CategoryEgressDTO name) {
        try {
            EgressCategory egressCategory = egressCategoryService.createEgressCategory(name);
            return new ResponseEntity<>(egressCategory, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException(e.getMessage());
        }
    }

    @PatchMapping(path = "/egress/month/{id}",consumes = "application/json")
    public ResponseEntity<List<EgressDTO>> egressByMonthAndCategory(@PathVariable Long id,
                                                         @RequestBody CustomSearchDTO customSearch){

        try {
            return ResponseEntity.ok().body(egressService.findByMontAndCategory(id,customSearch));
        } catch (DataAccessException | NotFoundException e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
