package com.practica2sd.vuelo;

import com.practica2sd.GeneralController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.sql.Date;
import java.util.List;

@Controller
@RequestMapping("/vuelo")
public class VueloControlador extends GeneralController {

    @GetMapping("/find")
    public ResponseEntity<List<Vuelo>> getVuelosPorOrigenDestinoDia(@RequestParam long idOrigen, @RequestParam long idDestino, @RequestParam Date diaVuelo){
        return new ResponseEntity<>(this.vueloRepositorio.vuelosByOrigenDestinoDia(idOrigen, idDestino, diaVuelo), HttpStatus.OK);
    }
}
