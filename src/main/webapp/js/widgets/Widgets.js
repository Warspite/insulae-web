var Widgets = {
	setup: function(guiRoot) {
		Widgets.avatarSelection = new AvatarSelectionWidget();
		
		guiRoot.addChild(Widgets.avatarSelection);
	}
};
