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
<title>Modifications List</title>
	<xsl:value-of select="$newline"/>
<link rel="stylesheet" href="../../config8/modslist.css" type="text/css"/>
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
<body>
	<xsl:value-of select="$newline"/>
<xsl:element name="div">
	<xsl:attribute name="class">modlist</xsl:attribute>
	<xsl:value-of select="$newline"/>
		<xsl:element name="div">
			<xsl:attribute name="class">title</xsl:attribute>
			<xsl:call-template name="getUI_strMod">
				<xsl:with-param name="lang" select="$lang"/>
			</xsl:call-template>
		</xsl:element>
	<xsl:apply-templates />
</xsl:element>
</body>
</html>
</xsl:template>

<!-- section -->

<xsl:template match="a">
	<xsl:apply-templates />
</xsl:template>

<!-- servcat -->

<xsl:template match="b">
	<xsl:value-of select="$newline"/>
	<xsl:if test="@m='t'">
		<xsl:element name="div">
			<xsl:attribute name="class">sc</xsl:attribute>
			<xsl:value-of select="../@i"/> &#8211; <xsl:value-of select="@t"/>
		</xsl:element>
		<table border="0">
			<xsl:variable name="docPath">
				<xsl:text>webdocstructure_</xsl:text>
				<xsl:value-of select="substring(../@f,9,2)"/>
				<xsl:text>.xml</xsl:text>
			</xsl:variable>
			<xsl:apply-templates select="document($docPath, .)//s[@m='t']"/>
		</table>
	</xsl:if>
</xsl:template>


<!-- servinfo -->

<xsl:template match="s">
	<xsl:value-of select="$newline"/>
<xsl:variable name="sieid">
	<xsl:value-of select="@i"/>
</xsl:variable>

<xsl:if test="@m='t'">
<tr>
<td>
	<xsl:element name="div">
		<xsl:attribute name="class">mod_icon2</xsl:attribute>
		<xsl:attribute name="onclick">showModPdf('<xsl:value-of select="$sieid"/>')</xsl:attribute>
		<xsl:call-template name="getUI_iconMod">
			<xsl:with-param name="lang" select="$lang"/>
		</xsl:call-template>
	</xsl:element>
</td>

<td>
	<xsl:element name="div">
		<xsl:attribute name="class">sie</xsl:attribute>
		<xsl:attribute name="id">sie<xsl:value-of select="$sieid"/></xsl:attribute>
		<xsl:value-of select="@t"/>
	</xsl:element>
</td>
</tr>
	
</xsl:if>
</xsl:template>


<!-- title -->

<xsl:template match="title">
	<xsl:element name="div">
		<xsl:attribute name="class">title</xsl:attribute>
		<xsl:apply-templates select="text()|emph|sub|sup|intxref|intxrefpoff|intxreftitleoff|intxreftitleoff1|symbol"/>
	</xsl:element>
</xsl:template>

<!-- symbol -->

<xsl:template match="symbol">
<xsl:choose>
	<xsl:when test="@type='chara'">
		<xsl:element name="img">
			<xsl:attribute name="class">symbol</xsl:attribute>
			<xsl:attribute name="name"><xsl:value-of select="@name"/></xsl:attribute>
			<xsl:attribute name="src">../../icon/<xsl:value-of select="@name"/>.png</xsl:attribute>
			<xsl:attribute name="title"><xsl:value-of select="@name"/></xsl:attribute>
			<xsl:attribute name="alt">icon</xsl:attribute>
		</xsl:element>
	</xsl:when>
	<xsl:otherwise>
		<xsl:element name="img">
			<xsl:attribute name="class">symbol</xsl:attribute>
			<xsl:attribute name="name"><xsl:value-of select="@name"/></xsl:attribute>
			<xsl:attribute name="src">../symbol/<xsl:value-of select="@name"/>.png</xsl:attribute>
			<xsl:attribute name="title"><xsl:value-of select="@name"/></xsl:attribute>
			<xsl:attribute name="alt">icon</xsl:attribute>
		</xsl:element>
	</xsl:otherwise>
</xsl:choose>
</xsl:template>

<!-- decoration -->
<!-- sub -->

<xsl:template match="sub">
	<xsl:element name="sub">
		<xsl:attribute name="class">sub</xsl:attribute>
		<xsl:value-of select="normalize-space(.)"/>
	</xsl:element>
</xsl:template>

<!-- sup -->

<xsl:template match="sup">
	<xsl:element name="sup">
		<xsl:attribute name="class">sup</xsl:attribute>
		<xsl:value-of select="normalize-space(.)"/>
	</xsl:element>
</xsl:template>

<!-- emph -->

<xsl:template match="emph">
	<xsl:element name="span">
		<xsl:attribute name="class">
			<xsl:choose>
				<xsl:when test="@etype">
					<xsl:value-of select="@etype"/>
				</xsl:when>
				<xsl:otherwise>bold</xsl:otherwise>
			</xsl:choose>
		</xsl:attribute>
		<xsl:apply-templates />
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




