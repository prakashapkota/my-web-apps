<?php

session_start();

include("../config.php");
connection();


$data="";

$calldataId = $_POST['calldataId'];
$comment = $_POST['comment'];

$result = mysql_query("INSERT INTO comments (id,calldataId, comment) VALUES('','$calldataId', '$comment')");

if (!$result) {
	die('Requête invalide : ' . mysql_error());
}

$id = mysql_insert_id(); 

echo "Data successfully added";
?>