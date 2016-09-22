/*== candc.js ==========================================================
Implements the initialization of all UI elements.
Version    : $Id: candc.js 2330 2015-11-18 15:34:03Z DEAN AND MIN $
Application: Comfort and Climate
Platform   : JavaScript 5, DOM
Description: distributes app data into XHTML.
========================================================================
Created    : 23.07.2012, DEAN WONG, MKIM, Enter AG, Zurich
Copyright  : 2015, Baumschlager Eberle, Vaduz, Liechtenstein
======================================================================*/

/*----------------------------------------------------------------------
Initializes message
----------------------------------------------------------------------*/
function setMessage()
{
  var p = document.getElementById("message");
  /* delete its contents */
  while (p.hasChildNodes())
    p.removeChild(p.lastChild);
  if (sMessage)
  {
    var asLine = sMessage.split("\n");
    var iLine = 0;
    for (; iLine < asLine.length; iLine++)
    {
      p.appendChild(document.createTextNode(asLine[iLine]));
      p.appendChild(document.createElement("br"));
    }
  }
}; /* setMessage */

/*----------------------------------------------------------------------
Initializes project fields
----------------------------------------------------------------------*/
function setProjectFields()
{
  var p = document.getElementById("username");
  p.appendChild(document.createTextNode(sUserName));
  var p = document.getElementById("projectname");
  p.appendChild(document.createTextNode(sProjectName));
  var input = document.getElementsByName("projectgeneration")[0];
  if (input)
    input.value=iProjectGeneration;
  var divNav = document.getElementById("nav");
  if (typeof sFreePages === 'undefined')
    sFreePages = "";
  if (typeof bExpired === 'undefined')
    bExpired = false;
  /* loop over all anchors */
  var aa = divNav.getElementsByTagName("a");
  for (var iAnchor = 0; iAnchor < aa.length; iAnchor++)
  {
    var a = aa[iAnchor];
    var p = a.parentNode;
    var img = p.getElementsByTagName("img")[0];
    img.style.display = "none";
    var sLink = a.href;
    var iExtension = sLink.lastIndexOf(".");
    if (iExtension >= 0)
      sLink = sLink.substring(0,iExtension);
    var iPath = sLink.lastIndexOf("/");
    if (iPath >= 0)
      sLink = sLink.substring(iPath+1);
    var iFree = sFreePages.indexOf(sLink);
    if (iFree >= 0)
    {
      /* display image if expired */
      if (bExpired)
        img.style.display = "inline";
    }
    else
    {
      /* set redirection if expired */
      if (bExpired)
      {
        a.href = "../preferences.xhtml?renew_subscription";
        a.onclick = remind;
      }
    }
  }
}; /* setProjectFields */

/*----------------------------------------------------------------------
remind of expired subscription
----------------------------------------------------------------------*/
function remind()
{
  alert("You must renew your subscription to access this page.");
  return true;
} /* remind */

/*----------------------------------------------------------------------
selects a default value
----------------------------------------------------------------------*/
function select(button,dValue)
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
      input.value = dValue.toFixed(2);
    else if (sType == "submit")
      inputSubmit = input;
  }
  inputSubmit.click();
}; /* select */

/*----------------------------------------------------------------------
numericInput checks whether the input element associated with sName is 
numeric and returns it or null, if it is not. 
 ---------------------------------------------------------------------*/
function numericInput(sName, sMessage)
{
  var input = document.getElementsByName(sName)[0];
  var sValue = input.value;
  if (isNaN(sValue))
  {
    alert(sMessage);
    input.focus();
    input = null;
  }
  return input;
}; /* numericInput */

/*----------------------------------------------------------------------
positiveNumber checks whether the input element associated with sName is 
positive and returns it or null, if it is not. 
 ---------------------------------------------------------------------*/
function positiveNumber(sName, sMessageNumeric, sMessagePositive)
{
  var dValue = null;
  var input = numericInput(sName, sMessageNumeric);
  if (input != null)
  {
    dValue = Number(input.value); 
    if (dValue <= 0)
    {
      dValue = null;
      alert(sMessagePositive);
      input.focus();
    }
  }
  return dValue;
}; /* positiveNumber */

/*----------------------------------------------------------------------
nonnegativeNumber checks whether the input element associated with sName
is nonnegative and returns it or null, if it is not. 
 ---------------------------------------------------------------------*/
function nonnegativeNumber(sName, sMessageNumeric, sMessagePositive)
{
  var dValue = null;
  var input = numericInput(sName, sMessageNumeric);
  if (input != null)
  {
    dValue = Number(input.value); 
    if (dValue < 0)
    {
      dValue = null;
      alert(sMessagePositive);
      input.focus();
    }
  }
  return dValue;
}; /* nonnegativeNumber */

/*----------------------------------------------------------------------
percentNumber checks whether the input element associated with sName is 
between 0 and 100 and returns it or null, if it is not. 
 ---------------------------------------------------------------------*/
function percentNumber(sName, sMessageNumeric, sMessageBounds)
{
  var dValue = null;
  var input = numericInput(sName, sMessageNumeric);
  if (input != null)
  {
    dValue = Number(input.value); 
    if ((dValue < 0) || (dValue > 100))
    {
      dValue = null;
      alert(sMessageBounds);
      input.focus();
    }
  }
  return dValue;
}; /* percentNumber */
