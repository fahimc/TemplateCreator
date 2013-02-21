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
		View.init();
	}
	function onResize() {

	}

	Main();
})(window);
