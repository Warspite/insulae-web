var ActionButtonNode = function(slot, action) {
	var self = this;
	mixin(new ButtonNode(self.clicked), this);
	
	Animator.imgAnimate(this);
	this.animationSettings.frameHeight = 48;
	this.animationSettings.frameInterval = 0.15;
	this.animationSettings.imgAnimationEndBehavior = AnimationEndBehavior.LOOP;
	
	this.renderSettings.graphicsType = GraphicsType.ANIMATION;
	this.renderSettings.size = {width: 48, height: 48};
	this.renderSettings.position = {x: slot.x * 52 + 8, y: slot.y * 52 + 8};
	this.renderSettings.image = "icons/actionButton/" + StaticData.actions[action.id].canonicalName + ".png";
	this.action  = action;
	
	var tooltipString = action.name;
	
	for(i in StaticData.actionItemCosts) {
		var c = StaticData.actionItemCosts[i];
		if(c.actionId == action.id)
			tooltipString += "\n" + StaticData.itemTypes[c.itemTypeId].name + ": " + c.amount;
	}
	
	Tooltipper.tooltipify(this, tooltipString);

	this.addEventHandler(EventType.MOUSE_ENTER, function(self, mouse, event) { 
		self.imgStart();
	});

	this.addEventHandler(EventType.MOUSE_EXIT, function(self, mouse, event) { 
		self.imgStop();
	});
};



ActionButtonNode.prototype.clicked = function(self, mouse, event) {
	Widgets.actionPanel.performAction(self.action);
};
