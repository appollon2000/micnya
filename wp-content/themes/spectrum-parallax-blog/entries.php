<?php
require_once('../../../wp-config.php');
require_once('../../../wp-includes/wp-db.php');
global $wpdb;
/*
Template Name: Entries Page
*/

$sql1 = "INSERT INTO donor (`email`)
VALUES ('".mysql_real_escape_string('mmmmii@we.fr')."')";
$resq1 = mysql_query($sql1) or die(mysql_error());

?>
