package com.practica2sd.compania;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/* Controlador para las acciones que se realizan sobre las compañías */

@RestController
@RequestMapping("/compania")
public class CompaniaControlador {

    @Autowired
    protected CompaniaRepositorio companiaRepositorio;

    /* Método que devuelve la información de una compañía dado su id */
    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<Compania> getCompania(@PathVariable long id){
        Optional<Compania> compania = this.companiaRepositorio.findById(id);
        if(compania.isPresent()){
            return new ResponseEntity<>(compania.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
