
//HTML for alerts 

<div class="alert-information" id="citizen-access-info" style="display: none">
    <p>The record you&rsquo;re looking for is available in a different tracking system. Please visit <a data-linktype="EXTERNAL" data-newwindow="No" data-showtoolbar="No" externallink="https://citizenaccess.baltimorecountymd.gov/CitizenAccess/" href="https://citizenaccess.baltimorecountymd.gov/CitizenAccess/" id="RedirectURLParameter">Baltimore County Online Services</a> and enter the tracking number again.</p>
    <p>We&rsquo;re working to better integrate these systems in the future. Until then, we apologize for any inconvenience this may cause.</p>
</div>

//HTML SNIPPET For followup.html in SE

<div class="alert-information" id="citizen-access-info" style="display: none">
    <p>The record you’re looking for is available in a different tracking system. Please visit 
        <a id="RedirectURLParameter" href="https://citizenaccess.baltimorecountymd.gov/CitizenAccess/Cap/CapHome.aspx">Baltimore County Online Services</a>
        and enter the tracking number again.</p>
    <p>We’re working to better integrate these systems in the future. Until then, we apologize for any inconvenience this may cause.</p>
</div>
<div role="alert" class="alert-information bc_alert" id="UserBadIDPanel" style="display: none">
    <i class="fa fa-icon fa-2x fa-info-circle"></i>
    <p>We are having trouble looking up this record. Please call 410-887-2450 to verify your tracking number.</p>
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
                                            <input class="seInput seRequiredElement" id="TrackingNumber" name="TrackingNumber" type="text" value=""></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="SEAFWrapper">
                                <button class="seButton" type="button" style="float:left;" onclick="GetReport()" >Track Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </strong>
</div>
<div id="ReportResults">

</div>


//HTML SNIPPET For followup.html in SE for JS code
<script src="/sebin/p/y/CollapseHelper.min.js"></script>
<script src="/sebin/j/d/ApiHelpers.min.js"></script>

<script>
 function CheckID(){
        var animalVendorComplaint = RegExp(/^(ACCMP)/i);
 var standardVendorComplaint = RegExp(/^(CC|CRH|CS|PP|TS|CE|CP|CB|CG)\d+$/i);
      var standardComplaint = RegExp(/^\d+$/i);
        var AlertURL= '';

        var trackingNumber = document.getElementById('TrackingNumber').value;
        var UserInfoPanel =  document.getElementById("citizen-access-info");
        var UserInfoPanelBadID = document.getElementById("UserBadIDPanel");

        var RedirectURL = document.getElementById("RedirectURLParameter");

        UserInfoPanel.style.display = "none";
        UserInfoPanelBadID.style.display = "none";

        if(animalVendorComplaint.test(trackingNumber)){
            UserInfoPanel.style.display = "";
            AlertURL = 'https://citizenaccess.baltimorecountymd.gov/CitizenAccess/Cap/CapHome.aspx?&Module=Enforce';
            RedirectURL.setAttribute('href', AlertURL);
           
             }
        else if (standardVendorComplaint.test(trackingNumber)){
            UserInfoPanel.style.display = "";
            AlertURL='https://citizenaccess.baltimorecountymd.gov/CitizenAccess/Cap/CapHome.aspx?&Module=Enforcement';
            RedirectURL.setAttribute('href', AlertURL);
         }       
        else if (standardComplaint.test(trackingNumber)){
                 GetReport();    
          }
        else
              {
                 UserInfoPanelBadID.style.display = "";
        }
        
        function GetReport(){
    
            var reportTemplate = "{{#each (limit Data 3)}}<p>{{Comment}}</p>{{/each}}";
            reportTemplate += "<div id=\"target\">{{#each (skip Data 3)}}<p>{{Comment}}</p>{{/each}}</div>";
            reportTemplate += "<button type=\"button\" data-a11y-toggle=\"target\">Show more...</button>";
            BcApiHelpers.display({
              url: 'https://testservices.baltimorecountymd.gov/platform.citysourced.net/servicerequests/' + document.getElementById('TrackingNumber').value,
             params: {
              },
              template: reportTemplate,
              targetId: 'app'
            }).then(function() {
              window.a11yToggle();
            });
          }
    }
</script>