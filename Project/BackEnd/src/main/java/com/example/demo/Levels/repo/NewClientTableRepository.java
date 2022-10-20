package com.example.demo.Levels.repo;

import com.example.demo.Levels.NewClientTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewClientTableRepository extends JpaRepository<NewClientTable,Long> {
}
