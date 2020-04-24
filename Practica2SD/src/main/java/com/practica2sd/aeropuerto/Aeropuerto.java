package com.practica2sd.aeropuerto;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Aeropuerto {
    /* Id autogenerado para la base de datos */
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;

    /* Código del aeropuerto, compuesto por 4 letras mayúsculas y un nombre, que empezará
       con el nombre de la ciudad, seguido, cuando existan varios aeropuertos en una misma ciudad, del nombre
       del aeropuerto */

    private String codigo;

    /* CONSTRUCTORES */

    public Aeropuerto() {}

    public Aeropuerto(String codigo){
        this.codigo = codigo;
    }

    /* GETTERS Y SETTERS */

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }
}
