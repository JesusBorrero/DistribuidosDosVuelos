package com.practica2sd;

import com.practica2sd.aeropuerto.AeropuertoRepositorio;
import com.practica2sd.compania.CompaniaRepositorio;
import com.practica2sd.vuelo.VueloRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class GeneralController {
    @Autowired
    protected AeropuertoRepositorio aeropuertoRepositorio;

    @Autowired
    protected CompaniaRepositorio companiaRepositorio;

    @Autowired
    protected VueloRepositorio vueloRepositorio;
}
