package com.example.demo.Levels.repo;

import com.example.demo.Levels.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {


//    @Query(value = "SELECT * FROM Level1 WHERE product = ?1", nativeQuery = true)
//    Level1 findOne(String product);
}
