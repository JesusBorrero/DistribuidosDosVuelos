var url = "http://localhost:8080/";

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