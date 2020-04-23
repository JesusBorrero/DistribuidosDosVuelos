package com.practica2sd.aeropuerto;

import com.practica2sd.GeneralController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/aeropuerto")
public class AeropuertoControlador extends GeneralController {

    @GetMapping("/")
    public ResponseEntity<List<Aeropuerto>> getAeropuertos(){
        return new ResponseEntity<>(this.aeropuertoRepositorio.findAll(), HttpStatus.OK);
    }
}
