package com.nocountry.finanzas.controller;

import com.nocountry.finanzas.entities.Egress;
import com.nocountry.finanzas.models.egress.CreateEgressDTO;
import com.nocountry.finanzas.models.egress.EgressDTO;
import com.nocountry.finanzas.services.EgressService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/user")
public class EgressController {

    private final EgressService egressService;

    @Autowired
    public EgressController(EgressService egressService) {
        this.egressService = egressService;
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

    @PostMapping(path = "/egress", consumes = "application/json")
    public ResponseEntity<EgressDTO> createEgress(@RequestBody @Valid CreateEgressDTO egressDTO) {
        try {
            EgressDTO responseDTO = egressService.createdEgress(egressDTO);
            return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
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

}
