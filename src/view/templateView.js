var TemplateView = {
	handlers : {},
	createLeftTemplate : function(node, index) {
		var div = document.createElement("div");
		div.className = Model.className.leftThumb;
		div.style.backgroundColor = node.color[0];
		div.setAttribute(Model.att.templateIndex, index);
		var img = new Image();
		img.setAttribute(Model.att.templateIndex, index);
		img.src = node.thumb;
		div.appendChild(img);
		var root = this;
		this.handlers.onLeftThumbClick = function(event) {
			root.onLeftThumbClick(event);
		}
		Utensil.addListener(div, "click", this.handlers.onLeftThumbClick);
		document.getElementById(Model.id.thumbHolder).appendChild(div);
	},
	onLeftThumbClick : function(event) {
		var element = event.srcElement || event.target;
		this.setRightThumb(element.getAttribute(Model.att.templateIndex));
	},
	setRightThumb : function(index) {
		Model.template.index = index;
		var rt = document.getElementById(Model.id.rightThumb);
		rt.src = Model.data.template[index].thumb;
		rt.style.display = "block";
		this.setRightThumbBG(Model.data.template[index].color[0]);
		this.createColors();
	},
	setRightThumbBG : function(color) {
		var rth = document.getElementById(Model.id.rightThumbHolder);
		rth.style.backgroundColor = color;
	},
	createColors : function() {
		document.getElementById(Model.id.rightColors).innerHTML = "";
		var t = Model.data.template[Model.template.index];
		for (var a = 0; a < t.color.length; a++) {
			var div = document.createElement("div");
			div.className = Model.className.color;
			div.style.backgroundColor = t.color[a];
			div.setAttribute(Model.att.colorIndex, a);

			var root = this;
			this.handlers.onColorClick = function(event) {
				root.onColorClick(event);
			}
			Utensil.addListener(div, "click", this.handlers.onColorClick);

			document.getElementById(Model.id.rightColors).appendChild(div);
		}

	},
	onColorClick : function(event) {
		var element = event.srcElement || event.target;
		var index=element.getAttribute(Model.att.colorIndex);
		Model.template.colorIndex =index;
		var t = Model.data.template[Model.template.index];
		this.setRightThumbBG(t.color[index]);
	}
};
