/*== climate.js ========================================================
Implements the initialization of climate.xhtml.
Version    : $Id: climate.js 2328 2012-09-19 09:14:04Z hartwig $
Application: Comfort and Climate
Platform   : JavaScript 5, DOM
Description: distributes app data into XHTML.
========================================================================
Created    : 19.07.2012, Hartwig Thomas, Enter AG, Zurich
Copyright  : 2012, Baumschlager Eberle, Vaduz, Liechtenstein
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
