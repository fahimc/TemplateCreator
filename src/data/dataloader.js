var DataLoader=
{
	event:
	{
		ON_SETTINGS_COMPLETE:"ON_SETTINGS_COMPLETE"
	},
	init:function()
	{
		var rand=Math.random();
		Utensil.URLLoader.load(Model.url.settings+"?rand="+rand,this.onSettingsLoaded);
	},
	onSettingsLoaded:function(t,x)
	{
		Model.data =  eval('(' + t + ')');
		Model.userId = window.USER_ID;
		Event.dispatch(DataLoader,DataLoader.event.ON_SETTINGS_COMPLETE);
	}
}
