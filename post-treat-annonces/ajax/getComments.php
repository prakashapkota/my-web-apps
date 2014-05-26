<?php

session_start();

include("../config.php");
connection();
$headers  = 'MIME-Version: 1.0' . "\r\n";

$list = array();

$calldataId = $_POST['calldataId'];

$reponses = mysql_query("SELECT * FROM comments WHERE calldataId='$calldataId' ");
while ($data = mysql_fetch_array($reponses)) 
	{ 
		array_push($list, $data);
	}

echo json_encode($list);
?>