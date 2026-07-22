<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html" encoding="utf-8" indent="yes" doctype-public="-//W3C//DTD HTML 4.0//EN" doctype-system="http://www.w3.org/TR/REC-html40/strict.dtd"/>

<xsl:variable name="sielist">
	<xsl:for-each select="//servinfo">
		<xsl:if test="@symdesc!=''">
			<xsl:value-of select="@id"/>
			<xsl:if test="following::servinfo[@symdesc!='']">
				<xsl:text>,</xsl:text>
			</xsl:if>
		</xsl:if>
	</xsl:for-each>
</xsl:variable>

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
<title>Symptom Index</title>
	<xsl:value-of select="$newline"/>
<head>
	<xsl:value-of select="$newline"/>
<link rel="stylesheet" href="../../config8/navi.css" type="text/css"/>
	<xsl:value-of select="$newline"/>
<script type="text/javascript">
<xsl:comment>
<xsl:text>
var strSieList = "</xsl:text>
<xsl:value-of select="$sielist"/>
<xsl:text>"
var arrSieList = strSieList.split(",")
</xsl:text>

<xsl:text>// </xsl:text>
</xsl:comment>
</script>
	<xsl:value-of select="$newline"/>
<script type="text/javascript" src="../../config8/stdio.js">
<xsl:comment>
</xsl:comment>
</script>
	<xsl:value-of select="$newline"/>
</head>
<body onload="initNavi();">
<table border="0" width="100%" cellpadding="0" cellspacing="0">
	<tr>
		<td align="center"><div class="listhead">
		<xsl:call-template name="getSymIndexTitle">
			<xsl:with-param name="lang" select="$lang"/>
		</xsl:call-template>
		</div></td>
	</tr>
</table>
	<xsl:apply-templates select="//section"/>
	<div class="last">&#160;</div>
</body>
</html>
</xsl:template>

<!-- section -->

<xsl:template match="section">
	<xsl:value-of select="$newline"/>
<xsl:variable name="sct">
	<xsl:choose>
		<xsl:when test="substring(@file,9,2)='00'">z</xsl:when>
		<xsl:when test="substring(@file,9,2)='99' and @id!='9I'">y</xsl:when>
		<xsl:when test="@id='a'">aa</xsl:when>
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

<xsl:variable name="snametooltip">
	<xsl:call-template name="getSnameTooltip">
		<xsl:with-param name="sct" select="$sct"/>
		<xsl:with-param name="lang" select="$lang"/>
	</xsl:call-template>
</xsl:variable>

<xsl:variable name="wrtsct">
	<xsl:value-of select="0"/>
	<xsl:if test="descendant::servinfo/@symdesc!=''">
		<xsl:value-of select="1"/>
			<xsl:for-each select="preceding-sibling::section">
				<xsl:if test="substring(@file,9,1)=$sct">
					<xsl:if test="descendant::servinfo/@symdesc!=''">
						<xsl:value-of select="1"/>
					</xsl:if>
				</xsl:if>
			</xsl:for-each>
	</xsl:if>
</xsl:variable>

<xsl:choose>
	<xsl:when test="$wrtsct='01'">
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
				<xsl:value-of select="$sname"/>
			</xsl:element>
		</xsl:element>
	<xsl:value-of select="$newline"/>
		<xsl:element name="div">
			<xsl:attribute name="id">blk<xsl:value-of select="$sct"/></xsl:attribute>
			<xsl:attribute name="style">display: none;</xsl:attribute>
			<xsl:apply-templates />
			<xsl:for-each select="following-sibling::section">
				<xsl:if test="substring(@file,9,1)=$sct">
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

<xsl:template match="servcat[descendant::servinfo/@symdesc!='']">
	<xsl:value-of select="$newline"/>
<xsl:variable name="scid">
	<xsl:value-of select="substring(../@file,9,2)"/>
</xsl:variable>

<xsl:element name="a">
	<xsl:attribute name="href">javascript: toggle('<xsl:value-of select="$scid"/>')</xsl:attribute>
	<xsl:attribute name="title"><xsl:value-of select="../@id"/> &#8211; <xsl:value-of select="@title"/>
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
		<xsl:value-of select="../@id"/> &#8211; <xsl:value-of select="@title"/>
	</xsl:element>
</xsl:element>
	<xsl:value-of select="$newline"/>
<xsl:element name="div">
	<xsl:attribute name="id">blk<xsl:value-of select="$scid"/></xsl:attribute>
	<xsl:attribute name="style">display: none;</xsl:attribute>
	<xsl:apply-templates />
</xsl:element>
</xsl:template>

<!-- configtype -->

<xsl:template match="configtype[descendant::servinfo/@symdesc!='']">
<xsl:variable name="configid">
	<xsl:value-of select="substring(../../@file,9,2)"/><xsl:value-of select="@id"/>
</xsl:variable>

<xsl:choose>
	<xsl:when test="@id!='0'">
	<xsl:value-of select="$newline"/>
		<xsl:element name="a">
			<xsl:attribute name="href">javascript: toggle('<xsl:value-of select="$configid"/>')</xsl:attribute>
			<xsl:attribute name="title"><xsl:value-of select="@title"/>
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
				<xsl:value-of select="@title"/>
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
<!-- not required for Symptom index
<xsl:template match="servinfotype[servinfo/@symdesc!='']">
	<xsl:value-of select="$newline"/>
<xsl:variable name="sitcode">
	<xsl:choose>
		<xsl:when test="@sitcode"><xsl:value-of select="@sitcode"/></xsl:when>
		<xsl:otherwise>
			<xsl:value-of select="substring(servinfo/@id,12,1)"/>
		</xsl:otherwise>
	</xsl:choose>
</xsl:variable>
<xsl:variable name="sitid">
	<xsl:value-of select="substring(../../../@file,9,2)"/><xsl:value-of select="../@id"/><xsl:value-of select="$sitcode"/>
</xsl:variable>

<xsl:element name="a">
	<xsl:attribute name="href">javascript: toggle('<xsl:value-of select="$sitid"/>')</xsl:attribute>
	<xsl:attribute name="title"><xsl:value-of select="@title"/>
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
		</xsl:element>
		<xsl:value-of select="@title"/>
	</xsl:element>
</xsl:element>
	<xsl:value-of select="$newline"/>
<xsl:element name="div">
	<xsl:attribute name="id">blk<xsl:value-of select="$sitid"/></xsl:attribute>
	<xsl:attribute name="style">display: none;</xsl:attribute>
	<xsl:apply-templates />
</xsl:element>
</xsl:template>
 -->

<!-- servinfo -->

<xsl:template match="servinfo[@symdesc!='']">
	<xsl:value-of select="$newline"/>
<xsl:variable name="sieid">
	<xsl:value-of select="@id"/>
</xsl:variable>

<xsl:element name="a">
	<xsl:attribute name="href">javascript: loadSIE('<xsl:value-of select="$sieid"/>')</xsl:attribute>
	<xsl:attribute name="title"><xsl:value-of select="@title"/>
	</xsl:attribute>

			
	<xsl:element name="div">
		<xsl:attribute name="class">sie_sym</xsl:attribute>
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
		<xsl:value-of select="@title"/>
	</xsl:element>
</xsl:element>
</xsl:template>


<!-- title -->

<xsl:template match="title">
	<xsl:element name="div">
		<xsl:attribute name="class">title</xsl:attribute>
		<xsl:apply-templates select="text()|emph|sub|sup|intxref|intxrefpoff|intxreftitleoff|symbol"/>
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
			<xsl:attribute name="src">../../symbol/<xsl:value-of select="@name"/>.png</xsl:attribute>
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




