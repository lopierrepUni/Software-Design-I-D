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
        $queryCreate = $_POST['queryInsert'];
            if ($conn->query($queryCreate) === TRUE) {
                $response["state"] = "Todo bien";
            }else{
                $response["state"] = "Todo mal";
            }
    }

    echo json_encode($response);
?>