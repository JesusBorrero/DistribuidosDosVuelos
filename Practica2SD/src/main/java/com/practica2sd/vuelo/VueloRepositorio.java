package com.practica2sd.vuelo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.util.List;

public interface VueloRepositorio extends JpaRepository<Vuelo, Long> {

    @Query(value = "SELECT * FROM vuelo  WHERE origen_id = ?1 AND destino_id = ?2 AND fecha_salida = ?3", nativeQuery = true)
    List<Vuelo> vuelosByOrigenDestinoDia(long origenId, long destinoId, Date dia);
}
