package com.example.demo.Controller;

import com.example.demo.DTO.UserDto;
import com.example.demo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(exposedHeaders = "authorization")
@RequestMapping(value = "/admin")
public class AdminController {

    @Autowired
    UserService userService;

    @GetMapping(value = "/getUsers")
    public ResponseEntity<List<UserDto>> getAllUsers(){
        List<UserDto> userDtos = userService.getAllUsers();
        return new ResponseEntity<>(userDtos,HttpStatus.OK);
    }

    @PutMapping(value = "/modifyUser")
    public ResponseEntity<UserDto> modifyUser(@RequestBody  UserDto userDto){
        UserDto dto = userService.modifyUser(userDto);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @DeleteMapping(value = "/deleteUser")
    public ResponseEntity<Boolean> deleteUser(@RequestBody UserDto id){
        Boolean bool = userService.deleteUser(id.getId());
        return new ResponseEntity<>(bool,HttpStatus.OK);
    }

}
