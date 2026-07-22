<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html" indent="yes" doctype-public="-//W3C//DTD HTML 4.0//EN" doctype-system="http://www.w3.org/TR/REC-html40/strict.dtd"/>


<xsl:variable name="lang">
	<xsl:value-of select="translate(//manual/@lang, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')"/>
</xsl:variable>

<xsl:variable name="newline">
<xsl:text>&#13;</xsl:text>
</xsl:variable>

<xsl:include href="ui.xslt"/>


<xsl:template match="/">

<html>
<title>Contents Search</title>
	<xsl:value-of select="$newline"/>
<head>
	<xsl:value-of select="$newline"/>
<link rel="stylesheet" href="../../config8/search.css" type="text/css"/>
	<xsl:value-of select="$newline"/>
<script type="text/javascript">

	<xsl:value-of select="$newline"/>

<xsl:value-of select="document('webdocstructure_vars1.xml', .)//vars"/>


<xsl:variable name="strOpenQuot">= &#34;</xsl:variable>
<xsl:variable name="strCloseQuot">&#34;
</xsl:variable>
<xsl:variable name="strOpenQuotSafe">= zzz</xsl:variable>
<xsl:variable name="strCloseQuotSafe">zzz
</xsl:variable>
<xsl:variable name="strQuot">&#34;</xsl:variable>
<xsl:variable name="strQuotEscape">\&#34;</xsl:variable>
<xsl:variable name="strVars2">
	<xsl:value-of select="document('webdocstructure_vars2.xml', .)//vars"/>
</xsl:variable>
<xsl:variable name="strVars2_temp1">
	<xsl:call-template name="replace-substring">
		<xsl:with-param name="original" select="$strVars2"/>
		<xsl:with-param name="substring" select="$strOpenQuot"/>
		<xsl:with-param name="replacement" select="$strOpenQuotSafe"/>
	</xsl:call-template>
</xsl:variable>
<xsl:variable name="strVars2_temp2">
	<xsl:call-template name="replace-substring">
		<xsl:with-param name="original" select="$strVars2_temp1"/>
		<xsl:with-param name="substring" select="$strCloseQuot"/>
		<xsl:with-param name="replacement" select="$strCloseQuotSafe"/>
	</xsl:call-template>
</xsl:variable>
<xsl:variable name="strVars2_temp3">
	<xsl:call-template name="replace-substring">
		<xsl:with-param name="original" select="$strVars2_temp2"/>
		<xsl:with-param name="substring" select="$strQuot"/>
		<xsl:with-param name="replacement" select="$strQuotEscape"/>
	</xsl:call-template>
</xsl:variable>
<xsl:variable name="strVars2_temp4">
	<xsl:call-template name="replace-substring">
		<xsl:with-param name="original" select="$strVars2_temp3"/>
		<xsl:with-param name="substring" select="$strCloseQuotSafe"/>
		<xsl:with-param name="replacement" select="$strCloseQuot"/>
	</xsl:call-template>
</xsl:variable>
<xsl:variable name="strVars2_temp5">
	<xsl:call-template name="replace-substring">
		<xsl:with-param name="original" select="$strVars2_temp4"/>
		<xsl:with-param name="substring" select="$strOpenQuotSafe"/>
		<xsl:with-param name="replacement" select="$strOpenQuot"/>
	</xsl:call-template>
</xsl:variable>
<xsl:value-of select="$strVars2_temp5"/>

var arrSieList = strSieIdList.split(",")
	<xsl:value-of select="$newline"/>
var arrSieTitles = strSieTitleList.split("::")
	<xsl:value-of select="$newline"/>
var arrSctTitles = strSctList.split("::")
	<xsl:value-of select="$newline"/>
var arrScTitles = strScList.split("::")
	<xsl:value-of select="$newline"/>
var arrConfigTitles = strConfigList.split("::")
	<xsl:value-of select="$newline"/>
var arrSitTitles = strSitList.split("::")
	<xsl:value-of select="$newline"/>

</script>
	<xsl:value-of select="$newline"/>
<script type="text/javascript" src="../../config8/stdio.js">
<xsl:comment>
</xsl:comment>
</script>
	<xsl:value-of select="$newline"/>
<script type="text/javascript" src="../../config8/search.js">
<xsl:comment>
</xsl:comment>
</script>
	<xsl:value-of select="$newline"/>
<script type="text/javascript" src="../../config8/ui.js">
<xsl:comment>
</xsl:comment>
</script>
	<xsl:value-of select="$newline"/>
</head>
	<xsl:value-of select="$newline"/>
<body onload="initSearch();">
	<xsl:value-of select="$newline"/>
<table border="0" width="100%" cellpadding="0" cellspacing="0">
	<tr>
		<td align="center"><div class="listhead">
		<xsl:call-template name="getContentsSearchTitle">
			<xsl:with-param name="lang" select="$lang"/>
		</xsl:call-template>
		</div></td>
	</tr>
</table>

<table cellpadding="0" cellspacing="0" border="0" width="300px">
<tr>
<td align="left">
	<form class="searchconsole" name="search" onSubmit="runSearch(); return false;">
	<table border="0" cellpadding="2" cellspacing="0">
	<tr valign="middle"><td align="left" colspan="2" style="padding-left:10px;">
		<xsl:call-template name="getUI_strSearch">
			<xsl:with-param name="lang" select="$lang"/>
		</xsl:call-template>
	</td></tr>
	<tr valign="middle"><td align="left">&#160;
	<input type="text" name="main" length="48"/>&#160;</td>
	<td align="center">
<xsl:variable name="btnUI_Search">
	<xsl:call-template name="getUI_btnSearch">
		<xsl:with-param name="lang" select="$lang"/>
	</xsl:call-template>
</xsl:variable>
	<input type="button" name="search" value=" {$btnUI_Search} " onClick="runSearch(this.Form);"/>
	</td></tr>
	</table>
	</form>
	</td>
</tr>
</table>

<div id="tgtResults" class="results"></div>
<div class="last"> </div>
</body>
</html>

</xsl:template>



<xsl:template name="replace-substring">
  <xsl:param name="original"/>
  <xsl:param name="substring"/>
  <xsl:param name="replacement" select="''"/>
  <xsl:variable name="first">
    <xsl:choose>
      <xsl:when test="contains($original, $substring)">
        <xsl:value-of select="substring-before($original, $substring)"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$original"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:variable>
  <xsl:variable name="middle">
    <xsl:choose>
      <xsl:when test="contains($original, $substring)">
        <xsl:value-of select="$replacement"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:text></xsl:text>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:variable>
  <xsl:variable name="last">
    <xsl:choose>
      <xsl:when test="contains($original, $substring)">
        <xsl:choose>
          <xsl:when test="contains(substring-after($original, $substring), 
                                   $substring)">
            <xsl:call-template name="replace-substring">
              <xsl:with-param name="original">
                <xsl:value-of select="substring-after($original, $substring)"/>
              </xsl:with-param>
              <xsl:with-param name="substring">
                <xsl:value-of select="$substring"/>
              </xsl:with-param>
              <xsl:with-param name="replacement">
                <xsl:value-of select="$replacement"/>
              </xsl:with-param>
            </xsl:call-template>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="substring-after($original, $substring)"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:when>
      <xsl:otherwise>
        <xsl:text></xsl:text>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:variable>
  <xsl:value-of select="concat($first, $middle, $last)"/>
</xsl:template>


</xsl:stylesheet>




