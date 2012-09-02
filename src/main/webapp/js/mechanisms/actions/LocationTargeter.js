var LocationTargeter = function(filter) {
	this.filter = filter;
	Input.keyboard.addEventListener(this);
};

LocationTargeter.prototype.select = function(p) {
	this.cancel();
	this.params = p || {};
	
	if(!Scene.nodeMaps.locations)
		throw "The scene has no location nodes loaded."
		
	if(!this.params.callbackParameters || !this.params.callbackParameters.action || !this.params.callbackParameters.agent )
		throw "Callback parameters are invalid or nonexistent."
	
	var options = this.filter.filter(this.params.callbackParameters.action, this.params.callbackParameters.agent);
	$.each(options, function(index, l) {
		Scene.targetingOverlayContainer.addChild(new LocationTargetingNode(Scene.nodeMaps.locations[l.id]));
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
