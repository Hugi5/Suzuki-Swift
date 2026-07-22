<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html" encoding="utf-8" indent="yes" doctype-public="-//W3C//DTD HTML 4.0//EN" doctype-system="http://www.w3.org/TR/REC-html40/strict.dtd"/>

<xsl:param name="UI_lang" />
<xsl:param name="tgtTool" />
<xsl:param name="tb" />
<xsl:param name="dc" />
<xsl:param name="ttop" />

<xsl:variable name="newline">
<xsl:text>&#13;</xsl:text>
</xsl:variable>

<xsl:include href="ui.xslt"/>

<xsl:template match="/">
<html>
	<xsl:value-of select="$newline"/>
<head>
<title><xsl:text>Tool </xsl:text>
<xsl:if test="not(contains($tgtTool, 'NNNNN-'))">
	<xsl:value-of select="$tgtTool"/>
</xsl:if>
</title>
<link rel="stylesheet" href="../../config8/tool.css" type="text/css"/>
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
	<xsl:apply-templates select="//tools"/>
</body>
</html>
</xsl:template>

<!-- tools -->

<xsl:template match="tools">
	<xsl:apply-templates select="tool[@id=$tgtTool]"/>
</xsl:template>


<!-- tool -->

<xsl:template match="tool">
	<xsl:value-of select="$newline"/>
<xsl:element name="div">
	<xsl:attribute name="class">figure</xsl:attribute>

<xsl:variable name="gpath">
	<xsl:text>../../image/TOOL/</xsl:text>
	<xsl:choose>
		<xsl:when test="@pre">
			<xsl:value-of select="@pre"/>
		</xsl:when>
		<xsl:otherwise>
			<xsl:value-of select="$ttop"/>
		</xsl:otherwise>
	</xsl:choose>
	<xsl:value-of select="@id"/>
	<xsl:text>.swf</xsl:text>
</xsl:variable>

	<xsl:element name="object">
		<xsl:attribute name="classid">clsid:D27CDB6E-AE6D-11cf-96B8-444553540000</xsl:attribute>
<!--		<xsl:attribute name="height">
			<xsl:value-of select="$displayheight" />
		</xsl:attribute>
		
		<xsl:attribute name="width">
				<xsl:value-of select="$displaywidth" />
		</xsl:attribute>
-->
		<param name="movie" value="{$gpath}" />
		<param name="quality" value="high" />

		<xsl:element name="embed">
			<xsl:attribute name="src">
				<xsl:value-of select="$gpath" />
			</xsl:attribute>
			<xsl:attribute name="quality">high</xsl:attribute>
			<xsl:attribute name="type">application/x-shockwave-flash</xsl:attribute>
<!--			<xsl:attribute name="height">
				<xsl:value-of select="$displayheight" />
			</xsl:attribute>
			<xsl:attribute name="width">
					<xsl:value-of select="$displaywidth" />
			</xsl:attribute>
-->
		</xsl:element>
		
	</xsl:element>

</xsl:element>

<xsl:if test="not(contains(@id, 'NNNNN-'))">
	<xsl:element name="div">
		<xsl:attribute name="class">toolnbr</xsl:attribute>
		<xsl:value-of select="@id"/>
	</xsl:element>
</xsl:if>

<xsl:element name="div">
	<xsl:attribute name="class">toolname</xsl:attribute>
		<xsl:apply-templates select="name"/>
</xsl:element>

<xsl:apply-templates select="attention"/>

<xsl:if test="not(contains(@id, 'NNNNN-')) and $tb='on' and $dc!='0'">
<xsl:variable name="tbdatapath">
	<xsl:if test="document('../../image/TOOL/tbpaths.xml', .)">
		<xsl:value-of select="document('../../image/TOOL/tbpaths.xml', .)//path[@dc = $dc]"/>
	</xsl:if>
	<xsl:text>/</xsl:text>
	<xsl:value-of select="$dc"/>
	<xsl:text>/</xsl:text>
</xsl:variable>
<xsl:variable name="tbfileurl">
	<xsl:if test="document('../../image/TOOL/tbpaths.xml', .)">
		<xsl:value-of select="document('../../image/TOOL/tbpaths.xml', .)//path[@dc = $dc]/@url"/>
	</xsl:if>
</xsl:variable>
<xsl:variable name="tbfilename">
	<xsl:value-of select="$tgtTool"/>
	<xsl:if test="string-length($tgtTool)!=15">
		<xsl:text>-000</xsl:text>
	</xsl:if>
	<xsl:text>_</xsl:text>
	<xsl:value-of select="$dc"/>
	<xsl:text>.jpg</xsl:text>
</xsl:variable>
<xsl:variable name="tbfilepath">
	<xsl:value-of select="$tbfileurl"/>
	<xsl:value-of select="$tbfilename"/>
</xsl:variable>

	<xsl:if test="count(document(concat('../../../',$tbdatapath,'tblist.xml'), .)//tb[@f=$tbfilename])!=0">
		<table border="0" cellpadding="0" cellspacing="0" width="100%">
		<tr>
		<td align="center">
			<xsl:element name="div">
				<xsl:attribute name="class">btn_tb</xsl:attribute>
				<xsl:attribute name="onclick">
					<xsl:text>showTB('</xsl:text>
					<xsl:value-of select="$tbfilepath"/>
					<xsl:text>')</xsl:text>
				</xsl:attribute>
				<xsl:call-template name="getUI_btnTB">
					<xsl:with-param name="lang" select="$UI_lang"/>
				</xsl:call-template>
			</xsl:element>
		</td>
		</tr>
		</table>
	</xsl:if>
</xsl:if>

</xsl:template>

<!-- name -->

<xsl:template match="name">
	<xsl:apply-templates />
</xsl:template>

<!-- attention -->

<xsl:template match="attention">
	<xsl:if test="normalize-space(.) != ''">
		<xsl:element name="div">
			<xsl:attribute name="class">attention</xsl:attribute>
			<xsl:apply-templates />
		</xsl:element>
	</xsl:if>
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




