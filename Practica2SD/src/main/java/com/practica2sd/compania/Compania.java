package com.practica2sd.compania;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Compania {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;

    private String nombre;
    private String codigo;
    private String web;
    private String numeroTelefono;
    private int valoracion;

    public Compania(String nombre, String codigo, String web, String numeroTelefono, int valoracion) {
        this.nombre = nombre;
        this.codigo = codigo;
        this.web = web;
        this.numeroTelefono = numeroTelefono;
        this.valoracion = valoracion;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getWeb() {
        return web;
    }

    public void setWeb(String web) {
        this.web = web;
    }

    public String getNumeroTelefono() {
        return numeroTelefono;
    }

    public void setNumeroTelefono(String numeroTelefono) {
        this.numeroTelefono = numeroTelefono;
    }

    public int getValoracion() {
        return valoracion;
    }

    public void setValoracion(int valoracion) {
        this.valoracion = valoracion;
    }
}