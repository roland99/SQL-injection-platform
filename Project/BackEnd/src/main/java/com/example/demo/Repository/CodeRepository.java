package com.example.demo.Repository;

import com.example.demo.Entity.Code;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CodeRepository extends JpaRepository<Code,Long> {

    Code findFirstByEmail(String email);
}
