var ItemStorageNode = function() {
	mixin(new RenderedNode(), this);
	
	this.renderSettings.size = {width: 125, height: 25};
	this.orientation = Orientation.VERTICAL;
	
	this.iconNode = new RenderedNode();
	this.iconNode.renderSettings.graphicsType = GraphicsType.IMAGE;
	this.iconNode.renderSettings.size = {width: 25, height: 25};
	this.iconNode.renderSettings.image = null;
	
	this.textNode = new TextNode("");
	this.textNode.renderSettings.position.x = 25;
	this.textNode.renderSettings.size = {width: 100, height: 25};
	
	this.clear();
	
	this.addChild(this.iconNode);
	this.addChild(this.textNode);
};

ItemStorageNode.prototype.clear = function() {
	this.iconNode.rendered = false;
	this.textNode.rendered = false;
};

ItemStorageNode.prototype.setItemStorage = function(itemStorage) {
	this.iconNode.renderSettings.image = "icons/itemType/" + StaticData.itemTypes[itemStorage.itemTypeId].canonicalName + ".png";
	this.textNode.setText(StaticData.itemTypes[itemStorage.itemTypeId].name + ": " + itemStorage.amount);
	this.iconNode.rendered = true;
	this.textNode.rendered = true;
};