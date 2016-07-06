/*== summary.js =========================================================
Implements the initialization of summary.xhtml.
Version    : $Id: summary.js 2337 2012-09-20 15:14:54Z hartwig $
Application: Comfort and Climate
Platform   : JavaScript 5, DOM
Description: distributes app data into XHTML.
========================================================================
Created    : 17.08.2012, Hartwig Thomas, Enter AG, Zurich
Copyright  : 2012, Baumschlager Eberle, Vaduz, Liechtenstein
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
  span = document.getElementById("angle");
  span.appendChild(document.createTextNode(dAngle.toFixed(0)));
  span = document.getElementById("mincomfort");
  span.appendChild(document.createTextNode(dComfortMinimum.toFixed(0)));
  span = document.getElementById("maxcomfort");
  span.appendChild(document.createTextNode(dComfortMaximum.toFixed(0)));
  span = document.getElementById("length");
  span.appendChild(document.createTextNode(dLength.toFixed(1)));
  span = document.getElementById("width");
  span.appendChild(document.createTextNode(dWidth.toFixed(1)));
  span = document.getElementById("height");
  span.appendChild(document.createTextNode(dHeight.toFixed(1)));
  span = document.getElementById("floorarea");
  span.appendChild(document.createTextNode(dFloorArea.toFixed(0)));
  span = document.getElementById("compactness");
  span.appendChild(document.createTextNode(dCompactness.toFixed(2)));
  span = document.getElementById("thickness");
  span.appendChild(document.createTextNode(dThickness.toFixed(3)));
  span = document.getElementById("heatconductivity");
  span.appendChild(document.createTextNode(dHeatConductivity.toFixed(2)));
  span = document.getElementById("density");
  span.appendChild(document.createTextNode(dDensity.toFixed(0)));
  span = document.getElementById("specificheat");
  span.appendChild(document.createTextNode(dSpecificHeat.toFixed(0)));
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
  span = document.getElementById("moveableblinds");
  span.appendChild(document.createTextNode(bMoveableBlinds));
  span = document.getElementById("shadingdistancefront");
  span.appendChild(document.createTextNode(dShadingDistanceFront.toFixed(0)));
  span = document.getElementById("shadingheightfront");
  span.appendChild(document.createTextNode(dShadingHeightFront.toFixed(0)));
  span = document.getElementById("shadingdistanceleft");
  span.appendChild(document.createTextNode(dShadingDistanceLeft.toFixed(0)));
  span = document.getElementById("shadingheightleft");
  span.appendChild(document.createTextNode(dShadingHeightLeft.toFixed(0)));
  span = document.getElementById("shadingdistanceback");
  span.appendChild(document.createTextNode(dShadingDistanceBack.toFixed(0)));
  span = document.getElementById("shadingheightback");
  span.appendChild(document.createTextNode(dShadingHeightBack.toFixed(0)));
  span = document.getElementById("shadingdistanceright");
  span.appendChild(document.createTextNode(dShadingDistanceRight.toFixed(0)));
  span = document.getElementById("shadingheightright");
  span.appendChild(document.createTextNode(dShadingHeightRight.toFixed(0)));
  span = document.getElementById("roofu");
  span.appendChild(document.createTextNode(dRoofU.toFixed(2)));
  span = document.getElementById("wallsu");
  span.appendChild(document.createTextNode(dWallsU.toFixed(2)));
  span = document.getElementById("flooru");
  span.appendChild(document.createTextNode(dFloorU.toFixed(2)));
  span = document.getElementById("airchangerate");
  span.appendChild(document.createTextNode(dAirChangeRate.toFixed(2)));
  span = document.getElementById("occupants");
  span.appendChild(document.createTextNode(iOccupants));
  span = document.getElementById("singleoccupantpower");
  span.appendChild(document.createTextNode(dSingleOccupantPower.toFixed(0)));
  span = document.getElementById("singleoccupantdevicepower");
  span.appendChild(document.createTextNode(dSingleOccupantDevicePower.toFixed(0)));
  span = document.getElementById("workingday");
  span.appendChild(document.createTextNode(dUtilizationWorkingday.toFixed(0)));
  span = document.getElementById("weekend");
  span.appendChild(document.createTextNode(dUtilizationWeekend.toFixed(0)));
  var sUtilizationAm = "";
  for (var iHour = 0; iHour < 12; iHour++)
  {
    if (iHour > 0)
      sUtilizationAm = sUtilizationAm + ", "
    sUtilizationAm = sUtilizationAm + adUtilizationHour[iHour].toFixed(0);
  }
  span = document.getElementById("utilizationam");
  span.appendChild(document.createTextNode(sUtilizationAm));
  var sUtilizationPm = "";
  for (var iHour = 12; iHour < 24; iHour++)
  {
    if (iHour > 12)
      sUtilizationPm = sUtilizationPm + ", "
    sUtilizationPm = sUtilizationPm + adUtilizationHour[iHour].toFixed(0);
  }
  span = document.getElementById("utilizationpm");
  span.appendChild(document.createTextNode(sUtilizationPm));
  span = document.getElementById("tau");
  span.appendChild(document.createTextNode(dTau.toFixed(1)));
  span = document.getElementById("beta");
  span.appendChild(document.createTextNode(dBeta.toFixed(1)));
  span = document.getElementById("gamma");
  span.appendChild(document.createTextNode(dGamma.toFixed(2)));
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
