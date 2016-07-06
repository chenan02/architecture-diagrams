/*== dimension.js ======================================================
Implements the initialization of dimension.xhtml.
Version    : $Id: dimension.js 2329 2012-09-19 09:27:39Z hartwig $
Application: Comfort and Climate
Platform   : JavaScript 5, DOM
Description: distributes app data into XHTML.
========================================================================
Created    : 23.07.2012, Hartwig Thomas, Enter AG, Zurich
Copyright  : 2012, Baumschlager Eberle, Vaduz, Liechtenstein
======================================================================*/

/*----------------------------------------------------------------------
Initializes input fields
----------------------------------------------------------------------*/
function setInputFields()
{
  var input = document.getElementsByName("length")[0];
  input.value = dLength.toFixed(2);
  input = document.getElementsByName("width")[0];
  input.value=dWidth.toFixed(2);
  input = document.getElementsByName("height")[0];
  input.value=dHeight.toFixed(2);
  input = document.getElementsByName("floorarea")[0];
  input.value=dFloorArea.toFixed(2);
}; /* setInputFields */

/*----------------------------------------------------------------------
Initializes dimension.xhtml
 ---------------------------------------------------------------------*/
function onLoad()
{
  setMessage();
  setProjectFields();
  setInputFields();
  /* in the end make body visible */
  var body = document.getElementsByTagName("body")[0];
  body.style.display="block";
  var select = document.getElementsByName("length")[0];
  select.focus();
}; /* onLoad */

/*----------------------------------------------------------------------
validate returns true, if the field values are acceptable. 
 ---------------------------------------------------------------------*/
function  validate()
{
  var bValid = false;
  var dLength = positiveNumber("length",MESSAGES.length_numeric,MESSAGES.length_positive);
  if (dLength != null)
  {
    var dWidth = positiveNumber("width",MESSAGES.width_numeric,MESSAGES.width_positive);
    if (dWidth != null)
    {
      var dHeight = positiveNumber("height",MESSAGES.height_numeric,MESSAGES.height_positive);
      if (dHeight != null)
      {
        var input = numericInput("floorarea",MESSAGES.floorarea_numeric);
        if (input != null)
        {
          var dFloorArea = Number(input.value);
          if (dFloorArea >= dLength*dWidth)
            bValid = true;
          else
          {
            alert(MESSAGES.area_too_small);
            input.focus();
          }
        }
      }
    }
  }
  return bValid;
}; /* validate */
