/*== walls.js ==========================================================
Implements the initialization of walls.xhtml.
Version    : $Id: walls.js 2337 2015-11-18 15:34:03Z DEAN AND MIN $
Application: Comfort and Climate
Platform   : JavaScript 5, DOM
Description: distributes app data into XHTML.
========================================================================
Created    : 23.07.2012, DEAN WONG, MKIM, Enter AG, Zurich
Copyright  : 2015, Baumschlager Eberle, Vaduz, Liechtenstein
Created & Integrited  : Dean Wang and MIN
======================================================================*/

/*----------------------------------------------------------------------
Initializes input fields
----------------------------------------------------------------------*/
function setInputFields()
{
  var input = document.getElementsByName("wallsu")[0];
  input.value = dWallsU.toFixed(2);
}; /* setInputFields */

/*----------------------------------------------------------------------
Initializes walls.xhtml
 ---------------------------------------------------------------------*/
function onLoad()
{
  setMessage();
  setProjectFields();
  setInputFields();
  /* draw the energy demand per year for one or more values
    dMinX: 0,
    dMaxX: 1
    dLabelDx: 0.1
    asYearLabel: null
    adYearLabel: null
    dSelected: dWallsU
    adYearX: adWallsU
    adYearHeating: adYearHeating 
    adYearCooling: adYearCooling
  */
  drawPerYear("peryear",1,6,1,null,null,dWallsU,adWallsU,adYearHeating,adYearCooling);
  /* draw the energy demand and the min/max temperature per month */
  drawPerMonth("permonth",adMonthHeating,adMonthCooling,
    dComfortMinimum,dComfortMaximum,adExternalTemperature,adInternalTemperature);
  /* in the end make body visible */
  var body = document.getElementsByTagName("body")[0];
  body.style.display="block";
  var select = document.getElementsByName("wallsu")[0];
  select.focus();
}; /* onLoad */

/*----------------------------------------------------------------------
validate returns true, if the field values are acceptable. 
 ---------------------------------------------------------------------*/
function  validate()
{
  var bValid = false;
  var dWallsU = positiveNumber("wallsu",MESSAGES.insulation_numeric,MESSAGES.insulation_positive);
  if (dWallsU != null)
    bValid = true;
  return bValid;
}; /* validate */
