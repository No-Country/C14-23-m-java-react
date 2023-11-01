package com.nocountry.finanzas.controller;

import com.nocountry.finanzas.exceptions.BadRequestException;
import com.nocountry.finanzas.exceptions.EmailAlreadyExistsException;
import com.nocountry.finanzas.exceptions.InvalidEmailType;
import com.nocountry.finanzas.exceptions.NotFoundException;
import com.nocountry.finanzas.models.user.SavingsDTO;
import com.nocountry.finanzas.models.user.*;
import com.nocountry.finanzas.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(path = "/auth/register")
    public ResponseEntity<?> saveUser(@RequestBody @Valid UserRequestDTO userRequestDTO) throws BadRequestException, InvalidEmailType, EmailAlreadyExistsException {
        try {
            UserResponseDTO userResponseDTO = userService.saveUser(userRequestDTO);
            return new ResponseEntity<>(userResponseDTO,HttpStatus.CREATED);
        } catch (DataAccessException e){
            throw new BadRequestException(e.getMessage());
        }
    }

    @PostMapping(path = "/auth/authenticate")
    public ResponseEntity<?> loggingUser(@RequestBody @Valid UserLoggingDTO userLoggingDTO) throws BadRequestException, NotFoundException {
        try {
            UserResponseDTO userResponseDTO = userService.loggingUser(userLoggingDTO);
            return new ResponseEntity<>(userResponseDTO, HttpStatus.OK);
        } catch (DataAccessException e){
            throw new BadRequestException(e.getMessage());
        } catch (NotFoundException e){
            throw new NotFoundException(e.getMessage());
        }
    }

    @PostMapping(path = "/auth/logOut/{idUser}")
    public ResponseEntity<?> logOutUser(@PathVariable Long idUser) throws NotFoundException {
        try {
            userService.logOut(idUser);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NotFoundException e) {
            throw new NotFoundException(e.getMessage());
        }
    }


    @GetMapping(path = "/user/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) throws NotFoundException, BadRequestException {

        try {
            UserResponseDTO userResponseDTO = Mapper.userToUserResponseDto(userService.getUserById(id));
            return new ResponseEntity<>(userResponseDTO, HttpStatus.OK);
        } catch (DataAccessException  e){
            throw new BadRequestException(e.getMessage());
        }
    }

    @PatchMapping(path = "/user/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id,
                                        @RequestBody @Valid UserUpdateRequestDTO userRequestDTO) throws BadRequestException, NotFoundException {
        try {
            UserResponseDTO userResponseDTO = userService.updateUser(id,userRequestDTO);
            return new ResponseEntity<>(userResponseDTO, HttpStatus.OK);
        } catch (NotFoundException e){
            throw new NotFoundException(e.getMessage());
        } catch (DataAccessException e){
            throw new BadRequestException(e.getMessage());
        } catch (EmailAlreadyExistsException | InvalidEmailType e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @PatchMapping(path = "/user/update/password/{id}")
    public ResponseEntity<?> updatePasswordUser(@PathVariable Long id,
                                                @RequestBody @Valid UserPasswordUpdateDTO passwordUpdateDTO) throws BadRequestException, NotFoundException {

        try {
            UserResponseDTO userResponseDTO = userService.updatePasswordUser(id, passwordUpdateDTO);
            return new ResponseEntity<>(userResponseDTO, HttpStatus.OK);
        } catch (NotFoundException e){
            throw new NotFoundException(e.getMessage());
        } catch (DataAccessException e){
            throw new BadRequestException(e.getMessage());
        }

    }


    @DeleteMapping(path = "/user/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) throws BadRequestException, NotFoundException {
        try {
            userService.deleteUser(id);
            return new ResponseEntity<>("El usuario se elimino correctamente", HttpStatus.OK);
        } catch (DataAccessException e){
            throw new BadRequestException(e.getMessage());
        } catch (NotFoundException e) {
            throw new NotFoundException(e.getMessage());
        }
    }

    @PutMapping(path = "/savings")
    public ResponseEntity<UserResponseDTO> savingsMoney(@RequestBody @Valid SavingsDTO savings) throws BadRequestException, NotFoundException {
        try {
            UserResponseDTO userResponseDTO = userService.addSavings(savings);
            return new ResponseEntity<>(userResponseDTO,HttpStatus.OK);
        } catch (DataAccessException e){
            throw new BadRequestException(e.getMessage());
        } catch (NotFoundException e) {
            throw new NotFoundException(e.getMessage());
        }
    }

    @PutMapping(path = "/savings/revertState/user/{id}")
    public ResponseEntity<UserResponseDTO> revertToInitialStateSavings(@PathVariable Long id) throws BadRequestException {
        try {
            UserResponseDTO userResponseDTO = userService.revertSavings(id);
            return new ResponseEntity<>(userResponseDTO,HttpStatus.OK);
        } catch (DataAccessException e){
            throw new BadRequestException(e.getMessage());
        } catch (NotFoundException e) {
            throw new RuntimeException(e);
        }
    }

}
