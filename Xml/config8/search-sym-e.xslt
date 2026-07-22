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
<title>Symptom Search</title>
	<xsl:value-of select="$newline"/>
<head>
	<xsl:value-of select="$newline"/>
<link rel="stylesheet" href="../../config8/search.css" type="text/css"/>
	<xsl:value-of select="$newline"/>
<script type="text/javascript">

	<xsl:value-of select="$newline"/>


<xsl:variable name="strQuot">&#34;</xsl:variable>
<xsl:variable name="strQuotEscape">\&#34;</xsl:variable>

<xsl:variable name="symlist">
	<xsl:for-each select="//servinfo">
		<xsl:if test="@symdesc!=''">
			<xsl:call-template name="replace-substring">
				<xsl:with-param name="original" select="@symdesc"/>
				<xsl:with-param name="substring" select="$strQuot"/>
				<xsl:with-param name="replacement" select="$strQuotEscape"/>
			</xsl:call-template>
			<xsl:if test="following::servinfo[@symdesc!='']">
				<xsl:text>::</xsl:text>
			</xsl:if>
		</xsl:if>
	</xsl:for-each>
</xsl:variable>

<xsl:variable name="sietitlelist_sym">
	<xsl:for-each select="//servinfo">
		<xsl:if test="@symdesc!=''">
			<xsl:call-template name="replace-substring">
				<xsl:with-param name="original" select="@title"/>
				<xsl:with-param name="substring" select="$strQuot"/>
				<xsl:with-param name="replacement" select="$strQuotEscape"/>
			</xsl:call-template>
			<xsl:if test="following::servinfo[@symdesc!='']">
				<xsl:text>::</xsl:text>
			</xsl:if>
		</xsl:if>
	</xsl:for-each>
</xsl:variable>

<xsl:variable name="sieidlist_sym">
	<xsl:for-each select="//servinfo">
		<xsl:if test="@symdesc!=''">
			<xsl:value-of select="@id"/>
			<xsl:if test="following::servinfo[@symdesc!='']">
				<xsl:text>,</xsl:text>
			</xsl:if>
		</xsl:if>
	</xsl:for-each>
</xsl:variable>

<xsl:variable name="scttitlelist">
	<xsl:for-each select="//section">
		<xsl:variable name="sct">
			<xsl:choose>
				<xsl:when test="substring(@file,9,2)='00'">z</xsl:when>
				<xsl:when test="substring(@file,9,2)='99' and @id!='9I'">y</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="substring(@file,9,1)"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<xsl:variable name="prevsct">
			<xsl:choose>
				<xsl:when test="substring(preceding-sibling::section[1]/@file,9,2)='00'">00</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="substring(preceding-sibling::section[1]/@file,9,1)"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<xsl:variable name="sname">
			<xsl:call-template name="getSname">
				<xsl:with-param name="sct" select="$sct"/>
				<xsl:with-param name="lang" select="$lang"/>
			</xsl:call-template>
		</xsl:variable>
		<xsl:choose>
			<xsl:when test="$sct!=$prevsct">
				<xsl:value-of select="$sct"/>
				<xsl:text>|</xsl:text>
				<xsl:value-of select="$sname"/>
				<xsl:text>::</xsl:text>
			</xsl:when>
			<xsl:otherwise>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:for-each>
</xsl:variable>

<xsl:variable name="sctitlelist">
	<xsl:for-each select="//servcat">
		<xsl:value-of select="substring(../@file,9,2)"/>
		<xsl:text>|</xsl:text>
		<xsl:value-of select="@title"/>
		<xsl:if test="following::servcat">
			<xsl:text>::</xsl:text>
		</xsl:if>
	</xsl:for-each>
</xsl:variable>

<xsl:variable name="configlist">
	<xsl:for-each select="//configtype">
		<xsl:if test="@id != '0'">
			<xsl:value-of select="substring(../../@file,9,2)"/>
			<xsl:value-of select="@id"/>
			<xsl:text>|</xsl:text>
			<xsl:value-of select="@title"/>
			<xsl:if test="following::configtype[@id != '0']">
				<xsl:text>::</xsl:text>
			</xsl:if>
		</xsl:if>
	</xsl:for-each>
</xsl:variable>

<xsl:variable name="sitlist">
	<xsl:for-each select="//servinfotype">
		<xsl:value-of select="substring(servinfo[1]/@id,9,4)"/>
		<xsl:text>|</xsl:text>
		<xsl:value-of select="@title"/>
		<xsl:if test="following::servinfotype">
			<xsl:text>::</xsl:text>
		</xsl:if>
	</xsl:for-each>
</xsl:variable>


var strSymList = "<xsl:value-of select="$symlist"/>"
	<xsl:value-of select="$newline"/>
var strSieIdList_Sym = "<xsl:value-of select="$sieidlist_sym"/>"
	<xsl:value-of select="$newline"/>
var strSieTitleList_Sym = "<xsl:value-of select="$sietitlelist_sym"/>"
	<xsl:value-of select="$newline"/>
var arrSyms = strSymList.split("::")
	<xsl:value-of select="$newline"/>
var arrSieList_Sym = strSieIdList_Sym.split(",")
	<xsl:value-of select="$newline"/>
var arrSieTitles_Sym = strSieTitleList_Sym.split("::")
	<xsl:value-of select="$newline"/>
	
	
var strSctList = "<xsl:value-of select="substring($scttitlelist,1,string-length($scttitlelist)-2)"/>"
	<xsl:value-of select="$newline"/>
var arrSctTitles = strSctList.split("::")
	<xsl:value-of select="$newline"/>
var strScList = "<xsl:value-of select="$sctitlelist"/>"
	<xsl:value-of select="$newline"/>
var arrScTitles = strScList.split("::")
	<xsl:value-of select="$newline"/>
var strConfigList = "<xsl:value-of select="$configlist"/>"
	<xsl:value-of select="$newline"/>
var arrConfigTitles = strConfigList.split("::")
	<xsl:value-of select="$newline"/>
var strSitList = "<xsl:value-of select="$sitlist"/>"
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
<body onload="initSearch2();">
	<xsl:value-of select="$newline"/>
<table border="0" width="100%" cellpadding="0" cellspacing="0">
	<tr>
		<td align="center"><div class="listhead">
		<xsl:call-template name="getSymSearchTitle">
			<xsl:with-param name="lang" select="$lang"/>
		</xsl:call-template>
		</div></td>
	</tr>
</table>

<table cellpadding="0" cellspacing="0" border="0" width="300px">
<tr>
<td align="left">
	<form class="searchconsole" name="searchsym" onSubmit="runSearch2(); return false;">
	<table border="0" cellpadding="2" cellspacing="0">
	<tr valign="middle"><td align="left" colspan="2" style="padding-left:10px;">
		<xsl:call-template name="getUI_strSearchSym">
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
	<input type="button" name="search" value=" {$btnUI_Search} " onClick="runSearch2(this.Form);"/>
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




