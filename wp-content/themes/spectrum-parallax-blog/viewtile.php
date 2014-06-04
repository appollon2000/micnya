<?php

/*
Template Name: ViewTile Page
*/

if(isset($_GET['trid'])) {
$mid = $_GET['trid'];
}
else {
  return false;
  exit;
}

$query = "SELECT * FROM dentry INNER JOIN donation ON donation.id = dentry.donation_id INNER JOIN donor ON donor.id = donation.donor_id WHERE donation.convio_transaction_id = '$mid'";
$result = mysql_query($query) or die(mysql_error());
$row = mysql_fetch_array($result); 

?>

<?php get_header(''); ?>
</div>
<style type="text/css">
html,body,#container{margin:0 !important;padding:0 !important;background:#fff !important;}
.ib-content-preview{display:block !important;position: static !important;margin:0 !important;padding:0 !important;}
.allgift{margin:-15px 0 0 14px !important;}
#container{display:none;}
#ib-content-preview.certificate .ib-content-full p{padding:0;text-align:center;}
#ib-content-preview.certificate{margin:0 auto !important;}
@media print {
#ib-content-preview.certificate .ib-content-full {width:650px !important;padding-top: 0 !important;}
#ib-content-preview.certificate .ib-content-full p{color: #333 !important;font-size:13px !important;padding: 1px 0;}
}


</style>
<?php
$appId='631772250191311';
$linkUrl='http://'.$_SERVER['SERVER_NAME'];
$picUrl='http://'.$_SERVER['SERVER_NAME'].'/wp-content/themes/spectrum-parallax-blog/images/tiles/';
$redirUrl='https://www.facebook.com/';

$clf = strtolower(trim($row['donor_first_name']));
$cll = strtolower(trim($row['donor_last_name']));
$numero = strtolower(trim($row['icon']));
$lettre = strtolower(trim($row['color']));
$sumcat = $row['category'];
if ($sumcat == 0) {
  $category = 'Friend';
} else if($sumcat == 1) {
  $category = 'Supporter';
} else {
  $category = 'Transformer';
}
  
if($row['praise'] == 0) {
$praisy = 'In honor of';
}else {
$praisy = 'In memory of';
}

if($row['is_donor_name_display']=='0'){
$myfname=$row['recipient_first_name'];
$mylname= $row['recipient_last_name'];
$donorInfo= $row['donor_first_name']. ' '. $row['donor_last_name'];
$cleanRel=str_replace(' ', '',strtolower($myfname.$mylname));
$anonm=$myfname.' ' .$mylname;
}else {
$myfname=$row['recipient_first_name'];
$mylname=$row['recipient_last_name'];
$donorInfo = substr($row['donor_first_name'], 0, 1). ' '. substr($row['donor_last_name'], 0, 1);
 
$cleanRel=str_replace(' ', '',strtolower($myfname.$mylname));
$klfn = substr($row['recipient_first_name'], 0, 1).'.';
$klln = substr($row['recipient_last_name'], 0, 1).'.';
$anonm=str_replace(' ', '',$klfn.$klln);
}
$cleanMsg = $row['message'];
$phpdate = strtotime($row['donation_date']);
$mysqldate = date("m/d/y", $phpdate);
$place =$row['donor_location'];

if($row['is_gift']==1) {
$gift = '<div class="allgift">From:<br /> '.$myfname.' ' .$mylname.'</div>';
}else {
$gift = '';
}

echo '<div class="ib-content-preview certificate" id="ib-content-preview">
<div class="ts-wrapper">
<div class="cstile"><img src="/wp-content/themes/spectrum-parallax-blog/images/tiles/'.$numero.'-'.$lettre.'.png" /></div>
<div style="" class="ib-teaser">
<h2>'.$myfname. ' '.$mylname. '<br /></h2>
</div>
<div class="categz">'.$category.'</div>
<div style="display: block;" class="ib-content-full">
<p>In recognition of this donation, a virtual shimmer wall tile has been personalized with your name. You can see it <a href="/?shimmer=1">here</a>.</p>
<p>
The <i>Ocean Wonders: Sharks!</i> exhibit will transform the Aquarium and connect visitors to their local seascape as never before. Please visit 
<a href="http://nyaquarium.com/shimmer">nyaquarium.com/shimmer</a> to view your tile.
</p>
<p>
Created by Wildlife Conservation Society’s design team in collaboration with award-winning environmental artist Ned Kahn, the shimmer wall will be an amazing new installation of public art, and a beacon for visitors to the New York Aquarium from far and wide.
</p>
</div>
</div>'

?>
<div class="clr"></div>


