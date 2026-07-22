<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html" encoding="utf-8" indent="yes" doctype-public="-//W3C//DTD HTML 4.0//EN" doctype-system="http://www.w3.org/TR/REC-html40/strict.dtd"/>

<xsl:param name="lang"/>
<xsl:param name="sc"/>

<xsl:variable name="newline">
<xsl:text>
</xsl:text>
</xsl:variable>

<xsl:include href="ui.xslt"/>

<xsl:template match="/">
	<xsl:apply-templates select="//c"/>
</xsl:template>

<!-- configtype -->

<xsl:template match="c">
<xsl:variable name="configid">
	<xsl:value-of select="$sc"/><xsl:value-of select="@i"/>
</xsl:variable>

<xsl:choose>
	<xsl:when test="@i!='0'">
	<xsl:value-of select="$newline"/>
		<xsl:element name="a">
			<xsl:attribute name="href">javascript: toggle('<xsl:value-of select="$configid"/>')</xsl:attribute>
			<xsl:attribute name="title"><xsl:value-of select="@t"/>
			</xsl:attribute>
					
			<xsl:element name="div">
				<xsl:attribute name="class">config</xsl:attribute>
				<xsl:attribute name="onmouseover">overDiv(this)</xsl:attribute>
				<xsl:attribute name="onmouseout">outDiv(this)</xsl:attribute>
				<xsl:element name="img">
					<xsl:attribute name="class">mark</xsl:attribute>
					<xsl:attribute name="id">mk<xsl:value-of select="$configid"/></xsl:attribute>
					<xsl:attribute name="src">../../icon/closed.gif</xsl:attribute>
					<xsl:attribute name="width">11px</xsl:attribute>
					<xsl:attribute name="border">0</xsl:attribute>
					<xsl:attribute name="alt">icon</xsl:attribute>
				</xsl:element>
<xsl:if test="descendant::s[@m='t']">
	<xsl:element name="span">
		<xsl:attribute name="class">mod_icon</xsl:attribute>
		<xsl:call-template name="getUI_iconMod">
			<xsl:with-param name="lang" select="$lang"/>
		</xsl:call-template>
	</xsl:element>
</xsl:if>
				<xsl:value-of select="@t"/>
			</xsl:element>
		</xsl:element>
	<xsl:value-of select="$newline"/>
		<xsl:element name="div">
			<xsl:attribute name="id">blk<xsl:value-of select="$configid"/></xsl:attribute>
			<xsl:attribute name="style">display: none;</xsl:attribute>
			<xsl:apply-templates />
		</xsl:element>
	</xsl:when>
	<xsl:otherwise>
		<xsl:apply-templates />
	</xsl:otherwise>
</xsl:choose>


</xsl:template>

<!-- servinfotype -->

<xsl:template match="t">
	<xsl:value-of select="$newline"/>
<xsl:variable name="sitcode">
	<xsl:choose>
		<xsl:when test="@s"><xsl:value-of select="@s"/></xsl:when>
		<xsl:otherwise>
			<xsl:value-of select="substring(s/@i,12,1)"/>
		</xsl:otherwise>
	</xsl:choose>
</xsl:variable>
<xsl:variable name="sitid">
	<xsl:value-of select="$sc"/><xsl:value-of select="../@i"/><xsl:value-of select="$sitcode"/>
</xsl:variable>

<xsl:element name="a">
	<xsl:attribute name="href">javascript: toggle('<xsl:value-of select="$sitid"/>')</xsl:attribute>
	<xsl:attribute name="title"><xsl:value-of select="@t"/>
	</xsl:attribute>
			
	<xsl:element name="div">
		<xsl:attribute name="class">sit</xsl:attribute>
		<xsl:attribute name="onmouseover">overDiv(this)</xsl:attribute>
		<xsl:attribute name="onmouseout">outDiv(this)</xsl:attribute>
		<xsl:element name="img">
			<xsl:attribute name="class">mark</xsl:attribute>
			<xsl:attribute name="id">mk<xsl:value-of select="$sitid"/></xsl:attribute>
			<xsl:attribute name="src">../../icon/closed.gif</xsl:attribute>
			<xsl:attribute name="width">11px</xsl:attribute>
			<xsl:attribute name="border">0</xsl:attribute>
			<xsl:attribute name="alt">icon</xsl:attribute>
		</xsl:element>
<xsl:if test="s[@m='t']">
	<xsl:element name="span">
		<xsl:attribute name="class">mod_icon</xsl:attribute>
		<xsl:call-template name="getUI_iconMod">
			<xsl:with-param name="lang" select="$lang"/>
		</xsl:call-template>
	</xsl:element>
</xsl:if>
		<xsl:value-of select="@t"/>
	</xsl:element>
</xsl:element>
	<xsl:value-of select="$newline"/>
<xsl:element name="div">
	<xsl:attribute name="id">blk<xsl:value-of select="$sitid"/></xsl:attribute>
	<xsl:attribute name="style">display: none;</xsl:attribute>
	<xsl:apply-templates />
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




