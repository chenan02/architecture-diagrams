/*== subscriptions.js ==================================================
Implements the initialization and the dialogs of subscriptions.xhtml.
Version    : $Id: subscriptions.js 2328 2015-11-18 15:34:03Z DEAN AND MIN $
Application: Comfort and Climate
Platform   : JavaScript 5, DOM
Description: distributes app data into XHTML.
========================================================================
Created    : 23.07.2012, DEAN WONG, MKIM, Enter AG, Zurich
Copyright  : 2015, Baumschlager Eberle, Vaduz, Liechtenstein
Created & Integrited  : Dean Wang and MIN

======================================================================*/

/*----------------------------------------------------------------------
Initializes users
 ---------------------------------------------------------------------*/
function setUsers()
{
  var table = document.getElementById("users");
  var iRows = table.rows.length;
  var iRow = iRows-1;
  for (; iRow > 0; iRow-- )
    table.deleteRow(iRow);
  for (var iUser = 0; iUser < Users.length; iUser++)
  {
    /* <tr>
         <td>
           <p>
             test@test.org
             <input name="id" type="hidden" value="UUID"/>
             <input name="generation" type="hidden" value="3"/>
           </p>
         </td>
         <td>
           <p>
             Test User
           </p>
         </td>
         <td>
           <p>
             31.08.2012
           </p>
         </td>
         <td>
           <p>
             <input type="checkbox" disabled="true" checked="true"/>
           </p>
         </td>
         <td>
           <p>
             <input style="width: 5cm" type="button" value="User löschen ..." title="Diesen User löschen"  onclick="openDeleteDialog(this)"/>
           </p>
         </td>
         <td>
           <p>
             <input style="width: 5cm" type="button" value="User ändern" title="Diesen User ändern" onclick="openEditDialog(this)"/>
           </p>
         </td>
       </tr> */
    var user = Users[iUser];
    var row = table.insertRow(iUser+1);
    /* first cell */
    var cell = row.insertCell(0);
    var p = document.createElement("p");
    cell.appendChild(p);
    p.appendChild(document.createTextNode(user.mailaddress));
    var input = document.createElement("input");
    input.setAttribute("type","hidden");
    input.setAttribute("name","id");
    input.value = user.id;
    p.appendChild(input);
    var input = document.createElement("input");
    input.setAttribute("type","hidden");
    input.setAttribute("name","generation");
    input.value = user.generation;
    p.appendChild(input);
    /* second cell */
    cell = row.insertCell(1);
    var p = document.createElement("p");
    cell.appendChild(p);
    p.appendChild(document.createTextNode(user.name));
    /* third cell */
    cell = row.insertCell(2);
    var p = document.createElement("p");
    cell.appendChild(p);
    p.appendChild(document.createTextNode(user.expiration.format("dd.MM.yyyy")));
    /* fourth cell */
    cell = row.insertCell(3);
    var p = document.createElement("p");
    cell.appendChild(p);
    input = document.createElement("input");
    input.setAttribute("type","checkbox");
    input.setAttribute("disabled","true");
    if (user.admin)
      input.setAttribute("checked","true");
    p.appendChild(input);
    /* fourth cell */
    cell = row.insertCell(4);
    p = document.createElement("p");
    cell.appendChild(p);
    input = document.createElement("input");
    input.setAttribute("type","button");
    input.setAttribute("style","width: 4cm");
    input.setAttribute("value",sDELETE_VALUE);
    input.setAttribute("onclick","openDeleteDialog(this)");
    input.setAttribute("title",sDELETE_TITLE);
    p.appendChild(input);          
    /* sixth cell */
    cell = row.insertCell(5);
    p = document.createElement("p");
    cell.appendChild(p);
    input = document.createElement("input");
    input.setAttribute("type","button");
    input.setAttribute("style","width: 4cm");
    input.setAttribute("value",sEDIT_VALUE);
    input.setAttribute("onclick","openEditDialog(this)");
    input.setAttribute("title",sEDIT_TITLE);
    p.appendChild(input);
  }
}; /* setUsers */

/*----------------------------------------------------------------------
Initializes preferences.xhtml
 ---------------------------------------------------------------------*/
function onLoad()
{
  setMessage();
  setUsers();
  /* in the end make body visible */
  var body = document.getElementsByTagName("body")[0];
  body.style.display="block";
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
}; /* resetOnEscape */

/*----------------------------------------------------------------------
Gets project id and name from this element and initialized the dialog
with it.
 ---------------------------------------------------------------------*/
function openDialog(input,sDialogId)
{
  var p = input.parentNode;
  var td = p.parentNode;
  var tr = td.parentNode;
  /* id and generation from hidden input in first cell */
  td = tr.cells.item(0);
  p = td.getElementsByTagName("p")[0];
  /* mail address from first cell */
  var sMailAddress = p.textContent;
  var sId = null;
  var iGeneration = null;
  var ainput = p.getElementsByTagName("input");
  for (var i = 0; i < ainput.length; i++)
  {
    var input = ainput[i];
    var sName = input.getAttribute("name");
    if (sName == "id")
      sId = input.getAttribute("value");
    else if (sName == "generation")
      iGeneration = input.getAttribute("value");
  }
  /* name from paragraph in second cell */
  td = tr.cells.item(1);
  p = td.getElementsByTagName("p")[0];
  var sName = p.textContent;
  /* expiration from third cell */
  td = tr.cells.item(2);
  p = td.getElementsByTagName("p")[0];
  var sExpirationDate = p.textContent;
  /* admin from fourth cell */
  td = tr.cells.item(3);
  input = td.getElementsByTagName("input")[0];
  var bAdmin = false;
  if (input.getAttribute("checked") != null)
    bAdmin = true;
  /* overlay background with opaque modality layer */        
  var div = document.getElementById("modal");
  div.style.display = "block";
  /* fix dialog and then display it */
  div = document.getElementById(sDialogId);
  var table = div.getElementsByTagName("table")[0];
  /* insert id and generation in hidden input elements in first row in first cell */
  var row = table.rows.item(0);
  var cell = row.cells.item(0);
  var ainput = cell.getElementsByTagName("input");
  var i = 0;
  for (; i < ainput.length; i++)
  {
    input = ainput[i];
    var sInputName = input.getAttribute("name");
    if (sInputName == "id")
      input.setAttribute("value",sId);
    else if (sInputName == "generation")
      input.setAttribute("value",iGeneration);
  }
  /* insert mail address in first row in second cell */
  cell = row.cells.item(1);
  var strong = cell.getElementsByTagName("strong")[0];
  strong.replaceChild(document.createTextNode(sMailAddress),strong.firstChild);
  /* insert name in second row in second cell */
  var row = table.rows.item(1);
  var cell = row.cells.item(1);
  var p = cell.getElementsByTagName("p")[0];
  p.replaceChild(document.createTextNode(sName),p.firstChild);
  /* set expirationdate value in third row in second cell */
  var row = table.rows.item(2);
  var cell = row.cells.item(1);
  if (sDialogId == "editdialog")
  {
    var input = cell.getElementsByTagName("input")[0];
    input.setAttribute("value",sExpirationDate);
  }
  else if (sDialogId == "deletedialog")
  {
    var p = cell.getElementsByTagName("p")[0];
    p.replaceChild(document.createTextNode(sExpirationDate),p.firstChild);
  }
  /* set admin value in third row in second cell */
  var row = table.rows.item(3);
  var cell = row.cells.item(1);
  var input = cell.getElementsByTagName("input")[0];
  if (bAdmin)
    input.setAttribute("checked","true");
  /* a small helper for impatient people */
  if (div.addEventListener)
    div.addEventListener("keydown",resetOnEscape,false);
  div.style.display = "block";
  /* if there is an input element with name expiration in third row and second cell then focus on it */
  row = table.rows.item(2);
  cell = row.cells.item(1);
  input = cell.getElementsByTagName("input")[0];
  if (input == null)
  {
    var row = table.rows.item(4);
    var cell = row.cells.item(1);
    input = cell.getElementsByTagName("input")[0];
  }
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
}; /* closeDialog */

/*----------------------------------------------------------------------
Closes the dialog
----------------------------------------------------------------------*/
function openEditDialog(input)
{
  openDialog(input,"editdialog");
};
function closeEditDialog()
{
  closeDialog("editdialog");
};
function openDeleteDialog(input)
{
  openDialog(input,"deletedialog");
};
function closeDeleteDialog()
{
  closeDialog("deletedialog");
};
function validateEditDialog()
{
  var bValid = false;
  var input = document.getElementsByName("expiration")[0];
  var sDate = input.value;
  var date = Date.parse(sDate,"dd.MM.yyyy");
  if (date != null)
  {
    var s = date.format("dd.MM.yyyy");
    if (sDate == date.format("dd.MM.yyyy"))
      bValid = true;
  }
  if (!bValid)
    alert(MESSAGES.invalid_date);
  return bValid;
}; /* validateEditDialog */