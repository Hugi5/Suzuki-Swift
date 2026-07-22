function TableScroll(prmTableElement, prmTableHeight, prmTableWidth)
{
	this.scrollWidth = (navigator.userAgent.indexOf("MSIE") != -1 && navigator.userAgent.indexOf("Trident/4.0") != -1) ? 17 : 16;

	if (!prmTableElement) return;
	this.elmTable = prmTableElement;

	if (!(this.tbody = this.elmTable.getElementsByTagName('tbody')[0])) return;

	this.elmScrollDiv = this.elmTable.parentNode.insertBefore(document.createElement('div'), this.elmTable);
	this.elmScrollDiv.appendChild(this.elmTable);

	this.thead = this.elmTable.getElementsByTagName('thead')[0];
	this.tfoot = this.elmTable.getElementsByTagName('tfoot')[0];

	this.InitIE = function()
	{
		this.elmScrollDiv.style.overflow = 'auto';
		if (this.elmTable.parentElement.clientHeight - this.elmTable.offsetHeight < 0)
		{
			this.elmTable.style.width = this.newWidth - this.scrollWidth +'px';
		}
		else
		{
			this.elmScrollDiv.style.overflowY = 'hidden';
			this.elmTable.style.width = this.newWidth +'px';
		}

		if (this.thead)
		{
			var trs = this.thead.getElementsByTagName('tr');
			for (x = 0; x < trs.length; x++)
			{
				trs[x].style.position ='relative';
				trs[x].style.setExpression("top",  "this.parentElement.parentElement.parentElement.scrollTop + 'px'");
			}
		}

		if (this.tfoot)
		{
			var trs = this.tfoot.getElementsByTagName('tr');
			for (x = 0; x < trs.length; x++)
			{
				trs[x].style.position ='relative';
				trs[x].style.setExpression("bottom",  "(this.parentElement.parentElement.offsetHeight - this.parentElement.parentElement.parentElement.clientHeight - this.parentElement.parentElement.parentElement.scrollTop) + 'px'");
			}
		}
	};

	this.InitFF = function()
	{
		this.tbody.style.overflow = '';
		this.elmScrollDiv.style.overflow = 'hidden';
		this.elmTable.style.width = this.newWidth + 'px';

		var headHeight = (this.thead) ? this.thead.clientHeight : 0;
		var footHeight = (this.tfoot) ? this.tfoot.clientHeight : 0;
		var bodyHeight = this.tbody.clientHeight;
		var trs = this.tbody.getElementsByTagName('tr');

		if (bodyHeight >= (this.newHeight - (headHeight + footHeight)))
		{
			this.tbody.style.overflow = '-moz-scrollbars-vertical';

			for (x = 0; x < trs.length; x++)
			{
				var tds = trs[x].getElementsByTagName('td');
				tds[tds.length-1].style.paddingRight += this.scrollWidth + 'px';
			}
		}
		else
		{
			this.tbody.style.overflow = '-moz-scrollbars-none';
		}

		var cellSpacing = (this.elmTable.offsetHeight - (this.tbody.clientHeight + headHeight + footHeight)) / 4;
		this.tbody.style.height = (this.newHeight - (headHeight + cellSpacing * 2) - (footHeight + cellSpacing * 2)) + 'px';
	};

	this.Resize = function(prmTableHeight, prmTableWidth)
	{
		if (!this.elmTable || !prmTableHeight) return;

		this.elmTable.style.height = 'auto';
		this.elmTable.removeAttribute('height');

		this.newHeight = parseInt(prmTableHeight);
		this.newWidth = prmTableWidth ? parseInt(prmTableWidth) : this.elmTable.clientWidth;

		this.elmScrollDiv.style.height = this.newHeight + 'px';
		this.elmScrollDiv.style.width = this.newWidth + 'px';

		if (document.all && document.getElementById && !window.opera) this.InitIE();
		if (!document.all && document.getElementById && !window.opera) this.InitFF();
	};

	this.Resize(prmTableHeight, prmTableWidth);
}

