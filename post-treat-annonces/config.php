
<?php

function connection(){

	$connect = mysql_connect("localhost","root","");
    mysql_select_db("callList");
    
    return $connect;
}

?>