<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html" encoding="utf-8" indent="yes" doctype-public="-//W3C//DTD HTML 4.0//EN" doctype-system="http://www.w3.org/TR/REC-html40/strict.dtd"/>

<xsl:param name="UI_lang" />
<xsl:param name="targetId" />
<xsl:param name="srcWin" />

<xsl:variable name="newline">
<xsl:text>&#13;</xsl:text>
</xsl:variable>

<xsl:variable name="sct">
<xsl:value-of select="substring($targetId,1,1)"/>
</xsl:variable>

<xsl:variable name="sc">
<xsl:value-of select="substring($targetId,1,2)"/>
</xsl:variable>

<xsl:variable name="configid">
<xsl:value-of select="substring($targetId,3,1)"/>
</xsl:variable>

<xsl:variable name="sctnum">
	<xsl:choose>
		<xsl:when test="$sct='A'">10</xsl:when>
		<xsl:when test="$sct='B'">11</xsl:when>
		<xsl:when test="$sct='C'">12</xsl:when>
		<xsl:otherwise>
			<xsl:value-of select="$sct"/>
		</xsl:otherwise>
	</xsl:choose>
</xsl:variable>

<xsl:include href="ui.xslt"/>

<xsl:template match="/">
<html>
	<xsl:value-of select="$newline"/>
<head>
<title><xsl:text>PreXns</xsl:text></title>
<link rel="stylesheet" href="../../config8/prexns.css" type="text/css"/>
	<xsl:value-of select="$newline"/>
<script type="text/javascript">
var UI_lang = "<xsl:value-of select="$UI_lang"/>";
</script>
<script type="text/javascript" src="../../config8/stdio.js">
<xsl:comment>
</xsl:comment>
</script>
	<xsl:value-of select="$newline"/>
</head>
<body onunload="closePrexnsWin();">

<xsl:if test="substring($sc,2,1) != '0'">

	<xsl:apply-templates select="document(concat('webdocstructure_',$sc,'.xml'), .)//c[@i = $configid]/t[@s = '0']/s" />
	
</xsl:if>

<xsl:if test="//a[@i = $sctnum]">

	<xsl:apply-templates select="document(concat('webdocstructure_',$sct,'0.xml'), .)//c[@i = '0']/t[@s = '0']/s" />
	
</xsl:if>

	<xsl:element name="div">
		<xsl:attribute name="class">refSec00</xsl:attribute>
		<xsl:call-template name="getUI_strReferToSec00">
			<xsl:with-param name="lang" select="$UI_lang"/>
		</xsl:call-template>
	</xsl:element>

</body>
</html>
</xsl:template>


<!-- s -->

<xsl:template match="s">
	<xsl:element name="div">
		<xsl:attribute name="class">prexn</xsl:attribute>
		<xsl:element name="div">
			<xsl:attribute name="class">sietitle</xsl:attribute>
			<xsl:value-of select="@t"/>
		</xsl:element>
		<xsl:element name="div">
			<xsl:attribute name="class">reftxt</xsl:attribute>
			<xsl:call-template name="getUI_strReferTo">
				<xsl:with-param name="lang" select="$UI_lang"/>
			</xsl:call-template>
			<xsl:element name="a">
				<xsl:attribute name="href">javascript: showPrexnSie('<xsl:value-of select="@i"/>','<xsl:value-of select="$UI_lang"/>')</xsl:attribute>
				<xsl:value-of select="@t"/>
				<xsl:text>.</xsl:text>
			</xsl:element>
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




