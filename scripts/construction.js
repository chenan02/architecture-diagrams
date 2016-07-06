/*== construction.js ===================================================
Implements the initialization of construction.xhtml.
Version    : $Id: construction.js 2337 2012-09-20 15:14:54Z hartwig $
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
{
  var input = document.getElementsByName("tsDensity")[0];
  input.innerHTML = dTsDensity;
  var input = document.getElementsByName("tsC")[0];
  input.innerHTML = dTsC;
  var input = document.getElementsByName("tsThickness")[0];
  input.innerHTML = dTsThickness;
  var input = document.getElementsByName("tsK")[0];
  input.innerHTML = dTsK;
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
Initializes construction.xhtml
 ---------------------------------------------------------------------*/
function onLoad()
{
	 drawPerYear("peryear",1,4,1,null,null,0,adCompactness,adYearHeating,adYearCooling);
		drawPerMonth("permonth",adMonthHeating,adMonthCooling,
			    dComfortMinimum,dComfortMaximum,adExternalTemperature,adInternalTemperature);
  setMessage();
  setProjectFields();
  setInputFields();
  /* draw the energy demand and the min/max temperature per month */
//  drawPerMonth("permonth",adMonthHeating,adMonthCooling,
//    dComfortMinimum,dComfortMaximum,adExternalTemperature,adInternalTemperature);
  /* in the end make body visible */
  var body = document.getElementsByTagName("body")[0];
  body.style.display="block";
  var select = document.getElementsByName("tsDensity")[0];
  select.focus();
}; /* onLoad */

/*----------------------------------------------------------------------
selects a construction value
----------------------------------------------------------------------*/
function selectConstruction(button,index)
{
  var parent = button.parentNode;
  var aInput = parent.getElementsByTagName("label")[0];
  var input = document.getElementsByName("tsDensity1")[0];
  aInput.innerHTML = aTsDensity[index];
  input.value = aTsDensity[index];
  var aInput = parent.getElementsByTagName("label")[1];
  var input = document.getElementsByName("tsC1")[0];
  aInput.innerHTML = aTsC[index];
  input.value = aTsC[index];
  var aInput = parent.getElementsByTagName("label")[2];
  var input = document.getElementsByName("tsThickness1")[0];
  aInput.innerHTML = aTsThickness[index];
  input.value = aTsThickness[index];
  var aInput = parent.getElementsByTagName("label")[3];
  var input = document.getElementsByName("tsK1")[0];
  aInput.innerHTML = aTsK[index];
  input.value = aTsK[index];

  var form = parent.getElementsByTagName("form")[0];
  var ainput = form.getElementsByTagName("input");
  var inputSubmit = null;
  for (i = 0; i < ainput.length; i++)
  {
    var input = ainput[i];
    var sType = input.getAttribute("type");
    if (sType == "text")
      input.value = dValue.toFixed(2);
    else if (sType == "submit")
      inputSubmit = input;
  }
  inputSubmit.click();
  
}; /* select */