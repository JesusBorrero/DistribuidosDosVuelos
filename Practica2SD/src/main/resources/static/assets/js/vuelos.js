var url = "http://localhost:8080/";

var mapaAeropuertos = new Map();
var seleccionVuelosPrecio = new Map();
var seleccionVuelosCompania = new Map();

// Obtener todos los aeropuertos
// - Se genera un mapa -> clave: código del aeropuerto - valor: id del aeropuerto
// - Autocompleta la búsqueda de aeropuerto (salida y llegada)
$(document).ready(function () {
    var opcionesAeropuertos = [];

    $.ajax({
        url: url + "aeropuerto/",
        headers: {
            'Content-Type': 'application/json'
        },
        type: "GET"
    }).done(function (aeropuertos) {
        $.each(aeropuertos, function (index, aeropuerto) {
            mapaAeropuertos.set(aeropuerto.codigo, aeropuerto.id);
            opcionesAeropuertos.push(aeropuerto.codigo);
        });

        $( "#aeropuertoOrigen" ).autocomplete({
            source: opcionesAeropuertos
        });

        $( "#aeropuertoDestino" ).autocomplete({
            source: opcionesAeropuertos
        });
    })
});

// Calendario para elegir la fecha de salida
$(function(){
    $("#diaSalida").datepicker({
        dateFormat: "yy-mm-dd"
    });
});

// Calendario para elegir la fecha de retorno
$(function(){
    $("#diaRetorno").datepicker({
        dateFormat: "yy-mm-dd"
    });
});

function busquedaVuelos() {

    // Inicialización de los componentes HTML
    $("#resultadoVuelos").html("");
    $("#resultadoVuelosIda").html("<h3>Vuelos de ida</h3>");
    $("#resultadoVuelosVuelta").html("<h3>Vuelos de vuelta</h3>");
    $("#div-resultados-ida-vuelta").hide();

    var aeropuertoOrigen = document.getElementById("aeropuertoOrigen").value;
    var aeropuertoDestino = document.getElementById("aeropuertoDestino").value;
    var diaSalida = document.getElementById("diaSalida").value;

    // Validaciones previas a realizar la búsqueda
    if(aeropuertoOrigen === "" || aeropuertoDestino === "" || diaSalida === ""){
        $("#resultadoVuelos").append("<div class='sin-resultados'>No hay resultados para esta búsqueda</div>");
        return;
    }

    if(mapaAeropuertos.get(aeropuertoDestino) === undefined || mapaAeropuertos.get(aeropuertoOrigen) === undefined){
        $("#resultadoVuelos").append("<div class='sin-resultados'>No hay resultados para esta búsqueda</div>");
        return;
    }


    // Petición para obtener todos los vuelos en función del origen, destino y dia de salida
    $.ajax({
        url: url + "vuelo/find?idOrigen=" + mapaAeropuertos.get(aeropuertoOrigen) + "&idDestino=" +
            mapaAeropuertos.get(aeropuertoDestino) + "&diaVuelo=" + diaSalida,
        type: "GET"
    }).done(function (vuelos) {
        // No hay vuelos para los parámetros dados
        if(vuelos.length === 0){
            $("#resultadoVuelos").append("<div class='sin-resultados'>No hay resultados para esta búsqueda</div>");
        } else {
            // Hay vuelos y se ha seleccionado ida-vuelta
            if(!$("#ida-vuelta-check").prop("checked")) {
                $.each(vuelos, function (index, vuelo) {
                    $("#resultadoVuelos").append("<div class='card card-info-vuelo'><div class='card-body'><h2>Vuelo " + vuelo.codigoVuelo + "</h2>" +
                        "<p>Precio: " + vuelo.precio + " euros</p><p>Compañía: <span class='nombre-compania' onclick='fichaCompania(" + vuelo.compania.id + ")'>"
                        + vuelo.compania.nombre + "</span></p></div></div>");
                });
            } else {
                // Hay vuelos y no se ha seleccionado ida-vuelta
                $.each(vuelos, function (index, vuelo) {
                    $("#resultadoVuelosIda").append("<div class='card card-info-vuelo vuelo-ida-vuelta' id= \"" + vuelo.codigoVuelo + "\" onclick='seleccionVuelo(\"ida\", "+ vuelo.precio +", \"" + vuelo.compania.codigo + "\", \""+ vuelo.codigoVuelo +"\")'>" +
                        "<div class='card-body'><h3>Vuelo " + vuelo.codigoVuelo + "</h3>" +
                        "<p>Precio: " + vuelo.precio + " euros</p><p>Compañía: <span class='nombre-compania' onclick='fichaCompania(" + vuelo.compania.id + ")'>"
                        + vuelo.compania.nombre + "</span></p></div></div>");
                });
            }
        }
    });

    // Si se ha seleccionado ida-vuelta, obtener todos los vuelos destino-origen en el día de retorno seleccionado
    if($("#ida-vuelta-check").prop("checked")) {
        $("#div-resultados-ida-vuelta").show();
        var diaRetorno = document.getElementById("diaRetorno").value;

        // Validaciones previas a realizar la búsqueda
        if(diaRetorno === ""){
            $("#resultadoVuelosVuelta").append("<div class='sin-resultados'>No hay resultados para esta búsqueda</div>");
            return;
        }

        // Petición para obtener todos los vuelos en función del destino, origen y dia de retorno
        $.ajax({
            url: url + "vuelo/find?idOrigen=" + mapaAeropuertos.get(aeropuertoDestino) + "&idDestino=" +
                mapaAeropuertos.get(aeropuertoOrigen) + "&diaVuelo=" + diaRetorno,
            type: "GET"
        }).done(function (vuelos) {
            // No hay vuelos para los parámetros dados
            if(vuelos.length === 0){
                $("#resultadoVuelosVuelta").append("<div class='sin-resultados'>No hay resultados para esta búsqueda</div>");
            } else {
                // Hay vuelos para los parámetros dados
                $.each(vuelos, function (index, vuelo) {
                    $("#resultadoVuelosVuelta").append("<div class='card card-info-vuelo vuelo-ida-vuelta' id= \"" + vuelo.codigoVuelo + "\" onclick='seleccionVuelo(\"vuelta\", "+ vuelo.precio + ", \""+ vuelo.compania.codigo + "\", \""+ vuelo.codigoVuelo +"\")'>" +
                        "<div class='card-body'><h2>Vuelo " + vuelo.codigoVuelo + "</h2>" +
                        "<p>Precio: " + vuelo.precio + " euros</p><p>Compañía: <span class='nombre-compania' onclick='fichaCompania(" + vuelo.compania.id + ")'>"
                        + vuelo.compania.nombre + "</span></p></div></div>");
                });
            }
        });
    }

    // Limpiar los campos del formulario
    $("#aeropuertoOrigen").val("");
    $("#aeropuertoDestino").val("");
    $("#diaSalida").val("");
    $("#diaRetorno").val("");
}

// Mostrar la ficha de la compañia
function fichaCompania(companiaId){
    // Inicialización
    $("#dialogoCompania").html("");

    // Obtener la información de una compañia
    $.ajax({
        url: url + "compania/" + companiaId,
        headers: {
            'Content-Type': 'application/json'
        },
        type: "GET"
    }).done(function (compania) {
        // Parámetros del diálogo que contiene la información de la compañia
        $( "#dialogoCompania" ).dialog({
            autoOpen: false,
            hide: "puff",
            show : "slide",
            width: 500,
            title: "Ficha Compañía",
            closeOnEscape: true,
            draggable: false,
            closeText: ""
        }).append("<p>Compañía: " + compania.nombre + "</p><p>Código: " + compania.codigo + "</p>" +
            "<p>Teléfono: " + compania.numeroTelefono + "</p><a href='" + compania.web + "'>Sitio web</a>" +
            "<p> Valoración: </p><div id=\"rateYo\"></div>")
            .dialog("open");

        $("#rateYo").rateYo({
            rating: compania.valoracion,
            readOnly: true
        });

    })
}

// Si se selecciona ida-vuelta, mostrar el campo para seleccionar el día de retorno
function checkIdaVuelta(){
    if($("#ida-vuelta-check").prop("checked")){
        $("#divDiaRetorno").show();
    } else {
        $("#divDiaRetorno").hide();
    }
}

// Seleccionar vuelos y calcular precio total
function seleccionVuelo(tipo, precioVuelo, companiaVuelo, codigoVuelo){
    $("#precioTotal").empty();
    seleccionVuelosPrecio.set(tipo, precioVuelo);
    seleccionVuelosCompania.set(tipo, companiaVuelo);

    // Se elimina la seleccion de otros vuelos
    if(tipo === "ida"){
        $("#resultadoVuelosIda").children().removeClass("vuelo-seleccionado");
    } else if (tipo === "vuelta"){
        $("#resultadoVuelosVuelta").children().removeClass("vuelo-seleccionado");
    }

    // Se deja seleccionado el vuelo
    $("#"+ codigoVuelo + "").addClass("vuelo-seleccionado");

    // Si se ha seleccionado vuelo de ida y vuelo de vuelta, calcular el precio total
    if(seleccionVuelosPrecio.get("ida") !== undefined && seleccionVuelosPrecio.get("vuelta") !== undefined){

        var precioTotal = seleccionVuelosPrecio.get("ida") + seleccionVuelosPrecio.get("vuelta");

        // Si ambos vuelos pertenecen a la misma compañia, aplicar descuento
        if(seleccionVuelosCompania.get("ida") === seleccionVuelosCompania.get("vuelta")){
            precioTotal = precioTotal - precioTotal * 0.2;
            $("#precioTotal").append("<p>El precio total (reducido en 20%) es de: " + precioTotal + "</p>")
        } else {
            $("#precioTotal").append("<p>El precio total es de: " + precioTotal + "</p>");
        }

    }
}