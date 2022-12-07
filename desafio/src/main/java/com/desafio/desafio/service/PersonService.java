package com.desafio.desafio.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.desafio.desafio.models.Person;
import com.desafio.desafio.repository.PersonRepository;

import jakarta.transaction.Transactional;

@Service
public class PersonService {

    @Autowired
    PersonRepository personRepository;

    @Transactional
    public void savePerson(Person person){
        personRepository.save(person);
    }

    public Optional<Person> findById(Long id){
        return personRepository.findById(id);
    }

    public List<Person> findAllByName(String name){
        return personRepository.findAllByName(name);
    }

    public List<Person> findAll(){
        return personRepository.findAll();
    }

    public Optional<Person> findByEmail(String email){
        return personRepository.findByEmail(email);
    }

    public Optional<Person> findByPhoneNumber(String number){
        return personRepository.findByPhoneNumber(number);
    }

    @Transactional
    public void deletePerson(Person person){
        personRepository.delete(person);
    }
    


    
}
