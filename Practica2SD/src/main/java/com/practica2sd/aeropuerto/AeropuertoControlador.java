package com.practica2sd.aeropuerto;

import com.practica2sd.GeneralController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

/* Controlador para las acciones que se realizan sobre los aeropuertos */

@Controller
@RequestMapping("/aeropuerto")
public class AeropuertoControlador extends GeneralController {

    /* Método que devuelve la información de todos los aeropuertos */
    @CrossOrigin
    @GetMapping("/")
    public ResponseEntity<List<Aeropuerto>> getAeropuertos(){
        return new ResponseEntity<>(this.aeropuertoRepositorio.findAll(), HttpStatus.OK);
    }
}
