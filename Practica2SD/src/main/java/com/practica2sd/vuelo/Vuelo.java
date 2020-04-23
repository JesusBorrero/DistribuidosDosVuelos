package com.practica2sd.vuelo;

import com.practica2sd.aeropuerto.Aeropuerto;
import com.practica2sd.compania.Compania;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;

@Entity
public class Vuelo {
    /* Id autogenerado para la base de datos */
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;

    /* Código de vuelo compuesto por las letras de la compañía aérea y 4 dígitos */
    private String codigoVuelo;
    private Date fechaSalida;
    private Time horaSalida;
    private double duracionHoras;
    private int precio;

    /* Compañía del vuelo */
    @ManyToOne
    private Compania compania;

    /* Aeropuerto origen */
    @ManyToOne
    private Aeropuerto origen;

    /* Aeropuerto destino */
    @ManyToOne
    private Aeropuerto destino;

    /* CONSTRUCTORES */

    public Vuelo() {}

    public Vuelo(String codigoVuelo, Date fechaSalida, Time horaSalida, double duracionHoras, int precio, Compania compania, Aeropuerto origen, Aeropuerto destino) {
        this.codigoVuelo = codigoVuelo;
        this.fechaSalida = fechaSalida;
        this.horaSalida = horaSalida;
        this.duracionHoras = duracionHoras;
        this.precio = precio;
        this.compania = compania;
        this.origen = origen;
        this.destino = destino;
    }

    /* GETTERS Y SETTERS */

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCodigoVuelo() {
        return codigoVuelo;
    }

    public void setCodigoVuelo(String codigoVuelo) {
        this.codigoVuelo = codigoVuelo;
    }

    public Date getFechaSalida() {
        return fechaSalida;
    }

    public void setFechaSalida(Date fechaSalida) {
        this.fechaSalida = fechaSalida;
    }

    public Time getHoraSalida() {
        return horaSalida;
    }

    public void setHoraSalida(Time horaSalida) {
        this.horaSalida = horaSalida;
    }

    public double getDuracionHoras() {
        return duracionHoras;
    }

    public void setDuracionHoras(double duracionHoras) {
        this.duracionHoras = duracionHoras;
    }

    public int getPrecio() {
        return precio;
    }

    public void setPrecio(int precio) {
        this.precio = precio;
    }

    public Compania getCompania() {
        return compania;
    }

    public void setCompania(Compania compania) {
        this.compania = compania;
    }

    public Aeropuerto getOrigen() {
        return origen;
    }

    public void setOrigen(Aeropuerto origen) {
        this.origen = origen;
    }

    public Aeropuerto getDestino() {
        return destino;
    }

    public void setDestino(Aeropuerto destino) {
        this.destino = destino;
    }
}
