$(document).ready(function () {
    console.log("ready!");
    $("#createUser").submit(function (event) {
        var ajaxRequest;
        event.preventDefault();
        var values = $("#createUser").serialize();
        console.log(values);
        var valuesVec = values.split('&');
        var user = valuesVec[0].split('=')[1];
        var pass = valuesVec[1].split('=')[1];
        var name = valuesVec[2].split('=')[1];
        var dir = valuesVec[3].split('=')[1];
        var tel = valuesVec[4].split('=')[1];
        var querySelect = "SELECT * FROM cliente WHERE Correo = '" + decodeURIComponent(user) + "'";
        var queryInsert = "INSERT INTO cliente (Nombre, Correo, Telefono, Direccion, Pass) VALUES ('" + decodeURIComponent(name) + "', '" + decodeURIComponent(user)
            + "', '" + decodeURIComponent(tel) + "', '" + decodeURIComponent(dir) + "', '" + decodeURIComponent(pass) + "')";
        console.log(querySelect);
        console.log(queryInsert);
        ajaxRequest = $.ajax({
            url: "./myphps/createUser.php",
            type: "post",
            data: { "querySelect": querySelect, "queryInsert": queryInsert }
        });


        ajaxRequest.done(function (response, textStatus, jqXHR) {
            response = JSON.parse(response);
            console.log(response);
            if (!response.Conn) {
                $('#mssgCreate').find('label').text('Hubo un error en la conexión intentelo más tarde');
            } else {
                if (response.Rep) {
                    $('#mssgCreate').find('label').text('El usuario ya existe');
                } else {
                    if (response.Create) {
                        $('#myModal').modal('toggle');
                        localStorage.setItem('user', decodeURIComponent(user).split('@')[0]);
                        inicioSesion();
                    } else {
                        $('#mssgCreate').find('label').text('Hubo un error al crear el usuario intente de nuevo');
                    }
                }
            }

        });

        ajaxRequest.fail(function () {
            alert('Intentelo denuevo más tarde');
        });

    });

    $('#myModal').on('hidden.bs.modal', function () {
        $('#myModal').find('form').trigger('reset');
    });


    $("#loginUser").submit(function (event) {
        var ajaxRequest;
        event.preventDefault();
        var values = $("#loginUser").serialize();
        console.log(values);
        var valuesVec = values.split('&');
        var user = valuesVec[0].split('=')[1];
        var pass = valuesVec[1].split('=')[1];
        var querySelect = "SELECT * FROM cliente WHERE Correo = '" + decodeURIComponent(user) + "' AND Pass = '" + decodeURIComponent(pass) + "'";
        console.log(querySelect);

        ajaxRequest = $.ajax({
            url: "./myphps/loginUser.php",
            type: "post",
            data: { "querySelect": querySelect }
        });


        ajaxRequest.done(function (response, textStatus, jqXHR) {
            response = JSON.parse(response);
            console.log(response);
            if (response.Conn) {
                if (response.login) {
                    localStorage.setItem('user', decodeURIComponent(user).split('@')[0]);
                    inicioSesion();

                } else {
                    $('#mssgLogin').find('label').text('Cuenta o contraseña incorrecta');
                }
            } else {
                $('#mssgLogin').find('label').text('Hubo un error con la conexión intente de nuevo más tarde');
            }
        });

        ajaxRequest.fail(function () {
            alert('Intentelo denuevo más tarde');
        });

    });

    function inicioSesion() {
        $('#loginUser').hide();
    }

//Falta la parte de pagar (Crear la factura en la db) y cerrar sesión
    $("#pay").submit(function (event) {
        var ajaxRequest;
        event.preventDefault();
        var values = $("#pay").serialize();
        console.log(values);
        var valuesVec = values.split('&');
        var user = valuesVec[0].split('=')[1];
        var pass = valuesVec[1].split('=')[1];
        var name = valuesVec[2].split('=')[1];
        var dir = valuesVec[3].split('=')[1];
        var tel = valuesVec[4].split('=')[1];
        var querySelect = "SELECT * FROM cliente WHERE Correo = '" + decodeURIComponent(user) + "'";
        var queryInsert = "INSERT INTO cliente (Nombre, Correo, Telefono, Direccion, Pass) VALUES ('" + decodeURIComponent(name) + "', '" + decodeURIComponent(user)
            + "', '" + decodeURIComponent(tel) + "', '" + decodeURIComponent(dir) + "', '" + decodeURIComponent(pass) + "')";
        console.log(querySelect);
        console.log(queryInsert);
        ajaxRequest = $.ajax({
            url: "./myphps/createUser.php",
            type: "post",
            data: { "querySelect": querySelect, "queryInsert": queryInsert }
        });


        ajaxRequest.done(function (response, textStatus, jqXHR) {
            response = JSON.parse(response);
            console.log(response);
            if (!response.Conn) {
                $('#mssgCreate').find('label').text('Hubo un error en la conexión intentelo más tarde');
            } else {
                if (response.Rep) {
                    $('#mssgCreate').find('label').text('El usuario ya existe');
                } else {
                    if (response.Create) {
                        $('#myModal').modal('toggle');
                        localStorage.setItem('user', decodeURIComponent(user).split('@')[0]);
                        inicioSesion();
                    } else {
                        $('#mssgCreate').find('label').text('Hubo un error al crear el usuario intente de nuevo');
                    }
                }
            }

        });

        ajaxRequest.fail(function () {
            alert('Intentelo denuevo más tarde');
        });

    });

});


function agregarAlCarrito(name) {
    //<a class="dropdown-item" href="#">Action</a>
    //<span class="badge badge-primary badge-pill">14</span>
    var sw = false;
    $('.dropdown-item').each(function (i) {
        if ($(this).text().includes(name)) {
            var num = parseInt($(this).find('span').text());
            $(this).find('span').text(num + 1);
            sw = true;
        }
    });
    if (!sw) {
        $('.CarritoLista').append('<a class="dropdown-item" href="#" onclick="eliminarDelCarrito(\'' + name + '\')">' + name + '<span class="badge badge-primary badge-pill">1</span></a>');
    }
}

function pagar() {
    var precio = '';
    var nombre = '';
    var myMap = new Map();
    var sum = 0;
    $('h5.text-center').each(function (i) {
        if ((i + 1) % 2 == 0) {
            precio = $(this).text();
            myMap.set(nombre.trim(), precio.trim());
        } else {
            nombre = $(this).text();
        }
    });
    console.log(myMap);
    $('.dropdown-item').each(function (i) {
        if (i != 0) {
            var nombre = $(this).text();
            var num = $(this).find('span').text();
            nombre = nombre.substr(0, (nombre.length - num.length));
            num = parseInt(num);
            console.log(nombre);
            console.log(num);
            var price = myMap.get(nombre);
            price = parseInt(price.replace('.','').replace('.','').replace('.','').replace('.','').replace('.','').replace('.',''));
            console.log(price);
            sum = sum + (price * num);
        }
    });
    $('#myModal').modal('toggle');
    $('#precioModal').text('El precio de la compra es de '+sum);
    console.log(sum);
}

function eliminarDelCarrito(name) {
    $('.dropdown-item').each(function (i) {
        if ($(this).text().includes(name)) {
            var num = parseInt($(this).find('span').text());
            if (num - 1 == 0) {
                $(this).remove();
            } else {
                $(this).find('span').text(num - 1);
            }

        }
    });
}
