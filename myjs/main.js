$( document ).ready(function() {
    console.log( "ready!" );
    $("#createUser").submit(function(event) {
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
        var querySelect = "SELECT * FROM cliente WHERE Correo = '"+decodeURIComponent(user)+"'";
        var queryInsert = "INSERT INTO cliente (Nombre, Correo, Telefono, Direccion, Pass) VALUES ('"+decodeURIComponent(name)+"', '"+decodeURIComponent(user)
        +"', '"+decodeURIComponent(tel)+"', '"+decodeURIComponent(dir)+"', '"+decodeURIComponent(pass)+"')";
        console.log(querySelect);
        console.log(queryInsert);
           ajaxRequest= $.ajax({
                url: "./myphps/createUser.php",
                type: "post",
                data: {"querySelect": querySelect, "queryInsert":queryInsert}
            });
    
    
        ajaxRequest.done(function (response, textStatus, jqXHR){
            response = JSON.parse(response);
            console.log(response);
            if(!response.Conn){
                $('#mssgCreate').find('label').text('Hubo un error en la conexión intentelo más tarde');
            }else{
                if(response.Rep){
                    $('#mssgCreate').find('label').text('El usuario ya existe');
                }else{
                    if(response.Create){
                        $('#myModal').modal('toggle'); 
                        localStorage.setItem('user', decodeURIComponent(user).split('@')[0]);
                        inicioSesion();
                    }else{
                        $('#mssgCreate').find('label').text('Hubo un error al crear el usuario intente de nuevo');
                    }
                }
            }
            
        });
    
        ajaxRequest.fail(function (){
            alert('Intentelo denuevo más tarde');
        });

    });

    $('#myModal').on('hidden.bs.modal', function () {
        $('#myModal').find('form').trigger('reset');
    })


    $("#loginUser").submit(function(event) {
        var ajaxRequest;
        event.preventDefault();
        var values = $("#loginUser").serialize();
        console.log(values);
        var valuesVec = values.split('&');
        var user = valuesVec[0].split('=')[1];
        var pass = valuesVec[1].split('=')[1];
        var querySelect = "SELECT * FROM cliente WHERE Correo = '"+decodeURIComponent(user)+"' AND Pass = '"+decodeURIComponent(pass)+"'";
        console.log(querySelect);

           ajaxRequest= $.ajax({
                url: "./myphps/loginUser.php",
                type: "post",
                data: {"querySelect": querySelect}
            });
    
    
        ajaxRequest.done(function (response, textStatus, jqXHR){
            response = JSON.parse(response);
            console.log(response);
            if(response.Conn){
                if(response.login){
                    localStorage.setItem('user', decodeURIComponent(user).split('@')[0]);
                    inicioSesion();

                }else{
                    $('#mssgLogin').find('label').text('Cuenta o contraseña incorrecta');
                }
            }else{
                $('#mssgLogin').find('label').text('Hubo un error con la conexión intente de nuevo más tarde');
            }
        });
    
        ajaxRequest.fail(function (){
            alert('Intentelo denuevo más tarde');
        });

    });

    function inicioSesion(){
        $('#loginUser').hide();
    }

});


function agregarAlCarrito(name){
    //<a class="dropdown-item" href="#">Action</a>
    //<span class="badge badge-primary badge-pill">14</span>
    var sw = false;
    $('.dropdown-item').each(function(i){
        if($(this).text().includes(name)){
            var num = parseInt($(this).find('span').text());
            $(this).find('span').text(num+1);
            sw=true;
        }
    });
    if(!sw){
        $('.CarritoLista').append('<a class="dropdown-item" href="#" onclick="eliminarDelCarrito(\''+name+'\')">'+name+'<span class="badge badge-primary badge-pill">1</span></a>');
    }
}

function pagar(){
    
}

function eliminarDelCarrito(name){
    $('.dropdown-item').each(function(i){
        if($(this).text().includes(name)){
            var num = parseInt($(this).find('span').text());
            if(num-1==0){
                $(this).remove();
            }else{
                $(this).find('span').text(num-1);
            }
            
        }
    });
}
