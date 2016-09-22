/*== about.js ======================================================
Implements the initialization of about.xhtml.
Version    : $Id: about.js 2325 2015-11-18 15:34:03Z DEAN AND MIN $
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
  if (bLoggedIn)
  {
    var divHeader = document.getElementById("header");
    var ap = divHeader.getElementsByTagName("p");
    for (var i = 0; i < ap.length; i++)
    {
      var p = ap[i];
      if (p.getAttribute("class") == "loggedin")
        p.style.display = "block";
    }
  }
  var p = document.getElementById("username");
  p.appendChild(document.createTextNode(sUserName));
  var p = document.getElementById("application");
  p.replaceChild(document.createTextNode(sApplication),p.firstChild);
  var p = document.getElementById("version");
  p.replaceChild(document.createTextNode(sVersion),p.firstChild);
  var p = document.getElementById("database");
  p.replaceChild(document.createTextNode(sDatabase),p.firstChild);
  var p = document.getElementById("dbversion");
  p.replaceChild(document.createTextNode(sDbVersion),p.firstChild);
  var p = document.getElementById("mail");
  p.replaceChild(document.createTextNode(sMail),p.firstChild);
  var p = document.getElementById("mailversion");
  p.replaceChild(document.createTextNode(sMailVersion),p.firstChild);
  var p = document.getElementById("runtime");
  p.replaceChild(document.createTextNode(sRuntime),p.firstChild);
  var p = document.getElementById("rtversion");
  p.replaceChild(document.createTextNode(sRtVersion),p.firstChild);
  var p = document.getElementById("os");
  p.replaceChild(document.createTextNode(sOs),p.firstChild);
  var p = document.getElementById("osversion");
  p.replaceChild(document.createTextNode(sOsVersion),p.firstChild);
  var p = document.getElementById("year");
  p.replaceChild(document.createTextNode(sYear),p.firstChild);
  var p = document.getElementById("copyright");
  p.replaceChild(document.createTextNode(sCopyright),p.firstChild);
  var p = document.getElementById("projectmanagement");
  p.replaceChild(document.createTextNode(sProjectManagement),p.firstChild);
  var p = document.getElementById("pmcompany");
  p.replaceChild(document.createTextNode(sPmCompany),p.firstChild);
  var p = document.getElementById("development");
  p.replaceChild(document.createTextNode(sDevelopment),p.firstChild);
  var p = document.getElementById("devcompany");
  p.replaceChild(document.createTextNode(sDevCompany),p.firstChild);
  var p = document.getElementById("testing");
  p.replaceChild(document.createTextNode(sTesting),p.firstChild);
  var p = document.getElementById("testcompany");
  p.replaceChild(document.createTextNode(sTestCompany),p.firstChild);
}; /* setInputFields */

/*----------------------------------------------------------------------
Initializes about.xhtml
 ---------------------------------------------------------------------*/
function onLoad()
{
  setMessage();
  setInputFields();
  /* in the end make body visible */
  var body = document.getElementsByTagName("body")[0];
  body.style.display="block";
}; /* onLoad */
