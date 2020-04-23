package com.practica2sd.compania;

import com.practica2sd.GeneralController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Optional;

@Controller
@RequestMapping("/compania")
public class CompaniaControlador extends GeneralController {

    @GetMapping("/{id}")
    public ResponseEntity<Compania> getCompania(@PathVariable long id){
        Optional<Compania> compania = this.companiaRepositorio.findById(id);
        if(compania.isPresent()){
            return new ResponseEntity<>(compania.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}