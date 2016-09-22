/*== diagrams.js =========================================================
Implements the SVG diagrams.
Version    : $Id: diagrams.js 2337 2015-11-18 15:34:03Z DEAN AND MIN $
Application: Comfort and Climate
Platform   : JavaScript 5, DOM
Description: distributes app data into XHTML.
========================================================================
Created    : 23.07.2015, DEAN WONG, MKIM, Enter AG, Zurich
Copyright  : 2016, Baumschlager Eberle, Vaduz, Liechtenstein
======================================================================*/
var g_sNsSvg = "http://www.w3.org/2000/svg";
var g_sNsXLink = "http://www.w3.org/1999/xlink"
var iLINE_HEIGHT_NORMAL = 12; /* in pt */
var iLINE_HEIGHT_SMALL = 8; /* in pt */
var iPOINTS_PER_INCH = 72;
var iPIXELS_PER_INCH = 96;
var iMM_PER_INCH = 25.4;
var dEPSILON = 1E-7;
var dTICK_IN_MM = 1.2;
var dTRIANGLE_IN_MM = 2;
var g_dScaleX = 1.0;
var g_dScaleY = 1.0;
var dMIN_ENERGY_PER_YEAR = 0;
var dMAX_ENERGY_PER_YEAR = 200;
var dLABEL_ENERGY_PER_YEAR = 10;
var dMIN_ENERGY_PER_MONTH = 0;
var dMAX_ENERGY_PER_MONTH = 20;
var dLABEL_ENERGY_PER_MONTH = 1;
var dMIN_TEMPERATURE_PER_MONTH = -5;
var dMAX_TEMPERATURE_PER_MONTH = 45;
var dLABEL_TEMPERATURE_PER_MONTH = 5;
var sCLIP_PATH_YEAR = "clipyear";
var sCLIP_RECT_YEAR = "cliprectyear";
var sCLIP_PATH_ENERGY = "clipenergy";
var sCLIP_RECT_ENERGY = "cliprectenergy";
var sCLIP_PATH_TEMPERATURE = "cliptemperature";
var sCLIP_RECT_TEMPERATURE = "cliprecttemperature";
var asMONTH_LABEL = ["Jan","Feb","Mar","Apr","May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dez"];

function getPixelsFromPoints(iPoints)
{
  return iPIXELS_PER_INCH*iPoints/iPOINTS_PER_INCH;
}; /* getPixelsFromPoints */

function getPixelsFromMm(iMm)
{
  return iPIXELS_PER_INCH*iMm/iMM_PER_INCH;
}; /* getPixelsFromMM */

/*----------------------------------------------------------------------
return a line with a sensible stroke-width
@param dX1 x coordinate of start point.
@param dY1 y coordinate of start point.
@param dX2 x coordinate of end point.
@param dY2 y coordinate of end point.
@param dPixelStrokeWidth stroke-width in pixel coordinates.
@param sClass: line class(to be used for changing stroke etc.)
@return line element.
 ---------------------------------------------------------------------*/
function getLine(dX1, dY1, dX2, dY2, dPixelStrokeWidth, sClass)
{
  var line = document.createElementNS(g_sNsSvg,"line");
  var dDx = dX2 - dX1;
  var dDy = dY2 - dY1;
  var dAngle = Math.PI/2.0;
  if (Math.abs(dDx) > dEPSILON)
    dAngle = Math.atan(dDy/dDx);
  var dStrokeWidth = dPixelStrokeWidth*(Math.cos(dAngle)/Math.abs(g_dScaleY)+Math.sin(dAngle)/Math.abs(g_dScaleX));
  line.setAttribute("x1",dX1);
  line.setAttribute("y1",dY1);
  line.setAttribute("x2",dX2);
  line.setAttribute("y2",dY2);
  line.style.strokeWidth = dStrokeWidth;
  if (sClass)
    line.setAttribute("class",sClass);
  return line;
}; /* getLine */

/*----------------------------------------------------------------------
return a dashed line with a sensible stroke-width and stroke-dasharray
@param dX1 x coordinate of start point.
@param dY1 y coordinate of start point.
@param dX2 x coordinate of end point.
@param dY2 y coordinate of end point.
@param dPixelStrokeWidth stroke-width in pixel coordinates.
@param dPixelDashLength stroke-dasharray element length.
@param sClass: line class(to be used for changing stroke etc.)
@return line element.
 ---------------------------------------------------------------------*/
function getDashedLine(dX1, dY1, dX2, dY2, dPixelStrokeWidth, dPixelDashLength, sClass)
{
  var line = document.createElementNS(g_sNsSvg,"line");
  var dDx = dX2 - dX1;
  var dDy = dY2 - dY1;
  var dAngle = Math.PI/2.0;
  if (Math.abs(dDx) > dEPSILON)
    dAngle = Math.atan(dDy/dDx);
  var dStrokeWidth = dPixelStrokeWidth*(Math.cos(dAngle)/Math.abs(g_dScaleY)+Math.sin(dAngle)/Math.abs(g_dScaleX));
  var dDashLength = dPixelDashLength*(Math.cos(dAngle)/Math.abs(g_dScaleX)+Math.sin(dAngle)/Math.abs(g_dScaleY));
  line.setAttribute("x1",dX1);
  line.setAttribute("y1",dY1);
  line.setAttribute("x2",dX2);
  line.setAttribute("y2",dY2);
  line.style.strokeWidth=dStrokeWidth;
  line.style.strokeDasharray=dDashLength+" "+dDashLength;
  if (sClass)
    line.setAttribute("class",sClass);
  return line;
}; /* getDashedLine */

/*----------------------------------------------------------------------
return a graphic element to be inserted at the current location
(with the current scale) for horizontal text.
@param dX x coordinate of text anchor on base line at current scale
@param dY y coordinate of text anchor on base line at current scale
@param dDx x offset in pixels
@param dDy x offset in pixels
@param sText text to be drawn.
@param sClass: text class (to be used for changing font-size, text-anchor etc.)
@return g element containing the text.
 ---------------------------------------------------------------------*/
function getText(dX, dY, sText, sClass)
{
  var g = document.createElementNS(g_sNsSvg,"g");
  var sTranslate = "translate("+dX+","+dY+")";
  var sScale = "scale("+1.0/g_dScaleX+","+1.0/g_dScaleY+")";
  g.setAttribute("transform",sTranslate+" "+sScale);
  var text = document.createElementNS(g_sNsSvg,"text");
  g.appendChild(text);
  if (sClass)
    text.setAttribute("class",sClass);
  text.appendChild(document.createTextNode(sText));
  return g;
}; /* getText */

function getText_XAxis(dX, dY, sText, sClass)
{
  var g = document.createElementNS(g_sNsSvg,"g");
  var sTranslate = "translate("+dX+","+dY+")";
  var sScale = "scale("+1.0/g_dScaleX+","+1.0/g_dScaleY+")";
  g.setAttribute("transform",sTranslate+" "+sScale);
  var text = document.createElementNS(g_sNsSvg,"text");
  g.appendChild(text);
  if (sClass)
    text.setAttribute("class",sClass);
  if (sText == 1) 
    text.appendChild(document.createTextNode("Current"));
  else
    text.appendChild(document.createTextNode(sText-1));
  return g;
}; /* getText */


/*----------------------------------------------------------------------
return a graphic element containing a rectangle legend with base line on dY
@param dX x offset of the rectangle
@param dY y offset of the rectangle
@param sText text of the legend
@param sClass class of the rectangle (determining its color)
@return g element containing the rectangle and the text.
 ---------------------------------------------------------------------*/
function getRectLegend(dX, dY, sText, sClass)
{
  var iLineHeight = getPixelsFromPoints(iLINE_HEIGHT_NORMAL);
  var g = document.createElementNS(g_sNsSvg,"g");
  var rect = document.createElementNS(g_sNsSvg,"rect");
  var iRectWidth = getPixelsFromMm(17.5);
  var iOffset = getPixelsFromMm(1);
  rect.setAttribute("x",dX);
  rect.setAttribute("y",dY-iLineHeight/2);
  rect.setAttribute("width",iRectWidth);
  rect.setAttribute("height", iLineHeight/2);
  if (sClass)
    rect.setAttribute("class",sClass);
  g.appendChild(rect);
  g.appendChild(getText(dX+iRectWidth+iOffset,dY,sText,"legend"));
  return g;
}; /* getRectLegend */

/*----------------------------------------------------------------------
return a graphic element containing a line legend with base line on dY
@param dX x offset of the rectangle
@param dY y offset of the rectangle
@param sText text of the legend
@param sClass class of the rectangle (determining its color)
@return g element containing the line and the text.
 ---------------------------------------------------------------------*/
function getLineLegend(dX, dY, sText, sClass)
{
  var iLineHeight = getPixelsFromPoints(iLINE_HEIGHT_NORMAL);
  var g = document.createElementNS(g_sNsSvg,"g");
  var line = document.createElementNS(g_sNsSvg,"line");
  var iLineLength = getPixelsFromMm(17.5);
  var iOffset = getPixelsFromMm(1);
  line.setAttribute("x1",dX);
  line.setAttribute("y1",dY-iLineHeight/4);
  line.setAttribute("x2",dX+iLineLength);
  line.setAttribute("y2",dY-iLineHeight/4);
  if (sClass)
    line.setAttribute("class",sClass);
  g.appendChild(line);
  g.appendChild(getText(dX+iLineLength+iOffset,dY,sText,"legend"));
  return g;
}; /* getLineLegend */

/*----------------------------------------------------------------------
return the clipping rectangle
@param dMinX minimum x coordinate (user coordinates)
@param dMaxX maximum x coordinate (user coordinates)
@param dMinY minimum y coordinate (user coordinates)
@param dMaxY maximum y coordinate (user coordinates)
@param sClipPath id of clip path.
@param sClipRect id of clipping rectangle;
@return defs element.
----------------------------------------------------------------------*/
function getClipDefs(dMinX, dMaxX, dMinY, dMaxY, sClipPath, sClipRect)
{
  var defs = document.createElementNS(g_sNsSvg,"defs");
  var clipPath = document.createElementNS(g_sNsSvg,"clipPath");
  defs.appendChild(clipPath);
  clipPath.setAttribute("id",sClipPath);
  defs.appendChild(clipPath);
  var rect = document.createElementNS(g_sNsSvg,"rect");
  clipPath.appendChild(rect);
  rect.setAttribute("id",sClipRect);
  rect.setAttribute("x",dMinX);
  rect.setAttribute("y",dMinY);
  rect.setAttribute("width",dMaxX-dMinX);
  rect.setAttribute("height",dMaxY-dMinY);
  rect.style.fill="yellow";
  return defs;
}; /* getClipDefs */

/*----------------------------------------------------------------------
return a transform string (order: translate, scale) which maps user 
coordinate (dMinX,dMinY) to pixel coordinates (dPixelMinX,dPixelMinY) and
user coordinates (dMaxX,dMaxY) to pixel coordinates (dPixelMaxX,dPixelMaxY)
setting the global scale variables as a side effect.
@param dPixelMinX minimum x-coordinate (pixel coordinates).
@param dPixelMaxX maximum x-coordinate (pixel coordinates).
@param dPixelMinY minimum y-coordinate (pixel coordinates).
@param dPixelMaxY maximum y-coordinate (pixel coordinates).
@param dMinX minimum x-coordinate (user coordinates).
@param dMaxX maximum x-coordinate (user coordinates).
@param dMinY minimum y-coordinate (user coordinates).
@param dMaxY maximum y-coordinate (user coordinates).
@return transform string.
----------------------------------------------------------------------*/
function getTransform(dPixelMinX,dPixelMaxX,dPixelMinY,dPixelMaxY,dMinX, dMaxX, dMinY, dMaxY)
{
  var dDx = dMaxX - dMinX;
  var dDy = dMaxY - dMinY;
  var dPixelDx = dPixelMaxX - dPixelMinX;
  var dPixelDy = dPixelMaxY - dPixelMinY;
  var dScaleX = dPixelDx/dDx;
  var dScaleY = dPixelDy/dDy;
  var dTranslateX = (dPixelMinX*dMaxX - dPixelMaxX*dMinX)/dDx;
  var dTranslateY = (dPixelMinY*dMaxY - dPixelMaxY-dMinY)/dDy;
  g_dScaleX = g_dScaleX*dScaleX;
  g_dScaleY = g_dScaleY*dScaleY;
  var sTranslate = "translate("+dTranslateX+","+dTranslateY+")";
  var sScale = "scale("+dScaleX+","+dScaleY+")";
  return sTranslate+" "+sScale;
}; /* getTransform */

/*----------------------------------------------------------------------
return graphic element containing the Y axis, the horizontal grid lines,
and the Y lables.
@param dMinX minimum x value (user coordinates)
@param dMaxX maximum x value (user coordinates)
@param dMinY minimum y value (user coordinates)
@param dMaxY maximum y value (user coordinates)
@param dLabelDy distance between labels.
@return graphic element containing the Y-axis, the horizontal grid lines
        and the Y labels.
----------------------------------------------------------------------*/
function getEnergyAxisY(dMinX, dMaxX, dMinY, dMaxY, dLabelDy)
{
  var g = document.createElementNS(g_sNsSvg,"g");
  /* y axis */
  g.appendChild(getLine(dMinX, dMinY, dMinX, dMaxY, 1, "black"));
  var iFixed = Math.ceil(-Math.LOG10E*Math.log(dMaxY)+1);
  if (iFixed < 0)
    iFixed = 0;
  var dPixelDashLength = getPixelsFromMm(dTICK_IN_MM);
  var dTickLength = dPixelDashLength/g_dScaleX;
  /* scale is negative ... */
  var dOffsetY = getPixelsFromPoints(iLINE_HEIGHT_SMALL)/(3*g_dScaleY);
  /* loop over label positions */
  for(var dY = dMinY - dMinY % dLabelDy; dY <= dMaxY; dY += dLabelDy)
  {
    if (dY >= dMinY)
    {
      var sLabel = dY.toFixed(iFixed);
      g.appendChild(getDashedLine(dMinX-dTickLength,dY,dMaxX,dY,0.3,dPixelDashLength,"black"));
      g.appendChild(getText(dMinX-1.2*dTickLength,dY+dOffsetY,sLabel,"leftlabel"));
    }
  }
  return g;
}; /* getEnergyAxisY */

/*----------------------------------------------------------------------
return graphic element containing the right Y axis and the Y lables.
@param dMinX minimum x value (user coordinates)
@param dMaxX maximum x value (user coordinates)
@param dMinY minimum y value (user coordinates)
@param dMaxY maximum y value (user coordinates)
@param dLabelDy distance between labels.
@return graphic element containing the Y-axis and the Y labels.
----------------------------------------------------------------------*/
function getTemperatureAxisY(dMinX, dMaxX, dMinY, dMaxY, dLabelDy)
{
  var g = document.createElementNS(g_sNsSvg,"g");
  /* y axis */
  g.appendChild(getLine(dMaxX, dMinY, dMaxX, dMaxY, 1, "black"));
  var iFixed = Math.ceil(-Math.LOG10E*Math.log(dMaxY)+1);
  if (iFixed < 0)
    iFixed = 0;
  var dPixelDashLength = getPixelsFromMm(dTICK_IN_MM);
  var dTickLength = dPixelDashLength/g_dScaleX;
  /* scale is negative ... */
  var dOffsetY = getPixelsFromPoints(iLINE_HEIGHT_SMALL)/(3*g_dScaleY);
  /* loop over label positions */
  for(var dY = dMinY - dMinY % dLabelDy; dY <= dMaxY; dY += dLabelDy)
  {
    if (dY >= dMinY)
    {
      var sLabel = dY.toFixed(iFixed);
      g.appendChild(getDashedLine(dMaxX,dY,dMaxX+dTickLength,dY,0.3,dPixelDashLength,"black"));
      g.appendChild(getText(dMaxX+1.2*dTickLength,dY+dOffsetY,sLabel,"rightlabel"));
    }
  }
  return g;
}; /* getTemperatureAxisY */

/*----------------------------------------------------------------------
return graphic element containing the X axis, the vertical grid lines,
and the X labels.
@param dMinX minimum x value (user coordinates)
@param dMaxX maximum x value (user coordinates)
@param dMinY minimum y value (user coordinates)
@param dMaxY maximum y value (user coordinates)
@param dLabelDx distance between labels (null for no vertical grid).
@param asLabel labels to be used (null for numeric labels or none)
@param adLabel labeling positions to be used (null for numeric labels or none).
@return graphic element containing the X-axis, the vertical grid lines
        and the X labels.
----------------------------------------------------------------------*/
function getAxisX(dMinX, dMaxX, dMinY, dMaxY, dLabelDx, asLabel, adLabel)
{
  var g = document.createElementNS(g_sNsSvg,"g");
  /* x-axis */
  g.appendChild(getLine(dMinX, dMinY, dMaxX, dMinY, 1, "black"));
  if (dLabelDx)
  {
    var iFixed = Math.ceil(-Math.LOG10E*Math.log(dMaxX)+1);
    if (iFixed < 0)
      iFixed = 0;
    var dPixelDashLength = getPixelsFromMm(dTICK_IN_MM);
    /* scale is negative! */
    var dTickLength = -dPixelDashLength/g_dScaleY;
    var dLineHeight = -getPixelsFromPoints(iLINE_HEIGHT_SMALL)/g_dScaleY;
    var dOffsetY = dTickLength+dLineHeight;
    var iLabel = 0;
    for(var dX = dMinX - dMinX % dLabelDx; dX <= dMaxX; dX += dLabelDx)
    {
      if (dX >= dMinX)
      {
        var sLabel = dX.toFixed(iFixed);
        var dGridStartY = dMinY - dTickLength;
        if (adLabel)
          dGridStartY = dMinY;
        g.appendChild(getDashedLine(dX,dGridStartY,dX,dMaxY,0.3,dPixelDashLength,"black"));
        if (!adLabel)
        {
          if (asLabel) /* months */
          {
            if (iLabel < asLabel.length)
              g.appendChild(getText(dX+0.5*dLabelDx,dMinY-dOffsetY,asLabel[iLabel],"xlabel"));
          }
          else 
            g.appendChild(getText_XAxis(dX,dMinY-dOffsetY,sLabel,"xlabel"));
          
        }
        iLabel++;
      }
    }
  }
  if ((asLabel) && (adLabel))
  {
    for (var iLabel = 0; iLabel < asLabel.length; iLabel++)
    {
      var dOddY = 0.0;
      /***
      if (iLabel % 2 == 1)
        dOddY = dLineHeight;
      ***/
      var sLabel = asLabel[iLabel];
      var dX = adLabel[iLabel];
      var dGridStartY = dMinY - dTickLength;
      g.appendChild(getDashedLine(dX,dGridStartY,dX,dMinY,0.3,dPixelDashLength,"black"));
      g.appendChild(getText(dX,dMinY-dOffsetY-dOddY,sLabel,"xlabel"));
    }
  }
  return g;
} /* getAxisX */ 

/*----------------------------------------------------------------------
return graphic element containing the X selection
@param dMinX minimum x value (user coordinates)
@param dMaxX maximum x value (user coordinates)
@param dMinY minimum y value (user coordinates)
@param dMaxY maximum y value (user coordinates)
@param dSelectedX
@return graphic element containing the X selection.
----------------------------------------------------------------------*/
function getSelectionX(dMinX, dMaxX, dMinY, dMaxY, dSelectedX)
{
  var iLineHeight = getPixelsFromPoints(iLINE_HEIGHT_NORMAL);
  /* use stroke-width for vertical */
  var dStrokeWidth = 1.2/Math.abs(g_dScaleX);
  var g = document.createElementNS(g_sNsSvg,"g");
  g.setAttribute("class","selected");
  g.style.strokeWidth = dStrokeWidth;
  if ((dSelectedX >= dMinX) && (dSelectedX <= dMaxX))
  {
    /* create a path */
    var path = document.createElementNS(g_sNsSvg,"path");
    g.appendChild(path);
    var dPixelOffsetY = getPixelsFromMm(dTICK_IN_MM)+iLineHeight;
    /* scale is negative! */
    var dOffsetY = dPixelOffsetY/g_dScaleY;
    var dTriangleX = getPixelsFromMm(dTRIANGLE_IN_MM)/Math.abs(g_dScaleX);
    var dTriangleY = getPixelsFromMm(dTRIANGLE_IN_MM)/Math.abs(g_dScaleY);
    /* move to (dSelectedX, dOffsetY) */
    var sPath = "M "+dSelectedX+" "+dOffsetY;
    // move dTRIANGLE_IN_MM to the left and dTRIANGLE_IN_MM down
    dTriangleX = -dTriangleX;
    dTriangleY = -dTriangleY;
    sPath = sPath + " l " + dTriangleX + " " + dTriangleY;
    // move 2 dTRIANGLE_IN_MM horizontally
    var dOffsetX = -2*dTriangleX;
    sPath = sPath + " h " + dOffsetX;
    // return to (dSelectedX, dOffsetY)
    dTriangleY = -dTriangleY;
    sPath = sPath + " l " +  dTriangleX + " " + dTriangleY;
    // and now vertically dMaxY - dOffsetY
    sPath = sPath + " v " + (dMaxY - dOffsetY);
    path.setAttribute("d",sPath);
  }
  return g;
} /* getSelectionX */ 

/*----------------------------------------------------------------------
return graphic element containing the paths of the histograms for the 
heating, cooling and total energy values.
@param dMinX minimum x value (user coordinates)
@param dMaxX maximum x value (user coordinates)
@param dMinY minimum y value (user coordinates)
@param dMaxY maximum y value (user coordinates)
@param adYearX array of x value for which the yearly energy demand is to be displayed.
@param adYearHeating array of y values representing the yearly energy demand for heating.
@param adYearCooling array of y values representing the yearly energy demand for cooling.
@return graphic element containing the energy values  as paths.
----------------------------------------------------------------------*/
function getYearEnergyValues(dMinX, dMaxX, dMinY, dMaxY, adYearX, adYearHeating, adYearCooling)
{
  /* determine smallest distance between two values */
  var dDistMin = 1.5*Math.abs(adYearX[adYearX.length-1] - dMinX);
  for (iValue = 1; iValue < adYearX.length; iValue++)
  {
    var dDistance = Math.abs(adYearX[iValue] - adYearX[iValue-1]);
    if (dDistMin > dDistance)
      dDistMin = dDistance;
  }
  /* leave 1/3 free between blocks */
  var dBlockWidth = 2*dDistMin/3;
  var dRectWidth = dBlockWidth/3;
  var g = document.createElementNS(g_sNsSvg,"g");
  var gHeating = document.createElementNS(g_sNsSvg,"g");
  gHeating.setAttribute("class","heating");
  g.appendChild(gHeating);
  var path = document.createElementNS(g_sNsSvg,"path");
  gHeating.appendChild(path);
  var sPath = "";
  for (iValue = 0; iValue < adYearX.length; iValue++)
  {
    var dHeating = adYearHeating[iValue];
    sPath = sPath +
      "M "+ (adYearX[iValue] - 0.5*dBlockWidth) + " " + dMinY + " "+
      "v " + dHeating + " " +
      "h " + dRectWidth + " " +
      "v " + (-dHeating) + " ";
  }
  path.setAttribute("d",sPath);
  
  var gCooling = document.createElementNS(g_sNsSvg,"g");
  gCooling.setAttribute("class","cooling");
  g.appendChild(gCooling);
  path = document.createElementNS(g_sNsSvg,"path");
  gCooling.appendChild(path);
  sPath = "";
  for (iValue = 0; iValue < adYearX.length; iValue++)
  {
    var dCooling = adYearCooling[iValue];
    sPath = sPath +
      "M "+ (adYearX[iValue] - 0.5*dRectWidth) + " " + dMinY + " "+
      "v " + dCooling + " " +
      "h " + dRectWidth + " " +
      "v " + -dCooling + " ";
  }
  path.setAttribute("d",sPath);
  
  var gTotal = document.createElementNS(g_sNsSvg,"g");
  gTotal.setAttribute("class","total");
  g.appendChild(gTotal);
  path = document.createElementNS(g_sNsSvg,"path");
  gTotal.appendChild(path);
  sPath = "";
  for (iValue = 0; iValue < adYearX.length; iValue++)
  {
    var dTotal = adYearHeating[iValue] + adYearCooling[iValue];
    sPath = sPath +
      "M "+ (adYearX[iValue] + 0.5*dRectWidth) + " " + dMinY + " "+
      "v " + dTotal + " " +
      "h " + dRectWidth + " " +
      "v " + -dTotal + " ";
  }
  path.setAttribute("d",sPath);
  
  g.style.clipPath = "url(#"+sCLIP_PATH_YEAR+")";
  return g;
} /* getYearEnergyValues */ 

/*----------------------------------------------------------------------
Draw the per year diagram.
@param svg SVG container
@param dPixelMinX minimum x-coordinate (pixel coordinates).
@param dPixelMaxX maximum x-coordinate (pixel coordinates).
@param dPixelMinY minimum y-coordinate (pixel coordinates).
@param dPixelMaxY maximum y-coordinate (pixel coordinates).
@param dMinX minimum x value (user coordinates)
@param dMaxX maximum x value (user coordinates)
@param dMinY minimum y value (user coordinates)
@param dMaxY maximum y value (user coordinates)
@param dLabelDx distance between labels (null for no vertical grid).
@param dLabelDy distance between labels.
@param asYearLabel labels to be used for the X axis (null for numeric labels or none)
@param adYearLabel label positions for the X axis (null for standard labels)
@param sSelectedX selected X value to be marked.
@param adYearX labeling positions to be used (null for numeric labels or none).
@param adYearHeating array of y values representing the yearly energy demand for heating.
@param adYearCooling array of y values representing the yearly energy demand for cooling.
 ---------------------------------------------------------------------*/
function drawPerYearDiagram(svg,
  dPixelMinX, dPixelMaxX, dPixelMinY, dPixelMaxY,
  dMinX, dMaxX, dMinY, dMaxY, dLabelDx, dLabelDy, asYearLabel, adYearLabel, 
  dSelectedX, adYearX, adYearHeating, adYearCooling)
{
  /* in here everything is scaled to user coordinates 
     leaving 10% to the left for the y-labels and 10% at the bottom for the x-labels */
  var gDiagram = document.createElementNS(g_sNsSvg,"g");
  svg.appendChild(gDiagram);
  gDiagram.setAttribute("transform",getTransform(dPixelMinX,dPixelMaxX,dPixelMinY,dPixelMaxY,
      dMinX, dMaxX, dMinY, dMaxY));
  /* append clipping rectangle */
  gDiagram.appendChild(getClipDefs(dMinX, dMaxX, dMinY, dMaxY, sCLIP_PATH_YEAR, sCLIP_RECT_YEAR));
  /* inside the diagram display the clipping rectangle */
  /***
  var use = document.createElementNS(g_sNsSvg,"use");
  use.setAttributeNS(g_sNsXLink,"href","#"+sCLIP_RECT_YEAR);
  gDiagram.appendChild(use);
  ***/
  /* draw and label the X axis */
  gDiagram.appendChild(getAxisX(dMinX, dMaxX, dMinY, dMaxY, dLabelDx, asYearLabel, adYearLabel));
  /* draw the Y axis, the horizontal raster lines, and label them */
  gDiagram.appendChild(getEnergyAxisY(dMinX, dMaxX, dMinY, dMaxY, dLabelDy));
  /* draw selection graph using dSelectedX, unless it is null */
  if (dSelectedX != null)
    //gDiagram.appendChild(getSelectionX(dMinX, dMaxX, dMinY, dMaxY, dSelectedX));
  /* finally draw the values */
    gDiagram.appendChild(getYearEnergyValues(dMinX, dMaxX, dMinY, dMaxY, adYearX, adYearHeating, adYearCooling));
    gDiagram.appendChild(getYearEnergyValues(dMinX, dMaxX, dMinY, dMaxY, adYearX, adYearHeating, adYearCooling));
} /* drawPerYearDiagram */

/*----------------------------------------------------------------------
Add Legend to the per year diagram.
@param svg SVG container
@param iDiagramWidth width of the diagram (in pixels).
@param iDiagramHeight height of the diagram (in pixels).
 ---------------------------------------------------------------------*/
function drawPerYearLegend(svg,iDiagramWidth,iDiagramHeight)
{
  /* line-height in pixels */
  var iLineHeight = getPixelsFromPoints(iLINE_HEIGHT_NORMAL);
  var iOffset = getPixelsFromMm(1);
  var dY = iDiagramHeight - iOffset - 2*iLineHeight;
  svg.appendChild(getRectLegend(iOffset,dY,"Heating Energy","heating"));
  var dY = iDiagramHeight - iOffset - iLineHeight;
  svg.appendChild(getRectLegend(iOffset,dY,"Cooling Energy","cooling"));
  var dY = iDiagramHeight - iOffset;
  svg.appendChild(getRectLegend(iOffset,dY,"Total Energy","total"));
  return iOffset + 3*iLineHeight;
}; /* drawPerYearLegend */

/*----------------------------------------------------------------------
Add Title and Subtitle to per year diagram.
@param svg SVG container
@param iDiagramWidth width of the diagram (in pixels).
@param iDiagramHeight height of the diagram (in pixels).
 ---------------------------------------------------------------------*/
function drawPerYearTitle(svg,iDiagramWidth,iDiagramHeight)
{
  /* line-height in pixels */
  var iLineHeight = getPixelsFromPoints(iLINE_HEIGHT_NORMAL);
  var iOffset = getPixelsFromMm(1);
  svg.appendChild(getText(iOffset,iOffset+iLineHeight,"Energy Demand per Year","title"));
  /* &middot; = &#183; = \u00B7 / &sup2; = &#178; = \u00B2 */ 
  svg.appendChild(getText(iOffset,iOffset+2*iLineHeight,"kW\u00B7h/m\u00B2\u00B7year (floor area)","subtitle"));
  return iOffset+3*iLineHeight;
}; /* drawPerYearTitle */

/*----------------------------------------------------------------------
Draw the diagram for energy demand per year
@param dMinX minimum x value (user coordinates)
@param dMaxX maximum x value (user coordinates)
@param dLabelDx distance between labels (null for no vertical grid).
@param asYearLabel labels to be used for the X axis (null for numeric labels or none)
@param adYearLabel label positions for the X axis (null for standard labels)
@param sSelectedX selected X value to be marked.
@param adYearX labeling positions to be used (null for numeric labels or none).
@param adYearHeating array of y values representing the yearly energy demand for heating.
@param adYearCooling array of y values representing the yearly energy demand for cooling.
 ---------------------------------------------------------------------*/
function drawPerYear(sId,dMinX, dMaxX, dLabelDx, asYearLabel, adYearLabel, 
    dSelectedX, adYearX, adYearHeating, adYearCooling)
{
  dMaxX += 1;
  var svg = document.getElementById(sId);
  var iDiagramWidth = svg.getAttribute("width");
  var iDiagramHeight = svg.getAttribute("height");
  var iLineHeight = getPixelsFromPoints(iLINE_HEIGHT_NORMAL);
  /* delete its contents */ 
  while (svg.hasChildNodes())
    svg.removeChild(svg.lastChild);
  g_dScaleX = 1.0;
  g_dScaleY = 1.0;
  var iDiagramTitleHeight = drawPerYearTitle(svg,iDiagramWidth,iDiagramHeight);
  var iDiagramLegendHeight = drawPerYearLegend(svg,iDiagramWidth,iDiagramHeight);
  var dPixelMinX = iDiagramWidth*0.1;
  var dPixelMaxX = iDiagramWidth-iLineHeight;
  var dPixelMinY = iDiagramTitleHeight+(iDiagramHeight-iDiagramTitleHeight-iDiagramLegendHeight)*0.9;
  var dPixelMaxY = iDiagramTitleHeight;
  g_dScaleX = 1.0;
  g_dScaleY = 1.0;
  if (dLabelDx != null)
  {
    dMinX = dMinX - dLabelDx/2;
    dMaxX = dMaxX + dLabelDx/2;
  }
  drawPerYearDiagram(svg, dPixelMinX, dPixelMaxX, dPixelMinY, dPixelMaxY,
      dMinX, dMaxX, dMIN_ENERGY_PER_YEAR, dMAX_ENERGY_PER_YEAR, dLabelDx, dLABEL_ENERGY_PER_YEAR,
      asYearLabel, adYearLabel, dSelectedX, adYearX, adYearHeating, adYearCooling);
}; /* drawPerYear */

/*----------------------------------------------------------------------
return graphic element containing the paths of the histograms for the 
heating and cooling values.
@param dMinX minimum x value (user coordinates)
@param dMaxX maximum x value (user coordinates)
@param dMinY minimum y value (user coordinates)
@param dMaxY maximum y value (user coordinates)
@param adMonthHeating array of y values representing the monthly energy demand for heating.
@param adMonthCooling array of y values representing the monthly energy demand for cooling.
@return graphic element containing the energy values  as paths.
----------------------------------------------------------------------*/
function getMonthEnergyValues(dMinX, dMaxX, dMinY, dMaxY, adMonthHeating, adMonthCooling)
{
  /* leave 1/3 free between blocks */
  var dBlockWidth = 2/3;
  var dRectWidth = dBlockWidth/2;
  var g = document.createElementNS(g_sNsSvg,"g");
  var gHeating = document.createElementNS(g_sNsSvg,"g");
  gHeating.setAttribute("class","heating");
  g.appendChild(gHeating);
  var path = document.createElementNS(g_sNsSvg,"path");
  gHeating.appendChild(path);
  var sPath = "";
  for (iValue = 0; iValue < asMONTH_LABEL.length; iValue++)
  {
    var dHeating = adMonthHeating[iValue];
    var dX = iValue + 0.5;
    sPath = sPath +
      "M "+ (dX - dRectWidth) + " " + dMinY + " "+
      "v " + dHeating + " " +
      "h " + dRectWidth + " " +
      "v " + -dHeating + " ";
  }
  path.setAttribute("d",sPath);
  
  var gCooling = document.createElementNS(g_sNsSvg,"g");
  gCooling.setAttribute("class","cooling");
  g.appendChild(gCooling);
  path = document.createElementNS(g_sNsSvg,"path");
  gCooling.appendChild(path);
  sPath = "";
  for (iValue = 0; iValue < asMONTH_LABEL.length; iValue++)
  {
    var dCooling = adMonthCooling[iValue];
    var dX = iValue + 0.5;
    sPath = sPath +
      "M "+ dX + " " + dMinY + " "+
      "v " + dCooling + " " +
      "h " + dRectWidth + " " +
      "v " + -dCooling + " ";
  }
  path.setAttribute("d",sPath);
  
  g.style.clipPath = "url(#"+sCLIP_PATH_ENERGY+")";
  return g;
} /* getMonthEnergyValues */ 

/*----------------------------------------------------------------------
Draw the per month diagram of energy values.
@param svg SVG container
@param dPixelMinX minimum x-coordinate (pixel coordinates).
@param dPixelMaxX maximum x-coordinate (pixel coordinates).
@param dPixelMinY minimum y-coordinate (pixel coordinates).
@param dPixelMaxY maximum y-coordinate (pixel coordinates).
@param dMinX minimum x value (user coordinates)
@param dMaxX maximum x value (user coordinates)
@param dMinY minimum y value (user coordinates)
@param dMaxY maximum y value (user coordinates)
@param dLabelDy distance between labels.
@param adMonthHeating array of y values representing the yearly energy demand for heating.
@param adMonthCooling array of y values representing the yearly energy demand for cooling.
 ---------------------------------------------------------------------*/
function drawEnergyPerMonthDiagram(svg,
  dPixelMinX, dPixelMaxX, dPixelMinY, dPixelMaxY,
  dMinX, dMaxX, dMinY, dMaxY, dLabelDy, adMonthHeating, adMonthCooling)
{
  /* in here everything is scaled to user energy coordinates 
     leaving 10% to the left and right for the y-labels and 10% at the bottom for the x-labels */
  var gDiagram = document.createElementNS(g_sNsSvg,"g");
  svg.appendChild(gDiagram);
  gDiagram.setAttribute("transform",getTransform(dPixelMinX,dPixelMaxX,dPixelMinY,dPixelMaxY,
      dMinX, dMaxX, dMinY, dMaxY));
  /* append clipping rectangle */
  gDiagram.appendChild(getClipDefs(dMinX, dMaxX, dMinY, dMaxY, sCLIP_PATH_ENERGY, sCLIP_RECT_ENERGY));
  /* inside the diagram display the clipping rectangle */
  /***
  var use = document.createElementNS(g_sNsSvg,"use");
  use.setAttributeNS(g_sNsXLink,"href","#"+sCLIP_RECT_ENERGY);
  gDiagram.appendChild(use);
  ***/
  /* draw the X axis */
  gDiagram.appendChild(getAxisX(dMinX, dMaxX, dMinY, dMaxY, 1, asMONTH_LABEL, null));
  /* draw the Y axis, the horizontal raster lines, and label them */
  gDiagram.appendChild(getEnergyAxisY(dMinX, dMaxX, dMinY, dMaxY, dLabelDy));
  /* draw the energy values */
  gDiagram.appendChild(getMonthEnergyValues(dMinX, dMaxX, dMinY, dMaxY, adMonthHeating, adMonthCooling));
} /* drawEnergyPerMonthDiagram */

/*----------------------------------------------------------------------
return a rect element for the comfort band.
@param dMinX minimum x value (user coordinates)
@param dMaxX maximum x value (user coordinates)
@param dMinComfort minimum comfort value (user coordinates)
@param dMaxComfort maximum comfort value (user coordinates)
 ---------------------------------------------------------------------*/
function getComfortBand(dMinX, dMaxX, dMinComfort, dMaxComfort)
{
  var rectComfort = document.createElementNS(g_sNsSvg,"rect");
  rectComfort.setAttribute("x",dMinX);
  rectComfort.setAttribute("y",dMinComfort);
  rectComfort.setAttribute("width",dMaxX-dMinX);
  rectComfort.setAttribute("height",dMaxComfort-dMinComfort);
  rectComfort.setAttribute("class","comfort");
  return rectComfort;
}; /* getComfortBand */

/*----------------------------------------------------------------------
return graphic element containing the paths of the histograms for the 
minimum and maximum temperature values.
@param dMinX minimum x value (user coordinates)
@param dMaxX maximum x value (user coordinates)
@param dMinY minimum y value (user coordinates)
@param dMaxY maximum y value (user coordinates)
@param adMinTemperature array of y values representing the minimum temperature per month.
@param adMaxTemperature array of y values representing the maximum temperature per month.
@return graphic element containing the energy values  as paths.
----------------------------------------------------------------------*/
function getMonthTemperatureValues(dMinX, dMaxX, dMinY, dMaxY, adMinTemperature, adMaxTemperature)
{
  var dStrokeWidth = 0.5/Math.abs(g_dScaleY);
  var g = document.createElementNS(g_sNsSvg,"g");
  var plMin = document.createElementNS(g_sNsSvg,"polyline");
  var sPoints = "";
  for (var iMonth = 0; iMonth < adMinTemperature.length; iMonth++)
  {
    var dX = iMonth + 0.5;
    var dY = adMinTemperature[iMonth];
    if (iMonth > 0)
      sPoints = sPoints + " ";
    sPoints = sPoints + dX + ", " + dY;
  }
  plMin.setAttribute("class","mintemp");
  plMin.setAttribute("points",sPoints);
  plMin.style.strokeWidth = dStrokeWidth;
  g.appendChild(plMin);
  var plMax = document.createElementNS(g_sNsSvg,"polyline");
  sPoints = "";
  for (var iMonth = 0; iMonth < adMaxTemperature.length; iMonth++)
  {
    var dX = iMonth + 0.5;
    var dY = adMaxTemperature[iMonth];
    if (iMonth > 0)
      sPoints = sPoints + " ";
    sPoints = sPoints + dX + ", " + dY;
  }
  plMax.setAttribute("class","maxtemp");
  plMax.setAttribute("points",sPoints);
  plMax.style.strokeWidth = dStrokeWidth;
  g.style.clipPath = "url(#"+sCLIP_PATH_TEMPERATURE+")";
  g.appendChild(plMax);
  return g;
} /* getMonthTemperatureValues */ 

/*----------------------------------------------------------------------
return graphic element containing the paths of the histograms for the 
minimum and maximum temperature values.
@param dMinX minimum x value (user coordinates)
@param dMaxX maximum x value (user coordinates)
@param dMinY minimum y value (user coordinates)
@param dMaxY maximum y value (user coordinates)
@param adExternalTemperature array of y values representing the external daily average temperature.
@param adInternalTemperature array of y values representing the internal daily average (idling) temperature.
@return graphic element containing the energy values  as paths.
----------------------------------------------------------------------*/
function getTemperatureValues(dMinX, dMaxX, dMinY, dMaxY, adExternalTemperature, adInternalTemperature)
{
  var dStrokeWidth = 0.5/Math.abs(g_dScaleY);
  var g = document.createElementNS(g_sNsSvg,"g");
  var plMin = document.createElementNS(g_sNsSvg,"polyline");
  var sPoints = "";
  for (var iDay = 0; iDay < adExternalTemperature.length; iDay++)
  {
    /* 12 months = 365 days */
    var dX = 12*(iDay+0.5)/adExternalTemperature.length;
    var dY = adExternalTemperature[iDay];
    if (iDay > 0)
      sPoints = sPoints + " ";
    sPoints = sPoints + dX + ", " + dY;
  }
  plMin.setAttribute("class","exttemp");
  plMin.setAttribute("points",sPoints);
  plMin.style.strokeWidth = dStrokeWidth;
  g.appendChild(plMin);
  var plMax = document.createElementNS(g_sNsSvg,"polyline");
  sPoints = "";
  for (var iDay = 0; iDay < adInternalTemperature.length; iDay++)
  {
    var dX = 12*(iDay+0.5)/adInternalTemperature.length;
    var dY = adInternalTemperature[iDay];
    if (iDay > 0)
      sPoints = sPoints + " ";
    sPoints = sPoints + dX + ", " + dY;
  }
  plMax.setAttribute("class","inttemp");
  plMax.setAttribute("points",sPoints);
  plMax.style.strokeWidth = dStrokeWidth;
  g.style.clipPath = "url(#"+sCLIP_PATH_TEMPERATURE+")";
  g.appendChild(plMax);
  return g;
} /* getTemperatureValues */ 

/*----------------------------------------------------------------------
Draw the per month diagram of temperature values.
@param svg SVG container
@param dPixelMinX minimum x-coordinate (pixel coordinates).
@param dPixelMaxX maximum x-coordinate (pixel coordinates).
@param dPixelMinY minimum y-coordinate (pixel coordinates).
@param dPixelMaxY maximum y-coordinate (pixel coordinates).
@param dMinX minimum x value (user coordinates)
@param dMaxX maximum x value (user coordinates)
@param dMinY minimum y value (user coordinates)
@param dMaxY maximum y value (user coordinates)
@param dLabelDy distance between labels.
@param dMinComfort minimum comfort temperature.
@param dMaxComfort maximum comfort temperature.
@param adMinTemperature array of y values representing the minimum temperature per month.
@param adMaxTemperature array of y values representing the maximum temperature per month.
 ---------------------------------------------------------------------*/
function drawTemperaturePerMonthDiagram(svg,
  dPixelMinX, dPixelMaxX, dPixelMinY, dPixelMaxY,
  dMinX, dMaxX, dMinY, dMaxY, dLabelDy, 
  dMinComfort, dMaxComfort, adMinTemperature, adMaxTemperature)
{
  /* in here everything is scaled to user energy coordinates 
     leaving 10% to the left and right for the y-labels and 10% at the bottom for the x-labels */
  var gDiagram = document.createElementNS(g_sNsSvg,"g");
  svg.appendChild(gDiagram);
  gDiagram.setAttribute("transform",getTransform(dPixelMinX,dPixelMaxX,dPixelMinY,dPixelMaxY,
      dMinX, dMaxX, dMinY, dMaxY));
  /* append clipping rectangle */
  gDiagram.appendChild(getClipDefs(dMinX, dMaxX, dMinY, dMaxY, sCLIP_PATH_TEMPERATURE, sCLIP_RECT_TEMPERATURE));
  /* inside the diagram display the clipping rectangle */
  /***
  var use = document.createElementNS(g_sNsSvg,"use");
  use.setAttributeNS(g_sNsXLink,"href","#"+sCLIP_RECT_TEMPERATURE);
  gDiagram.appendChild(use);
  ***/
  /* draw the right Y axis and label it */
  gDiagram.appendChild(getTemperatureAxisY(dMinX, dMaxX, dMinY, dMaxY, dLabelDy));
  /* draw the comfort band */
  gDiagram.appendChild(getComfortBand(dMinX, dMaxX, dMinComfort, dMaxComfort));
  /* draw the temperature values */
  gDiagram.appendChild(getMonthTemperatureValues(dMinX, dMaxX, dMinY, dMaxY, adMinTemperature, adMaxTemperature));
} /* drawTemperaturePerMonthDiagram */

/*----------------------------------------------------------------------
Draw the diagram of temperature values.
@param svg SVG container
@param dPixelMinX minimum x-coordinate (pixel coordinates).
@param dPixelMaxX maximum x-coordinate (pixel coordinates).
@param dPixelMinY minimum y-coordinate (pixel coordinates).
@param dPixelMaxY maximum y-coordinate (pixel coordinates).
@param dMinX minimum x value (user coordinates)
@param dMaxX maximum x value (user coordinates)
@param dMinY minimum y value (user coordinates)
@param dMaxY maximum y value (user coordinates)
@param dLabelDy distance between labels.
@param dMinComfort minimum comfort temperature.
@param dMaxComfort maximum comfort temperature.
@param adExternalTemperature array of y values representing the external daily average temperature.
@param adInternalTemperature array of y values representing the internal daily average (idling) temperature.
 ---------------------------------------------------------------------*/
function drawTemperatureDiagram(svg,
  dPixelMinX, dPixelMaxX, dPixelMinY, dPixelMaxY,
  dMinX, dMaxX, dMinY, dMaxY, dLabelDy, 
  dMinComfort, dMaxComfort, adExternalTemperature, adInternalTemperature)
{
  /* in here everything is scaled to user energy coordinates 
     leaving 10% to the left and right for the y-labels and 10% at the bottom for the x-labels */
  var gDiagram = document.createElementNS(g_sNsSvg,"g");
  svg.appendChild(gDiagram);
  gDiagram.setAttribute("transform",getTransform(dPixelMinX,dPixelMaxX,dPixelMinY,dPixelMaxY,
      dMinX, dMaxX, dMinY, dMaxY));
  /* append clipping rectangle */

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  //gDiagram.appendChild(getClipDefs(dMinX, dMaxX, dMinY, dMaxY, sCLIP_PATH_TEMPERATURE, sCLIP_RECT_TEMPERATURE));

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  /* inside the diagram display the clipping rectangle */
  /***
  var use = document.createElementNS(g_sNsSvg,"use");
  use.setAttributeNS(g_sNsXLink,"href","#"+sCLIP_RECT_TEMPERATURE);
  gDiagram.appendChild(use);
  ***/
  /* draw the right Y axis and label it */
  gDiagram.appendChild(getTemperatureAxisY(dMinX, dMaxX, dMinY, dMaxY, dLabelDy));
  /* draw the comfort band */
  gDiagram.appendChild(getComfortBand(dMinX, dMaxX, dMinComfort, dMaxComfort));
  /* draw the temperature values */
  gDiagram.appendChild(getTemperatureValues(dMinX, dMaxX, dMinY, dMaxY, adExternalTemperature, adInternalTemperature));
} /* drawTemperatureDiagram */

/*----------------------------------------------------------------------
Add Legend to the per month diagram.
@param svg SVG container
@param iDiagramWidth width of the diagram (in pixels).
@param iDiagramHeight height of the diagram (in pixels).
 ---------------------------------------------------------------------*/
function drawPerMonthLegend(svg,iDiagramWidth,iDiagramHeight)
{
  /* line-height in pixels */
  var iLineHeight = getPixelsFromPoints(iLINE_HEIGHT_NORMAL);
  var iOffset = getPixelsFromMm(1);
  var dMiddle = 0.5*iDiagramWidth;
  var dY = iDiagramHeight - iOffset - 2*iLineHeight;
  //svg.appendChild(getRectLegend(iOffset,dY,"Heating Energy","heating"));
  svg.appendChild(getLineLegend(iOffset,dY,"External Temperature", "exttemp"));
  var dY = iDiagramHeight - iOffset - iLineHeight;
  //svg.appendChild(getRectLegend(iOffset,dY,"Cooling Energy","cooling"));
  svg.appendChild(getLineLegend(iOffset,dY,"Internal Temperature", "inttemp"));
  var dY = iDiagramHeight - iOffset;
  svg.appendChild(getRectLegend(iOffset,dY,"Comfort Band","comfort"));
  return iOffset + 3*iLineHeight;
}; /* drawPerMonthLegend */

/*----------------------------------------------------------------------
Add Title and Subtitle to per month diagram.
@param svg SVG container
@param iDiagramWidth width of the diagram (in pixels).
@param iDiagramHeight height of the diagram (in pixels).
 ---------------------------------------------------------------------

/// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

*/
function drawPerMonthTitle(svg,iDiagramWidth,iDiagramHeight)
{
  /* line-height in pixels */
  var iLineHeight = getPixelsFromPoints(iLINE_HEIGHT_NORMAL);
  var iOffset = getPixelsFromMm(1);
  svg.appendChild(getText(iOffset,iOffset+iLineHeight,"Temperature","title"));
  /* &middot; = &#183; = \u00B7 / &sup2; = &#178; = \u00B2 */ 
  svg.appendChild(getText(iOffset,iOffset+2*iLineHeight,"\u00B0C","subtitle"));

  return iOffset+3*iLineHeight;
}; /* drawPerMonthTitle */


/// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


/*----------------------------------------------------------------------
Draw the diagram for energy demand and min/max temperature per year
@param adMonthHeating array of y values representing the yearly energy demand for heating.
@param adMonthCooling array of y values representing the yearly energy demand for cooling.
@param dMinComfort minimum comfort temperature.
@param dMaxComfort maximum comfort temperature.
@param adExternalTemperature array of y values representing the external daily average temperature.
@param adInternalTemperature array of y values representing the internal daily average (idling) temperature.
 ---------------------------------------------------------------------
*/


///// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function drawPerMonth(sId,adMonthHeating,adMonthCooling,dMinComfort,dMaxComfort,adExternalTemperature,adInternalTemperature)
{
  var svg = document.getElementById(sId);
  var iDiagramWidth = svg.getAttribute("width");
  var iDiagramHeight = svg.getAttribute("height");
  /* delete its contents */
  while (svg.hasChildNodes())
    svg.removeChild(svg.lastChild);
  g_dScaleX = 1.0;
  g_dScaleY = 1.0;
  var iDiagramTitleHeight = drawPerMonthTitle(svg,iDiagramWidth,iDiagramHeight);
  var iDiagramLegendHeight = drawPerMonthLegend(svg,iDiagramWidth,iDiagramHeight);
  var dPixelMinX = iDiagramWidth*0.1;
  var dPixelMaxX = iDiagramWidth*0.9;
  var dPixelMinY = iDiagramTitleHeight+(iDiagramHeight-iDiagramTitleHeight-iDiagramLegendHeight)*0.9;
  var dPixelMaxY = iDiagramTitleHeight;
  g_dScaleX = 1.0;
  g_dScaleY = 1.0;
  drawEnergyPerMonthDiagram(svg, dPixelMinX, dPixelMaxX, dPixelMinY, dPixelMaxY,
    0, 12, dMIN_TEMPERATURE_PER_MONTH, dMAX_TEMPERATURE_PER_MONTH, dLABEL_TEMPERATURE_PER_MONTH,
    adMonthHeating, adMonthCooling);
  g_dScaleX = 1.0;
  g_dScaleY = 1.0;
  /***
  drawTemperaturePerMonthDiagram(svg, dPixelMinX, dPixelMaxX, dPixelMinY, dPixelMaxY,
      0, 12, dMIN_TEMPERATURE_PER_MONTH, dMAX_TEMPERATURE_PER_MONTH, dLABEL_TEMPERATURE_PER_MONTH, 
      dMinComfort, dMaxComfort, adMinTemperature, adMaxTemperature);
  ***/
  drawTemperatureDiagram(svg, dPixelMinX, dPixelMaxX, dPixelMinY, dPixelMaxY,
      0, 12, dMIN_TEMPERATURE_PER_MONTH, dMAX_TEMPERATURE_PER_MONTH, dLABEL_TEMPERATURE_PER_MONTH, 
      dMinComfort, dMaxComfort, adExternalTemperature, adInternalTemperature);
}; /* drawPerMonth */

///// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



/*
function getSensitivityAxisY() {};
function getSensitivityValues(dMinX, dMaxX, dMinY, dMaxY, adSensitivityData) {
    var dStrokeWidth = 0.5/Math.abs(g_dScaleY);
    var g = document.createElementNS(g_sNsSvg,"g");
    var plMin = document.createElementNS(g_sNsSvg, "polyline");
    var sPoints = "";
    for (var iDay = 0; iDay < adSensitivityData.length; iDay++) {
        var dX = 12*(iDay+0.5)/adSensitivityData.length;
        var dY = adSensitivityData[iDay];
        if (iDay > 0)
            sPoints = sPoints + " ";
        sPoints = sPoints + dX + ", " + dY;
    }
    plMin.setAttribute("class","dataname");
    plMin.setAttribute("points",sPoints);
    g.appendChild(plMin);
    var plMax = document.createElementNS(g_sNsSvg,"polyline");
    sPoints = "";
    for(var iDay = 0; iDay < adSensitivityData.length; iDay++) {
        var dX = 12*(iDay+0.5)/adSensitivityData.length;
        var dY = adSensitivityData[iDay];
        if (iDay > 0)
            sPoints = sPoints + " ";
        sPoints = sPoints + dX + ", " + dY;
    }
    plMax.setAttribute("class","otherdataname");
    plMax.setAttribute("points",sPoints);
    plMax.style.strokeWidth = dStrokeWidth;
    g.style.clipPath = "url(#"+sCLIP_PATH_SENSITIVITY+")";
    g.appendChild(plMax);
    return g;
};

function drawSensitivityTitle(svg, iDiagramWidth, iDiagramHeight) {
    var iLineHeight = getPixelsFromPoints(iLINE_HEIGHT_NORMAL);
    var iOffset = getPixelsFromMm(1);
    svg.appendChild(getText(iOffset, iOffset+iLineHeight,"Sensitivity Data","title"));
    svg.appendChild(getText(iDiagramWidh0iOffset, iOffset+iLineHeight,"blahblahblah"));
    return iOffset+3*iLineHeight;
};

function drawSensitivityLegend(svg, iDiagramWidth, iDiaramHeight) {
    var iLineHeight = getPixelsFromPoints(iLINE_HEIGHT_NORMAL);
    var iOffset = getPixelsFromMm(1);
    var dMiddle = 0.5*iDiagramWidth;
    var dY = iDiagramHeight - iOffset - 2*iLineHeight;
    svg.appendChild(getLineLegend(iOffset,dY,"Legend Stuff", "data"));
    var dY = iDiagramHeight - iOffset - iLineHeight;
    svg.appendChild(getLineLegend(iOffset,dY,"More legend stuff", "data"));
    return iOffset + 3*iLineHeight;
};

function drawSensitivityStudyDiagram(svg, dPixelMinX, dPixelMaxX, dPixelMinY, dPixelMaxY, dMinX, dMaxX, dMinY, dMaxY, dLavelDy, adSensitivity) {
    var gDiagram = document.createElementNS(g_sNsSvg,"g");
    svg.appendChild(gDiagram);
    gDiagram.setAttribute("transform",getTransform(dPixelMinX,dPixelMaxX,dPixelMinY,dPixelMaxY,dMinX,dMaxX,dMinY,dMaxY, adSensitivity));
    gDiagram.appendChild(getClipDefs(dMinX, dMaxX, dMinY, dMaxY, sCLIP_PATH_SENSITIVITY, sCLIP_RECT_SENSITIVITY));
    gDiagram.appendChild(getSensitivityAxisY(dMinX, dMaxX, dMinY, dMaxY, dLavelDy));
    gDiagram.appendChild(getSensitivityValues(dMinX, dMaxX, dMinY, dMaxY, adSensitivity));
};

function drawSensitivityData(svg, dPixelMinX, dPixelMaxX, dPixelMinY, dPixelMaxY, dMinX, dMaxX, dMinY, dMaxY, dLavelDy, adSensitivityData) {
    var gDiagram = document.createElementNS(g_sNsSvg, "g");
    svg.appendChild(gDiagram);
    gDiagram.setAttribute("transform",getTransform(dPixelMinX,dPixelMaxX,dPixelMinY,dPixelMaxY,dMinX,dMaxX,dMinY, dMaxY));
    gDiagram.appendChild(getClipDefs(dMinX, dMaxX, dMinY, dMaxY, sCLIP_PATH_SENSITIVITY, sCLIP_RECT_SENSITIVITY));
    gDiagram.appendChild(getSensitivityAxisY(dMinX, dMaxX, dMinY, dMaxY, dLabelDy));
    gDiagram.appendChild(getSensitivityValues(dMinX, dMaxX, dMinY, dMaxY, adSensitivityData, ad SensitivityData));
};

function drawSensitivityStudy(sId,adSensitivityData)
{
    var svg = document.getElementById(sId);
    var iDiagramWidth = svg.getAttribute("width");
    var iDiagramWidth = svg.getAttribute("height");
*/
    /* delete its contents */
/*
    while (svg.hasChildNodes())
        svg.removeChild(svg.lastChild);
    g_dScaleX = 1.0;
    g_dScaleY = 1.0;
    var iDiagramTitleHeight = drawSensitivityTitle(svvg,iDiagramWidth,iDiagramHeight);
    var iDiagramLegendHeight = drawSensitivityLegend(svg,iDiagramWidth,iDiagramHeight);
    var dPixelMinX = iDiagramWidth*0.1;
    var dPixelMaxX = iDiagramWidth*0.9;
    var dPixelMinY = iDiagramTitleHeight+(iDiagramHeight-iDiagramTitleHeight-iDiagramLegendHeight)*0.9;
    var dPixelMaxY = iDiagramTitleHeight;
    g_dScaleX = 1.0;
    g_dScaleY = 1.0;
    //axes and dashed lines
    drawSensitivityStudyDiagram(svg, dPixelMinX, dPixelMaxX, dPixelMinY, dPixelMaxY);
    g_dScaleX = 1.0;
    g_dScaleY = 1.0;
    drawSensitivityData(svg, dPixelMinX, dPixelMaxX, dPixelMinY, dPixelMaxY, adSensitivityData);
};
*/
