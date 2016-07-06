/*== glazing.js ========================================================
Implements the initialization of glazing.xhtml.
Version    : $Id: shading.js 2337 2012-09-20 15:14:54Z hartwig $
Application: Comfort and Climate
Platform   : JavaScript 5, DOM
Description: distributes app data into XHTML.
========================================================================
Created    : 08.08.2012, Hartwig Thomas, Enter AG, Zurich
Copyright  : 2012, Baumschlager Eberle, Vaduz, Liechtenstein
======================================================================*/

/*----------------------------------------------------------------------
Initializes input fields
----------------------------------------------------------------------*/
function setInputFields()
{
  var input = document.getElementsByName("shadingdistancefront")[0];
  input.value = dShadingDistanceFront.toFixed(1);
  input = document.getElementsByName("shadingheightfront")[0];
  input.value = dShadingHeightFront.toFixed(1);
  input = document.getElementsByName("shadingdistanceleft")[0];
  input.value = dShadingDistanceLeft.toFixed(1);
  input = document.getElementsByName("shadingheightleft")[0];
  input.value = dShadingHeightLeft.toFixed(1);
  input = document.getElementsByName("shadingdistanceback")[0];
  input.value = dShadingDistanceBack.toFixed(1);
  input = document.getElementsByName("shadingheightback")[0];
  input.value = dShadingHeightBack.toFixed(1);
  input = document.getElementsByName("shadingdistanceright")[0];
  input.value = dShadingDistanceRight.toFixed(1);
  input = document.getElementsByName("shadingheightright")[0];
  input.value = dShadingHeightRight.toFixed(1);
}; /* setInputFields */

/*----------------------------------------------------------------------
Initializes shading.xhtml
 ---------------------------------------------------------------------*/
function onLoad()
{
  dHeight = dHeight.toFixed(2);
  setMessage();
  setProjectFields();
  setInputFields();
  dDistance = ( 
    dShadingDistanceFront +
    dShadingDistanceLeft +
    dShadingDistanceBack +
    dShadingDistanceRight)/4;
  /* draw the energy demand per year for one or more values
    dMinX: 0,
    dMaxX: 50
    dLabelDx: 10
    asYearLabel: null
    adYearLabel: null
    dSelected: dDistance
    adYearX: adDistance
    adYearHeating: adYearHeating 
    adYearCooling: adYearCooling
  */
  drawPerYear("peryear",1,6,1,null,null,dDistance,adDistance,adYearHeating,adYearCooling);
  /* draw the energy demand and the min/max temperature per month */
  drawPerMonth("permonth",adMonthHeating,adMonthCooling,
    dComfortMinimum,dComfortMaximum,adExternalTemperature,adInternalTemperature);
  /* in the end make body visible */
  var body = document.getElementsByTagName("body")[0];
  body.style.display="block";
  var select = document.getElementsByName("shadingdistancefront")[0];
  select.focus();
}; /* onLoad */

/*----------------------------------------------------------------------
selects a default value for the eight parameters
----------------------------------------------------------------------*/
function selectShading(button,
  dShadingDistanceFront,dShadingDistanceLeft,dShadingDistanceBack,dShadingDistanceRight,
  dShadingHeightFront,dShadingHeightLeft,dShadingHeightBack,dShadingHeightRight)
{
  var parent = button.parentNode;
  var form = parent.getElementsByTagName("form")[0];
  var ainput = form.getElementsByTagName("input");
  var inputSubmit = null;
  for (i = 0; i < ainput.length; i++)
  {
    var input = ainput[i];
    var sType = input.getAttribute("type");
    if (sType == "text")
    {
      var sName = input.getAttribute("name");
      if (sName == "shadingdistancefront")
        input.value = dShadingDistanceFront;
      else if (sName == "shadingdistanceleft")
        input.value = dShadingDistanceLeft;
      else if (sName == "shadingdistanceback")
        input.value = dShadingDistanceBack;
      else if (sName == "shadingdistanceright")
        input.value = dShadingDistanceRight;
      else if (sName == "shadingheightfront")
        input.value = dShadingHeightFront;
      else if (sName == "shadingheightleft")
        input.value = dShadingHeightLeft;
      else if (sName == "shadingheightback")
        input.value = dShadingHeightBack;
      else if (sName == "shadingheightright")
        input.value = dShadingHeightRight;
    }
    else if (sType == "submit")
      inputSubmit = input;
  }
  inputSubmit.click();
}; /* selectShading */

/*----------------------------------------------------------------------
validate returns true, if the field values are acceptable. 
 ---------------------------------------------------------------------*/
function  validate()
{
  var bValid = false;
  var dShadingDistanceFront = nonnegativeNumber("shadingdistancefront",MESSAGES.distance_numeric,MESSAGES.distance_non_negative);
  if (dShadingDistanceFront != null)
  {
    var dShadingDistanceLeft = nonnegativeNumber("shadingdistanceleft",MESSAGES.distance_numeric,MESSAGES.distance_non_negative);
    if (dShadingDistanceLeft != null)
    {
      var dShadingDistanceBack = nonnegativeNumber("shadingdistanceback",MESSAGES.distance_numeric,MESSAGES.distance_non_negative);
      if (dShadingDistanceBack != null)
      {
        var dShadingDistanceRight = nonnegativeNumber("shadingdistanceright",MESSAGES.distance_numeric,MESSAGES.distance_non_negative);
        if (dShadingDistanceRight != null)
        {
          var dShadingHeightFront = nonnegativeNumber("shadingheightfront",MESSAGES.height_numeric,MESSAGES.height_non_negative);
          if (dShadingHeightFront != null)
          {
            var dShadingHeightLeft = nonnegativeNumber("shadingheightleft",MESSAGES.height_numeric,MESSAGES.height_non_negative);
            if (dShadingHeightLeft != null)
            {
              var dShadingHeightBack = nonnegativeNumber("shadingheightback",MESSAGES.height_numeric,MESSAGES.height_non_negative);
              if (dShadingHeightBack != null)
              {
                var dShadingHeightRight = nonnegativeNumber("shadingheightright",MESSAGES.height_numeric,MESSAGES.height_non_negative);
                if (dShadingHeightRight != null)
                  bValid = true;
              }
            }
          }
        }
      }
    }
  }
  return bValid;
}; /* validate */