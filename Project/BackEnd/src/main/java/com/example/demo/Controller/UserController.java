package com.example.demo.Controller;


import com.example.demo.DTO.*;
import com.example.demo.Levels.VulnerableDAO;
import com.example.demo.Security.JwtTokenUtil;
import com.example.demo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(exposedHeaders = "authorization")
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;


    @PostMapping(value = "/register")
    public ResponseEntity<MessageDto> registerUser(@RequestBody RegisterDto registerDto){
        Boolean result = userService.registerUser(registerDto);
        if(result){
            return new ResponseEntity<>(new MessageDto("User registered successfully"), HttpStatus.CREATED);
        }else{
            return new ResponseEntity<>(new MessageDto("This email is already in use!"), HttpStatus.OK);
        }
    }

    @PostMapping(value = "/login")
    public ResponseEntity<UserDto> loginUser(@RequestBody LoginDto loginDto){
        UserDto userDto = userService.loginUser(loginDto);
        if(userDto != null){
            String token = jwtTokenUtil.generateToken(userDto);
            return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, ("Bearer " + token )).body(userDto);
        }
        return  ResponseEntity.accepted().body(new UserDto());
    }

    @PostMapping(value = "/generateCode")
    public ResponseEntity<MessageDto> generateCode(@RequestBody GenerateCodeDto codeDto){
        return new ResponseEntity<>(new MessageDto(userService.generateCode(codeDto)),HttpStatus.OK);
    }

    @PostMapping(value = "/resetPassword")
    public ResponseEntity<MessageDto> resetPassword(@RequestBody PasswordResetDto passwordResetDto){
        return new ResponseEntity<>(new MessageDto(userService.resetPassword(passwordResetDto)),HttpStatus.OK);
    }

}
