<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html" encoding="utf-8" indent="yes" doctype-public="-//W3C//DTD HTML 4.0//EN" doctype-system="http://www.w3.org/TR/REC-html40/strict.dtd"/>

<xsl:variable name="lang">
	<xsl:value-of select="translate(//manual/@lang, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')"/>
</xsl:variable>

<xsl:variable name="newline">
<xsl:text>
</xsl:text>
</xsl:variable>

<xsl:include href="ui.xslt"/>

<xsl:template match="/">
<html>
	<xsl:value-of select="$newline"/>
<head>
<title>Contents Index</title>
	<xsl:value-of select="$newline"/>
<link rel="stylesheet" href="../../config8/navi.css" type="text/css"/>
	<xsl:value-of select="$newline"/>
<script type="text/javascript">
<xsl:comment>
<xsl:value-of select="document('webdocstructure_vars1.xml', .)//vars"/>
<xsl:text>
var arrSieList = strSieIdList.split(",");
</xsl:text>
<xsl:text>
var strManualID = "</xsl:text>
<xsl:value-of select="//manual/@manualid"/>
<xsl:text>"
var strManual = "</xsl:text>
<xsl:value-of select="//manual/@manualname"/>
<xsl:text>"
</xsl:text>

<xsl:text>
var strLang = "</xsl:text>
<xsl:value-of select="//manual/@lang"/>
<xsl:text>";</xsl:text>

<xsl:text>
function setModelInfo() {
	if (strManualID=="") {
		parent.CTL.document.ctl.modelname.value = "empty";
	} else {
		parent.CTL.document.ctl.modelname.value = strManualID;
		top.name = strManualID;
	}
	if (strManual=="") {
		parent.CTL.document.ctl.manualname.value = "empty";
	} else {
		parent.CTL.document.ctl.manualname.value = strManual;
	}

	if (strLang!="" &amp;&amp; strLang!=parent.CTL.document.ctl.lang.value) {
		parent.CTL.document.ctl.lang.value = strLang;
		setUI(strLang);
	} 
}
</xsl:text>

<xsl:text>// </xsl:text>
</xsl:comment>
</script>
	<xsl:value-of select="$newline"/>
<script type="text/javascript" src="../../config8/stdio.js">
<xsl:comment>
</xsl:comment>
</script>
<script type="text/javascript" src="../../config8/ui.js">
<xsl:comment>
</xsl:comment>
</script>
	<xsl:value-of select="$newline"/>
</head>
<body onload="initNavi();setModelInfo();">
	<xsl:value-of select="$newline"/>
<table border="0" width="100%" cellpadding="0" cellspacing="0">
	<tr>
		<td align="center"><div class="listhead">
		<xsl:call-template name="getContentsIndexTitle">
			<xsl:with-param name="lang" select="$lang"/>
		</xsl:call-template>
		</div></td>
	</tr>
</table>

<xsl:variable name="showMods">
	<xsl:text>0</xsl:text>
	<xsl:for-each select="//a">
		<xsl:choose>
			<xsl:when test="@i='a'">
				<xsl:if test="//s[@m='t']">1</xsl:if>
			</xsl:when>
			<xsl:otherwise>
				<xsl:if test="b[@m='t']">1</xsl:if>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:for-each>
</xsl:variable>

<xsl:if test="$showMods!='0'">
	<xsl:value-of select="$newline"/>
	<table border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td align="left"><div id="btnMod" class="btnMod" onclick="showMods(this);">
			<xsl:call-template name="getUI_btnMod">
				<xsl:with-param name="lang" select="$lang"/>
			</xsl:call-template>
			</div></td>
		</tr>
	</table>
</xsl:if>

	<xsl:apply-templates select="//a"/>
	<div class="last">&#160;</div>
</body>
</html>
</xsl:template>

<!-- section -->

<xsl:template match="a">
	<xsl:value-of select="$newline"/>
<xsl:variable name="sct">
	<xsl:choose>
		<xsl:when test="substring(@f,9,2)='00'">z</xsl:when>
		<xsl:when test="substring(@f,9,2)='99' and @i!='9I'">y</xsl:when>
		<xsl:when test="@i='a'">aa</xsl:when>
		<xsl:otherwise>
			<xsl:value-of select="substring(@f,9,1)"/>
		</xsl:otherwise>
	</xsl:choose>
</xsl:variable>
<xsl:variable name="prevsct">
	<xsl:choose>
		<xsl:when test="substring(preceding-sibling::a[1]/@f,9,2)='00'">00</xsl:when>
		<xsl:otherwise>
			<xsl:value-of select="substring(preceding-sibling::a[1]/@f,9,1)"/>
		</xsl:otherwise>
	</xsl:choose>
</xsl:variable>

<xsl:variable name="sname">
	<xsl:call-template name="getSname">
		<xsl:with-param name="sct" select="$sct"/>
		<xsl:with-param name="lang" select="$lang"/>
	</xsl:call-template>
</xsl:variable>

<xsl:variable name="snametooltip">
	<xsl:call-template name="getSnameTooltip">
		<xsl:with-param name="sct" select="$sct"/>
		<xsl:with-param name="lang" select="$lang"/>
	</xsl:call-template>
</xsl:variable>

<xsl:variable name="modSie">
	<xsl:text>0</xsl:text>
	<xsl:choose>
		<xsl:when test="@i='a' and //s[@m='t']">
			<xsl:text>1</xsl:text>
		</xsl:when>
		<xsl:when test="@i!='a' and b[@m='t']">
			<xsl:text>1</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:for-each select="following-sibling::a">
				<xsl:if test="substring(@f,9,1)=$sct">
					<xsl:if test="b[@m='t']">1</xsl:if>
				</xsl:if>
			</xsl:for-each>
		</xsl:otherwise>
	</xsl:choose>
</xsl:variable>

<xsl:choose>
	<xsl:when test="$sct!=$prevsct">
		<xsl:element name="a">
			<xsl:attribute name="href">javascript: toggle('<xsl:value-of select="$sct"/>')</xsl:attribute>
			<xsl:attribute name="title"><xsl:value-of select="$snametooltip"/></xsl:attribute>
			<xsl:element name="div">
				<xsl:attribute name="class">sct</xsl:attribute>
				<xsl:attribute name="onmouseover">overDiv(this)</xsl:attribute>
				<xsl:attribute name="onmouseout">outDiv(this)</xsl:attribute>
				<xsl:element name="img">
					<xsl:attribute name="class">mark</xsl:attribute>
					<xsl:attribute name="id">mk<xsl:value-of select="$sct"/></xsl:attribute>
					<xsl:attribute name="src">../../icon/closed.gif</xsl:attribute>
					<xsl:attribute name="width">11px</xsl:attribute>
					<xsl:attribute name="border">0</xsl:attribute>
					<xsl:attribute name="alt">icon</xsl:attribute>
				</xsl:element>

	<xsl:if test="$modSie!='0'">
		<xsl:element name="span">
			<xsl:attribute name="class">mod_icon</xsl:attribute>
			<xsl:call-template name="getUI_iconMod">
				<xsl:with-param name="lang" select="$lang"/>
			</xsl:call-template>
		</xsl:element>
	</xsl:if>

				<xsl:value-of select="$sname"/>
			</xsl:element>
		</xsl:element>
	<xsl:value-of select="$newline"/>
		<xsl:element name="div">
			<xsl:attribute name="id">blk<xsl:value-of select="$sct"/></xsl:attribute>
			<xsl:attribute name="style">display: none;</xsl:attribute>
			<xsl:apply-templates />
			<xsl:for-each select="following-sibling::a">
				<xsl:if test="substring(@f,9,1)=$sct">
					<xsl:apply-templates />
				</xsl:if>
			</xsl:for-each>
		</xsl:element>
	</xsl:when>
	<xsl:otherwise>
	</xsl:otherwise>
</xsl:choose>
</xsl:template>

<!-- servcat -->

<xsl:template match="b">
	<xsl:value-of select="$newline"/>
<xsl:variable name="scid">
	<xsl:value-of select="substring(../@f,9,2)"/>
</xsl:variable>

<xsl:element name="a">
	<xsl:attribute name="href">javascript: toggle('<xsl:value-of select="$scid"/>')</xsl:attribute>
	<xsl:attribute name="title"><xsl:value-of select="../@i"/> &#8211; <xsl:value-of select="@t"/>
	</xsl:attribute>
			
	<xsl:element name="div">
		<xsl:attribute name="class">sc</xsl:attribute>
		<xsl:attribute name="onmouseover">overDiv(this)</xsl:attribute>
		<xsl:attribute name="onmouseout">outDiv(this)</xsl:attribute>
		<xsl:element name="img">
			<xsl:attribute name="class">mark</xsl:attribute>
			<xsl:attribute name="id">mk<xsl:value-of select="$scid"/></xsl:attribute>
			<xsl:attribute name="src">../../icon/closed.gif</xsl:attribute>
			<xsl:attribute name="width">11px</xsl:attribute>
			<xsl:attribute name="border">0</xsl:attribute>
			<xsl:attribute name="alt">icon</xsl:attribute>
		</xsl:element>
<xsl:if test="@m='t'">
	<xsl:element name="span">
		<xsl:attribute name="class">mod_icon</xsl:attribute>
		<xsl:call-template name="getUI_iconMod">
			<xsl:with-param name="lang" select="$lang"/>
		</xsl:call-template>
	</xsl:element>
</xsl:if>
		<xsl:value-of select="../@i"/> &#8211; <xsl:value-of select="@t"/>
	</xsl:element>
</xsl:element>
	<xsl:value-of select="$newline"/>
<xsl:element name="div">
	<xsl:attribute name="id">blk<xsl:value-of select="$scid"/></xsl:attribute>
	<xsl:attribute name="style">display: none;</xsl:attribute>
	<xsl:text>Loading...</xsl:text>
</xsl:element>
</xsl:template>

<!-- servinfo -->

<xsl:template match="s">
	<xsl:value-of select="$newline"/>
<xsl:variable name="sieid">
	<xsl:value-of select="@i"/>
</xsl:variable>

<xsl:element name="a">
	<xsl:attribute name="href">javascript: loadSIE('<xsl:value-of select="$sieid"/>')</xsl:attribute>
	<xsl:attribute name="title"><xsl:value-of select="@t"/>
	</xsl:attribute>

			
	<xsl:element name="div">
		<xsl:attribute name="class">sie</xsl:attribute>
		<xsl:attribute name="id">sie<xsl:value-of select="$sieid"/></xsl:attribute>
		<xsl:attribute name="onmouseover">overDiv(this)</xsl:attribute>
		<xsl:attribute name="onmouseout">outDiv(this)</xsl:attribute>
		<xsl:element name="img">
			<xsl:attribute name="class">mark</xsl:attribute>
			<xsl:attribute name="src">../../icon/doc.gif</xsl:attribute>
			<xsl:attribute name="width">11px</xsl:attribute>
			<xsl:attribute name="border">0</xsl:attribute>
			<xsl:attribute name="alt">icon</xsl:attribute>
		</xsl:element>
<xsl:if test="@m='t'">
	<xsl:element name="span">
		<xsl:attribute name="class">mod_icon</xsl:attribute>
		<xsl:attribute name="onclick">showModPdf('<xsl:value-of select="$sieid"/>')</xsl:attribute>
		<xsl:call-template name="getUI_iconMod">
			<xsl:with-param name="lang" select="$lang"/>
		</xsl:call-template>
	</xsl:element>
</xsl:if>
		<xsl:value-of select="@t"/>
	</xsl:element>
</xsl:element>
</xsl:template>

<xsl:template match="text()">
<!-- the method used here is to remove the return characters in the text nodes of the instance data, which are treated as whitespace in the transformation and subsequently displayed as a single space in the browser. -->
	<xsl:variable name="txtstring">
		<xsl:value-of select="."/>
	</xsl:variable>
	<xsl:variable name="CR">&#13;</xsl:variable>

	<xsl:value-of select="translate($txtstring, $CR, '')"/>
</xsl:template>


</xsl:stylesheet>




