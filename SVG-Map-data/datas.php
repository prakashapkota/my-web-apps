<?php

$datas = array("sudur paschim lkaze azoeaz leazebaz eaizhea ze", 
"madhya paschim aze azeja zliehaz eiazge",);


$id_area = (isset($_POST["id_area"]))? urldecode(mysql_real_escape_string($_POST["id_area"])) : NULL;

$id_area = $id_area -1;

echo $datas[$id_area];




?>