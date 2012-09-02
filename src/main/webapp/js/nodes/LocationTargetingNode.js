var LocationTargetingNode = function(locationNode) {
	var self = this;
	mixin(new ButtonNode(self.clicked), this);
	
	this.locationNode = locationNode;
	this.renderSettings.graphicsType = GraphicsType.RECT;
	this.renderSettings.color = "#ff0000";
	this.renderSettings.alpha = 0.3;
	this.renderSettings.size = locationNode.renderSettings.size;
	this.renderSettings.position = locationNode.renderSettings.position;
};

LocationTargetingNode.prototype.clicked = function(self, mouse, event) {
	Scene.locationTargeter.target(self.locationNode)	
};