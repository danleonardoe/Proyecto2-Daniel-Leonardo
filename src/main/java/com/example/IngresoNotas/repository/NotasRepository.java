package com.example.IngresoNotas.repository;

import com.example.IngresoNotas.model.Notas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotasRepository extends JpaRepository<Notas, Long> {
    // Métodos personalizados, si es necesario, como encontrar por nombre del estudiante
}
