package com.example.demo.Service;

import com.example.demo.DTO.*;
import com.example.demo.Entity.Code;
import com.example.demo.Entity.User;
import com.example.demo.Repository.CodeRepository;
import com.example.demo.Repository.UserRepository;
import lombok.Data;
import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CodeRepository codeRepository;

    @Bean   //to move to app security
    public BCryptPasswordEncoder bcryptPasswordEncoder(){return new BCryptPasswordEncoder();}

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    EmailSenderService emailSenderService;

    /**
     * Validates the email and checks if it isn't already in use and registers the user
     * @param registerDto
     * @return true if passed all the validation
     *         false otherwise
     */
    public Boolean registerUser(RegisterDto registerDto){
        //validating the email
        if(EmailValidator.getInstance().isValid(registerDto.getEmail())) {
            //checking if the email already exists
            if (userRepository.findByEmail(registerDto.getEmail()).isPresent()) {
                return false;
            } else {
                User user = new User();
                user.setEmail(registerDto.getEmail());
                user.setName(registerDto.getName());
                user.setIsAdmin(false);
                user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
                userRepository.save(user);
            }
        }else{
            return false;
        }
        return true;
    }

    private UserDto buildUserDto(User user){
        return  UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .isAdmin(user.getIsAdmin())
                .name(user.getName())
                .build();
    }

    public UserDto loginUser(LoginDto loginDto){
        Optional<User> userOptional = userRepository.findByEmail(loginDto.getEmail());

        if(userOptional.isPresent()){
            User user = userOptional.get();
            if(passwordEncoder.matches(loginDto.getPassword(), user.getPassword())){
                UserDto userDto = buildUserDto(user);

                return userDto;
            }
        }
        return null;
    }

    /**
     * Generating a code for password reset and sending it to the user email who is requesting
     * @param codeDto Containing the email to be sent the password reset code
     * @return Completion message
     */
    public String generateCode(GenerateCodeDto codeDto){
        if(!userRepository.findByEmail(codeDto.getEmail()).isPresent()){
            return "Not a registered email!";
        }
        String generateCode = emailSenderService.generateCode();
        Calendar now = Calendar.getInstance();
        //giving 5 minute life span for the generated code
        now.add(Calendar.MINUTE,5);
        Date expirationDate = now.getTime();
        Code code = codeRepository.findFirstByEmail(codeDto.getEmail());

        if(code == null){
            code = Code.builder()
                    .code(generateCode)
                    .email(codeDto.getEmail())
                    .expirationDate(expirationDate)
                    .build();
        }else {
            code.setCode(generateCode);
            code.setExpirationDate(expirationDate);
        }
        codeRepository.save(code);
        String subject = "Reset your password";
        String message = "Your code for password reset is: " + generateCode;
        emailSenderService.sendSimpleMessage(codeDto.getEmail(), subject,message);
        return "Password reset code was sent!";
    }

    public String resetPassword(PasswordResetDto passwordResetDto){
        Optional<User> optionalUser = userRepository.findByEmail(passwordResetDto.getEmail());
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            Code code = codeRepository.findFirstByEmail(passwordResetDto.getEmail());
            if(code == null){
                return "No code was sent to this email!";
            }

            Date now = Calendar.getInstance().getTime();
            long diff =now.getTime() - code.getExpirationDate().getTime();
            diff = TimeUnit.MILLISECONDS.toMinutes(diff);

            if(diff > 5){
                return "The code expired!";
            }

            if(!code.getCode().equals(passwordResetDto.getCode())){
                return "Wrong code!";
            }

            user.setPassword(passwordEncoder.encode(passwordResetDto.getPassword()));
            userRepository.save(user);
            return "Password reset successful!";
        }else{
            return "No user with this email!";
        }
    }


    /**
     * Updates the users name or changes it's password
     * @param userDto User data
     * @return The modified user
     */
    public UserDto modifyUser(UserDto userDto){
        Optional<User> optionalUser = userRepository.findByEmail(userDto.getEmail());
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            if(!userDto.getName().isEmpty()){
                user.setName(userDto.getName());
            }

            if(!userDto.getPassword().isEmpty()){
                if(userDto.getPassword().length() > 7){
                    user.setPassword(passwordEncoder.encode(userDto.getPassword()));
                }
            }
            userRepository.save(user);

            userDto.setPassword(null);
            return userDto;
        }
        return null;
    }

    /**
     * Delete the user based on its id
     * @param id
     * @return
     */
    public Boolean deleteUser(Long id){
        Optional<User> optionalUser = userRepository.findById(id);
        if(optionalUser.isPresent()){
            User user = optionalUser.get();

            userRepository.delete(user);
            return true;
        }
        return false;
    }

    public List<UserDto> getAllUsers(){
        List<User> users = userRepository.findAll();
        List<UserDto> userDtos = new ArrayList<>();
        for(User u: users){
            userDtos.add(buildUserDto(u));
        }
        return userDtos;
    }

}
