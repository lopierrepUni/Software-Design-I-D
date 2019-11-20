<?php
    $conectar=@mysql_connect('localhost','root','');
    if(!$conectar){
        echo "No se conecto"
    }else{
        $base=mysql_select_db('compumundo3d');
        if(!$base){
            echo "No se encontro la base de datos"
        }else{
            echo "Si se encontro la base de datos"
        }
    }

?>