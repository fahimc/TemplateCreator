var ContentView = {
	handlers : {},
	init : function() {
		this.setLeftContent();
		this.setRightContent(0);
		var backId = Model.id.back + Model.currentSection;
		var back = document.getElementById(backId);
		var root = this;
		this.handlers.onBackClicked = function(event) {
			root.onBackClicked(event);
		}
		this.handlers.onNextClick = function(event) {
			root.onNextClick(event);
		}
		var nextId = Model.id.next + Model.currentSection;
		var next = document.getElementById(nextId);
		var signup = document.getElementById(Model.id.signupButton);
		Utensil.addListener(next, "click", this.handlers.onNextClick);
		Utensil.addListener(back, "click", this.handlers.onBackClicked);
		if (USER_ID == '') {
			Model.data.settings.uploadURL = SIGNUP_URL;
			Utensil.addListener(signup, "click", this.handlers.onNextClick);
		}
	},
	setLeftContent : function() {
		document.getElementById(Model.id.pageHolder).innerHTML = "";
		var page = Model.data.page;
		for (var a = 0; a < page.length; a++) {
			if (USER_ID == '') {
				//check if form index 0 is a title
				if (page[a].form && page[a].form[0] && page[a].form[0].type == "text")
					this.createPageButton(page[a], a);
			} else {
				this.createPageButton(page[a], a);
			}
		}
	},
	createPageButton : function(node, index) {
		var div = document.createElement("div");
		div.className = Model.className.page;
		div.setAttribute(Model.att.pageIndex, index);
		div.innerHTML = node.name;
		var root = this;
		this.handlers.onLeftButtonClick = function(event) {
			root.onLeftButtonClick(event);
		}
		Utensil.addListener(div, "click", this.handlers.onLeftButtonClick);
		document.getElementById(Model.id.pageHolder).appendChild(div);
	},
	onLeftButtonClick : function(event) {
		var element = event.srcElement || event.target;
		var index = element.getAttribute(Model.att.pageIndex);
		this.setRightContent(index);
	},
	onBackClicked : function(event) {
		this.purge();
		this.storeForm();
		View.changeCurrentSection(Model.currentSection - 1);
	},
	onNextClick : function(event) {

		this.storeForm();
		UploadData.init();

	},
	storeForm : function() {
		var page = Model.data.page[Model.page.index];
		if (!Model.page.content[page.type])
			Model.page.content[page.type] = [];
		var content = {};
		if (!page.form)
			return;
		for (var a = 0; a < page.form.length; a++) {
			content = {};
			var item = document.getElementById(Model.id.formItem + a);
			content.id = page.form[a].id;
			content.type = page.form[a].type;
			if (item.getAttribute("type") && item.getAttribute("type") == "file") {
				content.value = document.getElementById(Model.id.filePrevious + a).innerHTML;
			} else {
				content.value = item.value.replace(/\n\r?/g, '<br>');
			}
			Model.page.content[page.type][page.form[a].id] = content;
		}
	},
	setRightContent : function(index) {
		Model.page.index = index;
		document.getElementById(Model.id.formHolder).innerHTML = "";
		var page = Model.data.page[index];
		document.getElementById(Model.id.pageGreyTitle).innerHTML = page.name;
		var li = document.createElement("li");
		var ul = document.createElement("ul");
		ul.className = Model.className.formItem;
		if (!page.form)
			return;
		if (USER_ID == '') {
			if (page.form[0].type == "text")
				this.createTextField(page.form[0], ul, 0);
		} else {
			for (var a = 0; a < page.form.length; a++) {

				switch(page.form[a].type) {
					case "text":
						this.createTextField(page.form[a], ul, a);
						break;
					case "textarea":
						this.createTextArea(page.form[a], ul, a);
						break;
					case "file":
						this.createFileUpload(page.form[a], ul, a);
						break;
				}
				ul.innerHTML += '<li class="clearBoth"></li>';
			}
		}

		ul.innerHTML += '<li class="clearBoth"></li>';
		li.appendChild(ul);
		document.getElementById(Model.id.formHolder).appendChild(li);
	},
	createTextField : function(node, ul, index) {
		var found = this.getItemById(node.id);
		var id = Model.id.formItem + index;
		var li = '<li class="floatLeft"><p class="title">[n]</p></li><li class="floatLeft"><input type="text" class="textInput" id="[i]" value="[v]" /></li>'
		li = li.replace("[i]", id);
		li = li.replace("[n]", node.name);
		li = li.replace("[v]", found ? found : "");
		ul.innerHTML += li;
	},
	createTextArea : function(node, ul, index) {
		var id = Model.id.formItem + index;
		var found = this.getItemById(node.id);
		if (found)
			found = found.replace(/<br>/ig, '\n');
		var li = '<li class="floatLeft"><p class="title">[n]</p></li><li class="floatLeft"><textarea class="areaInput" id="[i]">[v]</textarea></li>'
		li = li.replace("[i]", id);
		li = li.replace("[n]", node.name);
		li = li.replace("[v]", found ? found : "");
		ul.innerHTML += li;
	},
	createFileUpload : function(node, ul, index) {

		var p = "";
		var found = this.getItemById(node.id);
		if (found)
			p = found.value;
		var id = Model.id.formItem + index;
		var fid = Model.id.filePrevious + index;
		var li = '<li class="floatLeft"><p class="title">[n]</p></li><li class="floatLeft"><input type="file" name="[id]" id="[i]"><div id="[fi]">[p]</div</li>'
		li = li.replace("[i]", id);
		li = li.replace("[n]", node.name);
		li = li.replace("[fi]", fid);
		li = li.replace("[id]", node.id);
		li = li.replace("[p]", p);
		ul.innerHTML += li;
	},
	getItemById : function(id) {
		var page = Model.data.page[Model.page.index];
		if (Model.page.content[page.type] && Model.page.content[page.type][id]) {
			return Model.page.content[page.type][id].value;
		}
		return null;
	},
	purge : function() {
		var backId = Model.id.back + Model.currentSection;
		var back = document.getElementById(backId);
		Utensil.removeListener(back, "click", this.handlers.onBackClicked);
		var nextId = Model.id.next + Model.currentSection;
		var next = document.getElementById(nextId);
		Utensil.removeListener(next, "click", this.handlers.onNextClick);
	}
};
