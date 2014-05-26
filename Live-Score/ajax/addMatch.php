<?php
ini_set( 'default_charset', 'UTF-8' );
mb_internal_encoding('UTF-8');

include('../connect.php');	
	//if(isset($_POST['lteam'])&&($_POST['vsteam'])&&($_POST['matchDate'])){

		$lteam=mysql_real_escape_string($_POST['lteam']);
		$vsteam=mysql_real_escape_string($_POST['vsteam']);
		$matchDate=mysql_real_escape_string($_POST['matchDate']);

		$query=mysql_query("INSERT INTO `match` (id, localteam, vsteam, localscore, vsscore, matchDate) VALUES ('', '$lteam','$vsteam', '0', '0', '$matchDate') ") or die(mysql_error());

		if($query){
			$matchId=mysql_insert_id();
		    $rows = array("matchId"=> $matchId, "localteam" => $lteam, "vsteam" => $vsteam, "localscore" =>"0","vsscore" =>"0","matchDate" =>$matchDate );

		    echo json_encode($rows);
		} else {
		    echo "Fail";
		}
	//}
?>