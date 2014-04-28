<?php /*
Template Name: Backend
*/

session_start();

$query = "SELECT * FROM dentry INNER JOIN donation ON donation.id = dentry.donation_id INNER JOIN donor ON donor.id = donation.donor_id ORDER BY donation.donation_date DESC";
$query2 = "SELECT * FROM donation"; 
$query3 = "SELECT * FROM dentry INNER JOIN donation ON donation.id = dentry.donation_id INNER JOIN donor ON donor.id = donation.donor_id ORDER BY donation.donation_date DESC LIMIT 15";
$result = mysql_query($query) or die(mysql_error());
$result2 = mysql_query($query2) or die(mysql_error());
$result3 = mysql_query($query3) or die(mysql_error());
$sum = $result2['value_sum'];

$qty= 0;
while ($num = mysql_fetch_assoc ($result2)) {
    $qty += $num['amount'];
}

?>

<?php get_header("michael"); ?>
<div id="mast" class="appear">
	<div id="tile-donate-btn"><a href="#">DONATE NOW</a></div>
	<div id="ib-main-wrapper" class="ib-main-wrapper">
		<div class="ib-main">
<?php
$appId='631772250191311';
$linkUrl='http://ny3.dev';
$picUrl='http://ny3.dev/wp-content/themes/blankslate/images/newtiles/tiles/';
$redirUrl='https://www.facebook.com/';

$i = 0;
$k = -1;
while($row = mysql_fetch_array($result)){
$k++;
$clf = strtolower(trim($row['donor_first_name']));
$cll = strtolower(trim($row['donor_last_name']));
$numero = strtolower(trim($row['icon']));
$lettre = strtolower(trim($row['color']));
$sumcat = $row['category'];
if ($sumcat == 0) {
  $category = 'friend';
} else if($sumcat == 1) {
  $category = 'supporter';
} else {
  $category = 'transformer';
}
$amity = $row['amount'];
if($amity > 24 && $amity < 99) {
  $prem="Bronze";
} else if($amity > 99 && $amity < 249) {
  $prem="Silver";
}
else if($amity > 249) {
  $prem="Gold";
}
if($row['is_donor_name_display']=='0'){
$myfname=$row['recipient_first_name'];
$mylname= (strlen($row['recipient_last_name']) > 20) ? substr($row['recipient_last_name'],0,18).'...' : $row['recipient_last_name'];
$donorInfo= $row['donor_first_name']. ' '. $row['donor_last_name'];
$cleanRel=str_replace(' ', '',strtolower($myfname.$mylname));
$anonm=$myfname.' ' .$mylname;
}else {
$myfname=$row['recipient_first_name'];
$mylname=(strlen($row['recipient_last_name']) > 20) ? substr($row['recipient_last_name'],0,18).'...' : $row['recipient_last_name'];
$donorInfo = substr($row['donor_first_name'], 0, 1). ' '. substr($row['donor_last_name'], 0, 1);
 
$cleanRel=str_replace(' ', '',strtolower($myfname.$mylname));
$klfn = substr($row['recipient_first_name'], 0, 1).'.';
$klln = substr($row['recipient_last_name'], 0, 1).'.';
$anonm=str_replace(' ', '',$klfn.$klln);
}
$cleanMsg =(strlen($row['message']) > 88) ? substr($row['message'],0,85).'...' : $row['message'];
$phpdate = strtotime($row['donation_date']);
$mysqldate = date("m/d/y", $phpdate);
$place = $row['donor_location'];

if($row['is_gift']==1) {
$gift = '<div class="allgift">From:<br /> '.$donorInfo.'</div>';
}else {
$gift = '';
}

echo '<div class="tyle ib-content '.$category.$numero.'" rel="'.$cleanRel.'"  id="goto'.$k.'"><img class="load-delay" data-original="/wp-content/themes/spectrum-parallax-blog/images/tiles/'.$numero.'-'.$lettre.'.png" src="" data-largesrc="" alt=""/><div class="honor">In honor of</div><div class="ib-teaser"><h2>'.$myfname. ' '.
$mylname. '<br /></h2></div><div class="categz">transformer</div><div class="ts-dates">'.$mysqldate.'</div><div class="ts-city">'.$place.'</div><div class="socialz">'.$gift.'<div class="iconz"><a class="sharefb" href="https://www.facebook.com/dialog/feed?app_id='.$appId.'&amp;link='.$linkUrl.'&amp;picture='.$picUrl.$numero.'-'.$lettre.'.png&name='.$row['recipient_first_name'].' '.$row['recipient_last_name'].'&amp;description=Check out my tile&amp;redirect_uri='.$redirUrl.'"></a>
<a class="sharetwt" href="https://twitter.com/share?text='.$row['recipient_first_name'].' '.$row['recipient_last_name'].'&amp;url='.$picUrl.$numero.'-'.$lettre.'.png"></a></div>
</div><div class="ib-content-full">
<p>'.$cleanMsg.'</p></div>
<div class="popupbg">anmbg'.$numero.'</div>
</div>';
}
?>

<div class="clr"></div>
</div><!-- ib-main -->
</div><!-- ib-main-wrapper -->
</div><!-- mast -->

<div class="clr"></div>
<div style="margin-top:50px">
	<div id="dosearch">
		<form id="searchus">
			<input type="text" placeholder="TYPE IN NAME" id="searchTerm" name="searchTerm" maxlength="20">
			<div id="searchGo" class="brownGradRight">
		  	<div id="searchArrow" class="arrowCentered">&#916;</div>
			</div>
		</form>
	</div>

	<div id="results"></div>
</div>




<?php get_footer(); ?>
