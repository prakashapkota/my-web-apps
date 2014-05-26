<?php

session_start();

include("../config.php");
connection();
$list = array();

$calldataId = $_POST['calldataId'];

$reponses = mysql_query("SELECT * FROM calldata WHERE id='$calldataId'");
while ($data = mysql_fetch_array($reponses)) 
	{ 
		array_push($list, $data);
	}

echo json_encode($list);
?>