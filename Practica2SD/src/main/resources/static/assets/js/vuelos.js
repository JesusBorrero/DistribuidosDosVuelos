var url = "http://localhost:8080/";

var mapaAeropuertos = new Map();
var seleccionVuelosPrecio = new Map();
var seleccionVuelosCompania = new Map();

$(document).ready(function () {
    var opcionesAeropuertos = [];

    $.ajax({
        url: url + "aeropuerto/",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
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

function busquedaVuelos() {

    $("#resultadoVuelos").html("");
    $("#resultadoVuelosIda").html("<h3>Vuelos de ida</h3>");
    $("#resultadoVuelosVuelta").html("<h3>Vuelos de vuelta</h3>");
    $("#div-resultados-ida-vuelta").hide();

    var aeropuertoOrigen = document.getElementById("aeropuertoOrigen").value;
    var aeropuertoDestino = document.getElementById("aeropuertoDestino").value;
    var diaSalida = document.getElementById("diaSalida").value;

    if(aeropuertoOrigen === "" || aeropuertoDestino === "" || diaSalida === ""){
        $("#resultadoVuelos").append("<div class='sin-resultados'>No hay resultados para esta búsqueda</div>");
        return;
    }

    if(mapaAeropuertos.get(aeropuertoDestino) === undefined || mapaAeropuertos.get(aeropuertoOrigen) === undefined){
        $("#resultadoVuelos").append("<div class='sin-resultados'>No hay resultados para esta búsqueda</div>");
        return;
    }

    $.ajax({
        url: url + "vuelo/find?idOrigen=" + mapaAeropuertos.get(aeropuertoOrigen) + "&idDestino=" +
            mapaAeropuertos.get(aeropuertoDestino) + "&diaVuelo=" + diaSalida,
        type: "GET"
    }).done(function (vuelos) {
        if(vuelos.length === 0){
            $("#resultadoVuelos").append("<div class='sin-resultados'>No hay resultados para esta búsqueda</div>");
        } else {
            if(!$("#ida-vuelta-check").prop("checked")) {
                $.each(vuelos, function (index, vuelo) {
                    $("#resultadoVuelos").append("<div class='card card-info-vuelo'><div class='card-body'><h2>Vuelo " + vuelo.codigoVuelo + "</h2>" +
                        "<p>Precio: " + vuelo.precio + " euros</p><p>Compañía: <span class='nombre-compania' onclick='fichaCompania(" + vuelo.compania.id + ")'>"
                        + vuelo.compania.nombre + "</span></p></div></div>");
                });
            } else {
                $.each(vuelos, function (index, vuelo) {
                    $("#resultadoVuelosIda").append("<div class='card card-info-vuelo vuelo-ida-vuelta' onclick='seleccionVuelo(\"ida\", "+ vuelo.precio +", \"" + vuelo.compania.codigo + "\")'>" +
                        "<div class='card-body'><h3>Vuelo " + vuelo.codigoVuelo + "</h3>" +
                        "<p>Precio: " + vuelo.precio + " euros</p><p>Compañía: <span class='nombre-compania' onclick='fichaCompania(" + vuelo.compania.id + ")'>"
                        + vuelo.compania.nombre + "</span></p></div></div>");
                });
            }
        }
    });

    if($("#ida-vuelta-check").prop("checked")) {
        $("#div-resultados-ida-vuelta").show();
        var diaRetorno = document.getElementById("diaRetorno").value;

        if(diaRetorno === ""){
            $("#resultadoVuelosVuelta").append("<div class='sin-resultados'>No hay resultados para esta búsqueda</div>");
            return;
        }

        $.ajax({
            url: url + "vuelo/find?idOrigen=" + mapaAeropuertos.get(aeropuertoDestino) + "&idDestino=" +
                mapaAeropuertos.get(aeropuertoOrigen) + "&diaVuelo=" + diaRetorno,
            type: "GET"
        }).done(function (vuelos) {
            if(vuelos.length === 0){
                $("#resultadoVuelosVuelta").append("<div class='sin-resultados'>No hay resultados para esta búsqueda</div>");
            } else {
                $.each(vuelos, function (index, vuelo) {
                    $("#resultadoVuelosVuelta").append("<div class='card card-info-vuelo vuelo-ida-vuelta' onclick='seleccionVuelo(\"vuelta\", "+ vuelo.precio +", \""+ vuelo.compania.codigo + "\")'>" +
                        "<div class='card-body'><h2>Vuelo " + vuelo.codigoVuelo + "</h2>" +
                        "<p>Precio: " + vuelo.precio + " euros</p><p>Compañía: <span class='nombre-compania' onclick='fichaCompania(" + vuelo.compania.id + ")'>"
                        + vuelo.compania.nombre + "</span></p></div></div>");
                });
            }
        });
    }

    $("#aeropuertoOrigen").val("");
    $("#aeropuertoDestino").val("");
    $("#diaSalida").val("");
    $("#diaRetorno").val("");
}

function fichaCompania(companiaId){
    $("#dialogoCompania").html("");

    $.ajax({
        url: url + "compania/" + companiaId,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        type: "GET"
    }).done(function (compania) {
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
            "<p>Teléfono: " + compania.numeroTelefono + "</p><a href='" + compania.web + "'>Sitio web</a>")
            .dialog("open");
    })
}

function checkIdaVuelta(){
    if($("#ida-vuelta-check").prop("checked")){
        $("#divDiaRetorno").show();
    } else {
        $("#divDiaRetorno").hide();
    }
}

function seleccionVuelo(tipo, precioVuelo, companiaVuelo){
    seleccionVuelosPrecio.set(tipo, precioVuelo);
    seleccionVuelosCompania.set(tipo, companiaVuelo);

    if(seleccionVuelosPrecio.get("ida") !== undefined && seleccionVuelosPrecio.get("vuelta") !== undefined){

        var precioTotal = seleccionVuelosPrecio.get("ida") + seleccionVuelosPrecio.get("vuelta");
        if(seleccionVuelosCompania.get("ida") === seleccionVuelosCompania.get("vuelta")){
            precioTotal = precioTotal - precioTotal * 0.2;
            $("#precioTotal").append("<p>El precio total (reducido en 20%) es de: " + precioTotal + "</p>")
        } else {
            $("#precioTotal").append("<p>El precio total es de: " + precioTotal + "</p>");
        }

    }
}