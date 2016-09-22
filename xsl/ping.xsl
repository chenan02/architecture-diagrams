<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<!-- ping.xsl ==========================================================
XSL file for displaying the ping result.
Version    : $Id: build.xml 1520 2012-04-16 13:06:44Z hartwig $
Application: Comfort and Climate
Description: XSL file for displaying the ping result.
Platform   : XSLT
========================================================================
Created    : 13.06.2012, Hartwig Thomas, Enter AG, Zurich
Copyright  : 2012, Baumschlager Eberle, Vaduz, Liechtenstein
==================================================================== -->
<xsl:stylesheet
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:ping="http://candc.enterag.ch/Ping-1"
  version="1.0">
  
  <xsl:output method="html"/>
  
  <xsl:template match="/">
    <xsl:apply-templates select="ping:ping"/>
    <xsl:apply-templates select="ping"/>
  </xsl:template>
  
  <xsl:template match="ping">
    <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
      <head>
        <title>Ping Response</title>
      </head>
      <body>
        <h1>Ping Response</h1>
        <table>
    <xsl:apply-templates select="system"/>
    <xsl:apply-templates select="subsystem"/>
        </table>
      </body>
    </html>
  </xsl:template>
  
  <xsl:template match="ping:ping">
    <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
      <head>
        <title>Ping Response</title>
      </head>
      <body>
        <h1>Ping Response</h1>
        <table>
    <xsl:apply-templates select="system"/>
    <xsl:apply-templates select="subsystem"/>
        </table>
      </body>
    </html>
  </xsl:template>
  
  <xsl:template match="system">
    <tr>
      <td>Name</td>
      <td colspan="2"><xsl:value-of select="@name"/></td>
    </tr>
    <tr>
      <td>Version</td>
      <td colspan="2"><xsl:value-of select="@version"/></td>
    </tr>
    <tr>
      <td>Result Code</td>
      <td colspan="2"><xsl:value-of select="@result_code"/></td>
    </tr>
    <xsl:if test="@result_message">
    <tr>
      <td>Result Message</td>
      <td colspan="2"><xsl:value-of select="@result_message"/></td>
    </tr>
    </xsl:if>
    <tr>
      <td>Call Duration</td>
      <td colspan="2"><xsl:value-of select="@call_duration"/></td>
    </tr>
  </xsl:template>
  
  <xsl:template match="subsystem">
    <tr>
      <td colspan="3"><hr/></td>
    </tr>
    <tr>
      <td>Subsystem</td>
      <td colspan="2"><xsl:value-of select="@name"/></td>
    </tr>
    <tr>
      <td></td>
      <td>Version</td>
      <td><xsl:value-of select="@version"/></td>
    </tr>
    <tr>
      <td></td>
      <td>Result Code</td>
      <td><xsl:value-of select="@result_code"/></td>
    </tr>
    <xsl:if test="@result_message">
    <tr>
      <td></td>
      <td>Result Message</td>
      <td><xsl:value-of select="@result_message"/></td>
    </tr>
    </xsl:if>
    <tr>
      <td></td>
      <td>Call Duration</td>
      <td><xsl:value-of select="@call_duration"/></td>
    </tr>
  </xsl:template>
  
</xsl:stylesheet>