<?php
    $conn = mysqli_connect('localhost','root','','compumundo3d');
    if(!$conn)
    {
        echo "No se ha podido conectar PHP - MySQL, verifique sus datos.";
    }
    else
    {
        echo "Conexion Exitosa PHP - MySQL";

        $query = $_POST['querySelect'];
        $queryCreate = $_POST['queryInsert'];

        $result = $conn->query($query);

        if ($result->num_rows > 0) {
            echo "Ya existe el usuario";
        } else {
            if ($conn->query($queryCreate) === TRUE) {
                echo "Se ha creado el nuevo usuario exitosamente";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
        }
    }

    

?>