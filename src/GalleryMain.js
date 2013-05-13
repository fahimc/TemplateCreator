(function(window) {

	function Main() {
		if (window.addEventListener) {
			window.addEventListener("load", onLoad);
			window.addEventListener("orientationchange", onResize);
		} else {
			window.attachEvent("onload", onLoad);
		}
	
	}

	function onLoad() {
		if(window.SETTINGS_URL)Model.url.settings=window.SETTINGS_URL;
		Utensil.addListener(window,"resize",onResize);
		Event.addListener(DataLoader,DataLoader.event.ON_SETTINGS_COMPLETE,onSettingsLoaded);
		DataLoader.init();
	}
	function onSettingsLoaded()
	{
		var holder = document.getElementById("templateGallery");
		if(!holder)return;
		
		var ul  = document.createElement("ul");
		ul.className="galleryUL";
		var li;
		for(var a=0;a<Model.data.template.length;a++)
		{
			li = document.createElement("li");
			li.className="galleryLI";
			li.style.backgroundColor=Model.data.template[a].color[0];
			li.setAttribute("templateid",a);
			li.onclick = function(event)
			{
				var t = event.srcElement||event.target;
				onClick(t.getAttribute("templateid"));
			};
			var img = new Image();
			img.src= Model.data.template[a].thumb;
			img.setAttribute("templateid",a);
			li.appendChild(img);
			ul.appendChild(li);
		}
		holder.appendChild(ul);
	}
	function onClick(index)
	{
		var url = window.LINK_URL?window.LINK_URL:"gallery.html";
		 var win=window.open(url+"?templateid="+index, window.LINK_TARGET?window.LINK_TARGET:'_blank');
  		win.focus();
	}
	function onResize() {

	}

	Main();
})(window);
