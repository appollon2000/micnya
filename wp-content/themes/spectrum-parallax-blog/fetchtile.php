<?php

/*
Template Name: Fetchtile Page
*/

$sql4 = "SELECT id,icon,color FROM dentry ORDER BY id DESC";
$result = mysql_query($sql4) or die(mysql_error());
$row = mysql_fetch_array($result); 
 echo $row['id'].'-'.$row['icon'].'-'.strtolower($row['color']);
 ?>


