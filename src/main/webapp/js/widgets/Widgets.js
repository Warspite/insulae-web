var Widgets = {
	setup: function(guiRoot) {
		Widgets.areaSelection = new AreaSelectionWidget();
		Widgets.avatarSelection = new AvatarSelectionWidget();
		Widgets.actionPanel = new ActionPanelWidget();
		Widgets.selectionInfoPanel = new SelectionInfoPanelWidget();
		
		guiRoot.addChild(Widgets.areaSelection);
		guiRoot.addChild(Widgets.avatarSelection);
		guiRoot.addChild(Widgets.actionPanel);
		guiRoot.addChild(Widgets.selectionInfoPanel);
	},
	
	hideAll: function() {
		Widgets.areaSelection.rendered = false;
		Widgets.avatarSelection.rendered = false;
		Widgets.actionPanel.rendered = false;
	}
};
