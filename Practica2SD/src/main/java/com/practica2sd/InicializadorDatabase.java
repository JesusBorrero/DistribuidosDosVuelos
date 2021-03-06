package com.practica2sd;

import com.practica2sd.aeropuerto.Aeropuerto;
import com.practica2sd.aeropuerto.AeropuertoRepositorio;
import com.practica2sd.compania.Compania;
import com.practica2sd.compania.CompaniaRepositorio;
import com.practica2sd.vuelo.Vuelo;
import com.practica2sd.vuelo.VueloRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.sql.Date;
import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;

@Component
public class InicializadorDatabase {

    @Autowired
    private AeropuertoRepositorio aeropuertoRepositorio;

    @Autowired
    private CompaniaRepositorio companiaRepositorio;

    @Autowired
    private VueloRepositorio vueloRepositorio;

    @PostConstruct
    public void init() {
        SimpleDateFormat fecha = new SimpleDateFormat("dd/MM/yyyy");

        Aeropuerto aeropuerto1 = new Aeropuerto("AAAAMadridBarajas-AdolfoSuarez", "Madrid (Barajas-Adolfo Suarez)");
        Aeropuerto aeropuerto2 = new Aeropuerto("BBBBBarcelonaJosepTarradellasBarcelona-El Prat", "Barcelona (Josep Tarradellas Barcelona-El Prat)");

        aeropuertoRepositorio.save(aeropuerto1);
        aeropuertoRepositorio.save(aeropuerto2);

        Compania compania1 = new Compania("IB", "Iberia", "https://www.iberia.com/es/", "901 11 15 00", 4);
        companiaRepositorio.save(compania1);
        Compania compania2 = new Compania("FE", "Fly Emirates", "https://www.emirates.com/es/spanish/", "912 75 77 92", 4);
        companiaRepositorio.save(compania2);
        try {
            Vuelo vuelo1 = new Vuelo("IB0001", new Date(fecha.parse("30/06/2020").getTime()), Time.valueOf("12:00:00"), 2.5, 100, compania1,
                    aeropuerto1, aeropuerto2);
            Vuelo vuelo2 = new Vuelo("IB0002", new Date(fecha.parse("30/06/2020").getTime()), Time.valueOf("15:00:00"), 2.5, 120, compania1,
                    aeropuerto1, aeropuerto2);
            Vuelo vuelo3 = new Vuelo("IB0003", new Date(fecha.parse("30/06/2020").getTime()), Time.valueOf("15:00:00"), 2.5, 120, compania1,
                    aeropuerto2, aeropuerto1);
            Vuelo vuelo4 = new Vuelo("FE0004", new Date(fecha.parse("30/06/2020").getTime()), Time.valueOf("15:00:00"), 2.5, 140, compania2,
                    aeropuerto2, aeropuerto1);

            vueloRepositorio.save(vuelo1);
            vueloRepositorio.save(vuelo2);
            vueloRepositorio.save(vuelo3);
            vueloRepositorio.save(vuelo4);
        } catch (ParseException e){
            e.printStackTrace();
        }
    }
}
