<?php
    $response = array();
    $conn = mysqli_connect('localhost','root','','compumundo3d');
    if(!$conn)
    {
        $response["Conn"] = false;
    }
    else
    {
        $response["Conn"] = true;

        $query = $_POST['querySelect'];
        $queryCreate = $_POST['queryInsert'];

        $result = $conn->query($query);

        if ($result->num_rows > 0) {
            $response["Rep"] = true;
        } else {
            $response["Rep"] = false;
            if ($conn->query($queryCreate) === TRUE) {
                $response["Create"] = true;
            } else {
                $response["Create"] = false;
            }
        }
    }

    echo json_encode($response);

    

?>