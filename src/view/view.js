var View=
{
	init:function()
	{
		this.setSection();
	},
	setSection:function()
	{
		switch(Model.currentSection)
		{
			case 1:
			TemplateView.init();
			break;
			case 2:
			ContentView.init();		
			break;
		}
	},
	changeCurrentSection:function(index)
	{
		console.log(index);
		var leftId = Model.id.left+Model.currentSection;
		var rightId = Model.id.right+Model.currentSection;
		document.getElementById(leftId).style.display="none";
		document.getElementById(rightId).style.display="none";
		Model.currentSection=index;
		leftId = Model.id.left+Model.currentSection;
		rightId = Model.id.right+Model.currentSection;
		document.getElementById(leftId).style.display="block";
		document.getElementById(rightId).style.display="block";
		this.setSection();
	},
	showMessage:function(value)
	{
		document.getElementById(Model.id.backout).style.height=document.body.offsetHeight+"px";
		document.getElementById(Model.id.backout).style.display ="block";
		document.getElementById(Model.id.messageHolder).style.display ="block";
		document.getElementById(Model.id.message).innerHTML=value;
	},
	hideMessage:function()
	{
		document.getElementById(Model.id.backout).style.display ="none";
		document.getElementById(Model.id.messageHolder).style.display ="none";
	}
}
