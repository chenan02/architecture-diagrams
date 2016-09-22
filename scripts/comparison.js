/*== comparison.js =====================================================
Implements the initialization of comparison.xhtml.
Version    : $Id: comparison.js 2337 2015-11-18 15:34:03Z DEAN AND MIN $
Application: Comfort and Climate
Platform   : JavaScript 5, DOM
Description: distributes app data into XHTML.
========================================================================
Created    : 23.07.2012, DEAN WONG, MKIM, Enter AG, Zurich
Copyright  : 2015, Baumschlager Eberle, Vaduz, Liechtenstein
======================================================================*/

/*----------------------------------------------------------------------
Sets the project names being compared in each sub chapter.
----------------------------------------------------------------------*/
function setProjectNames(span)
{
  var p = span.parentNode;
  var td = p.parentNode;
  var tr = td.parentNode;
  if (tr.sectionRowIndex == 1)
  {
    var table = tr.parentNode;
    tr = table.getElementsByTagName("tr")[0];
    var tdComparison = tr.getElementsByTagName("td")[1];
    var pComparison = document.createElement("p");
    tdComparison.appendChild(pComparison);
    pComparison.appendChild(document.createTextNode(sProjectName2));
    var tdThis = tr.getElementsByTagName("td")[2];
    var pThis = document.createElement("p");
    tdThis.appendChild(pThis);
    pThis.appendChild(document.createTextNode(sProjectName));
  }
} /* setProjectNames */

/*----------------------------------------------------------------------
Initializes comparison.xhtml
 ---------------------------------------------------------------------*/
function onLoad()
{
  setMessage();
  setProjectFields();
  var select = document.getElementsByName("projectid2")[0];
  select.options.length = 0;
  var i = 0;
  for (; i < aproject.length; i++)
  {
    var project = aproject[i];
    var option = new Option(project.name,project.id,false);
    select.add(option,null);
  }
  select.selectedIndex = iSelectedProject;
  var form = select.parentNode;
  var td = form.parentNode;
  var tr = td.parentNode;
  var tdThis = tr.getElementsByTagName("td")[1];
  var pThis = tdThis.getElementsByTagName("p")[0];
  pThis.appendChild(document.createTextNode(sProjectName));
  var span = document.getElementById("user");
  span.appendChild(document.createTextNode(sUserName));
  var span = document.getElementById("timestamp");
  var date = new Date();
  span.appendChild(document.createTextNode(date.format("dd.MM.yyyy hh:mm:ss")));
  var span = document.getElementById("climate");
  span.appendChild(document.createTextNode(sClimate));
  setProjectNames(span);
  span = document.getElementById("latitude");
  span.appendChild(document.createTextNode(dLatitude.toFixed(5)));
  setProjectNames(span);
  span = document.getElementById("longitude");
  span.appendChild(document.createTextNode(dLongitude.toFixed(5)));
  setProjectNames(span);
  span = document.getElementById("angle");
  span.appendChild(document.createTextNode(dAngle.toFixed(0)));
  setProjectNames(span);
  span = document.getElementById("mincomfort");
  span.appendChild(document.createTextNode(dComfortMinimum.toFixed(0)));
  setProjectNames(span);
  span = document.getElementById("maxcomfort");
  span.appendChild(document.createTextNode(dComfortMaximum.toFixed(0)));
  setProjectNames(span);
  span = document.getElementById("length");
  span.appendChild(document.createTextNode(dLength.toFixed(1)));
  setProjectNames(span);
  span = document.getElementById("width");
  span.appendChild(document.createTextNode(dWidth.toFixed(1)));
  setProjectNames(span);
  span = document.getElementById("height");
  span.appendChild(document.createTextNode(dHeight.toFixed(1)));
  setProjectNames(span);
  span = document.getElementById("floorarea");
  span.appendChild(document.createTextNode(dFloorArea.toFixed(0)));
  setProjectNames(span);
  span = document.getElementById("compactness");
  span.appendChild(document.createTextNode(dCompactness.toFixed(2)));
  setProjectNames(span);
  span = document.getElementById("thickness");
  span.appendChild(document.createTextNode(dThickness.toFixed(3)));
  setProjectNames(span);
  span = document.getElementById("heatconductivity");
  span.appendChild(document.createTextNode(dHeatConductivity.toFixed(2)));
  setProjectNames(span);
  span = document.getElementById("density");
  span.appendChild(document.createTextNode(dDensity.toFixed(0)));
  setProjectNames(span);
  span = document.getElementById("specificheat");
  span.appendChild(document.createTextNode(dSpecificHeat.toFixed(0)));
  setProjectNames(span);
  span = document.getElementById("windowsfront");
  span.appendChild(document.createTextNode(dWindowsFront.toFixed(0)));
  setProjectNames(span);
  span = document.getElementById("windowsleft");
  span.appendChild(document.createTextNode(dWindowsLeft.toFixed(0)));
  setProjectNames(span);
  span = document.getElementById("windowsback");
  span.appendChild(document.createTextNode(dWindowsBack.toFixed(0)));
  setProjectNames(span);
  span = document.getElementById("windowsright");
  span.appendChild(document.createTextNode(dWindowsRight.toFixed(0)));
  setProjectNames(span);
  span = document.getElementById("glassg");
  span.appendChild(document.createTextNode(dGlassG.toFixed(2)));
  setProjectNames(span);
  span = document.getElementById("glassu");
  span.appendChild(document.createTextNode(dGlassU.toFixed(2)));
  setProjectNames(span);
  span = document.getElementById("moveableblinds");
  span.appendChild(document.createTextNode(bMoveableBlinds));
  setProjectNames(span);
  span = document.getElementById("shadingdistancefront");
  span.appendChild(document.createTextNode(dShadingDistanceFront.toFixed(0)));
  setProjectNames(span);
  span = document.getElementById("shadingheightfront");
  span.appendChild(document.createTextNode(dShadingHeightFront.toFixed(0)));
  setProjectNames(span);
  span = document.getElementById("shadingdistanceleft");
  span.appendChild(document.createTextNode(dShadingDistanceLeft.toFixed(0)));
  setProjectNames(span);
  span = document.getElementById("shadingheightleft");
  span.appendChild(document.createTextNode(dShadingHeightLeft.toFixed(0)));
  setProjectNames(span);
  span = document.getElementById("shadingdistanceback");
  span.appendChild(document.createTextNode(dShadingDistanceBack.toFixed(0)));
  setProjectNames(span);
  span = document.getElementById("shadingheightback");
  span.appendChild(document.createTextNode(dShadingHeightBack.toFixed(0)));
  setProjectNames(span);
  span = document.getElementById("shadingdistanceright");
  span.appendChild(document.createTextNode(dShadingDistanceRight.toFixed(0)));
  setProjectNames(span);
  span = document.getElementById("shadingheightright");
  span.appendChild(document.createTextNode(dShadingHeightRight.toFixed(0)));
  setProjectNames(span);
  span = document.getElementById("roofu");
  span.appendChild(document.createTextNode(dRoofU.toFixed(2)));
  setProjectNames(span);
  span = document.getElementById("wallsu");
  span.appendChild(document.createTextNode(dWallsU.toFixed(2)));
  setProjectNames(span);
  span = document.getElementById("flooru");
  span.appendChild(document.createTextNode(dFloorU.toFixed(2)));
  setProjectNames(span);
  span = document.getElementById("airchangerate");
  span.appendChild(document.createTextNode(dAirChangeRate.toFixed(2)));
  setProjectNames(span);
  span = document.getElementById("occupants");
  span.appendChild(document.createTextNode(iOccupants));
  setProjectNames(span);
  span = document.getElementById("singleoccupantpower");
  span.appendChild(document.createTextNode(dSingleOccupantPower.toFixed(0)));
  setProjectNames(span);
  span = document.getElementById("singleoccupantdevicepower");
  span.appendChild(document.createTextNode(dSingleOccupantDevicePower.toFixed(0)));
  setProjectNames(span);
  span = document.getElementById("workingday");
  span.appendChild(document.createTextNode(dUtilizationWorkingday.toFixed(0)));
  setProjectNames(span);
  span = document.getElementById("weekend");
  span.appendChild(document.createTextNode(dUtilizationWeekend.toFixed(0)));
  setProjectNames(span);
  var sUtilizationAm = "";
  for (var iHour = 0; iHour < 12; iHour++)
  {
    if (iHour > 0)
      sUtilizationAm = sUtilizationAm + ", "
    sUtilizationAm = sUtilizationAm + adUtilizationHour[iHour].toFixed(0);
  }
  span = document.getElementById("utilizationam");
  span.appendChild(document.createTextNode(sUtilizationAm));
  setProjectNames(span);
  var sUtilizationPm = "";
  for (var iHour = 12; iHour < 24; iHour++)
  {
    if (iHour > 12)
      sUtilizationPm = sUtilizationPm + ", "
    sUtilizationPm = sUtilizationPm + adUtilizationHour[iHour].toFixed(0);
  }
  span = document.getElementById("utilizationpm");
  span.appendChild(document.createTextNode(sUtilizationPm));
  setProjectNames(span);
  span = document.getElementById("tau");
  span.appendChild(document.createTextNode(dTau.toFixed(1)));
  setProjectNames(span);
  span = document.getElementById("beta");
  span.appendChild(document.createTextNode(dBeta.toFixed(1)));
  setProjectNames(span);
  span = document.getElementById("gamma");
  span.appendChild(document.createTextNode(dGamma.toFixed(2)));
  setProjectNames(span);
  span = document.getElementById("yearheating");
  span.appendChild(document.createTextNode(dYearHeating.toFixed(2)));
  setProjectNames(span);
  span = document.getElementById("yearcooling");
  span.appendChild(document.createTextNode(dYearCooling.toFixed(2)));
  setProjectNames(span);
  span = document.getElementById("yearenergy");
  var dYearEnergy = dYearHeating + dYearCooling;
  span.appendChild(document.createTextNode(dYearEnergy.toFixed(2)));
  setProjectNames(span);
  
  span = document.getElementById("climate2");
  span.appendChild(document.createTextNode(sClimate2));
  span = document.getElementById("latitude2");
  span.appendChild(document.createTextNode(dLatitude2.toFixed(5)));
  span = document.getElementById("longitude2");
  span.appendChild(document.createTextNode(dLongitude2.toFixed(5)));
  span = document.getElementById("angle2");
  span.appendChild(document.createTextNode(dAngle2.toFixed(0)));
  span = document.getElementById("mincomfort2");
  span.appendChild(document.createTextNode(dComfortMinimum2.toFixed(0)));
  span = document.getElementById("maxcomfort2");
  span.appendChild(document.createTextNode(dComfortMaximum2.toFixed(0)));
  span = document.getElementById("length2");
  span.appendChild(document.createTextNode(dLength2.toFixed(1)));
  span = document.getElementById("width2");
  span.appendChild(document.createTextNode(dWidth2.toFixed(1)));
  span = document.getElementById("height2");
  span.appendChild(document.createTextNode(dHeight2.toFixed(1)));
  span = document.getElementById("floorarea2");
  span.appendChild(document.createTextNode(dFloorArea2.toFixed(0)));
  span = document.getElementById("compactness2");
  span.appendChild(document.createTextNode(dCompactness2.toFixed(2)));
  span = document.getElementById("thickness2");
  span.appendChild(document.createTextNode(dThickness2.toFixed(3)));
  span = document.getElementById("heatconductivity2");
  span.appendChild(document.createTextNode(dHeatConductivity2.toFixed(2)));
  span = document.getElementById("density2");
  span.appendChild(document.createTextNode(dDensity2.toFixed(0)));
  span = document.getElementById("specificheat2");
  span.appendChild(document.createTextNode(dSpecificHeat2.toFixed(0)));
  span = document.getElementById("windowsfront2");
  span.appendChild(document.createTextNode(dWindowsFront2.toFixed(0)));
  span = document.getElementById("windowsleft2");
  span.appendChild(document.createTextNode(dWindowsLeft2.toFixed(0)));
  span = document.getElementById("windowsback2");
  span.appendChild(document.createTextNode(dWindowsBack2.toFixed(0)));
  span = document.getElementById("windowsright2");
  span.appendChild(document.createTextNode(dWindowsRight2.toFixed(0)));
  span = document.getElementById("glassg2");
  span.appendChild(document.createTextNode(dGlassG2.toFixed(2)));
  span = document.getElementById("glassu2");
  span.appendChild(document.createTextNode(dGlassU2.toFixed(2)));
  span = document.getElementById("moveableblinds2");
  span.appendChild(document.createTextNode(bMoveableBlinds2));
  span = document.getElementById("shadingdistancefront2");
  span.appendChild(document.createTextNode(dShadingDistanceFront2.toFixed(0)));
  span = document.getElementById("shadingheightfront2");
  span.appendChild(document.createTextNode(dShadingHeightFront2.toFixed(0)));
  span = document.getElementById("shadingdistanceleft2");
  span.appendChild(document.createTextNode(dShadingDistanceLeft2.toFixed(0)));
  span = document.getElementById("shadingheightleft2");
  span.appendChild(document.createTextNode(dShadingHeightLeft2.toFixed(0)));
  span = document.getElementById("shadingdistanceback2");
  span.appendChild(document.createTextNode(dShadingDistanceBack2.toFixed(0)));
  span = document.getElementById("shadingheightback2");
  span.appendChild(document.createTextNode(dShadingHeightBack2.toFixed(0)));
  span = document.getElementById("shadingdistanceright2");
  span.appendChild(document.createTextNode(dShadingDistanceRight2.toFixed(0)));
  span = document.getElementById("shadingheightright2");
  span.appendChild(document.createTextNode(dShadingHeightRight2.toFixed(0)));
  span = document.getElementById("roofu2");
  span.appendChild(document.createTextNode(dRoofU2.toFixed(2)));
  span = document.getElementById("wallsu2");
  span.appendChild(document.createTextNode(dWallsU2.toFixed(2)));
  span = document.getElementById("flooru2");
  span.appendChild(document.createTextNode(dFloorU2.toFixed(2)));
  span = document.getElementById("airchangerate2");
  span.appendChild(document.createTextNode(dAirChangeRate2.toFixed(2)));
  span = document.getElementById("occupants2");
  span.appendChild(document.createTextNode(iOccupants2));
  span = document.getElementById("singleoccupantpower2");
  span.appendChild(document.createTextNode(dSingleOccupantPower2.toFixed(0)));
  span = document.getElementById("singleoccupantdevicepower2");
  span.appendChild(document.createTextNode(dSingleOccupantDevicePower2.toFixed(0)));
  span = document.getElementById("workingday2");
  span.appendChild(document.createTextNode(dUtilizationWorkingday2.toFixed(0)));
  span = document.getElementById("weekend2");
  span.appendChild(document.createTextNode(dUtilizationWeekend2.toFixed(0)));
  var sUtilizationAm2 = "";
  for (var iHour = 0; iHour < 12; iHour++)
  {
    if (iHour > 0)
      sUtilizationAm2 = sUtilizationAm2 + ", "
    sUtilizationAm2 = sUtilizationAm2 + adUtilizationHour2[iHour].toFixed(0);
  }
  span = document.getElementById("utilizationam2");
  span.appendChild(document.createTextNode(sUtilizationAm2));
  var sUtilizationPm2 = "";
  for (var iHour = 12; iHour < 24; iHour++)
  {
    if (iHour > 12)
      sUtilizationPm2 = sUtilizationPm2 + ", "
    sUtilizationPm2 = sUtilizationPm2 + adUtilizationHour2[iHour].toFixed(0);
  }
  span = document.getElementById("utilizationpm2");
  span.appendChild(document.createTextNode(sUtilizationPm2));
  span = document.getElementById("tau2");
  span.appendChild(document.createTextNode(dTau2.toFixed(1)));
  span = document.getElementById("beta2");
  span.appendChild(document.createTextNode(dBeta2.toFixed(1)));
  span = document.getElementById("gamma2");
  span.appendChild(document.createTextNode(dGamma2.toFixed(2)));
  span = document.getElementById("yearheating2");
  span.appendChild(document.createTextNode(dYearHeating2.toFixed(2)));
  span = document.getElementById("yearcooling2");
  span.appendChild(document.createTextNode(dYearCooling2.toFixed(2)));
  span = document.getElementById("yearenergy2");
  var dYearEnergy2 = dYearHeating2 + dYearCooling2;
  span.appendChild(document.createTextNode(dYearEnergy2.toFixed(2)));
  
  /* draw the energy demand per year for one or more values */
  drawPerYear("peryear2",0,1,null,null,null,null,[0.5],[dYearHeating2],[dYearCooling2]);
  /* draw the energy demand per year for one or more values */
  drawPerYear("peryear",0,1,null,null,null,null,[0.5],[dYearHeating],[dYearCooling]);
  /* draw the energy demand and the min/max temperature per month */
  drawPerMonth("permonth2",adMonthHeating2,adMonthCooling2,
    dComfortMinimum2,dComfortMaximum2,adExternalTemperature2,adInternalTemperature2);
  /* draw the energy demand and the min/max temperature per month */
  drawPerMonth("permonth",adMonthHeating,adMonthCooling,
    dComfortMinimum,dComfortMaximum,adExternalTemperature,adInternalTemperature);
  /* in the end make body visible */
  var body = document.getElementsByTagName("body")[0];
  body.style.display="block";
}; /* onLoad */

/*----------------------------------------------------------------------
Submits the form
 ---------------------------------------------------------------------*/
function setProject()
{
  var select = document.getElementsByName("projectid2")[0];
  var form = select.parentNode;
  form.submit();
} /* setProject */