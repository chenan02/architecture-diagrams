/*== compactness.js ====================================================
Implements the initialization of compactness.xhtml.
Version    : $Id: compactness.js 2337 2012-09-20 15:14:54Z hartwig $
Application: Comfort and Climate
Platform   : JavaScript 5, DOM
Description: distributes app data into XHTML.
========================================================================
Created    : 08.08.2012, Hartwig Thomas, Enter AG, Zurich
Integrited : Dean Wang 
======================================================================*/

/*----------------------------------------------------------------------
Initializes input fields
----------------------------------------------------------------------*/
function setInputFields()
{
  var input = document.getElementsByName("compactness")[0];
  input.innerHTML = dCompactness.toFixed(2);
}; /* setInputFields */

/*----------------------------------------------------------------------
Initializes compactness.xhtml
 ---------------------------------------------------------------------*/
function onLoad()
{
  setMessage();
  setProjectFields();
  setInputFields();
  drawPerYear("peryear",1,6,1,null,null,0,adCompactness,adYearHeating,adYearCooling);
  /* draw the energy demand and the min/max temperature per month */
  drawPerMonth("permonth",adMonthHeating,adMonthCooling,
    dComfortMinimum,dComfortMaximum,adExternalTemperature,adInternalTemperature);
  /* in the end make body visible */
  var body = document.getElementsByTagName("body")[0];
  body.style.display="block";
}; /* onLoad */

/*----------------------------------------------------------------------
selects a compactness value
----------------------------------------------------------------------*/
function selectCompactness(button,dValue,index)
{
  var parent = button.parentNode;
  var ainput = parent.getElementsByTagName("label");
  for (i = 0; i < ainput.length; i++)
  {
    var input = ainput[i];
    var sType = input.getAttribute("type");
    if (sType == "text"){
      input.innerHTML = dValue.toFixed(2);
      //document.getElementById("permonth").innerHTML = "";    
      drawPerMonth("permonth",adMonthHeating,adMonthCooling,
    		    dComfortMinimum,dComfortMaximum,adExternalTemperatures[index],adInternalTemperatures[index]);
      adYearHeating[0] = adYearHeating[index];
      adYearCooling[0] = adYearCooling[index];
      drawPerYear("peryear",1,6,1,null,null,0,adCompactness,adYearHeating,adYearCooling);
    }
  }
}; /* select */