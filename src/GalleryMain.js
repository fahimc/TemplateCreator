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
			var img = new Image();
			img.src= Model.data.template[a].thumb;
			li.appendChild(img);
			ul.appendChild(li);
		}
		holder.appendChild(ul);
	}
	function onResize() {

	}

	Main();
})(window);
