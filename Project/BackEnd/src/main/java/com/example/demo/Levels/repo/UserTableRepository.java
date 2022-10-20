package com.example.demo.Levels.repo;

import com.example.demo.Levels.UserTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTableRepository extends JpaRepository<UserTable,Long> {
}
