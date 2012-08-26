var ActionButtonNode = function(slot, action, building) {
	var self = this;
	mixin(new ButtonNode(self.clicked), this);
	
	Animator.imgAnimate(this);
	this.animationSettings.frameHeight = 48;
	this.animationSettings.frameInterval = 0.15;
	this.animationSettings.imgAnimationEndBehavior = AnimationEndBehavior.LOOP;
	
	this.renderSettings.graphicsType = GraphicsType.ANIMATION;
	this.renderSettings.size = {width: 48, height: 48};
	this.renderSettings.position = {x: slot.x * 52 + 8, y: slot.y * 52 + 8};
	this.action  = action;
	
	this.totalActionPointCost = action.actionPointCost + building.hubDistanceCost;
	
	if(this.totalActionPointCost > building.actionPoints)
		this.renderSettings.image = "icons/actionButton/" + StaticData.actions[action.id].canonicalName + "-disabled.png";
	else
		this.renderSettings.image = "icons/actionButton/" + StaticData.actions[action.id].canonicalName + ".png";

	
	var tooltipString = action.name + "\nRequires action points: " + this.totalActionPointCost + "\n   (" + action.actionPointCost + " base + " + building.hubDistanceCost + " hub distance)";
	
	for(i in StaticData.actionItemCosts) {
		var c = StaticData.actionItemCosts[i];
		if(c.actionId == action.id)
			tooltipString += "\nRequires " + StaticData.itemTypes[c.itemTypeId].name + ": " + c.amount;
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
