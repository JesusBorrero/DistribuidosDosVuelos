var url = "http://localhost:8080/";

var mapaAeropuertos = new Map();

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
            $.each(vuelos, function (index, vuelo) {
                $("#resultadoVuelos").append("<div><p>Código: " + vuelo.codigoVuelo + "</p><p>Precio: " + vuelo.precio + "</p><p>Compañía: " + vuelo.compania.nombre + "</p></div>");
            });
        }
    });

    $("#aeropuertoOrigen").val("");
    $("#aeropuertoDestino").val("");
    $("#diaSalida").val("");
}