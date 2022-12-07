package com.desafio.desafio.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.desafio.desafio.models.Person;

@Repository
public interface PersonRepository extends JpaRepository<Person,Long>{

    public List<Person> findAllByName(String name);

    public Optional<Person> findByEmail(String email);

    public Optional<Person> findByPhoneNumber(String phoneNumber);

}
