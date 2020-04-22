package com.practica2sd.vuelo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Date;
import java.sql.Time;

@Entity
public class Vuelo {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;

    private String codigoVuelo;
    private Date fechaSalida;
    private Time horaSalida;
    private double duracionHoras;
    private int precio;

    public Vuelo(String codigoVuelo, Date fechaSalida, Time horaSalida, double duracionHoras, int precio) {
        this.codigoVuelo = codigoVuelo;
        this.fechaSalida = fechaSalida;
        this.horaSalida = horaSalida;
        this.duracionHoras = duracionHoras;
        this.precio = precio;
    }

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
}
