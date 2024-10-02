package com.example.IngresoNotas.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "notas")
public class Notas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "estudiante_nombre", nullable = false)
    private String estudianteNombre;

    @Column(name = "actividades", nullable = false)
    private Double actividades;

    @Column(name = "primer_parcial", nullable = false)
    private Double primerParcial;

    @Column(name = "segundo_parcial", nullable = false)
    private Double segundoParcial;

    @Column(name = "examen_final", nullable = false)
    private Double examenFinal;

    @Column(name = "puntaje_total", insertable = false, updatable = false)
    private Double puntajeTotal;

    public Object getEstudianteNombre() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getEstudianteNombre'");
    }

    public void setEstudianteNombre(Object estudianteNombre2) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setEstudianteNombre'");
    }

    public Object getActividades() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getActividades'");
    }

    public void setActividades(Object actividades2) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setActividades'");
    }

    public Object getPrimerParcial() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getPrimerParcial'");
    }

    public void setPrimerParcial(Object primerParcial2) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setPrimerParcial'");
    }

    public Object getSegundoParcial() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getSegundoParcial'");
    }

    public void setSegundoParcial(Object segundoParcial2) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setSegundoParcial'");
    }

    public Object getExamenFinal() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getExamenFinal'");
    }

    public void setExamenFinal(Object examenFinal2) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setExamenFinal'");
    }

    // Getters y Setters
    // (Generar getters y setters para cada campo)
}
