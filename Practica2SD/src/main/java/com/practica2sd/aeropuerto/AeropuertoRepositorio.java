package com.practica2sd.aeropuerto;

import org.springframework.data.jpa.repository.JpaRepository;

/* Repositorio para los datos de los aeropuertos */
public interface AeropuertoRepositorio extends JpaRepository<Aeropuerto, Long> {
}
