package com.nocountry.finanzas.controller;

import com.nocountry.finanzas.exceptions.BadRequestException;
import com.nocountry.finanzas.exceptions.EmailAlreadyExistsException;
import com.nocountry.finanzas.exceptions.InvalidEmailType;
import com.nocountry.finanzas.exceptions.NotFoundException;

import com.nocountry.finanzas.models.auth.AuthenticationRequest;
import com.nocountry.finanzas.models.egress.SavingsDTO;
import com.nocountry.finanzas.models.user.Mapper;
import com.nocountry.finanzas.models.user.UserRequestDTO;
import com.nocountry.finanzas.models.user.UserResponseDTO;
import com.nocountry.finanzas.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public UserController(UserService userService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping(path = "/auth/register")
    public ResponseEntity<?> registerUser(@RequestBody @Valid UserRequestDTO request) throws BadRequestException {
        try {
            userService.saveUser(request);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (BadRequestException | InvalidEmailType | EmailAlreadyExistsException e) {
            throw new BadRequestException(e.getMessage());
        }
    }

    @PostMapping(path = "/auth/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody @Valid AuthenticationRequest request) throws BadRequestException {
        try {
            userService.authenticateUser(request);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (BadRequestException | EmailAlreadyExistsException e) {
            throw new BadRequestException(e.getMessage());
        }
    }

    @GetMapping(path = "/user/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) throws NotFoundException, BadRequestException {

        try {
            UserResponseDTO userResponseDTO = Mapper.userToUserResponseDto(userService.getUserById(id));

            return new ResponseEntity<>(userResponseDTO, HttpStatus.OK);
        }catch (DataAccessException  e){
            throw new BadRequestException(e.getMessage());
        }
    }

    @PutMapping(path = "/user/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody @Valid UserRequestDTO userRequestDTO) throws NotFoundException, InvalidEmailType, BadRequestException {
        try {
            UserResponseDTO userResponseDTO = userService.updateUser(id, userRequestDTO);
            return new ResponseEntity<>(userResponseDTO, HttpStatus.OK);
        }catch (NotFoundException e){
            throw new NotFoundException(e.getMessage());
        }catch (DataAccessException e){
            throw new BadRequestException(e.getMessage());
        }
    }

    @DeleteMapping(path = "/user/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) throws BadRequestException {
        try {
            userService.deleteUser(id);
            return new ResponseEntity<>("El usuario se elimino correctamente", HttpStatus.OK);
        }catch (DataAccessException e){
            throw new BadRequestException(e.getMessage());
        }
    }

    @PutMapping(path = "/savings", consumes = "application/json")
    public ResponseEntity<UserResponseDTO> savingsMoney(@RequestBody @Valid SavingsDTO savings) throws BadRequestException, NotFoundException {
        try {
            UserResponseDTO userResponseDTO = userService.addSavings(savings);
            return new ResponseEntity<>(userResponseDTO,HttpStatus.OK);
        } catch (DataAccessException e){
            throw new BadRequestException(e.getMessage());
        } catch (NotFoundException e) {

            //Ver e implementar la excepcion para cuando el email ingresado ya existe
            throw new NotFoundException(e.getMessage());
        }
    }

    @PutMapping(path = "/savings/revertState/user/{id}")
    public ResponseEntity<UserResponseDTO> revertToInitialStateSavings(@PathVariable Long id) throws BadRequestException {
        try {
            UserResponseDTO userResponseDTO = userService.revertSavings(id);
            return new ResponseEntity<>(userResponseDTO,HttpStatus.OK);
        }catch (DataAccessException e){
            throw new BadRequestException(e.getMessage());
        }
    }



}
