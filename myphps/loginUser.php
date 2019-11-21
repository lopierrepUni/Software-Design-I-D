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

        $result = $conn->query($query);

        if ($result->num_rows > 0) {
            $response["login"] = true;
        } else {
            $response["login"] = false;
        }
    }

    echo json_encode($response);
?>