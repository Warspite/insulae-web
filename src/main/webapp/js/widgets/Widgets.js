var Widgets = {
	setup: function(guiRoot) {
		Widgets.areaSelection = new AreaSelectionWidget();
		Widgets.avatarSelection = new AvatarSelectionWidget();
		
		guiRoot.addChild(Widgets.areaSelection);
		guiRoot.addChild(Widgets.avatarSelection);
	},
	
	hideAll: function() {
		Widgets.areaSelection.rendered = false;
		Widgets.avatarSelection.rendered = false;
	}
};
