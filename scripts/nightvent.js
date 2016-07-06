/*== nightvent.js ========================================================
Implements the initialization of nightvent.xhtml.
Version    : $Id: nightvent.js 2337 2012-09-20 15:14:54Z hartwig $
Application: Comfort and Climate
Platform   : JavaScript 5, DOM
Description: distributes app data into XHTML.
========================================================================
Created & Integrited  : Dean Wang
======================================================================*/

/*----------------------------------------------------------------------
Initializes input fields
----------------------------------------------------------------------*/
function setInputFields()
{	drawPerYear("peryear",1,3,1,null,null,0,adCompactness,adYearHeating,adYearCooling);
	drawPerMonth("permonth",adMonthHeating,adMonthCooling,
    dComfortMinimum,dComfortMaximum,adExternalTemperature,adInternalTemperature);
  var input = document.getElementsByName("nightvent")[0];
  input.value = dNightvent.toFixed(0);
  /* set ranks, adRanks should be the same length as button numbers */
  var aButtons = document.getElementsByTagName("button");
  for (i = 0; i < aButtons.length; i++)
  {
    if(adRanks[i]==1){
    	document.getElementsByTagName("button")[i].className = "green tile";
    }else if(adRanks[i]==2){
    	document.getElementsByTagName("button")[i].className = "yellow tile";
    }else if(adRanks[i]==3){
    	document.getElementsByTagName("button")[i].className = "red tile";
    }
  }
}; /* setInputFields */

/*----------------------------------------------------------------------
Initializes infiltration.xhtml
 ---------------------------------------------------------------------*/
function onLoad()
{
  setMessage();
  setProjectFields();
  setInputFields();
  drawPerMonth("permonth",adMonthHeating,adMonthCooling,
    dComfortMinimum,dComfortMaximum,adExternalTemperature,adInternalTemperature);
  var body = document.getElementsByTagName("body")[0];
  body.style.display="block";
  var select = document.getElementsByName("nightvent")[0];
  select.focus();
}; /* onLoad */

/*----------------------------------------------------------------------
validate returns true, if the field values are acceptable. 
 ---------------------------------------------------------------------*/
function validate()
{
	 var bValid = false;
	 var input = positiveNumber("nightvent",MESSAGES.nightvent_numeric,MESSAGES.nightvent_positive);
	 if (input != null)
	 {
	    bValid = true;
	 }
	 return bValid;
}; /* validate */

function selectNV(button, dValue){
	  var parent = button.parentNode;
	  var form = parent.getElementsByTagName("form")[0];
	  var option0 = parent.getElementsByTagName("option")[0];
	  var option1 = parent.getElementsByTagName("option")[1];
	  var option2 = parent.getElementsByTagName("option")[2];
	  if(dValue == 0){
		  option0.selected  = true;
		  option1.selected  = false;
		  option2.selected  = false;
	  }else if(dValue == 1){
		  option0.selected  = false;
		  option1.selected  = true;
		  option2.selected  = false;
	  }else if(dValue == 1){
		  option0.selected  = false;
		  option1.selected  = false;
		  option2.selected  = true;
	  }
	  var ainput = form.getElementsByTagName("input");
	  var inputSubmit = null;
	  for (i = 0; i < ainput.length; i++)
	  {
	    var input = ainput[i];
	    var sType = input.getAttribute("type");
	    if (sType == "submit")
	      inputSubmit = input;
	  }
	  inputSubmit.click();
}