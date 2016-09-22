/*== goal.js ======================================================
Version    : 1.0
Application: Comfort and Climate
Platform   : JavaScript 5, DOM
Description: distributes app data into XHTML
Created & Integrited  : Dean Wang and MIN
*/

/*----------------------------------------------------------------------
Initializes input fields
----------------------------------------------------------------------*/
function setInputFields()
{
  var input = document.getElementsByName("HeatingGoal")[0];
  input.value = dHeatingGoal.toFixed(2);
  input = document.getElementsByName("MaximalTemp")[0];
  input.value=dMaximalTemp.toFixed(2);
  input = document.getElementsByName("MinimalTemp")[0];
  input.value=dMinimalTemp.toFixed(2);
  input = document.getElementsByName("MaxRelativeHumidity")[0];
  input.value=dMaxRelativeHumidity.toFixed(2);
  input = document.getElementsByName("MinRelativeHumidity")[0];
  input.value=dMinRelativeHumidity.toFixed(2);
  input = document.getElementsByName("Heating")[0];
  input.value=dHeating.toFixed(0);
  input = document.getElementsByName("Cooling")[0];
  input.value=dCooling.toFixed(0);
}; /* setInputFields */

/*----------------------------------------------------------------------
Initializes physicalproperty.xhtml
 ---------------------------------------------------------------------*/
function onLoad()
{
  setMessage();
  setProjectFields();
  setInputFields();
  /* in the end make body visible */
  var body = document.getElementsByTagName("body")[0];
  body.style.display="block";
}; /* onLoad */

/*----------------------------------------------------------------------
validate returns true, if the field values are acceptable. 
 ---------------------------------------------------------------------*/
function validate(){
  var bValid = false;
  
  var input = positiveNumber("HeatingGoal",MESSAGES.heatinggoal_numeric,MESSAGES.heatinggoal_positive);
  if(input != null){
		  input = numericInput("MaximalTemp",MESSAGES.maximaltemp_bound);
		  var result = Number(input.value);
		  if(result > 0.0 && result <= 40.0){
			  input = numericInput("MinimalTemp",MESSAGES.minimaltemp_bound);
			  result = Number(input.value);
			  if(result >= 0.0 && result <= 30.0){
				  input = numericInput("MaxRelativeHumidity",MESSAGES.maxrelativehumidity_bound);
				  result = Number(input.value);
				  if(result > 0.0 && result <= 100.0){
					  input = numericInput("MinRelativeHumidity",MESSAGES.minrelativehumidity_bound);
					  result = Number(input.value);
					  if(result > 0.0 && result <= 100.0){
						 bValid = true;
					  }else{
						  alert(MESSAGES.minrelativehumidity_bound);
					      input.focus();
					  }
				  }else{
					  alert(MESSAGES.maxrelativehumidity_bound);
				      input.focus();
				  }
			  }else{
				  alert(MESSAGES.minimaltemp_bound);
			      input.focus();
			  }
		  }else{
			  alert(MESSAGES.maximaltemp_bound);
		      input.focus();
		  }
  }
  return bValid;
}; /* validate */












