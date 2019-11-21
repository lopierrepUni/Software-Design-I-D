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
            while($row = $result->fetch_assoc()) {
                $response[$row["ID"]]=$row["Modelo"];
            }
        }
    }

    echo json_encode($response);
?>