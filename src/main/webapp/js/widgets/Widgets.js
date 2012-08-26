var Widgets = {
	setup: function(guiRoot) {
		Widgets.areaSelection = new AreaSelectionWidget();
		Widgets.avatarSelection = new AvatarSelectionWidget();
		Widgets.actionPanel = new ActionPanelWidget();
		Widgets.actionDialog = new ActionDialogWidget();
		Widgets.selectionInfoPanel = new SelectionInfoPanelWidget();
		
		guiRoot.addChild(Widgets.areaSelection);
		guiRoot.addChild(Widgets.avatarSelection);
		guiRoot.addChild(Widgets.selectionInfoPanel);
		guiRoot.addChild(Widgets.actionPanel);
		guiRoot.addChild(Widgets.actionDialog);
	},
	
	hideAll: function() {
		Widgets.areaSelection.rendered = false;
		Widgets.avatarSelection.rendered = false;
		Widgets.actionPanel.rendered = false;
	}
};
