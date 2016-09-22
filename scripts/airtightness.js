/*== airtightness.js ===================================================
Implements the initialization of airtightness.xhtml.
Version    : $Id: airtightness.js 2337 2015-11-18 15:34:03Z DEAN AND MIN $
Application: Comfort and Climate
Platform   : JavaScript 5, DOM
Description: distributes app data into XHTML.
========================================================================
Created    : 23.07.2012, DEAN WONG, MKIM, Enter AG, Zurich
Copyright  : 2015, Baumschlager Eberle, Vaduz, Liechtenstein
======================================================================*/

/*----------------------------------------------------------------------
Initializes input fields
----------------------------------------------------------------------*/
function setInputFields()
{
  var input = document.getElementsByName("airchangerate")[0];
  input.value = dAirChangeRate.toFixed(2);
}; /* setInputFields */

/*----------------------------------------------------------------------
Initializes airtightness.xhtml
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
    dSelected: dAirChangeRate
    adYearX: adAirChangeRate
    adYearHeating: adYearHeating 
    adYearCooling: adYearCooling
  */
  drawPerYear("peryear",1,5,1,null,null,dAirChangeRate,adAirChangeRate,adYearHeating,adYearCooling);
//drawPerYear("peryear",[0.1,0.15,0.2,0.3,0.6], null,null,dAirChangeRate,adAirChangeRate,adYearHeating,adYearCooling);
  /* draw the energy demand and the min/max temperature per month */
  drawPerMonth("permonth",adMonthHeating,adMonthCooling,
    dComfortMinimum,dComfortMaximum,adExternalTemperature,adInternalTemperature);
  /* in the end make body visible */
  var body = document.getElementsByTagName("body")[0];
  body.style.display="block";
  var select = document.getElementsByName("airchangerate")[0];
  select.focus();
}; /* onLoad */

/*----------------------------------------------------------------------
validate returns true, if the field values are acceptable. 
 ---------------------------------------------------------------------*/
function  validate()
{
  var bValid = false;
  var dAirChangeRate = positiveNumber("airchangerate",MESSAGES.air_change_rate_numeric,MESSAGES.air_change_rate_positive);
  if (dAirChangeRate != null)
    bValid = true;
  return bValid;
}; /* validate */