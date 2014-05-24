<?php
ini_set( 'default_charset', 'UTF-8' );
mb_internal_encoding('UTF-8');

include('../connect.php');	

	$query=mysql_query("SELECT * FROM `match` ORDER BY `id` ASC") or die(mysql_error());

	while ($row=mysql_fetch_assoc($query)) {
		$rows[] = $row;
	}
	echo json_encode($rows);
?>