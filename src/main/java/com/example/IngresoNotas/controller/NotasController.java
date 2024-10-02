package com.example.IngresoNotas.controller;

import com.example.IngresoNotas.model.Notas;
import com.example.IngresoNotas.repository.NotasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notas")
public class NotasController {

    @Autowired
    private NotasRepository notasRepository;

    // Crear una nueva nota
    @PostMapping("/crear")
    public Notas createNota(@RequestBody Notas notas) {
        return notasRepository.save(notas);
    }

    // Obtener todas las notas
    @GetMapping("/listar")
    public List<Notas> getAllNotas() {
        return notasRepository.findAll();
    }

    // Obtener una nota por ID
    @GetMapping("/{id}")
    public ResponseEntity<Notas> getNotaById(@PathVariable Long id) {
        Notas notas = notasRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nota no encontrada con el ID: " + id));
        return ResponseEntity.ok(notas);
    }

    // Actualizar una nota
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Notas> updateNota(@PathVariable Long id, @RequestBody Notas notaDetails) {
        Notas notas = notasRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nota no encontrada con el ID: " + id));

        notas.setEstudianteNombre(notaDetails.getEstudianteNombre());
        notas.setActividades(notaDetails.getActividades());
        notas.setPrimerParcial(notaDetails.getPrimerParcial());
        notas.setSegundoParcial(notaDetails.getSegundoParcial());
        notas.setExamenFinal(notaDetails.getExamenFinal());

        Notas updatedNota = notasRepository.save(notas);
        return ResponseEntity.ok(updatedNota);
    }

    // Eliminar una nota
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> deleteNota(@PathVariable Long id) {
        Notas notas = notasRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nota no encontrada con el ID: " + id));

        notasRepository.delete(notas);
        return ResponseEntity.noContent().build();
    }
}
