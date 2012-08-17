var AreaSelectionWidget = function() {
	
	mixin(new FoldingNode(Direction.LEFT, this), this);
	
	this.foldButton.renderSettings.anchor.horizontal = Direction.RIGHT;
	this.renderSettings.position.y = 20;
	this.renderSettings.graphicsType = GraphicsType.RECT;
	this.renderSettings.alpha = 0.2;
	this.renderSettings.sizing = {width: Sizing.CHILDREN, height: Sizing.CHILDREN};
	this.rendered = false;
};

AreaSelectionWidget.prototype.areasLoaded = function(result, self) {
	self.content.clearChildren();
	for(i in result.content.areas) {
		var a = result.content.areas[i];
		var btn = new IconLabelButtonNode(function(self) { Scene.selectArea(self.area) }, "icons/area.png", a.name);
		btn.area = a;
		self.content.addChild(btn);
	}
	self.rendered = true;
};
