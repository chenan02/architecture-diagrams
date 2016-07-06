function setInputFields()
{
  var input = document.getElementsByName("EnergyHeating")[0];
  input.innerHTML = dEnegyHeat;
  var input = document.getElementsByName("EnergyCooling")[0];
  input.innerHTML = dEnegyCool;
}; /* setInputFields */

/*----------------------------------------------------------------------
Initializes construction.xhtml
 ---------------------------------------------------------------------*/
function onLoad()
{
  setMessage();
  setProjectFields();
  setInputFields();
  var body = document.getElementsByTagName("body")[0];
  body.style.display="block";
//  var select = document.getElementsByName("energyConversion")[0];
//  select.focus();
}; /* onLoad */

/*----------------------------------------------------------------------
selects a construction value
----------------------------------------------------------------------*/
function selectEC(button,index)
{
  var aInput = document.getElementsByTagName("label")[0];
  document.getElementsByName("EnergyHeating1")[0].value = index;
  aInput.innerHTML = index;
  var aInput = document.getElementsByTagName("label")[1];
  document.getElementsByName("EnergyCooling1")[0].value = dEnegyCool;
  aInput.innerHTML = dEnegyCool;
  var form = document.getElementsByTagName("form")[0];
  var ainput = form.getElementsByTagName("input");
  var inputSubmit = null;
  for (i = 0; i < ainput.length; i++)
  {
	    var input = ainput[i];
	    var sType = input.getAttribute("type");
	    if (sType == "text")
	      input.value = dValue.toFixed(2);
	    else if (sType == "submit")
	      inputSubmit = input;
  }
  inputSubmit.click();
//  alert("yeah");
}; /* select */

function selectEC1(button,index)
{
//  var parent = button.parentNode;
  var aInput = document.getElementsByTagName("label")[0];
  document.getElementsByName("EnergyCooling")[0].value = index;
  aInput.innerHTML = index;
  //var aInput = parent.getElementsByTagName("label")[1];
  //document.getElementsByName("EnergyCooling")[1].value = index;
  //aInput.innerHTML = index;
  var form = document.getElementsByTagName("form")[0];
  var ainput = form.getElementsByTagName("input");
  var inputSubmit = null;
  for (i = 0; i < ainput.length; i++)
  {
	    var input = ainput[i];
	    var sType = input.getAttribute("type");
	    if (sType == "text")
	      input.value = dValue.toFixed(2);
	    else if (sType == "submit")
	      inputSubmit = input;
  }
  inputSubmit.click();
//  alert("yeah");
}; /* select */