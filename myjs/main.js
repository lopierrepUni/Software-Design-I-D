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
                alert('Intente de nuevo más tarde');
            }else{
                if(response.Rep){
                    alert('El usuario ya existe');
                }else{
                    if(response.Create){
                        alert('El usuario se creó correctamente');
                        $('#myModal').modal('toggle'); 
                    }else{
                        alert('Hubo un error al crear el usuario intente de nuevo');
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

});

