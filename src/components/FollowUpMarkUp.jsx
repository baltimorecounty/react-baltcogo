
<div class="SEAFGroupVertical vertical">
	<div class="SEAFGroupVertical vertical">
		<div class="SEAFGroupVertical vertical">
			<div class="SEAFWrapper">
				<div class="seText" style="width:100%"><span>Fields marked with </span><span class="seRequiredMarker">*</span><span> are required.</span></div>
			</div>
			<div class="SEAFWrapper">
				<div class="SEAFGroupHorizontal horizontal">
					<div class="seLabelCell seLabelCellHorizontal">
						<div class="seText"><label for="TrackingNumber">Tracking Number<span class="seRequiredMarker">*</span></label></div>
					</div>
					<div class="seFieldCell seFieldCellHorizontal">
						<input id="TrackingNumber" name="TrackingNumber" class="seInput seRequiredElement" value="" type="text"></input>
					</div>
				</div>
			</div>
			<div class="SEAFWrapper">
				<input id="Submit" name="Submit" class="seButton " type="button" value="Track Now" style="float:left;"></input>
			</div>
		</div>
	</div>
</div>


<div class="alert-information" id="citizen-access-info" style="display: none">
    <p>The record you’re looking for is available in a different tracking system. Please visit 
        <a href="https://citizenaccess.baltimorecountymd.gov/CitizenAccess/">Baltimore County Online Services</a> and enter the tracking number again.</p>
    <p>We’re working to better integrate these systems in the future. Until then, we apologize for any inconvenience this may cause.</p>
</div>
<div>
    <strong>
        <div class="seform">
            <form>
                <div class="SEAFGroupVertical vertical">
                    <div class="SEAFGroupVertical vertical">
                        <div class="SEAFGroupVertical vertical">
                            <div class="SEAFWrapper">
                                <div class="seText" style="width: 100%;">
                                    <span>Fields marked with </span>
                                    <span class="seRequiredMarker">*</span>
                                    <span> are required.</span>
                                </div>
                                <div class="SEAFWrapper">
                                    <div class="SEAFGroupHorizontal horizontal">
                                        <div class="seLabelCell seLabelCellHorizontal">
                                            <div class="seText">
                                                <label for="TrackingNumber">Tracking Number
                                                    <span class="seRequiredMarker">*</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="seFieldCell seFieldCellHorizontal">
                                            <input class="seInput seRequiredElement" name="TrackingNumber" type="text" value=""></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="SEAFWrapper">
                                <button class="seButton" type="submit" style="float:left;">Track Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </strong>
</div>

<div class="alert-information" id="citizen-access-info" style="display: none">
    <p>The record you’re looking for is available in a different tracking system. Please visit 
        <a href="https://citizenaccess.baltimorecountymd.gov/CitizenAccess/">Baltimore County Online Services</a> and enter the tracking number again.</p>
    <p>We’re working to better integrate these systems in the future. Until then, we apologize for any inconvenience this may cause.</p>
</div>
<div><strong><div class="seform" id="FasTrack_div">
<form id="FasTrack" action="/iwant/followup.html" method="post" onsubmit="return _CF_checkFasTrack(this);" enctype="application/x-www-form-urlencoded" name="FasTrack">
<div class="SEAFGroupVertical vertical">
<div class="SEAFGroupVertical vertical">
<div class="SEAFGroupVertical vertical">
<div class="SEAFWrapper">
<div class="seText" style="width:100%"><span>Fields marked with </span><span class="seRequiredMarker">*</span><span> are required.</span></div>
</div>
<div class="SEAFWrapper">
<div class="SEAFGroupHorizontal horizontal">
<div class="seLabelCell seLabelCellHorizontal">
<div class="seText"><label for="TrackingNumber">Tracking Number<span class="seRequiredMarker">*</span></label></div>
</div>
<div class="seFieldCell seFieldCellHorizontal">
<input id="TrackingNumber" name="TrackingNumber" class="seInput seRequiredElement" value="" type="text">
</div>
</div>
</div>
<div class="SEAFWrapper">
<div class="SEAFGroupHorizontal horizontal">
<div class="seLabelCell seLabelCellHorizontal">
<div class="seText"><label for="EmailAddress">Email Address<span class="seRequiredMarker">*</span></label></div>
</div>
<div class="seFieldCell seFieldCellHorizontal">
<input id="EmailAddress" name="EmailAddress" class="seInput seRequiredElement" value="" type="text">
</div>
</div>
</div>
<div class="SEAFWrapper">
<input id="Submit" name="Submit" class="seButton " type="button" value="Track Now" style="float:left;">
</div>
</div>
</div>
</div>
<div class="seSpecial">
<input type="text" name="_seAFM_email" value="">
</div>
<input type="hidden" name="_FasTrack_seStepID" id="_FasTrack_seStepID" value="1">
<input type="hidden" name="_submissionID" id="_submissionID" value="405CF10B56E1F5A57E87C69A13253E34">
<input type="hidden" name="_seResultMail" id="_seResultMail" value="">
<input type="hidden" name="_seNotifyMail" id="_seNotifyMail" value="">
<input type="hidden" name="_SEAFM_Now" id="_SEAFM_Now" value="20160927091821">
</form>
</div></strong></div>

<div><div id="errorDiv">&nbsp;</div><div id="confirmationDiv">&nbsp;</div></div>


<script>
      var reportTemplate = "{{#each (limit Data 3)}}<p>{{Comment}}</p>{{/each}}";
      reportTemplate += "<div id=\"target\">{{#each (skip Data 3)}}<p>{{Comment}}</p>{{/each}}</div>";
      reportTemplate += "<button type=\"button\" data-a11y-toggle=\"target\">Show more...</button>";
      BcApiHelpers.display({
        url: 'https://testservices.baltimorecountymd.gov/platform.citysourced.net/servicerequests/' + $("#TrackingNumber").val();
       params: {
          petTYpe: 'dog',
          status: 'lost'
        },
        template: reportTemplate,
        targetId: 'app'
      }).then(function() {
        window.a11yToggle();
      });
</script>

alert($("#TrackingNumber").val());