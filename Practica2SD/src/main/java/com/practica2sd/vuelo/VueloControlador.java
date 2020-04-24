package com.practica2sd.vuelo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

/* Controlador para las acciones que se realizan sobre los vuelos */

@RestController
@RequestMapping("/vuelo")
public class VueloControlador {

    @Autowired
    protected VueloRepositorio vueloRepositorio;

    /* Método que devuelve los vuelos que se realizan con un aeropuerto origen, destino y un día determinado */
    @CrossOrigin
    @GetMapping("/find")
    public ResponseEntity<List<Vuelo>> getVuelosPorOrigenDestinoDia(@RequestParam long idOrigen, @RequestParam long idDestino, @RequestParam Date diaVuelo){
        return new ResponseEntity<>(this.vueloRepositorio.vuelosByOrigenDestinoDia(idOrigen, idDestino, diaVuelo), HttpStatus.OK);
    }
}
