/*************************************************/
// ロード時
/*************************************************/
function InitDrag()
{

   if (document.all) {
//	alert("IE");
	this.dragTop = new Drag('Top');
	this.dragBottom = new Drag('Bottom');
   } else if (document.getElementsByTagName) {
        $('hand').style.visibility = "hidden";
	//alert("FireFox");
   } else {
//	alert("etc.");
	return;
   }

}

function Drag(prmKey)
{
	this.init(prmKey);
}

Drag.prototype = {
	init:function(prmKey)
	{
		this.viewport = $('divDiagram' + prmKey);
		this.hand = $('hand');
		this.hand_on = true;
		this.space_down = false;
		this.mouse_down = false;
		this.viewport.setStyle({'cursor':'move'});
		this.divDiagram = $('divDiagram' + prmKey);

		this.viewport.onmousedown = this.viewport_onmousedown.bindAsEventListener(this);
		this.viewport.onmousemove = this.viewport_onmousemove.bindAsEventListener(this);
		this.viewport.onmouseup = this.viewport_onmouseup.bindAsEventListener(this);
		this.viewport.onselectstart = this.viewport_onselectstart.bindAsEventListener(this);
		Event.observe(this.hand, 'click', this.hand_clicked.bindAsEventListener(this));
	},
	hand_clicked:function(e)
	{
		this.hand_on = ! this.hand_on;
		if (this.hand_on)
		{
			this.hand.src = "../img/icon-closehand.gif";
			this.viewport.setStyle({'cursor':'move'});
		}
		else
		{
			this.hand.src = "../img/icon-openhand.gif";
			if (!this.space_down) this.viewport.setStyle({'cursor':'auto'});
		}
	},
	viewport_onmousedown:function(e)
	{
		if (!Event.isLeftClick(e)) return;

		var lt = GetLeftTop(this.divDiagram);

		if (e.clientX > lt.x + this.viewport.offsetWidth - SVG_SCROLL_BAR_SIZE) return;
		if (e.clientY > lt.y + this.viewport.offsetHeight - SVG_SCROLL_BAR_SIZE) return;

		if (this.hand_on)
		{
			this.mouse_down = true;
			this.mouse_down_x = e.clientX + this.divDiagram.scrollLeft;
			this.mouse_down_y = e.clientY + this.divDiagram.scrollTop;

			if (document.all) this.viewport.setCapture(false);
//else this.addEventId = $('embDiagramTop').addEventListener('mousemove', this.viewport_onmousemove, true);
//			else this.addEventId = this.viewport.addEventListener('mousemove', this.viewport_onmousemove, true);
//else this.addEventId = $('root').addEventListener('mousemove', this.viewport_onmousemove, true);
//else this.addEventId = $('embDiagramTop').getSVGDocument().getElementById('svgObj').addEventListener('mousemove', this.viewport_onmousemove, false);
		}
	},
	viewport_onmousemove:function(e)
	{
		if (this.mouse_down)
		{
			this.divDiagram.scrollLeft = this.mouse_down_x - e.clientX;
			this.divDiagram.scrollTop = this.mouse_down_y - e.clientY;
		}
//alert("4");
	},
	viewport_onmouseup:function(e)
	{
		if (this.mouse_down)
		{
//			if (document.all)
//			{
				if (!this.viewport.setCapture()) this.viewport.releaseCapture(false);
//			}
//			else
//			{
//				if (this.addEventId)
//				{
//					this.viewport.addEventListener('mousemove', this.addEventId, true);
//					this.addEventId = null;
//				}
//			}
			this.mouse_down = false;
		}
	},
	viewport_onselectstart:function(e)
	{
		if (this.mouse_down) return false;
		return true;
//		if (this.mouse_down)
//			document.all ? e.returnValue = false : e.preventDefault();
	}
}
