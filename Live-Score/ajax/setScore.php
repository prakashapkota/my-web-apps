<?php
ini_set( 'default_charset', 'UTF-8' );
mb_internal_encoding('UTF-8');

include('../connect.php');	
	//if(isset($_POST['matchId'])&&($_POST['lscore'])&&($_POST['vscore'])){

		$matchId=mysql_real_escape_string($_POST['matchId']);
		$lscore=mysql_real_escape_string($_POST['lscore']);
		$vscore=mysql_real_escape_string($_POST['vscore']);

		$query=mysql_query("UPDATE `match` SET `localscore`=$lscore, `vsscore`=$vscore WHERE `id`=$matchId") or die(mysql_error());

		if($query){
		    $rows = array("locals" => $lscore,"vsscore" => $vscore);
		    echo json_encode($rows);
		} else {
		    echo "Fail";
		}
	//}
?>