var LocationNode = function(data) {
	mixin(new RenderedNode(), this);
	
	this.data = data;
	this.renderSettings.graphicsType = GraphicsType.IMAGE;
	
	if(this.data.road)
		this.renderSettings.image = "icons/location/" + StaticData.locationTypes[this.data.locationTypeId].canonicalName + "-road.png";
	else
		this.renderSettings.image = "icons/location/" + StaticData.locationTypes[this.data.locationTypeId].canonicalName + ".png";
	
	this.renderSettings.size = {width: 64, height: 64};
	this.renderSettings.position = {x: (this.data.coordinatesX - 1) * this.renderSettings.size.width, y: (this.data.coordinatesY - 1) * this.renderSettings.size.height};
};