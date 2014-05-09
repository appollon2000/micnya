<?php
if($_POST) {
require_once('../../../wp-config.php');
require_once('../../../wp-includes/wp-db.php');
global $wpdb;
/*
Template Name: PersonalTiles Page
*/

$kooks = $_COOKIE['last_id'];
$bodyText = $_POST['other_amount'];

$sql3 = "SELECT * FROM dentry WHERE `id` = '" . $kooks . "'";
$resq3 = mysql_query($sql3) or die(mysql_error());
$t_id = $resq3['id'];

$sql4 = "INSERT INTO dentry (`message`, `icon`, `color`, `recipient_email`, `recipient_last_name`, `recipient_first_name`,`donation_id`,`category`)
VALUES ('".mysql_real_escape_string($msg0)."','".mysql_real_escape_string($icon0)."', '".mysql_real_escape_string($color0)."', '".mysql_real_escape_string($ema)."','".mysql_real_escape_string($lnam)."',
'".mysql_real_escape_string($fnam)."','".$cooks."')";
$resq4 = mysql_query($sql4) or die(mysql_error());

}

?>
