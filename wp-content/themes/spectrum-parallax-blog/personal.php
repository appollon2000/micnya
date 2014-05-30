<?php
if($_POST) {
require_once('../../../wp-config.php');
require_once('../../../wp-includes/wp-db.php');
global $wpdb;
/*
Template Name: PersonalTiles Page
*/

$kooks = $_COOKIE['last_id'];
$bodyText = $_POST['message'];
$vname = $_POST['vname'];
$vloc = $_POST['vloc'];
$vicon = $_POST['icon'];
$vcolor = $_POST['color'];
$hname = $_POST['hname'];
$mname = $_POST['mname'];
$vemail = $_POST['hemail'];

if(strlen(trim($vname))> 0 && strlen(trim($hname)) <1 ){
$praiseName = '';
$praise = 2;
}
if(strlen(trim($hname))> 0){
$praiseName = $hname;
$praise = 0;
}
if(strlen(trim($mname))> 0) {
$praiseName = $mname;
$praise = 1;
}

$sql3 = "SELECT * FROM dentry WHERE `id` = '" . $kooks . "'";
$resq3 = mysql_query($sql3) or die(mysql_error());
$t_id = $resq3['id'];

$sql4 = "UPDATE dentry SET message = '".mysql_real_escape_string($bodyText)."', icon = '$vicon', recipient_location = '".mysql_real_escape_string($vloc)."', color = '".mysql_real_escape_string($vcolor)."', recipient_first_name = '".mysql_real_escape_string($vname)."', recipient_first_name = '".mysql_real_escape_string($vname)."', recipient_email = '".mysql_real_escape_string($vemail)."', praise_name = '".mysql_real_escape_string($praiseName)."', praise = '$praise' WHERE id = " . $kooks;
$resq4 = mysql_query($sql4) or die(mysql_error());
if (function_exists('w3tc_pgcache_flush')) {
    w3tc_pgcache_flush();
  } 
}

?>
