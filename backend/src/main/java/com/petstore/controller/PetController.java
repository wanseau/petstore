package com.petstore.controller;

import com.petstore.model.Pet;
import com.petstore.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pets")
public class PetController {

    private final PetService petService;

    @Autowired
    public PetController(PetService petService) {
        this.petService = petService;
    }

    @GetMapping
    public List<Pet> getAllPets() {
        return petService.getAllPets();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pet> getPetById(@PathVariable Long id) {
        return petService.getPetById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Pet> createPet(@RequestBody Pet pet) {
        Pet createdPet = petService.createPet(pet);
        return new ResponseEntity<>(createdPet, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pet> updatePet(@PathVariable Long id, @RequestBody Pet pet) {
        try {
            Pet updatedPet = petService.updatePet(id, pet);
            return ResponseEntity.ok(updatedPet);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePet(@PathVariable Long id) {
        petService.deletePet(id);
        return ResponseEntity.noContent().build();
    }
}
