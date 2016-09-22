/*== summary.js =========================================================
Implements the initialization of summary.xhtml.
Version    : $Id: summary.js 2337 2015-11-18 15:34:03Z DEAN AND MIN $
Application: Comfort and Climate
Platform   : JavaScript 5, DOM
Description: distributes app data into XHTML.
========================================================================
Created    : 23.07.2012, DEAN WONG, MKIM, Enter AG, Zurich
Copyright  : 2015, Baumschlager Eberle, Vaduz, Liechtenstein
Created & Integrited  : Dean Wang and MIN
======================================================================*/
/*----------------------------------------------------------------------
Initializes summary.xhtml
 ---------------------------------------------------------------------*/
function onLoad()
{
  setMessage();
  setProjectFields();
  var span = document.getElementById("user");
  span.appendChild(document.createTextNode(sUserName));
  var span = document.getElementById("project");
  span.appendChild(document.createTextNode(sProjectName));
  var span = document.getElementById("timestamp");
  var date = new Date();
  span.appendChild(document.createTextNode(date.format("dd.MM.yyyy hh:mm:ss")));
  var span = document.getElementById("climate");
  span.appendChild(document.createTextNode(sClimate));
  span = document.getElementById("latitude");
  span.appendChild(document.createTextNode(dLatitude.toFixed(5)));
  span = document.getElementById("longitude");
  span.appendChild(document.createTextNode(dLongitude.toFixed(5)));
  span = document.getElementById("compactness");
  span.appendChild(document.createTextNode(dCompactness.toFixed(2)));
  span = document.getElementById("thickness");
  span.appendChild(document.createTextNode(dThickness.toFixed(3)));
  span = document.getElementById("heatconductivity");
  span.appendChild(document.createTextNode(dHeatConductivity.toFixed(2)));
  span = document.getElementById("density");
  span.appendChild(document.createTextNode(dDensity.toFixed(0)));
  span = document.getElementById("windowsfront");
  span.appendChild(document.createTextNode(dWindowsFront.toFixed(0)));
  span = document.getElementById("windowsleft");
  span.appendChild(document.createTextNode(dWindowsLeft.toFixed(0)));
  span = document.getElementById("windowsback");
  span.appendChild(document.createTextNode(dWindowsBack.toFixed(0)));
  span = document.getElementById("windowsright");
  span.appendChild(document.createTextNode(dWindowsRight.toFixed(0)));
  span = document.getElementById("glassg");
  span.appendChild(document.createTextNode(dGlassG.toFixed(2)));
  span = document.getElementById("glassu");
  span.appendChild(document.createTextNode(dGlassU.toFixed(2)));
  span = document.getElementById("shadingdistancefront");
  span.appendChild(document.createTextNode(dShadingDistanceFront.toFixed(0)));
  span = document.getElementById("shadingdistanceleft");
  span.appendChild(document.createTextNode(dShadingDistanceLeft.toFixed(0)));
  span = document.getElementById("shadingdistanceback");
  span.appendChild(document.createTextNode(dShadingDistanceBack.toFixed(0)));
  span = document.getElementById("shadingdistanceright");
  span.appendChild(document.createTextNode(dShadingDistanceRight.toFixed(0)));
  span = document.getElementById("roofu");
  span.appendChild(document.createTextNode(dRoofU.toFixed(2)));
  span = document.getElementById("wallsu");
  span.appendChild(document.createTextNode(dWallsU.toFixed(2)));
  span = document.getElementById("flooru");
  span.appendChild(document.createTextNode(dFloorU.toFixed(2)));
  span = document.getElementById("occupants");
  span.appendChild(document.createTextNode(iOccupants));
  span = document.getElementById("singleoccupantpower");
  span.appendChild(document.createTextNode(dSingleOccupantPower.toFixed(0)));
  span = document.getElementById("singleoccupantdevicepower");
  span = document.getElementById("yearheating");
  span.appendChild(document.createTextNode(dYearHeating.toFixed(2)));
  span = document.getElementById("yearcooling");
  span.appendChild(document.createTextNode(dYearCooling.toFixed(2)));
  span = document.getElementById("yearenergy");
  var dYearEnergy = dYearHeating + dYearCooling;
  span.appendChild(document.createTextNode(dYearEnergy.toFixed(2)));
  /* draw the energy demand per year for one or more values
  dMinX: 0,
  dMaxX: 1
  dLabelDx: null
  asYearLabel: null
  adYearLabel: null
  dSelected: 0.5
  adYearX: null
  adYearHeating: adYearHeating 
  adYearCooling: adYearCooling
  */
  drawPerYear("peryear",0,1,null,null,null,null,[0.5],[dYearHeating],[dYearCooling]);
  /* draw the energy demand and the min/max temperature per month */
  drawPerMonth("permonth",adMonthHeating,adMonthCooling,
    dComfortMinimum,dComfortMaximum,adExternalTemperature,adInternalTemperature);
  /* in the end make body visible */
  var body = document.getElementsByTagName("body")[0];
  body.style.display="block";
}; /* onLoad */
