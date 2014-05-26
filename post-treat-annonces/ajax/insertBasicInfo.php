<?php

session_start();

include("../config.php");
connection();


$data="";

$data = $_POST['newdata'];

$result = mysql_query("INSERT INTO calldata (id,data) VALUES('','$data')");

if (!$result) {
	die('Requête invalide : ' . mysql_error());
}

$id = mysql_insert_id(); 

echo "Data successfully added";
?>