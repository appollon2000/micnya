<?php

/*
Template Name: ViewTile Page
*/

session_start();
$mid = $_COOKIE['last_id'];

$query = "SELECT * FROM dentry INNER JOIN donation ON donation.id = dentry.donation_id INNER JOIN donor ON donor.id = donation.donor_id WHERE dentry.id = 492 ORDER BY donation.donation_date DESC";
$result = mysql_query($query) or die(mysql_error());
$row = mysql_fetch_array($result); 

?>

<?php get_header(); ?>
<style type="text/css">
.ib-content-preview{display:block !important;position: static !important;margin:0 !important;padding:0 !important;}
.allgift{margin:-15px 0 0 14px !important;}
</style>
<?php
$appId='631772250191311';
$linkUrl='http://ny3.dev';
$picUrl='http://ny3.dev/wp-content/themes/blankslate/images/newtiles/tiles/';
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

echo '<div class="ib-content-preview" id="ib-content-preview" rel="anmbg2">
<div class="ts-wrapper">
<div class="honor">'.$praisy.'</div>
<div style="" class="ib-teaser">
<h2>'.$myfname. ' '.$mylname. '<br /></h2>
</div>
<div class="categz">'.$category.'</div>
<div class="ts-dates">'.$mysqldate.'</div>
<div class="ts-city">'.$place.'</div>
<div class="socialz">
<div class="allgift">'.$gift.'</div>
<div class="iconz"><a href="https://www.facebook.com/dialog/feed?app_id='.$appId.'&link='.$linkUrl.'&picture='.$picUrl.$numero.'-'.$lettre.'.png&name='.$row['recipient_first_name'].' '.$row['recipient_last_name'].'&description=Check out my tile&redirect_uri='.$redirUrl.'" class="sharefb" target="_blank"></a><a href="https://twitter.com/share?text='.$row['recipient_first_name'].' '.$row['recipient_last_name'].'&amp;url='.$picUrl.$numero.'-'.$lettre.'.png" class="sharetwt" target="_blank"></a>
</div>
</div>     
<div style="display: block;" class="ib-content-full">
<p>_</p>
</div>
</div>'

?>
<div class="clr"></div>

<?php get_footer(); ?>
