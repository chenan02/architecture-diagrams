/*== date.js ===========================================================
Date module for enhancing Date functionality.
Version     : $Id: date.js 2265 2015-11-18 15:34:03Z DEAN AND MIN $
Application: Comfort and Climate
Platform   : JavaScript 5, DOM
Description: distributes app data into XHTML.
========================================================================
Created    : 23.07.2012, DEAN WONG, MKIM, Enter AG, Zurich
Copyright  : 2015, Baumschlager Eberle, Vaduz, Liechtenstein
======================================================================*/

/*======================================================================
Date enhancement
======================================================================*/
(function() // anonymous function for private scope
{
  
  /*----------------------------------------------------------------------
  (private static) replaceFormat replaces all occurrences of sChar in sDate 
  with the values in sValue from right to left, filling the rest with 0s.
  ----------------------------------------------------------------------*/
  function replaceFormat(sDate,sChar,sValue)
  {
    var s;
    var bFound = true;
    var j = sValue.length;
    for (var i = sDate.lastIndexOf(sChar); bFound; i = sDate.lastIndexOf(sChar,i-1))
    {
      if (i >= 0)
      {
        if (j > 0)
        {
          j--;
          s = sValue.substr(j,1);
        }
        else
          s = "0";
        sDate = sDate.substr(0,i) + s + sDate.substr(i+1);
        if (i == 0)
          bFound = false;
      }
      else
        bFound = false;
    }
    return sDate;
  }; /* replaceFormat */

  /*----------------------------------------------------------------------
  (private static) extractFormat examines all occurrences of sChar in sFormat
  and extracts the corresponding character string from sDate.
  ----------------------------------------------------------------------*/
  function extractFormat(sDate,sFormat,sChar)
  {
    var sValue = "";
    var bFound = true;
    for (var i = sFormat.lastIndexOf(sChar); bFound; i = sFormat.lastIndexOf(sChar,i-1))
    {
      if (i >= 0)
      {
        if (i < sDate.length)
          sValue = sDate.charAt(i) + sValue;
        if (i == 0)
          bFound = false;
      }
      else
        bFound = false;
    }
    if (!sValue)
      sValue = "0";
    return sValue;
  }; /* extractFormat */

  /*----------------------------------------------------------------------
  (public) format does usual formatting
  ----------------------------------------------------------------------*/
  function format(sFormat)
  {
    /* replace all y in sFormat by year */
    var sDate = sFormat;
    var sYear = this.getFullYear().toString();
    sDate = replaceFormat(sDate,"y",sYear);
    var sMonth = (this.getMonth()+1).toString();
    sDate = replaceFormat(sDate,"M",sMonth);
    var sDay = (this.getDate()).toString();
    sDate = replaceFormat(sDate,"d",sDay);
    var sHours = (this.getHours()).toString();
    sDate = replaceFormat(sDate,"h",sHours);
    var sMinutes = (this.getMinutes()).toString();
    sDate = replaceFormat(sDate,"m",sMinutes);
    var sSeconds = (this.getSeconds()).toString();
    sDate = replaceFormat(sDate,"s",sSeconds);
    var sMilliseconds = (this.getMilliseconds()).toString();
    sDate = replaceFormat(sDate,"f",sMilliseconds);
    return sDate;
  }; /* format */
  /* make it public */
  Date.prototype.format = format;
   
  /*----------------------------------------------------------------------
  (public, static) parse does usual parsing
  ----------------------------------------------------------------------*/
  function parse(sDate, sFormat)
  {
    var date = new Date();
    /* extract all y in format */
    var sYear = extractFormat(sDate,sFormat,"y");
    date.setFullYear(sYear);
    var sMonth = extractFormat(sDate,sFormat,"M");
    date.setMonth(sMonth-1);
    var sDay = extractFormat(sDate,sFormat,"d");
    date.setDate(sDay);
    var sHours = extractFormat(sDate,sFormat,"h");
    date.setHours(sHours);
    var sMinutes = extractFormat(sDate,sFormat,"m");
    date.setMinutes(sMinutes);
    var sSeconds = extractFormat(sDate,sFormat,"s");
    date.setSeconds(sSeconds);
    var sMilliseconds = extractFormat(sDate,sFormat,"f");
    date.setMilliseconds(sMilliseconds);
    return date;
  }; /* parse */
  /* make it public */
  Date.parse = parse;
   
  /*----------------------------------------------------------------------
  (public) timestamp returns a string for the date
  ----------------------------------------------------------------------*/
  function timestamp()
  {
    return this.format("dd.MM.yyyy hh:mm:ss.ffffff");
  }; /* timestamp */
  /* make it public */
  Date.prototype.timestamp = timestamp;
 
  /*----------------------------------------------------------------------
  (public static) tsNow returns current timestamp
  ----------------------------------------------------------------------*/
  function tsNow()
  {
    return new Date().timestamp();
  }; /* tsNow */
  /* make it public */
  Date.prototype.tsNow = tsNow;

  /*--------------------------------------------------------------------
  (public, static) nowMs current Date/Time im Milliseconds
  --------------------------------------------------------------------*/
  function nowMs()
  {
    return new Date().getTime();
  }; /* nowms */
  /* make it public */
  Date.nowMs = nowMs;
  
})(); /* private scope */
