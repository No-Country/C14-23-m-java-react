package com.nocountry.finanzas.controller;

import com.nocountry.finanzas.entities.Egress;
import com.nocountry.finanzas.entities.EgressCategory;
import com.nocountry.finanzas.exceptions.BadRequestException;
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
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping(path = "/egress")
    public ResponseEntity<List<EgressDTO>> getAllEgress() {
        try {
            List<EgressDTO> responseDTO = egressService.getAllEgress();
            return ResponseEntity.ok(responseDTO);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping(path = "{idUser}/list/egress/")
    public ResponseEntity<List<EgressDTO>> getEgressByUser(@PathVariable Long idUser) {
        try {
            List<EgressDTO> egressDTO = egressService.getEgressByUser(idUser);
            return ResponseEntity.ok(egressDTO);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(path = "/egress", consumes = "application/json")
    public ResponseEntity<EgressDTO> createEgress(@RequestBody @Valid CreateEgressDTO egressDTO) {
        try {
            EgressDTO responseDTO = egressService.createdEgress(egressDTO);
            return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping(path = "/egress", consumes = "application/json")
    public ResponseEntity<EgressDTO> updateEgress(@RequestBody @Valid EgressDTO egressDTO){
        try {
            EgressDTO responseDTO = egressService.updateEgress(egressDTO);
            return new ResponseEntity<>(responseDTO, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping(path = "/egress/{id}")
    public ResponseEntity<Egress> deleteEgressById(@PathVariable Long id) {
        try {
            egressService.deleteEgressById(id);
            return ResponseEntity.ok().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(path = "/egress/category", consumes = "application/json")
    public ResponseEntity<EgressCategory> createCategory(@RequestBody CategoryEgressDTO name) {
        try {
            EgressCategory egressCategory = egressCategoryService.createEgressCategory(name);
            return new ResponseEntity<>(egressCategory, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping(path = "/egress/month/{id}",consumes = "application/json")
    public ResponseEntity<List<EgressDTO>> egressByMonthAndCategory(@PathVariable Long id,
                                                                    @RequestBody CustomSearchDTO customSearch){

        try{
            return ResponseEntity.ok().body(egressService.findByMontAndCategory(id,customSearch));
        }catch (DataAccessException e){
            return ResponseEntity.badRequest().build();
        }
    }

    //No funciona cuando no se envia el valor de page, probar eviando el valor a traves de requestbody
    @GetMapping(path = "/egressPageable/{userId}/{page}",consumes = "application/json")
    public ResponseEntity<List<EgressDTO>> egressPageable(@PathVariable Long userId,
                                                          @PathVariable Integer page){
        try {
            return ResponseEntity.ok().body(egressService.getAllEgressPageable(userId,page)) ;

        }catch (RuntimeException e){
            return ResponseEntity.badRequest().build();
        }
    }


}
