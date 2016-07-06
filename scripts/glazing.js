/*== glazing.js ===================================================
Implements the initialization of construction.xhtml.
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
  var input = document.getElementsByName("windowUValue")[0];
  input.value = dWindowUValue;
  var input = document.getElementsByName("windowShgc")[0];
  input.value = dWindowShgc;
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
Initializes glazing.xhtml
 ---------------------------------------------------------------------*/
function onLoad()
{
drawPerYear("peryear",1,8,1,null,null,0,adCompactness,adYearHeating,adYearCooling);
drawPerMonth("permonth",adMonthHeating,adMonthCooling,
dComfortMinimum,dComfortMaximum,adExternalTemperature,adInternalTemperature);
  setMessage();
  setProjectFields();
  setInputFields();
  /* draw the energy demand and the min/max temperature per month */

  /* in the end make body visible */
  var body = document.getElementsByTagName("body")[0];
  body.style.display="block";
  var select = document.getElementsByName("windowUValue")[0];
  select.focus();
}; /* onLoad */

/*----------------------------------------------------------------------
selects a glazing value
----------------------------------------------------------------------*/
function selectGlazing(button,index)
{
  var parent = button.parentNode;
  var input = document.getElementsByName("windowUValue")[0];
  input.value = aWindowUValue[index];
  var input = document.getElementsByName("windowShgc")[0];
  input.value = aWindowShgc[index];
  var form = document.getElementsByTagName("form")[0];
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
  
}; /* select */

function validate()
{
  var bValid = false;
  input = nonnegativeNumber("windowUValue",MESSAGES.windowuvalue_numeric,MESSAGES.windowuvalue_non_negative);
  if(input != null){
	  input = numericInput("windowShgc",MESSAGES.windowshgc_bound);
	  var dWindowShgc = Number(input.value);
	  if ((dWindowShgc > 0) && (dWindowShgc < 1)){
		  bValid = true;
	  }else{
		  alert(MESSAGES.windowshgc_bound);
          input.focus();
	  }
  }
}