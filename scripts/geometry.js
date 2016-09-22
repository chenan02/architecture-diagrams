/*== geometry.js ======================================================
Version    : 1.0
2015-11-18 15:34:03Z DEAN AND MIN $
Application: Comfort and Climate
Platform   : JavaScript 5, DOM
Description: distributes app data into XHTML.
========================================================================
Created    : 23.07.2012, DEAN WONG, MKIM, Enter AG, Zurich
Copyright  : 2015, Baumschlager Eberle, Vaduz, Liechtenstein
*/

/*----------------------------------------------------------------------
Initializes input fields
----------------------------------------------------------------------*/
function setInputFields()
{
  var input = document.getElementsByName("Volume")[0];
  input.value = dVolume.toFixed(2);
  input = document.getElementsByName("Area_Floor")[0];
  input.value=dAreaFloor.toFixed(2);
  input = document.getElementsByName("Num_Floors")[0];
  input.value=dNumFloors.toFixed(2);
  input = document.getElementsByName("Building_Height")[0];
  input.value=dBuildingHeight.toFixed(2);
  input = document.getElementsByName("North")[0];
  input.value=dNorth.toFixed(2);
  input = document.getElementsByName("South")[0];
  input.value=dSouth.toFixed(2);
  input = document.getElementsByName("East")[0];
  input.value=dEast.toFixed(2);
  input = document.getElementsByName("West")[0];
  input.value=dWest.toFixed(2);
  input = document.getElementsByName("Roof_Area")[0];
  input.value=dRoofArea.toFixed(2);
  input = document.getElementsByName("Floor_Area")[0];
  input.value=dFloorArea.toFixed(2);
  input = document.getElementsByName("NorthWtoW")[0];
  input.value=dNorthWtoW.toFixed(2);
  input = document.getElementsByName("SouthWtoW")[0];
  input.value=dSouthWtoW.toFixed(2);
  input = document.getElementsByName("EastWtoW")[0];
  input.value=dEastWtoW.toFixed(2);
  input = document.getElementsByName("WestWtoW")[0];
  input.value=dWestWtoW.toFixed(2);
  input = document.getElementsByName("Floor_Adjacent")[0];
  input.value=dFloorAdjacent.toFixed(0);
  input = document.getElementsByName("Roof_Adjacent")[0];
  input.value=dRoofAdjacent.toFixed(0);
  calculate_N();
  calculate_S();
  calculate_W();
  calculate_E();
 
}; /* setInputFields */

/*----------------------------------------------------------------------
Initializes geometry.xhtml
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
function validate()
{
  var bValid = false;
  
  var input = positiveNumber("Volume",MESSAGES.volume_numeric,MESSAGES.volume_non_negative);
  if (input != null)
  {
	  input = nonnegativeNumber("Area_Floor",MESSAGES.area_numeric,MESSAGES.area_non_negative);
	  if(input != null){
		  input = nonnegativeNumber("Num_Floors",MESSAGES.num_floors_numeric,MESSAGES.num_floors_non_negative);
		  if(input != null){
			  input = nonnegativeNumber("Building_Height",MESSAGES.building_numeric,MESSAGES.building_non_negative);
			  if(input != null){
				  input = nonnegativeNumber("North",MESSAGES.north_numeric,MESSAGES.north_non_negative);
				  if(input != null){
					  input = nonnegativeNumber("South",MESSAGES.south_numeric,MESSAGES.south_non_negative);
					  if(input != null){
						  input = nonnegativeNumber("East",MESSAGES.east_numeric,MESSAGES.east_non_negative);
						  if(input != null){
							  input = nonnegativeNumber("West",MESSAGES.west_numeric,MESSAGES.west_non_negative);
							  if(input != null){
								  input = numericInput("NorthWtoW",MESSAGES.nwtow_bound);
								  var dNorthWtoW = Number(input.value);
								  if ((dNorthWtoW >= 0) && (dNorthWtoW <= 100)){
									  input = numericInput("SouthWtoW",MESSAGES.swtow_bound);
									  var dSouthWtoW = Number(input.value);
									  if ((dSouthWtoW >= 0) && (dSouthWtoW <= 100)){
										  input = numericInput("EastWtoW",MESSAGES.ewtow_bound);
										  var dEastWtoW = Number(input.value);
										  if ((dEastWtoW >= 0) && (dEastWtoW <= 100)){
											  input = numericInput("WestWtoW",MESSAGES.ewtow_bound);
											  var dWestWtoW = Number(input.value);
											  if ((dWestWtoW >= 0) && (dWestWtoW <= 100)){
												  input = nonnegativeNumber("Roof_Area",MESSAGES.roof_numeric,MESSAGES.roof_non_negative);
												  if(input != null){
													  input = nonnegativeNumber("Floor_Area",MESSAGES.floor_numeric,MESSAGES.floor_non_negative);
													  if(input != null){
														  bValid = true;
													  }
												  }
											  }else{
												  alert(MESSAGES.wwtow_bound);
									              input.focus();
											  }
										  }else{
											  alert(MESSAGES.ewtow_bound);
								              input.focus();
										  }
									  }else{
										  alert(MESSAGES.swtow_bound);
							              input.focus();
									  }
								  }else{
									  alert(MESSAGES.nwtow_bound);
						              input.focus();
								  }
							  }
						  }
					  }
				  }
			  }
		  }
	  }
  }
  return bValid;
}; /* validate */

/*----------------------------------------------------------------------
Functions for calculating Window Area
 ---------------------------------------------------------------------*/

function calculate_N() {
  var wall = document.getElementsByName("North")[0].value;
  var w2w = document.getElementsByName("NorthWtoW")[0].value;
  if(validate()){
	  var result = (wall * (w2w / 100)).toFixed(2);
	  var element = document.getElementById("NWindowArea");
	  element.innerHTML = result;
  }
};

function calculate_S() {
  var wall = document.getElementsByName("South")[0].value;
  var w2w = document.getElementsByName("SouthWtoW")[0].value;
  if(validate()){
	  var result = (wall * (w2w / 100)).toFixed(2);
	  var element = document.getElementById("SWindowArea");
	  element.innerHTML = result;
  }
};

function calculate_E() {
  var wall = document.getElementsByName("East")[0].value;
  var w2w = document.getElementsByName("EastWtoW")[0].value;
  if(validate()){
	  var result = (wall * (w2w / 100)).toFixed(2);
	  var element = document.getElementById("EWindowArea");
	  element.innerHTML = result;
  }
};

function calculate_W() {
  var wall = document.getElementsByName("West")[0].value;
  var w2w = document.getElementsByName("WestWtoW")[0].value;
  if(validate()){
	  var result = (wall * (w2w / 100)).toFixed(2);
	  var element = document.getElementById("WWindowArea");
	  element.innerHTML = result;
  }
};
















