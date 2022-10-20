package com.example.demo.Util;

import com.example.demo.Entity.User;
import com.example.demo.Levels.NewClientTable;
import com.example.demo.Levels.Product;
import com.example.demo.Levels.UserTable;
import com.example.demo.Levels.repo.NewClientTableRepository;
import com.example.demo.Levels.repo.ProductRepository;
import com.example.demo.Levels.repo.UserTableRepository;
import com.example.demo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.Optional;

@Component
public class InitialSetup implements
        ApplicationListener<ContextRefreshedEvent> {

    boolean alreadySetup = false;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserTableRepository userTableRepository;

    @Autowired
    private NewClientTableRepository newClientTableRepository;

    /**
     * Creating the first admin account on the first start of the application
     * and populate the vulnerable database
     * @param event
     */
    @Override
    @Transactional
    public void onApplicationEvent(ContextRefreshedEvent event) {

        Optional<User> userOptional = userRepository.findByIsAdmin(true);
        if(userOptional.isPresent()){
            return;
        }
        if (alreadySetup){
            return;}

        User user = User.builder()
                .email("rolygr99@gmail.com")
                .password(passwordEncoder.encode("123123"))
                .name("Gonczel Roland")
                .isAdmin(true)
                .build();
        userRepository.save(user);

        Product product = Product.builder()
                .product("USB Type C Cable")
                .description("This cord alone WILL NOT provide you with fast charging alone.")
                .build();
        Product product2 = Product.builder()
                .product("Mouse pad")
                .description("This letter size mouse pad fits almost any space")
                .build();
        Product product3 = Product.builder()
                .product("Keyboard")
                .description("Keyboard with low-profile keys for a comfortable, quiet typing experience")
                .build();

        productRepository.save(product);
        productRepository.save(product2);
        productRepository.save(product3);

        UserTable userTable = UserTable.builder()
                .username("admin")
                .password("root")
                .build();
        UserTable userTable2 = UserTable.builder()
                .username("simpluuser")
                .password("parola")
                .build();
        userTableRepository.save(userTable);
        userTableRepository.save(userTable2);

        NewClientTable newClientTable = NewClientTable.builder()
                .username("admin")
                .password("pass")
                .build();
        NewClientTable newClientTable2 = NewClientTable.builder()
                .username("bob")
                .password("tequila")
                .build();
        newClientTableRepository.save(newClientTable);
        newClientTableRepository.save(newClientTable2);
        System.out.println("S-a introdus");


        alreadySetup = true;
    }
}
