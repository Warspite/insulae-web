var BuildingNode = function(data) {
	mixin(new RenderedNode(), this);
	
	this.data = data;
	this.renderSettings.graphicsType = GraphicsType.IMAGE;
	this.renderSettings.image = "icons/building/" + StaticData.buildingTypes[this.data.buildingTypeId].canonicalName + ".png";
	this.renderSettings.size = {width: 32, height: 32};
	this.renderSettings.anchor = {horizontal: Direction.RIGHT, vertical: Direction.BOTTOM};
	this.renderSettings.origin = {horizontal: Direction.RIGHT, vertical: Direction.BOTTOM};
};