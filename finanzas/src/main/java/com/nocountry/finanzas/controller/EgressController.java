package com.nocountry.finanzas.controller;

import com.nocountry.finanzas.entities.Egress;
import com.nocountry.finanzas.models.EgressMapper;
import com.nocountry.finanzas.models.request.EgressRequestDTO;
import com.nocountry.finanzas.models.response.EgressResponseDTO;
import com.nocountry.finanzas.services.EgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/user")
public class EgressController {

    @Autowired
    private EgressService egressService;

    @Autowired
    EgressMapper egressMapper;

    @GetMapping(path = "/egress/{id}")
    public ResponseEntity<EgressResponseDTO> getEgressById(@PathVariable Long id) {
        try {
            Egress getEgressById = egressService.getEgressById(id);

            if (getEgressById != null) {
                EgressResponseDTO responseDTO = egressMapper.convertEgressToResponseDTO(getEgressById);
                return ResponseEntity.ok(responseDTO);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping(path = "/egress")
    public ResponseEntity<List<EgressResponseDTO>> getAllEgress() {
        try {
            List<Egress> getAllEgress = egressService.getAllEgress();
            List<EgressResponseDTO> responseDTO = egressMapper.convertEgressToListResponseDTO(getAllEgress);

            return ResponseEntity.ok(responseDTO);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(path = "/egress", consumes = "application/json")
    public ResponseEntity<EgressResponseDTO> createEgress(@RequestBody EgressRequestDTO requestDTO) {
        try {
            Egress egress = egressMapper.convertRequestDTOToEgress(requestDTO);
            Egress createdEgress = egressService.createdEgress(egress);
            EgressResponseDTO responseDTO = egressMapper.convertEgressToResponseDTO(createdEgress);

            //return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
            return ResponseEntity.ok(responseDTO);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping(path = "/egress", consumes = "application/json")
    public ResponseEntity<EgressResponseDTO> updateEgress(@RequestBody EgressRequestDTO requestDTO){
        try {
            Egress egress = egressMapper.convertRequestDTOToEgress(requestDTO);
            Egress updatedEgress = egressService.updateEgress(egress);
            EgressResponseDTO responseDTO = egressMapper.convertEgressToResponseDTO(updatedEgress);

            return ResponseEntity.ok(responseDTO);
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
