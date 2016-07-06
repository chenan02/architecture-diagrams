/*== windowsleft.js ====================================================
Implements the initialization of windowsleft.xhtml.
Version    : $Id: windowsleft.js 2337 2012-09-20 15:14:54Z hartwig $
Application: Comfort and Climate
Platform   : JavaScript 5, DOM
Description: distributes app data into XHTML.
========================================================================
Created    : 25.07.2012, Hartwig Thomas, Enter AG, Zurich
Copyright  : 2012, Baumschlager Eberle, Vaduz, Liechtenstein
======================================================================*/

/*----------------------------------------------------------------------
Initializes input fields
----------------------------------------------------------------------*/
function setInputFields()
{
  var input = document.getElementsByName("windowsleft")[0];
  input.value = dWindowsLeft.toFixed(0);
}; /* setInputFields */

/*----------------------------------------------------------------------
Initializes windowsleft.xhtml
 ---------------------------------------------------------------------*/
function onLoad()
{
  setMessage();
  setProjectFields();
  setInputFields();
  /* draw the energy demand per year for one or more values
    dMinX: 0,
    dMaxX: 100
    dLabelDx: 20
    asYearLabel: null
    adYearLabel: null
    dSelected: dWindowsLeft
    adYearX: adWindowLeft
    adYearHeating: adYearHeating 
    adYearCooling: adYearCooling
  */
  drawPerYear("peryear",1,7,1,null,null,dWindowsLeft,adWindowsLeft,adYearHeating,adYearCooling);
  /* draw the energy demand and the min/max temperature per month */
  drawPerMonth("permonth",adMonthHeating,adMonthCooling,
    dComfortMinimum,dComfortMaximum,adExternalTemperature,adInternalTemperature);
  /* in the end make body visible */
  var body = document.getElementsByTagName("body")[0];
  body.style.display="block";
  var select = document.getElementsByName("windowsleft")[0];
  select.focus();
}; /* onLoad */

/*----------------------------------------------------------------------
validate returns true, if the field values are acceptable. 
 ---------------------------------------------------------------------*/
function  validate()
{
  var bValid = false;
  var dPercentage = percentNumber("windowsleft",MESSAGES.percentage_numeric,MESSAGES.percentage_bounds);
  if (dPercentage != null)
    bValid = true;
  return bValid;
}; /* validate */
