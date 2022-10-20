package com.example.demo.Controller;

import com.example.demo.DTO.LoginDto;
import com.example.demo.DTO.MessageDto;
import com.example.demo.Entity.LevelInformation;
import com.example.demo.Levels.NewClientTable;
import com.example.demo.Levels.Product;
import com.example.demo.Levels.UserTable;
import com.example.demo.Service.LevelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@CrossOrigin(exposedHeaders = "authorization")
@RequestMapping(value = "/user")
public class LevelController {

    @Autowired
    private LevelService levelService;

    @GetMapping(value = "/getLevels")
    public ResponseEntity<List<LevelInformation>> getLevels(){
        return new ResponseEntity<>(levelService.getLevels(),HttpStatus.OK);
    }

    @PostMapping(value = "/getOneLevel")
    public ResponseEntity<LevelInformation> getOneLevel(@RequestBody Long number){
        return new ResponseEntity<>(levelService.getOneLevel(number),HttpStatus.OK);
    }

    /**
     * If level completed successfully then HttpStatus is ACCEPTED(202), else is OK(200).
     * @param injection the injectable SQL command (the user input)
     * @return the list of products if the resulted query is legal, else it return status noContent(204) with the error in the header
     */
    @PostMapping(value = "/level1")
    public ResponseEntity<List<Product>> level1(@RequestBody MessageDto injection){
        try {
            Pair<String,List<Product>> result = levelService.level1(injection.getMessage());
            if(result.getFirst().equals("true")){
                return new ResponseEntity<>(result.getSecond(), HttpStatus.ACCEPTED);
            }
            return new ResponseEntity<>(result.getSecond(), HttpStatus.OK);
        }catch (SQLException ex){
            String message = ex.getMessage();
            message = message.trim().replaceAll("[\\n ]+"," ");
            //NO_CONTENT 204
            return ResponseEntity.noContent().header("errorMessage", message ).build();

        }
    }


    /**
     * If level completed successfully then HttpStatus is ACCEPTED(202), else is OK(200).
     * @param injection the injectable SQL command (the user input)
     * @return the list of products if the resulted query is legal, else it return status noContent(204) with the error in the header
     */
    @PostMapping(value = "/level2")
    public ResponseEntity<List<Product>> level2(@RequestBody MessageDto injection){
        try {
            Pair<String,List<Product>> result = levelService.level2(injection.getMessage());
            if(result.getFirst().equals("true")){
                return new ResponseEntity<>(result.getSecond(), HttpStatus.ACCEPTED);
            }
            return new ResponseEntity<>(result.getSecond(), HttpStatus.OK);
        }catch (SQLException ex){
            String message = ex.getMessage();
            message = message.trim().replaceAll("[\\n ]+"," ");
            //NO_CONTENT 204
            return ResponseEntity.noContent().header("errorMessage", message ).build();

        }
    }

    /**
     * If level completed successfully then HttpStatus is ACCEPTED(202), else is OK(200).
     * @param injection the injectable SQL command (the user input)
     * @return the list of products if the resulted query is legal, else it return status noContent(204) with the error in the header
     */
    @PostMapping(value = "/level3")
    public ResponseEntity<List<Product>> level3(@RequestBody MessageDto injection){
        try {
            Pair<String,List<Product>> result = levelService.level3(injection.getMessage());
            if(result.getFirst().equals("true")){
                return new ResponseEntity<>(result.getSecond(), HttpStatus.ACCEPTED);
            }
            return new ResponseEntity<>(result.getSecond(), HttpStatus.OK);
        }catch (SQLException ex){
            String message = ex.getMessage();
            message = message.trim().replaceAll("[\\n ]+"," ");
            //NO_CONTENT 204
            return ResponseEntity.noContent().header("errorMessage", message ).build();

        }
    }

    /**
     * If level completed successfully then HttpStatus is ACCEPTED(202), else is OK(200).
     * @param injection the injectable SQL command (the user input)
     * @return the list of products if the resulted query is legal, else it return status noContent(204) with the error in the header
     */
    @PostMapping(value = "/level4")
    public ResponseEntity<List<Product>> level4(@RequestBody MessageDto injection){
        try {
            Pair<String,List<Product>> result = levelService.level4(injection.getMessage());
            if(result.getFirst().equals("true")){
                return new ResponseEntity<>(result.getSecond(), HttpStatus.ACCEPTED);
            }
            return new ResponseEntity<>(result.getSecond(), HttpStatus.OK);
        }catch (SQLException ex){
            String message = ex.getMessage();
            message = message.trim().replaceAll("[\\n ]+"," ");
            //NO_CONTENT 204
            return ResponseEntity.noContent().header("errorMessage", message ).build();

        }
    }

    /**
     * If level completed successfully then HttpStatus is ACCEPTED(202), else is OK(200).
     * @param injection the injectable SQL command (the user input)
     * @return the list of products if the resulted query is legal, else it return status noContent(204) with the error in the header
     */
    @PostMapping(value = "/level5")
    public ResponseEntity<UserTable> level5(@RequestBody LoginDto injection){
        try {
            Pair<String, UserTable> result = levelService.level5(injection);
            if(result.getFirst().equals("true")){
                return new ResponseEntity<>(result.getSecond(), HttpStatus.ACCEPTED);
            }
            return new ResponseEntity<>(result.getSecond(), HttpStatus.OK);
        }catch (SQLException ex){
            String message = ex.getMessage();
            message = message.trim().replaceAll("[\\n ]+"," ");
            //NO_CONTENT 204
            return ResponseEntity.noContent().header("errorMessage", message ).build();

        }
    }

    /**
     * If level completed successfully then HttpStatus is ACCEPTED(202), else is OK(200).
     * @param injection the injectable SQL command (the user input)
     * @return the list of products if the resulted query is legal, else it return status noContent(204) with the error in the header
     */
    @PostMapping(value = "/level6")
    public ResponseEntity<UserTable> level6(@RequestBody LoginDto injection){
        try {
            Pair<String, UserTable> result = levelService.level6(injection);
            if(result.getFirst().equals("true")){
                return new ResponseEntity<>(result.getSecond(), HttpStatus.ACCEPTED);
            }
            return new ResponseEntity<>(result.getSecond(), HttpStatus.OK);
        }catch (SQLException ex){
            String message = ex.getMessage();
            message = message.trim().replaceAll("[\\n ]+"," ");
            //NO_CONTENT 204
            return ResponseEntity.noContent().header("errorMessage", message ).build();

        }
    }

    @PostMapping(value = "/level7")
    public ResponseEntity<NewClientTable> level7(@RequestBody LoginDto injection){
        try {
            Pair<String, NewClientTable> result = levelService.level7(injection);
            if(result.getFirst().equals("true")){
                return new ResponseEntity<>(result.getSecond(), HttpStatus.ACCEPTED);
            }
            return new ResponseEntity<>(result.getSecond(), HttpStatus.OK);
        }catch (SQLException ex){
            String message = ex.getMessage();
            message = message.trim().replaceAll("[\\n ]+"," ");
            //NO_CONTENT 204
            return ResponseEntity.noContent().header("errorMessage", message ).build();

        }
    }

    @PostMapping(value = "/level8")
    public ResponseEntity<NewClientTable> level8(@RequestBody LoginDto injection){
        try {
            Pair<String, NewClientTable> result = levelService.level8(injection);
            if(result.getFirst().equals("true")){
                return new ResponseEntity<>(result.getSecond(), HttpStatus.ACCEPTED);
            }
            return new ResponseEntity<>(result.getSecond(), HttpStatus.OK);
        }catch (SQLException ex){
            String message = ex.getMessage();
            message = message.trim().replaceAll("[\\n ]+"," ");
            //NO_CONTENT 204
            return ResponseEntity.noContent().header("errorMessage", message ).build();

        }
    }


}
