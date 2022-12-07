package com.desafio.desafio.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.desafio.desafio.models.Person;
import com.desafio.desafio.service.PersonService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/person")
@RequiredArgsConstructor
public class PersonController {
    
    private final PersonService personService;

    @PostMapping
    public ResponseEntity<Object> createPerson(@RequestBody Person person){
        if(personService.findByEmail(person.getEmail()).isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("O email já esta cadastrado");
        }
        if(person.getBirthDate().equals(null)){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não foi cadastrada data de nascimento");
        }
        if(person.getGender().equals(null)){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não foi cadastrado sexo");
        }
        if(person.getPhoneNumber().equals(null)){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não foi cadastrado telefone");
        }        
        personService.savePerson(person);
        return ResponseEntity.status(HttpStatus.OK).body("Cadastro realizado com sucesso!!!");        
    }

    @GetMapping
    public ResponseEntity<List<Person>> getAll(){
        System.out.println("Tudo certo");
        return ResponseEntity.status(HttpStatus.OK).body(personService.findAll() );
    }

    @GetMapping(value="/{id}")
    public ResponseEntity<Object> findById(@PathVariable (value="id")Long id){
        Optional<Person> personOptional = personService.findById(id);
        if(!personOptional.isPresent()){
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não existe pessoa cadastrada com este id");
        }
        return ResponseEntity.status(HttpStatus.OK).body(personOptional.get().toString());
    }
    
    //implementar atualização
    @PutMapping(value = "/{id}")
    public ResponseEntity<Object> updatePerson(@PathVariable (value="id") Long id, @RequestBody Person person){
        Optional<Person> personOptional = personService.findById(id);
        if (!personOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não existe essa pessoa no banco");
        }
        BeanUtils.copyProperties(person, personOptional.get(),"id");
        personService.savePerson(personOptional.get());
        return ResponseEntity.status(HttpStatus.OK).body("Sucesso");
    }

    @CrossOrigin("*")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteByEmail(@PathVariable (value="id") String email){
        Optional<Person> personOptional = personService.findByEmail(email);
        if(!personOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não existe pessoa cadastrada com esse email");
        }
        personService.deletePerson(personOptional.get());
        return ResponseEntity.status(HttpStatus.OK).body("A pessoa foi deletada com sucesso!");
    }
    
}
