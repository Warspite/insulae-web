var ResourceNode = function(data, index, locationNode) {
	var self = this;
	mixin(new RenderedNode(), this);
	
	var indexOffset = index * 8;
	
	this.data = data;
	this.zIndex = index;
	this.renderSettings.graphicsType = GraphicsType.IMAGE;
	this.renderSettings.image = "icons/resource/" + StaticData.resourceTypes[this.data.resourceTypeId].canonicalName + ".png";
	this.renderSettings.size = {width: 24, height: 24};
	this.renderSettings.position = {x: locationNode.renderSettings.position.x + indexOffset, y: locationNode.renderSettings.position.y + locationNode.renderSettings.size.height * 0.3 + indexOffset};
	this.renderSettings.origin = {horizontal: Direction.LEFT, vertical: Direction.TOP};
	Tooltipper.tooltipify(this, StaticData.resourceTypes[this.data.resourceTypeId].description);
};
