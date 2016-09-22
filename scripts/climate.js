/*== climate.js ========================================================
Implements the initialization of climate.xhtml.
Version    : $Id: climate.js 2328 2015-11-18 15:34:03Z DEAN AND MIN $
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
  var select = document.getElementsByName("climate")[0];
  select.options.length = 0;
  var i = 0;
  for (; i < aclimate.length; i++)
  {
    var climate = aclimate[i];
    var option = new Option(climate.name,climate.id,false);
    select.add(option,null);
  }
  select.selectedIndex = iClimate;
  var input = document.getElementsByName("latitude")[0];
  input.value = dLatitude.toFixed(7);
  input = document.getElementsByName("longitude")[0];
  input.value=dLongitude.toFixed(7);
  
  var input = document.getElementsByName("input1")[0];
  input.value = input1.toFixed(2);
  var input = document.getElementsByName("input2")[0];
  input.value = input2.toFixed(2);
  var input = document.getElementsByName("input3")[0];
  input.value = input3.toFixed(2);
  var input = document.getElementsByName("input4")[0];
  input.value = input4.toFixed(2);
  var input = document.getElementsByName("input5")[0];
  input.value = input5.toFixed(2);
  var input = document.getElementsByName("input6")[0];
  input.value = input6.toFixed(2);
  var input = document.getElementsByName("input7")[0];
  input.value = input7.toFixed(2);
  var input = document.getElementsByName("input8")[0];
  input.value = input8.toFixed(2);
  var input = document.getElementsByName("input9")[0];
  input.value = input9.toFixed(2);
}; /* setInputFields */

/*----------------------------------------------------------------------
Initializes climate.xhtml
 ---------------------------------------------------------------------*/
function onLoad()
{
  setMessage();
  setProjectFields();
  setInputFields();
  /* in the end make body visible */
  var body = document.getElementsByTagName("body")[0];
  body.style.display="block";
  var select = document.getElementsByName("climate")[0];
  select.focus();
}; /* onLoad */

/*----------------------------------------------------------------------
setClimate copies the newly selected climate's coordinates to the
respective input fields.
 ---------------------------------------------------------------------*/
function setClimate()
{
  var select = document.getElementsByName("climate")[0];
  var iSelected = select.selectedIndex;
  var climate = aclimate[iSelected];
  var input = document.getElementsByName("latitude")[0];
  input.value = climate.latitude;
  input = document.getElementsByName("longitude")[0];
  input.value = climate.longitude;
}; /* setClimate */

/*----------------------------------------------------------------------
validate returns true, if the field values are acceptable. 
 ---------------------------------------------------------------------*/
function  validate()
{
  var bValid = false;
  var input = numericInput("latitude",MESSAGES.latitude_numeric);
  if (input != null)
  {
    var dLatitude = Number(input.value);
    if ((dLatitude >= -90) && (dLatitude <= 90))
    {
      input = numericInput("longitude",MESSAGES.longitude_numeric);
      if (input != null)
      {
        var dLongitude = Number(input.value);
        if ((dLongitude >= -180) && (dLongitude < 180))
        {
          bValid = true;
        }
        else
        {
          alert(MESSAGES.longitude_bounds);
          input.focus();
        }
      }
    }
    else
    {
      alert(MESSAGES.latitude_bounds);
      input.focus();
    }
  }
  return bValid;
}; /* validate */
