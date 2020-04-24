package com.practica2sd.aeropuerto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/* Controlador para las acciones que se realizan sobre los aeropuertos */

@RestController
@RequestMapping("/aeropuerto")
public class AeropuertoControlador {

    @Autowired
    protected AeropuertoRepositorio aeropuertoRepositorio;

    /* Método que devuelve la información de todos los aeropuertos */
    @CrossOrigin
    @GetMapping("/")
    public ResponseEntity<List<Aeropuerto>> getAeropuertos(){
        return new ResponseEntity<>(this.aeropuertoRepositorio.findAll(), HttpStatus.OK);
    }
}
