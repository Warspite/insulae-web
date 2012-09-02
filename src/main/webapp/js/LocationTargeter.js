var LocationTargeter = function() {
	Input.keyboard.addEventListener(this);
};

LocationTargeter.prototype.select = function(p) {
	this.cancel();
	this.params = p || {};
	
	if(!Scene.nodeMaps.locations)
		return;
	
	$.each(Scene.nodeMaps.locations, function(index, locNode) {
		Scene.targetingOverlayContainer.addChild(new LocationTargetingNode(locNode));
	});
};
	
LocationTargeter.prototype.cancel = function(params) {
	this.params = null;
	Scene.targetingOverlayContainer.clearChildren();
};

LocationTargeter.prototype.target = function(locationNode) {
	if(this.params && this.params.callback) {
		var p = this.params.callbackParameters || {};
		p.locationTarget = locationNode.data;
		this.params.callback(p)
	}
	this.cancel();
};

LocationTargeter.prototype.handleEvent = function(self, source, event) {
	if(event.type == EventType.KEY_PRESSED && event.value.key == Key.ESCAPE)
		self.cancel();
};
