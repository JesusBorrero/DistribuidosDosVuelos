package com.practica2sd.compania;

import org.springframework.data.jpa.repository.JpaRepository;

/* Repositorio para los datos de las compañías */
public interface CompaniaRepositorio extends JpaRepository<Compania, Long> {
}
