<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html" encoding="utf-8" indent="yes" doctype-public="-//W3C//DTD HTML 4.0//EN" doctype-system="http://www.w3.org/TR/REC-html40/strict.dtd"/>

<xsl:key name="toolitems" match="servicetoolitem" use="s-number"/>
<xsl:key name="mitems" match="materialitem" use="m-number"/>

<xsl:param name="UI_lang" />

<xsl:variable name="newline">
<xsl:text>&#13;</xsl:text>
</xsl:variable>

<xsl:include href="ui.xslt"/>

<xsl:template match="/">
<html>
	<xsl:value-of select="$newline"/>
<head>
<title><xsl:text>PreReqs</xsl:text></title>
<link rel="stylesheet" href="../../config8/prereqs.css" type="text/css"/>
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
<body>
	<xsl:if test="//servicetool or //materials">
		<xsl:element name="div">
			<xsl:attribute name="class">sit</xsl:attribute>
			<xsl:element name="div">
				<xsl:attribute name="class">title</xsl:attribute>
				<xsl:call-template name="getUI_strPreReqSitTitle">
					<xsl:with-param name="lang" select="$UI_lang"/>
				</xsl:call-template>
			</xsl:element>
			<xsl:if test="//servicetool">
				<xsl:element name="div">
					<xsl:attribute name="class">sst</xsl:attribute>
					<xsl:element name="div">
						<xsl:attribute name="class">title</xsl:attribute>
						<xsl:call-template name="getUI_strPreReqSstTitle">
							<xsl:with-param name="lang" select="$UI_lang"/>
						</xsl:call-template>
					</xsl:element>
					<xsl:call-template name="servicetool" />
				</xsl:element>
			</xsl:if>
			<xsl:if test="//materials">
				<xsl:element name="div">
					<xsl:attribute name="class">material</xsl:attribute>
					<xsl:element name="div">
						<xsl:attribute name="class">title</xsl:attribute>
						<xsl:call-template name="getUI_strPreReqMaterialsTitle">
							<xsl:with-param name="lang" select="$UI_lang"/>
						</xsl:call-template>
					</xsl:element>
					<xsl:call-template name="materials" />
				</xsl:element>
			</xsl:if>
		</xsl:element>
	</xsl:if>
</body>
</html>
</xsl:template>

<!-- servicetool -->


<xsl:template name="servicetool">
	<xsl:value-of select="$newline"/>
	<xsl:for-each select="//servicetoolitem[generate-id(.)=generate-id(key('toolitems', s-number)[1])]">
			<xsl:element name="div">
				<xsl:attribute name="class">sst_item</xsl:attribute>
					<xsl:call-template name="servicetoolitem" />
			</xsl:element>
	</xsl:for-each>
</xsl:template>

<!-- servicetoolitem -->

<xsl:template name="servicetoolitem">
	<xsl:apply-templates select="s-number"/>
	<xsl:choose>
		<xsl:when test="s-name">
			<xsl:apply-templates select="s-name" />
		</xsl:when>
		<xsl:when test="contains(s-number/@num, 'NNNNN-')">
		</xsl:when>
		<xsl:otherwise>
			<xsl:variable name="tgtTool">
				<xsl:value-of select="s-number/@num"/>
			</xsl:variable>
			<xsl:variable name="tPath">
				<xsl:text>../image/TOOL/Tool_</xsl:text>
				<xsl:value-of select="$UI_lang"/>
				<xsl:text>.xml</xsl:text>
			</xsl:variable>
			<xsl:if test="document($tPath, .)">
				<xsl:element name="span">
					<xsl:text>(</xsl:text>
					<xsl:value-of select="document($tPath, .)//tool[@id = $tgtTool]/name"/>
					<xsl:text>) </xsl:text>
				</xsl:element>
			</xsl:if>
		</xsl:otherwise>
	</xsl:choose>
	<xsl:apply-templates select="ptxt"/>
</xsl:template>

<!-- s-part -->

<xsl:template match="s-part">
</xsl:template> 

<!-- s-number -->

<xsl:template match="s-number">
	<xsl:value-of select="$newline"/>
<xsl:element name="span">
	<xsl:element name="a">
		<xsl:attribute name="class">toollink</xsl:attribute>
		<xsl:attribute name="href">
			<xsl:text>javascript: showTool('</xsl:text>
			<xsl:value-of select="@num"/>
			<xsl:text>')</xsl:text>
		</xsl:attribute>
		<xsl:apply-templates />
	</xsl:element>
	<xsl:text> </xsl:text>
</xsl:element>
</xsl:template>

<!-- s-name -->

<xsl:template match="s-name">
<xsl:element name="span">
	<xsl:text>(</xsl:text>
	<xsl:apply-templates />
	<xsl:text>) </xsl:text>
</xsl:element>
</xsl:template> 

<xsl:template match="servicetoolitem/ptxt">
		<xsl:apply-templates />
</xsl:template>


<!-- materials -->

<xsl:template name="materials">
	<xsl:value-of select="$newline"/>
	<xsl:for-each select="//materialitem[generate-id(.)=generate-id(key('mitems', m-number)[1])]">
		<xsl:element name="div">
			<xsl:attribute name="class">material_item</xsl:attribute>
				<xsl:call-template name="materialitem" />
		</xsl:element>
	</xsl:for-each>
</xsl:template>

<!-- materialitem -->

<xsl:template name="materialitem">
	<xsl:apply-templates />
</xsl:template>

<!-- m-part -->

<xsl:template match="m-part">
</xsl:template>

<!-- m-type -->

<xsl:template match="m-type">
	<xsl:element name="span">
		<xsl:attribute name="class">m-type</xsl:attribute>
		<xsl:apply-templates />
	</xsl:element>
</xsl:template>

<!-- m-desc -->

<xsl:template match="m-desc">
	<xsl:element name="span">
		<xsl:attribute name="class">m-desc</xsl:attribute>
		<xsl:apply-templates />
		<xsl:text> </xsl:text>
	</xsl:element>
</xsl:template>

<!-- m-number -->

<xsl:template match="m-number">
	<xsl:element name="span">
		<xsl:attribute name="class">m-number</xsl:attribute>
		<xsl:text> </xsl:text>
		<xsl:apply-templates />
	</xsl:element>
</xsl:template>

<!-- m-name -->

<xsl:template match="m-name">
	<xsl:element name="span">
		<xsl:attribute name="class">m-name</xsl:attribute>
		<xsl:text> (</xsl:text>
		<xsl:apply-templates />
		<xsl:text>)</xsl:text>
	</xsl:element>
</xsl:template>

<xsl:template match="materialitem/ptxt">
	<xsl:text> </xsl:text>
	<xsl:apply-templates />
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




