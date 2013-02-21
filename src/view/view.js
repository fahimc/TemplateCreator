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
			this.setTemplateSection();
			break;
		}
	},
	setTemplateSection:function()
	{
		document.getElementById(Model.id.thumbHolder).innerHTML="";
		var template = Model.data.template;
		for(var a=0;a<template.length;a++)
		{
			TemplateView.createLeftTemplate(template[a],a);
		}
	}
}
