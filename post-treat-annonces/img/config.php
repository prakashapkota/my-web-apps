
<?php

function connection(){

	$connect = mysql_connect("db3055.1and1.fr","dbo357023893","jvratp11");
    mysql_select_db("db357023893");
    
    return $connect;
}

?>