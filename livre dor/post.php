<?php
ini_set( 'default_charset', 'UTF-8' );
mb_internal_encoding('UTF-8');

include('connect.php');	
	if(isset($_POST['username'])&&($_POST['message'])){
		$username=mysql_real_escape_string($_POST['username']);
		$message=mysql_real_escape_string($_POST['message']);
		$query=mysql_query("INSERT INTO livre(id,username,message) VALUES('','$username','$message')") or die("probleme");

		echo "Done";
	}
?>