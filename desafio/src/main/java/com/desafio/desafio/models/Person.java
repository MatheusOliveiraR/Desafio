package com.desafio.desafio.models;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;



@Data
@Entity
public class Person {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;    
    private String gender;    

    @JsonFormat(pattern="dd/MM/yyyy", shape = Shape.STRING)
    private LocalDate birthDate;
    private String phoneNumber;
    private String email;

    public String toString(){
        return "Name: " + getName() + "\n" +
        "Genêro: " + getGender() + "\n" +
        "Data de Nascimento: " + getBirthDate() + "\n" +
        "Telefone" + getPhoneNumber() + "\n" +
        "Email" + getEmail() + "\n";
    }
    
}
