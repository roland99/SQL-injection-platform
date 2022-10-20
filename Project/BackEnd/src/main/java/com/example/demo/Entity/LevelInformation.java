package com.example.demo.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class LevelInformation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private Long level;


    private String levelTitle;

    @Column(length = 2000)
    private String levelDescription;

    @Column(length = 2000)
    private String levelHint;

    @Column(length = 2000)
    private String levelSolution;

}
