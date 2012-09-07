var SelectionInfoPanelWidget = function() {
	
	mixin(new RenderedNode(), this);
	
	this.renderSettings.graphicsType = GraphicsType.IMAGE;
	this.renderSettings.image = "selectionInfoPanelBackground.png";
	this.renderSettings.size = {width: 400, height: 190};
	this.renderSettings.anchor = {horizontal: Direction.CENTER, vertical: Direction.BOTTOM};
	this.renderSettings.origin = {horizontal: Direction.CENTER, vertical: Direction.BOTTOM};
	this.rendered = false;
	
	this.titleText = new TextNode("");
	this.titleText.renderSettings.position = {x: 0, y: 15};
	this.titleText.renderSettings.size = {width: 220, height: 20};
	this.titleText.renderSettings.graphicsType = GraphicsType.RECT;
	this.titleText.renderSettings.color = "#d0d0d0";
	this.titleText.renderSettings.anchor = {horizontal: Direction.CENTER, vertical: Direction.TOP};
	this.titleText.renderSettings.origin = {horizontal: Direction.CENTER, vertical: Direction.TOP};
	this.titleText.renderSettings.textAnchor = Direction.CENTER;
	
	this.actionPointsBar = new ProgressBarNode("");
	this.actionPointsBar.renderSettings.position = {x: 0, y: 40};
	this.actionPointsBar.renderSettings.size = {width: 180, height: 16};
	this.actionPointsBar.renderSettings.anchor = {horizontal: Direction.CENTER, vertical: Direction.TOP};
	this.actionPointsBar.renderSettings.origin = {horizontal: Direction.CENTER, vertical: Direction.TOP};
	this.actionPointsBar.innerBackground.renderSettings.padding = 1;
	this.actionPointsBar.meter.renderSettings.padding = 1;
	this.actionPointsBar.text.renderSettings.textPadding = 1;
	this.actionPointsBar.text.renderSettings.textColor = "#757585";
	this.actionPointsBar.text.renderSettings.font = "9px Arial";

	this.itemStorage = new ItemStorageTableNode(5, 3);
	this.itemStorage.renderSettings.position = {x: 0, y: 60};
	this.itemStorage.renderSettings.anchor = {horizontal: Direction.CENTER, vertical: Direction.TOP};
	this.itemStorage.renderSettings.origin = {horizontal: Direction.CENTER, vertical: Direction.TOP};
	
	this.addChild(this.titleText);
	this.addChild(this.actionPointsBar);
	this.addChild(this.itemStorage);
};

SelectionInfoPanelWidget.prototype.clear = function() {
	this.titleText.setText("");
	this.actionPointsBar.targetProgress = 1;
	this.actionPointsBar.progress = 0;
	this.actionPointsBar.text.setText("");
	this.itemStorage.clear();
};

SelectionInfoPanelWidget.prototype.displayBuildingInfo = function(building) {
	this.titleText.setText(StaticData.buildingTypes[building.buildingTypeId].name);
	this.actionPointsBar.complete = false;
	this.actionPointsBar.targetProgress = StaticData.buildingTypes[building.buildingTypeId].maximumActionPoints;
	this.actionPointsBar.progress = building.actionPoints;
	this.actionPointsBar.completeTextString = "Action points: " + building.actionPoints + " / " + StaticData.buildingTypes[building.buildingTypeId].maximumActionPoints;
	this.actionPointsBar.text.setText(this.actionPointsBar.completeTextString);
	Server.req("industry/ItemStorage", "GET", {buildingId: building.id}, null, Widgets.selectionInfoPanel.itemsOfBuildingLoaded);
};

SelectionInfoPanelWidget.prototype.itemsOfBuildingLoaded = function(result) {
	Widgets.selectionInfoPanel.itemStorage.setStorage(result.content.itemStorages);
};

