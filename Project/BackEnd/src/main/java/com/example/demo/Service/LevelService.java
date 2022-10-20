package com.example.demo.Service;

import com.example.demo.DTO.LoginDto;
import com.example.demo.Entity.LevelInformation;
import com.example.demo.Levels.NewClientTable;
import com.example.demo.Levels.Product;
import com.example.demo.Levels.VulnerableDAO;
import com.example.demo.Levels.UserTable;
import com.example.demo.Levels.repo.ProductRepository;
import com.example.demo.Repository.LevelInformationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public class LevelService {

    @Autowired
    private VulnerableDAO vulnerableDAO;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private LevelInformationRepository levelInformationRepository;

    public List<LevelInformation> getLevels(){
        return levelInformationRepository.findAll();
    }

    public LevelInformation getOneLevel(Long number){
        return levelInformationRepository.findFirstByLevel(number);
    }

    public Pair<String,List<Product>> level1(String inject) throws SQLException{
        try {
            String levelComplete;
            List<Product> products = vulnerableDAO.unsafeFindProducts(inject);
            if(productRepository.findAll().size() == products.size()) {
                levelComplete = "true";
            }else{
                levelComplete = "false";
            }
            return Pair.of(levelComplete, products);
        }catch (SQLException ex){
            System.out.println("L-am prins");
            System.out.println(ex);
            throw ex;
        }

    }

    public Pair<String,List<Product>> level2(String inject) throws SQLException{
        try {
            String levelComplete;
            List<Product> products = vulnerableDAO.unsafeFindProducts(inject);
            if(products.size() > 35 && inject.toLowerCase().contains("information_schema.tables")) {
                levelComplete = "true";
            }else{
                levelComplete = "false";
            }
            return Pair.of(levelComplete, products);
        }catch (SQLException ex){
            System.out.println("L-am prins");
            System.out.println(ex);
            throw ex;
        }

    }

    public Pair<String,List<Product>> level3(String inject) throws SQLException{
        try {
            String levelComplete;
            List<Product> products = vulnerableDAO.unsafeFindProducts(inject);
            if(products.size() == 4 && inject.toLowerCase().contains("information_schema.columns")
                && inject.toLowerCase().contains("hiddentablexym3g")) {
                levelComplete = "true";
            }else{
                levelComplete = "false";
            }
            return Pair.of(levelComplete, products);
        }catch (SQLException ex){
            System.out.println("L-am prins");
            System.out.println(ex);
            throw ex;
        }

    }

    public Pair<String,List<Product>> level4(String inject) throws SQLException{
        try {
            String levelComplete;
            List<Product> products = vulnerableDAO.unsafeFindProducts(inject);
            if(products.size() > 2 && inject.toLowerCase().contains("database()")
                    && inject.toLowerCase().contains("h2version()")
                    && inject.toLowerCase().contains("current_user()")) {
                levelComplete = "true";
            }else{
                levelComplete = "false";
            }
            return Pair.of(levelComplete, products);
        }catch (SQLException ex){
            System.out.println("L-am prins");
            System.out.println(ex);
            throw ex;
        }

    }

    public Pair<String,UserTable> level5(LoginDto loginDto) throws SQLException{
        try {
            String levelComplete;
            UserTable userTable = vulnerableDAO.unsafeLoginUser(loginDto);
            if(userTable != null && userTable.getUsername().equals("admin")){
                levelComplete = "true";
            }else{
                levelComplete = "false";
            }
            if(userTable == null){
                return Pair.of(levelComplete,new UserTable((long)555,"user","parola"));
            }

            return Pair.of(levelComplete,userTable );
        }catch (SQLException ex){
            System.out.println("L-am prins");
            System.out.println(ex);
            throw ex;
        }

    }

    public Pair<String,UserTable> level6(LoginDto loginDto) throws SQLException{
        try {
            String levelComplete;
            UserTable userTable = vulnerableDAO.unsafeLoginUser(loginDto);
            if(userTable != null){
                if(userTable.getUsername() != null){
                    if(userTable.getUsername().equals("root")){
                        levelComplete = "true";
                    }else{
                        levelComplete = "false";
                    }
                }else{
                    levelComplete = "false";
                }

            }else{
                levelComplete = "false";
                return Pair.of(levelComplete,new UserTable((long)555,"","ppppp"));
            }
            System.out.println(userTable.toString());

            return Pair.of(levelComplete,userTable );
        }catch (SQLException ex){
            System.out.println("L-am prins");
            System.out.println(ex);
            throw ex;
        }

    }


    public Pair<String, NewClientTable> level7(LoginDto loginDto) throws SQLException{
        try {
            String levelComplete;
            NewClientTable newClientTable = vulnerableDAO.unsafeLoginClient(loginDto);
            if(newClientTable != null){
                if(newClientTable.getUsername() != null && newClientTable.getPassword() != null){
                    if(newClientTable.getUsername().equals("admin") && newClientTable.getPassword().equals("pass")){
                        levelComplete = "true";

                    }else{
                        levelComplete = "false";
                    }
                }else{
                    levelComplete = "false";
                }

            }else{
                levelComplete = "false";
                return Pair.of(levelComplete,new NewClientTable((long)555,"",""));
            }
            System.out.println(newClientTable.toString() + "-----" + levelComplete);

            return Pair.of(levelComplete, newClientTable);
        }catch (SQLException ex){
            System.out.println("L-am prins");
            System.out.println(ex);
            throw ex;
        }

    }

    public Pair<String, NewClientTable> level8(LoginDto loginDto) throws SQLException{
        try {
            String levelComplete;
            NewClientTable newClientTable = vulnerableDAO.unsafeLoginClientOneRow(loginDto);
            if(newClientTable != null){
                if(newClientTable.getUsername() != null){
                    if(newClientTable.getUsername().equals("pass")){
                        levelComplete = "true";

                    }else{
                        levelComplete = "false";
                    }
                }else{
                    levelComplete = "false";
                }

            }else{
                levelComplete = "false";
                return Pair.of(levelComplete,new NewClientTable((long)555,"",""));
            }
            System.out.println(newClientTable.toString() + "-----" + levelComplete);

            return Pair.of(levelComplete, newClientTable);
        }catch (SQLException ex){
            System.out.println("L-am prins");
            System.out.println(ex);
            throw ex;
        }

    }

}
