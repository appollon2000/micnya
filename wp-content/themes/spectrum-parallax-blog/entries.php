<?php
if($_POST) {
require_once('../../../wp-config.php');
require_once('../../../wp-includes/wp-db.php');
global $wpdb;
/*
Template Name: Entries Page
*/

$donor_email = $_POST['donor_email'];
$amount = $_POST['other_amount'];
$first_name = $_POST['billing_name_first'];
$last_name = $_POST['billing_name_last'];
$convio_id = $_POST['tr_ID'];
$donor_location  = $_POST['billing_address_city'];
$sumcat  = $_POST['category'];
if ($sumcat == 'Friend') {
  $category = 0;
} else if($sumcat == 'Supporter') {
  $category = 1;
} else {
  $category = 2;
}
if (isset($_COOKIE['last_id'])) {
setcookie("last_id", "",time()-3600);
}

$sql1 = "INSERT INTO donor (`email`)
VALUES ('".mysql_real_escape_string($donor_email)."')";
$resq1 = mysql_query($sql1) or die(mysql_error());

$sql2 = "INSERT INTO donation (`amount`, `tile_quantity`, `is_gift`, `donor_first_name`, `donor_last_name`, `is_donor_name_display`, `donor_location`, `donor_id`,`convio_transaction_id`,`donation_date`)
VALUES ('".mysql_real_escape_string($amount)."',1,1, '".mysql_real_escape_string($first_name)."', '".mysql_real_escape_string($last_name)."',1,'".mysql_real_escape_string($donor_location)."',LAST_INSERT_ID(), '".$convio_id."',NOW())";
$resq2 = mysql_query($sql2) or die(mysql_error());

$sql3 = "INSERT INTO dentry (`message`, `icon`, `color`, `recipient_email`, `recipient_last_name`, `recipient_first_name`,`donation_id`,`category`)
VALUES ('',1, '00a49e', '','','',LAST_INSERT_ID(),'".$category."')";
$resq3 = mysql_query($sql3) or die(mysql_error());
$lastID = mysql_insert_id();
if (isset($_COOKIE['last_id'])) {
setcookie("last_id", "",time()-3600);
}
setcookie("last_id", $lastID,time()+86400);
$cooks = $_COOKIE['last_id'];
}
?>
