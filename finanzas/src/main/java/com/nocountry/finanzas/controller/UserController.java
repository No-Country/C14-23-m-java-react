package com.nocountry.finanzas.controller;

import com.nocountry.finanzas.exceptions.BadRequestException;
import com.nocountry.finanzas.exceptions.NotFoundException;
import com.nocountry.finanzas.models.Mapper;
import com.nocountry.finanzas.models.request.UserRequestDTO;
import com.nocountry.finanzas.models.response.UserResponseDTO;
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

    @PostMapping(path = "/register")
    public ResponseEntity<?> saveUser(@RequestBody @Valid UserRequestDTO userRequestDTO) throws BadRequestException {
        try {
            UserResponseDTO userResponseDTO = userService.saveUser(userRequestDTO);
            return new ResponseEntity<>(userResponseDTO,HttpStatus.CREATED);
        }catch (DataAccessException e){
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
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody @Valid UserRequestDTO userRequestDTO) throws BadRequestException, NotFoundException {
        try {
            UserResponseDTO userResponseDTO = userService.updateUser(id,userRequestDTO);
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



}
