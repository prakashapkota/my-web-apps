<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="utf-8">
	<title> Livre D'or</title>
	<style>
	#feedback{
		/*display: none;*/
	}
	#loader{
		display: none;
	}
	#FormMsg{
		display: none;
		background-color:#eaeaea;
		color:#ead;
	}
	</style>
</head>
<body>

	<div id='feedback'>

	<?php
	include ('connect.php');

	$query=mysql_query("SELECT * FROM livre ORDER BY id DESC");

	while ($rows=mysql_fetch_assoc($query)) {
		
		echo "<hr>Poster par : ".$rows['username']."<br/> Message : ".$rows['message'];
		echo '<br/>';
	}
	
	?>
	</div>

	<div id="FormMsg"></div>
	<form method="POST" id="commentForm" action="index.php">
		<p>Pseudo</p>
		<input type="text" id="username"/>
		<p>Message : </p>
		<textarea rows="6" cols="30" id="message"></textarea>
		<br/>
		<input type="submit" value="Poster"/>
	</form>
	<div id="loader"><img src="loader.gif" alt="Loader"/></div>
	<script src="jquery.min.js"></script>
	<script src="func.js"></script>
</body>