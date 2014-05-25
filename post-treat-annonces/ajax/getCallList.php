<?php

session_start();

include("../config.php");
connection();
$list = array();

$reponses = mysql_query("SELECT * FROM calldata");
while ($data = mysql_fetch_array($reponses)) 
	{ 
		array_push($list, $data);
	}

echo json_encode($list);
?>