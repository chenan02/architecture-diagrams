/*== preferences.js ======================================================
Implements the initialization and the dialogs of preferences.xhtml.
Version    : $Id: preferences.js 2325 2012-09-18 15:34:03Z hartwig $
Application: Comfort and Climate
Platform   : JavaScript 5, DOM
Description: distributes app data into XHTML.
========================================================================
Created    : 04.07.2012, Hartwig Thomas, Enter AG, Zurich
Copyright  : 2012, Baumschlager Eberle, Vaduz, Liechtenstein
======================================================================*/

var sCLIMATE_XHTML = "/climate.xhtml";

/*----------------------------------------------------------------------
Initializes preferences
----------------------------------------------------------------------*/
function setPreferences()
{
  var p = document.getElementById("username");
  p.appendChild(document.createTextNode(sUserName));
  var input = document.getElementsByName("mailaddress")[0];
  input.value = sMailAddress;
  input = document.getElementsByName("password")[0];
  input.value="";
  input = document.getElementById("name");
  input.value = sUserName;
  input = document.getElementsByName("role")[0];
  input.value = sRole;
  input = document.getElementsByName("usergeneration")[0];
  input.value = iUserGeneration;
  input = document.getElementById("expiration");
  input.value = dateExpiration.format("dd.MM.yyyy");
}; /* setPreferences */

/*----------------------------------------------------------------------
Initializes projects
 ---------------------------------------------------------------------*/
function setProjects()
{
  var table = document.getElementById("projects");
  var iRows = table.rows.length;
  for (var iRow = iRows-2; iRow > 0; iRow-- )
    table.deleteRow(iRow);
  for (var iProject = 0; iProject < Projects.length; iProject++)
  {
    var row = table.insertRow(iProject+1);
    var project = Projects[iProject];
    /* first cell */
    var cell = row.insertCell(0);
    var p = document.createElement("p");
    cell.appendChild(p);
    var a = document.createElement("a");
    a.setAttribute("href",project.id+sCLIMATE_XHTML);
    a.setAttribute("title",sSELECT_TITLE)
    a.appendChild(document.createTextNode(project.name));
    p.appendChild(a);
    var input = document.createElement("input");
    input.setAttribute("type","hidden");
    input.setAttribute("name","projectgeneration");
    input.value = project.generation;
    p.appendChild(input);
    /* second cell */
    cell = row.insertCell(1);
    p = document.createElement("p");
    cell.appendChild(p);
    input = document.createElement("input");
    input.setAttribute("type","button");
    input.setAttribute("style","width: 4cm");
    input.setAttribute("value",sDELETE_VALUE);
    input.setAttribute("onclick","openDeleteDialog(this)");
    input.setAttribute("title",sDELETE_TITLE);
    p.appendChild(input);
    /* third cell */
    cell = row.insertCell(2);
    p = document.createElement("p");
    cell.appendChild(p);
    input = document.createElement("input");
    input.setAttribute("type","button");
    input.setAttribute("style","width: 4cm");
    input.setAttribute("value",sRENAME_VALUE);
    input.setAttribute("onclick","openRenameDialog(this)");
    input.setAttribute("title",sRENAME_TITLE);
    p.appendChild(input);          
    /* fourth cell */
    cell = row.insertCell(3);
    p = document.createElement("p");
    cell.appendChild(p);
    input = document.createElement("input");
    input.setAttribute("type","button");
    input.setAttribute("style","width: 4cm");
    input.setAttribute("value",sCOPY_VALUE);
    input.setAttribute("onclick","openCopyDialog(this)");
    input.setAttribute("title",sCOPY_TITLE);
    p.appendChild(input);
  }
}; /* setProjects */

/*----------------------------------------------------------------------
Initializes preferences.xhtml
 ---------------------------------------------------------------------*/
function onLoad()
{
  setMessage();
  setPreferences();
  setProjects();
  if (sRole == "candcadmin")
  {
    var h2 = document.getElementById("subscriptions");
    h2.style.display="block";
  }
  /* in the end make body visible */
  var body = document.getElementsByTagName("body")[0];
  body.style.display="block";
  var input = document.getElementById("name");
  input.focus();
}; /* onLoad */

/*----------------------------------------------------------------------
resets the only form inside this, if Esc is pressed.
 ---------------------------------------------------------------------*/
function resetOnEscape(e)
{
  var bContinue = true;
  if (e.keyCode == 27)
  {
    var form = this.getElementsByTagName("form")[0];
    form.reset();
    bContinue = false;
  }
  return bContinue;
} /* resetOnEscape */

/*----------------------------------------------------------------------
Gets project id and name from this element and initialized the dialog
with it.
 ---------------------------------------------------------------------*/
function openDialog(input,sDialogId)
{
  var p = input.parentNode;
  var td = p.parentNode;
  var tr = td.parentNode;
  /* first cell */
  td = tr.cells.item(0);
  p = td.getElementsByTagName("p")[0];
  /* id from anchor in first cell */
  var a = p.getElementsByTagName("a")[0];
  var sUrl = a.getAttribute("href");
  var sId = sUrl.substring(0,sUrl.length-sCLIMATE_XHTML.length);
  /* generation from input in first cell */
  var input = td.getElementsByTagName("input")[0];
  var sGeneration = input.getAttribute("value");
  /* name from paragraph in first cell */
  var sName = p.textContent;
  /* overlay background with opaque modality layer */        
  var div = document.getElementById("modal");
  div.style.display = "block";
  /* fix dialog and then display it */
  div = document.getElementById(sDialogId);
  var table = div.getElementsByTagName("table")[0];
  /* insert id in hidden input element in first row in first cell */
  var row = table.rows.item(0);
  var cell = row.cells.item(0);
  var ainput = cell.getElementsByTagName("input");
  var i = 0;
  for (; i < ainput.length; i++)
  {
    input = ainput[i];
    var sInputName = input.getAttribute("name");
    if (sInputName == "projectid")
      input.setAttribute("value",sId);
    else if (sInputName == "projectgeneration")
      input.setAttribute("value",sGeneration);
  }
  /* insert name in first row in second cell */
  cell = row.cells.item(1);
  var strong = cell.getElementsByTagName("strong")[0];
  strong.replaceChild(document.createTextNode(sName),strong.firstChild);
  /* a small helper for impatient people */
  if (div.addEventListener)
    div.addEventListener("keydown",resetOnEscape,false);
  div.style.display = "block";
  /* if there is an input element with name projectname in second row and second cell then focus on it */
  row = table.rows.item(1);
  cell = row.cells.item(1);
  input = cell.getElementsByTagName("input")[0];
  /* this is the text input or the submit button */
  input.focus();
}; /* openDialog */

/*----------------------------------------------------------------------
Closes the dialog
----------------------------------------------------------------------*/
function closeDialog(sDialogId)
{
  var div = document.getElementById(sDialogId);
  div.style.display = "none";
  var div = document.getElementById("modal");
  div.style.display = "none";
} /* closeDialog */

/*----------------------------------------------------------------------
Closes the dialog
----------------------------------------------------------------------*/
function openCopyDialog(input)
{
  openDialog(input,"copydialog");
}
function closeCopyDialog()
{
  closeDialog("copydialog");
}
function openRenameDialog(input)
{
  openDialog(input,"renamedialog");
}
function closeRenameDialog()
{
  closeDialog("renamedialog");
}
function openDeleteDialog(input)
{
  openDialog(input,"deletedialog");
}
function closeDeleteDialog()
{
  closeDialog("deletedialog");
}
