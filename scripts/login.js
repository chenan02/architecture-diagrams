/*== login.js ==========================================================
Implements the initialization of login.xhtml.
Version    : $Id: login.js 2238 2012-08-23 07:04:53Z hartwig $
Application: Comfort and Climate
Platform   : JavaScript 5, DOM
Description: distributes app data into XHTML.
========================================================================
Created    : 04.07.2012, Hartwig Thomas, Enter AG, Zurich
Copyright  : 2012, Baumschlager Eberle, Vaduz, Liechtenstein
======================================================================*/

/*----------------------------------------------------------------------
Initializes login.xhtml
 ---------------------------------------------------------------------*/
function onLoad()
{
  setMessage();
  /* in the end make body visible */
  var body = document.getElementsByTagName("body")[0];
  body.style.display="block";
  var input = document.getElementsByName("mailaddress")[0];
  input.value = sMailAddress;
  if (sMailAddress)
    var input = document.getElementsByName("password")[0];
  input.focus();
} /* onLoad */

/*----------------------------------------------------------------------
Submits the form with the value "request" for the login button.
 ---------------------------------------------------------------------*/
function submitRequest()
{
  var input = document.getElementsByName("login")[0];
  input.value = "request";
  input.click();
} /* submitRequest */

/*----------------------------------------------------------------------
Submits the form with the value "request" for the register button
if the terms and conditions have been accepted.
 ---------------------------------------------------------------------*/
function register()
{
  var input = document.getElementById("tcagree");
  if (input.checked)
  {
    var input = document.getElementsByName("login")[0];
    input.value = "register";
    input.click();
  }
  else
    alert("You must agree with the Terms and Conditions before registering!");
} /* submitRequest */
