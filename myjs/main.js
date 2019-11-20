$( document ).ready(function() {
    console.log( "ready!" );

    $("#createUser").submit(function(event) {
        var ajaxRequest;
        event.preventDefault();
        var values = $("#createUser").serialize();
        console.log(values);

           ajaxRequest= $.ajax({
                url: "./myphps/createUser.php",
                type: "post",
                data: values
            });
    
    
        ajaxRequest.done(function (response, textStatus, jqXHR){
            console.log(response);
        });
    
        ajaxRequest.fail(function (){
        });

    });

});

