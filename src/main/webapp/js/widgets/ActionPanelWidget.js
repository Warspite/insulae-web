var ActionPanelWidget = function() {
	
	mixin(new RenderedNode(), this);
	
	this.renderSettings.graphicsType = GraphicsType.IMAGE;
	this.renderSettings.image = "actionPanelBackground.png";
	this.renderSettings.size = {width: 220, height: 168};
	this.renderSettings.anchor = {horizontal: Direction.RIGHT, vertical: Direction.BOTTOM};
	this.renderSettings.origin = {horizontal: Direction.RIGHT, vertical: Direction.BOTTOM};
	this.rendered = false;
	this.maximumNumberOfButtons = 12;
};

ActionPanelWidget.prototype.clear = function() {
	this.clearChildren();
};

ActionPanelWidget.prototype.displayBuildingActions = function(building) {
	this.lastSelectedBuilding = building;
	Server.req("industry/Action", "GET", {buildingTypeId: building.buildingTypeId}, null, Widgets.actionPanel.actionsOfBuildingLoaded);
};

ActionPanelWidget.prototype.actionsOfBuildingLoaded = function(result) {
	Widgets.actionPanel.clear();
	
	if(!Widgets.actionPanel.lastSelectedBuilding)
		return;

	for(i in result.content.actions) {
		if(i >= Widgets.actionPanel.maximumNumberOfButtons) {
			Error.setMessage("<h2>Ooops!</h2><br/>There are more actions to show than there are available buttons. We probably need to support this.");
			Error.show();
			break;
		}
			
		var btn = new ActionButtonNode({x: i % 4, y: Math.floor(i / 4)}, result.content.actions[i], Widgets.actionPanel.lastSelectedBuilding);
		Widgets.actionPanel.addChild(btn);
	}
};

ActionPanelWidget.prototype.performAction = function(action) {
	console.log("I will now perform action " + action.name);
};