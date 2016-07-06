/*== blinds.js =========================================================
Implements the initialization of blinds.xhtml.
Version    : $Id: blinds.js 2337 2012-09-20 15:14:54Z hartwig $
Application: Comfort and Climate
Platform   : JavaScript 5, DOM
Description: distributes app data into XHTML.
========================================================================
Created    : 10.08.2012, Hartwig Thomas, Enter AG, Zurich
Copyright  : 2012, Baumschlager Eberle, Vaduz, Liechtenstein
======================================================================*/

/*----------------------------------------------------------------------
Initializes input fields
----------------------------------------------------------------------*/
function setInputFields()
{
  var input = document.getElementsByName("moveableblinds")[0];
  input.value = bMoveableBlinds;
}; /* setInputFields */

/*----------------------------------------------------------------------
Initializes blinds.xhtml
 ---------------------------------------------------------------------*/
function onLoad()
{
  setMessage();
  setProjectFields();
  setInputFields();
  var dBlinds;
  var adBlinds = [0,1];
  var asBlinds = ["false","true"];
  for (var i = 0; i < abMoveableBlinds.length; i++)
  {
    asBlinds[i] = String("false");
    adBlinds[i] = 0;
    if (abMoveableBlinds[i])
    {
      asBlinds[i] = String("true");
      adBlinds[i] = 1;
    }
  }
  var dBlinds = 0;
  if (bMoveableBlinds)
    dBlinds = 1;
  /* draw the energy demand per year for one or more values
    dMinX: -1,
    dMaxX: 2
    dLabelDx: null
    asYearLabel: asBlinds
    adYearLabel: adBlinds
    dSelected: dBlinds
    adYearX: adBlinds
    adYearHeating: adYearHeating 
    adYearCooling: adYearCooling
  */
  drawPerYear("peryear",-1,2,1,asBlinds,adBlinds,dBlinds,adBlinds,adYearHeating,adYearCooling);
  /* draw the energy demand and the min/max temperature per month */
  drawPerMonth("permonth",adMonthHeating,adMonthCooling,
    dComfortMinimum,dComfortMaximum,adExternalTemperature,adInternalTemperature);
  /* in the end make body visible */
  var body = document.getElementsByTagName("body")[0];
  body.style.display="block";
  var select = document.getElementsByName("moveableblinds")[0];
  select.focus();
}; /* onLoad */

/*----------------------------------------------------------------------
validate returns true, if the field values are acceptable. 
 ---------------------------------------------------------------------*/
function  validate()
{
  var bValid = false;
  var input = document.getElementsByName("moveableblinds")[0];
  var sMoveableBlinds = input.value;
  sMoveableBlinds = sMoveableBlinds.toLowerCase();
  if ((sMoveableBlinds == "false") || (sMoveableBlinds == "true"))
    bValid = true;
  else
  {
    alert(MESSAGES.blinds_boolean);
    input.focus();
  }
  return bValid;
}; /* validate */
