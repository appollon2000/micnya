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
$mylname=(strlen($row['recipient_last_name']) > 22) ? substr($row['recipient_last_name'],0,20).'...' : $row['recipient_last_name'];
$donorInfo = substr($row['donor_first_name'], 0, 1). ' '. substr($row['donor_last_name'], 0, 1);
 
$cleanRel=str_replace(' ', '',strtolower($myfname.$mylname));
$klfn = substr($row['recipient_first_name'], 0, 1).'.';
$klln = substr($row['recipient_last_name'], 0, 1).'.';
$anonm=str_replace(' ', '',$klfn.$klln);
}
$cleanMsg =(strlen($row['message']) > 88) ? substr($row['message'],0,85).'...' : $row['message'];
$phpdate = strtotime($row['donation_date']);
$mysqldate = date("m/d/y", $phpdate);
$place =(strlen($row['donor_location']) > 18) ? substr($row['donor_location'],0,15).'...' : $row['donor_location'];

if($row['is_gift']==1) {
$gift = '<div class="allgift">From:<br /> '.$donorInfo.'</div>';
}else {
$gift = '';
}

  if($i%36 == 0) {
    echo $i > 0 ? "</div>" : ""; // close div if it's not the first
    echo "<div class='threesixth'>";
  }

echo '<div class="tyle ib-content '.$category.$numero.'" rel="'.$cleanRel.'"  id="goto'.$k.'"><img class="load-delay" data-original="/wp-content/themes/spectrum-parallax-blog/images/tiles/'.$numero.'-'.$lettre.'.png" src="" data-largesrc="" alt=""/><div class="honor">In honor of</div><div class="ib-teaser"><h2>'.$myfname. ' '.
$mylname. '<br /></h2></div><div class="categz">transformer</div><div class="ts-dates">'.$mysqldate.'</div><div class="ts-city">'.$place.'</div><div class="socialz">'.$gift.'<div class="iconz"><a class="sharefb" href="https://www.facebook.com/dialog/feed?app_id='.$appId.'&amp;link='.$linkUrl.'&amp;picture='.$picUrl.$numero.'-'.$lettre.'.png&name='.$row['recipient_first_name'].' '.$row['recipient_last_name'].'&amp;description=Check out my tile&amp;redirect_uri='.$redirUrl.'"></a>
<a class="sharetwt" href="https://twitter.com/share?text='.$row['recipient_first_name'].' '.$row['recipient_last_name'].'&amp;url='.$picUrl.$numero.'-'.$lettre.'.png"></a></div>
</div><div class="ib-content-full">
<p>'.$cleanMsg.'</p></div>
<div class="popupbg">anmbg'.$numero.'</div>
</div>';
$i++;
}
?>
</div>
<div class="clr"></div>
</div><!-- ib-main -->
</div><!-- ib-main-wrapper -->
</div><!-- mast -->

<div class="clr"></div>
<div style="margin-top:50px">
    <div id="countem">
        <span>Donated $<?php echo number_format($qty); ?></span>
    </div>
    <div id="defaultCountdown"></div>
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

<div class="clr"></div>

<div id="donateHolder">

<div id="cnvDonationForm">
    <div id="cnvDonationForm-description">
        <div id="cnvDonationForm-errors"></div>
    </div>
    <table id="CCcheckboxesContainer">
        <tr><td>Am. Express</td><td>Discover</td><td>MasterCard</td><td>Visa</td></tr>
    </table>
    <div id="cnvDonationForm-formContainer">
        <form id="cnvDonationForm-form" method="post">
            <input type="hidden" name="method" value="donate" />
            <input type="hidden" name="v" value="1.0" />
            <input type="hidden" name="api_key" value="zooapikey" />
            <input type="hidden" name="source" value="NYA Microsite Donation Form" />
            <input type="hidden" name="form_id" value="5640" />
            <input type="hidden" name="level_id" value="8462" />
            <input type="hidden" name="donor_email_opt_inname" value="implicit" />
            <input type="hidden" name="donor_email_opt_insubmit" value="true" />
            <input type="hidden" id="amount" name="other_amount" />
            <input type="hidden" id="donor_email" name="donor.email" />
            <div id="info-top">
                <fieldset id="donationInfo">
                    <div class="label-field-wrap">
                        <label class="label" for="card_number">Credit Card Number:</label>
                        <div class="input1">
                            <input autocomplete="off" type="number" maxlength="19" id="card_number" class='convi' name="card_number" onkeypress="return App.Helpers.numbersOnly(event,true);" />
                        </div>
                    </div>
                    <div class="label-field-wrap">
                        <label class="label" for="card_cvv">CVV Number:</label>
                        <div class="input1">
                            <input autocomplete="off" type="number" maxlength="4" id="card_cvv" class='convi' name="card_cvv" onkeypress="return App.Helpers.numbersOnly(event,true);" />
                        </div>
                    </div>
                    <div class="label-field-wrap" id="convi-date">
                        <label class="label" for="card_exp_date_month">Expiration Date:</label>
                        <div class="dropdown-wrap">
                            <select id="card_exp_date_month" class='convi-dd' name="card_exp_date_month">
                                <option></option>
                                <option value="1">01</option>
                                <option value="2">02</option>
                                <option value="3">03</option>
                                <option value="4">04</option>
                                <option value="5">05</option>
                                <option value="6">06</option>
                                <option value="7">07</option>
                                <option value="8">08</option>
                                <option value="9">09</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                        </div>
                        <div class="dropdown-wrap">

                            <select id="card_exp_date_year" class='convi-dd' name="card_exp_date_year">
                                <option></option>
                                <option value="2013">2014</option>
                                <option value="2014">2015</option>
                                <option value="2015">2016</option>
                                <option value="2016">2017</option>
                                <option value="2017">2018</option>
                                <option value="2018">2019</option>
                                <option value="2020">2019</option>
                            </select>

                        </div>
                    </div>
                    <div id="donationInfo-verisign">
                    </div>
                </fieldset>
            </div>
            <div id="info-bottom">
                <fieldset id="yourInfo">

                    <div class="label-field-wrap">
                        <label class="label" for="billing_name_first">First Name:</label>
                        <div class="input1">
                            <input maxlength="50" id="billing_name_first" class='convi' name="billing.name.first" value="" />
                        </div>
                    </div>
                    <div class="label-field-wrap">
                        <label class="label" for="billing_name_last">Last Name:</label>
                        <div class="input1">
                            <input maxlength="50" id="billing_name_last" class='convi' name="billing.name.last" value="" />
                        </div>
                    </div>
                    <div class="label-field-wrap">
                        <label class="label" for="billing_address_street1">Address:</label>
                        <div class="input1">
                            <input maxlength="50" id="billing_address_street1" class='convi' name="billing.address.street1" value="" />
                        </div>
                    </div>
                    <div class="label-field-wrap">
                        <label class="label" for="billing_address_street2">Address 2 (optional):</label>
                        <div class="input1">
                            <input maxlength="50" id="billing_address_street2" name="billing.address.street2" value="" />
                        </div>
                    </div>
                    <div class="label-field-wrap">
                        <label class="label" for="billing_address_city">City:</label>
                        <div class="input1">
                            <input maxlength="30" id="billing_address_city" class='convi' name="billing.address.city" value="" />
                        </div>
                    </div>
                    <div class="label-field-wrap">
                        <label class="label" for="billing_address_state">State / Province:</label>
                        <div class="dropdown-wrap">
                            <select id="billing_address_state" class='convi-dd' name="billing.address.state">
                                <option></option>
                                <option value="AK">AK - Alaska</option>
                                <option value="AL">AL - Alabama</option>
                                <option value="AR">AR - Arkansas</option>
                                <option value="AZ">AZ - Arizona</option>
                                <option value="CA">CA - California</option>
                                <option value="CO">CO - Colorado</option>
                                <option value="CT">CT - Connecticut</option>
                                <option value="DC">DC - District of Columbia</option>
                                <option value="DE">DE - Delaware</option>
                                <option value="FL">FL - Florida</option>
                                <option value="GA">GA - Georgia</option>
                                <option value="HI">HI - Hawaii</option>
                                <option value="IA">IA - Iowa</option>
                                <option value="ID">ID - Idaho</option>
                                <option value="IL">IL - Illinois</option>
                                <option value="IN">IN - Indiana</option>
                                <option value="KS">KS - Kansas</option>
                                <option value="KY">KY - Kentucky</option>
                                <option value="LA">LA - Louisiana</option>
                                <option value="MA">MA - Massachusetts</option>
                                <option value="MD">MD - Maryland</option>
                                <option value="ME">ME - Maine</option>
                                <option value="MI">MI - Michigan</option>
                                <option value="MN">MN - Minnesota</option>
                                <option value="MO">MO - Missouri</option>
                                <option value="MS">MS - Mississippi</option>
                                <option value="MT">MT - Montana</option>
                                <option value="NC">NC - North Carolina</option>
                                <option value="ND">ND - North Dakota</option>
                                <option value="NE">NE - Nebraska</option>
                                <option value="NH">NH - New Hampshire</option>  go h
                                <option value="NJ">NJ - New Jersey</option>
                                <option value="NM">NM - New Mexico</option>
                                <option value="NY">NY - New York</option>
                                <option value="NV">NV - Nevada</option>
                                <option value="OH">OH - Ohio</option>
                                <option value="OK">OK - Oklahoma</option>
                                <option value="OR">OR - Oregon</option>
                                <option value="PA">PA - Pennsylvania</option>
                                <option value="RI">RI - Rhode Island</option>
                                <option value="SC">SC - South Carolina</option>
                                <option value="SD">SD - South Dakota</option>
                                <option value="TN">TN - Tennessee</option>
                                <option value="TX">TX - Texas</option>
                                <option value="UT">UT - Utah</option>
                                <option value="VA">VA - Virginia</option>
                                <option value="VT">VT - Vermont</option>
                                <option value="WA">WA - Washington</option>
                                <option value="WI">WI - Wisconsin</option>
                                <option value="WV">WV - West Virginia</option>
                                <option value="WY">WY - Wyoming</option>
                                <option value="AS">AS - American Samoa</option>
                                <option value="FM">FM - Federated States of Micronesia</option>
                                <option value="GU">GU - Guam</option>
                                <option value="MH">MH - Marshall Islands</option>
                                <option value="MP">MP - Northern Mariana Islands</option>
                                <option value="PR">PR - Puerto Rico</option>
                                <option value="PW">PW - Palau</option>
                                <option value="VI">VI - Virgin Islands</option>
                                <option value="AA">AA - Armed Forces Americas</option>
                                <option value="AE">AE - Armed Forces</option>
                                <option value="AP">AP - Armed Forces Pacific</option>
                                <option value="AB">AB - Alberta</option>
                                <option value="BC">BC - British Columbia</option>
                                <option value="MB">MB - Manitoba</option>
                                <option value="NB">NB - New Brunswick</option>
                                <option value="NL">NL - Newfoundland and Labrador</option>
                                <option value="NS">NS - Nova Scotia</option>
                                <option value="NT">NT - Northwest Territories</option>
                                <option value="NU">NU - Nunavut</option>
                                <option value="ON">ON - Ontario</option>
                                <option value="PE">PE - Prince Edward Island</option>
                                <option value="QC">QC - Quebec</option>
                                <option value="SK">SK - Saskatchewan</option>
                                <option value="YT">YT - Yukon</option>
                                <option value="None">None</option>
                            </select>
                        </div>
                    </div>
                    <div class="label-field-wrap">
                        <label class="label" for="billing_address_zip">ZIP / Postal Code:</label>
                        <div class="input1">
                            <input id="billing_address_zip" maxlength="10" class='convi' name="billing.address.zip" value="" />
                        </div>
                    </div>


                </fieldset>
            </div>

            <div id="submit-wrap">
                <input type="submit" value="Submit Donation" id="subCvio" />
            </div>
        </form>
    </div>
    <div id="cnvDonationForm-success"></div>
</div>

<div class="clr"></div>

<div id="mix3">
    <form id="signupForm" action="" method="POST">
    <div class="padex" id="recip00ColorText">Personalize your gift with a message</div>
    <div id="recip00Message" class="textarea">
        <textarea maxlength="300" name="msg0" placeholder="(maximum 300 characters)"></textarea>
    </div>
<div class="clr"></div>
     <div class="colLeft">
        <div class="padex" id="recip00ColorText">Select your animal</div>
        <div class="animalIconBar">
            <div id="rec0Icon" class="colLeft animals">
              <ul>
              <li><a class="animalIcon01 lrner" href="#" rel="1" data="recicon0"></a></li>
              <li><a class="animalIcon02" href="#" rel="2" data="recicon0"></a></li>
              <li><a class="animalIcon03" href="#" rel="3" data="recicon0"></a></li>
              <li><a class="animalIcon04" href="#" rel="4" data="recicon0"></a></li>
              <li><a class="animalIcon05" href="#" rel="5" data="recicon0"></a></li>
              <li><a class="animalIcon06" href="#" rel="6" data="recicon0"></a></li>
              <li><a class="animalIcon07" href="#" rel="7" data="recicon0"></a></li>
              <li><a class="animalIcon08" href="#" rel="8" data="recicon0"></a></li>
              <li><a class="animalIcon09" href="#" rel="9" data="recicon0"></a></li>
              <li><a class="animalIcon10" href="#" rel="10" data="recicon0"></a></li>
              <li><a class="animalIcon11" href="#" rel="11" data="recicon0"></a></li>
              <li><a class="animalIcon12" href="#" rel="12" data="recicon0"></a></li>
              <li><a class="animalIcon13" href="#" rel="13" data="recicon0"></a></li>
              <li><a class="animalIcon14" href="#" rel="14" data="recicon0"></a></li>
              <li><a class="animalIcon15" href="#" rel="15" data="recicon0"></a></li>
              </ul>
            </div>
        </div>
     </div>

<div class="colLeft couleur">
    <div class="padex" id="recip00ColorText">Choose a color</div>
    <div id="donorColour00" class="colLeft colourBar">
        <ul>
            <li><a class="colourDiv colour01 crner" href="#" rel="E81F83" data="color0"></a></li>
            <li><a class="colourDiv colour02" href="#" rel="E87058" data="color0"></a></li>
            <li><a class="colourDiv colour03" href="#" rel="E8C037" data="color0"></a></li>
            <li><a class="colourDiv colour04" href="#" rel="74B26B" data="color0"></a></li>
            <li><a class="colourDiv colour05" href="#" rel="00A49E" data="color0"></a></li>
            <li><a class="colourDiv colour06" href="#" rel="177A8F" data="color0"></a></li>
            <li><a class="colourDiv colour07 last" href="#" rel="2E4F80" data="color0"></a></li>
        </ul>
    </div>
    <div class="clr"></div>
    <div class="clear padex">
        <div id="tilePreview">
          <a href="#" data-rec="recicon0" data-col="color0" data-first="firstname" data-last="lastname" rel="prettyPhoto" data-amv="amvary">Preview your tile</a>
        </div>
    </div>
</div>
<div class="clr"></div>
<input type="hidden" id="recicon0" name="recicon0" value="1" />
<input type="hidden" id="color0" name="color0" value="E81F83" />
<input type="hidden" id="iscatg" name="iscatg" value="0" />
</form>
    <div id="WrpopupPrev-box">
    <div id="prevClose"><a href="#"></a></div>
     <div id="WrpopupPrev" rel="anmbg1">
        <div id="popupPrev">
            <div class="prevHonor">In honor of</div>
            <div class="prevName"><h2>Brad Peske<br></h2></div>  
            <div class="prevCategz">transformer</div>    
            <div class="prevDates">11/30/13</div>   
            <div class="prevCity">Rockville Centr...</div>    
            <div class="prevSocialz">
                <div class="prevAllgift">From:<br> Tracy Mojica</div>
                <div class="prevIconz">
                    <a href="#" class="sharefb"></a>
                    <a href="#" class="sharetwt"></a>
                </div>
            </div>     
            <div class="popupbg">anmbg11</div>   
            <div class="prevContent">
                <p>Brad,
                Just keep swimming and always follow your dreams.  
                Love, 
                Mom</p>
            </div>    
        </div><!-- end popupPrev -->
    </div><!-- end WrpopupPrev -->
</div><!-- end WrpopupPrev-box -->

</div><!-- end mix3 -->


</div><!-- end donateHolder -->




<?php get_footer(); ?>
