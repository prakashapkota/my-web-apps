<?php

session_start();

include("../config.php");
connection();


$calldataId = $_POST['calldataId'];

$reponses = mysql_query("DELETE FROM callData WHERE id='$calldataId' ");
if (!$reponses) {
    	die('Requête invalide : ' . mysql_error());
	}	
	echo ("Contenu supprimé");

?>