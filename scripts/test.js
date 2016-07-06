/*----------------------------------------------------------------------
Initializes input fields
----------------------------------------------------------------------*/
function setContentFields()
  {
	drawPerYear("peryear",1,7,1,null,null,dCompactness,adCompactness,adYearHeating,adYearCooling);
	drawPerMonth("permonth",adMonthHeating,adMonthCooling,
		    dComfortMinimum,dComfortMaximum,adExternalTemperature,adInternalTemperature);
	 var input = document.getElementsByName("propertyvolume")[0];
	 input.value = dPropertyvolume.toFixed(2);
  }; /* setInputFields */

/*----------------------------------------------------------------------
Initializes test.xhtml
 ---------------------------------------------------------------------*/
function onLoad()
{
  setMessage();
  setProjectFields();
  setContentFields();
  /* in the end make body visible */
  var body = document.getElementsByTagName("body")[0];
  body.style.display="block";
}; /* onLoad */


