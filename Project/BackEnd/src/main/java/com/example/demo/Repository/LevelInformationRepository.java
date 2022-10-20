package com.example.demo.Repository;

import com.example.demo.Entity.LevelInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LevelInformationRepository extends JpaRepository<LevelInformation,Long> {

    LevelInformation findFirstByLevel(Long level);

}
