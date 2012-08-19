var Widgets = {
	setup: function(guiRoot) {
		Widgets.areaSelection = new AreaSelectionWidget();
		Widgets.avatarSelection = new AvatarSelectionWidget();
		Widgets.actionPanel = new ActionPanelWidget();
		
		guiRoot.addChild(Widgets.areaSelection);
		guiRoot.addChild(Widgets.avatarSelection);
		guiRoot.addChild(Widgets.actionPanel);
	},
	
	hideAll: function() {
		Widgets.areaSelection.rendered = false;
		Widgets.avatarSelection.rendered = false;
		Widgets.actionPanel.rendered = false;
	}
};
