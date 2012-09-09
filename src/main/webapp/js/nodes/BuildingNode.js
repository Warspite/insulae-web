var BuildingNode = function(data, locationNode) {
	var self = this;
	mixin(new ButtonNode(Scene.selectNode), this);
	
	this.data = data;
	this.renderSettings.graphicsType = GraphicsType.IMAGE;
	this.renderSettings.image = "icons/building/" + StaticData.buildingTypes[this.data.buildingTypeId].canonicalName + ".png";
	this.renderSettings.size = {width: 32, height: 32};
	this.renderSettings.position = {x: locationNode.renderSettings.position.x + locationNode.renderSettings.size.width, y: locationNode.renderSettings.position.y + locationNode.renderSettings.size.height};
	this.renderSettings.origin = {horizontal: Direction.RIGHT, vertical: Direction.BOTTOM};
};

BuildingNode.prototype.destroy = function() {
	Server.req("industry/Building", "DELETE", {id: this.data.id}, null, Scene.loadAreaContents);
};