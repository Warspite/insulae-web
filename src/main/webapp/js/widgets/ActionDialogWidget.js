var ActionDialogWidget = function() {
	
	mixin(new WindowNode("Action dialog", this), this);
	this.setDraggable(true);
	this.renderSettings.sizing = {width: Sizing.CHILDREN, height: Sizing.CHILDREN};
	this.renderSettings.padding = 4;
	this.renderSettings.interChildPadding = 2;
	this.titleBar.renderSettings.color = "#8080a0";
	
	var self = this;

	var upperHorizontalStackPanel = new StackPanelNode();
	upperHorizontalStackPanel.renderSettings.sizing = {width: Sizing.CHILDREN, height: Sizing.CHILDREN};
	upperHorizontalStackPanel.orientation = Orientation.HORIZONTAL;
	upperHorizontalStackPanel.renderSettings.interChildPadding = 2;
	
	var buttonHorizontalStackPanel = new StackPanelNode();
	buttonHorizontalStackPanel.orientation = Orientation.HORIZONTAL;
	buttonHorizontalStackPanel.renderSettings.anchor.horizontal = Direction.CENTER;
	buttonHorizontalStackPanel.renderSettings.origin.horizontal = Direction.CENTER;
	buttonHorizontalStackPanel.renderSettings.sizing = {width: Sizing.CHILDREN, height: Sizing.CHILDREN};
	
	this.actionInfoBox = new RenderedNode();
	this.actionInfoBox.renderSettings.size = {width: 132, height: 200};
	this.actionInfoBox.renderSettings.graphicsType = GraphicsType.RECT;
	this.actionInfoBox.renderSettings.color = "#d0d0d0";
	
	this.actionInfoBoxTitle = new TextNode("");
	this.actionInfoBoxTitle.renderSettings.anchor.horizontal = Direction.CENTER;
	this.actionInfoBoxTitle.renderSettings.origin.horizontal = Direction.CENTER;
	this.actionInfoBoxTitle.renderSettings.sizing.width = Sizing.TEXT;

	this.actionInfoBoxIcon = new RenderedNode();
	Animator.imgAnimate(this.actionInfoBoxIcon);
	this.actionInfoBoxIcon.renderSettings.graphicsType = GraphicsType.ANIMATION;
	this.actionInfoBoxIcon.renderSettings.size = {width: 32, height: 32};
	this.actionInfoBoxIcon.renderSettings.position.y = 30;
	this.actionInfoBoxIcon.renderSettings.anchor.horizontal = Direction.CENTER;
	this.actionInfoBoxIcon.renderSettings.origin.horizontal = Direction.CENTER;
	this.actionInfoBoxIcon.animationSettings.frameHeight = 48;
	this.actionInfoBoxIcon.animationSettings.frameInterval = 0.15;
	this.actionInfoBoxIcon.animationSettings.imgAnimationEndBehavior = AnimationEndBehavior.LOOP;
	
	this.actionInfoBoxDescription = new TextNode("");
	this.actionInfoBoxDescription.renderSettings.position.y = 65;
	this.actionInfoBoxDescription.renderSettings.size.width = 125;
	
	this.locationInfoBox = new RenderedNode();
	this.locationInfoBox.renderSettings.size = {width: 132, height: 200};
	this.locationInfoBox.renderSettings.graphicsType = GraphicsType.RECT;
	this.locationInfoBox.renderSettings.color = "#d0d0d0";
	
	this.locationInfoBoxTitle = new TextNode("Location info");
	this.locationInfoBoxTitle.renderSettings.anchor.horizontal = Direction.CENTER;
	this.locationInfoBoxTitle.renderSettings.origin.horizontal = Direction.CENTER;
	this.locationInfoBoxTitle.renderSettings.sizing.width = Sizing.TEXT;
	
	this.locationInfoBoxIcon = new RenderedNode();
	this.locationInfoBoxIcon.renderSettings.graphicsType = GraphicsType.IMAGE;
	this.locationInfoBoxIcon.renderSettings.size = {width: 32, height: 32};
	this.locationInfoBoxIcon.renderSettings.position.y = 30;
	this.locationInfoBoxIcon.renderSettings.anchor.horizontal = Direction.CENTER;
	this.locationInfoBoxIcon.renderSettings.origin.horizontal = Direction.CENTER;
	
	this.locationInfoBoxBuildingIcon = new RenderedNode();
	this.locationInfoBoxBuildingIcon.renderSettings.graphicsType = GraphicsType.IMAGE;
	this.locationInfoBoxBuildingIcon.renderSettings.size = {width: 16, height: 16};
	this.locationInfoBoxBuildingIcon.renderSettings.anchor = {horizontal: Direction.RIGHT, vertical: Direction.BOTTOM};
	this.locationInfoBoxBuildingIcon.renderSettings.origin = {horizontal: Direction.RIGHT, vertical: Direction.BOTTOM};
	
	this.locationInfoBoxDescription = new TextNode("");
	this.locationInfoBoxDescription.renderSettings.position.y = 65;
	this.locationInfoBoxDescription.renderSettings.size.width = 125;
	
	this.inputBox = new RenderedNode();
	this.inputBox.renderSettings.size = {width: 400, height: 200};
	this.inputBox.renderSettings.graphicsType = GraphicsType.RECT;
	this.inputBox.renderSettings.color = "#d0d0d0";
	
	this.inputBoxTitle = new TextNode("Action input");
	this.inputBoxTitle.renderSettings.anchor.horizontal = Direction.CENTER;
	this.inputBoxTitle.renderSettings.origin.horizontal = Direction.CENTER;
	this.inputBoxTitle.renderSettings.sizing.width = Sizing.TEXT;
	
	this.inputBoxActionPointsText = new TextNode("");
	this.inputBoxActionPointsText.renderSettings.sizing.width = Sizing.TEXT;
	this.inputBoxActionPointsText.renderSettings.position.y = 25;

	this.inputBoxItems = new ItemStorageTableNode(4, 3);
	this.inputBoxItems.renderSettings.position.y = 70;
	
	this.outputBox = new RenderedNode();
	this.outputBox.renderSettings.size = {width: 132, height: 200};
	this.outputBox.renderSettings.graphicsType = GraphicsType.RECT;
	this.outputBox.renderSettings.color = "#d0d0d0";
	
	this.outputBoxTitle = new TextNode("Action output");
	this.outputBoxTitle.renderSettings.anchor.horizontal = Direction.CENTER;
	this.outputBoxTitle.renderSettings.origin.horizontal = Direction.CENTER;
	this.outputBoxTitle.renderSettings.sizing.width = Sizing.TEXT;

	this.outputBoxNonItemOutputStack = new StackPanelNode();
	this.outputBoxNonItemOutputStack.orientation = Orientation.HORIZONTAL;
	this.outputBoxNonItemOutputStack.renderSettings.position.y = 25;
	
	this.outputBoxItems = new ItemStorageTableNode(3, 1);
	this.outputBoxItems.renderSettings.position.y = 60;
	
	this.outputBoxBuildingIcon = new TextNode("Action output");

	var okButton = new ButtonNode( self.performAction );
	var okText = new TextNode("OK");
	okButton.renderSettings.graphicsType = GraphicsType.RECT;
	okButton.renderSettings.color = "#d0d0d0";
	okButton.renderSettings.size = {width: 120, height: 30};
	okButton.addChild(okText);
	
	var cancelButton = new ButtonNode( function() { self.rendered = false; } );
	var cancelText = new TextNode("Cancel");
	cancelButton.renderSettings.graphicsType = GraphicsType.RECT;
	cancelButton.renderSettings.color = "#d0d0d0";
	cancelButton.renderSettings.size = {width: 120, height: 30};
	cancelButton.addChild(cancelText);
	
	this.actionInfoBox.addChild(this.actionInfoBoxTitle);
	this.actionInfoBox.addChild(this.actionInfoBoxIcon);
	this.actionInfoBox.addChild(this.actionInfoBoxDescription);
	
	this.locationInfoBoxIcon.addChild(this.locationInfoBoxBuildingIcon);
	this.locationInfoBox.addChild(this.locationInfoBoxTitle);
	this.locationInfoBox.addChild(this.locationInfoBoxIcon);
	this.locationInfoBox.addChild(this.locationInfoBoxDescription);

	this.inputBox.addChild(this.inputBoxTitle);
	this.inputBox.addChild(this.inputBoxActionPointsText);
	this.inputBox.addChild(this.inputBoxItems);
	
	this.outputBox.addChild(this.outputBoxTitle);
	this.outputBox.addChild(this.outputBoxNonItemOutputStack);
	this.outputBox.addChild(this.outputBoxItems);
	
	upperHorizontalStackPanel.addChild(this.actionInfoBox);
	upperHorizontalStackPanel.addChild(this.locationInfoBox);
	upperHorizontalStackPanel.addChild(this.outputBox);
	
	buttonHorizontalStackPanel.addChild(okButton);
	buttonHorizontalStackPanel.addChild(cancelButton);
	this.addChild(upperHorizontalStackPanel);
	this.addChild(this.inputBox);
	this.addChild(buttonHorizontalStackPanel);
	
	this.rendered = false;
};

ActionDialogWidget.prototype.performAction = function() {
	var p = {actionId: Widgets.actionDialog.params.action.id, agentBuildingId: Widgets.actionDialog.params.agent.id};
	if(Widgets.actionDialog.params.locationTarget)
		p.targetLocationId = Widgets.actionDialog.params.locationTarget.id; 
	
	Server.req("industry/Action", "POST", p, Widgets.actionDialog, Widgets.actionDialog.actionSucceeded);
	Widgets.actionDialog.rendered = false;
};

ActionDialogWidget.prototype.displayAction = function(params) {
	Widgets.actionDialog.params = params || {};
	
	Widgets.actionDialog.updateActionInfo();
	Widgets.actionDialog.updateLocationInfo();
	Widgets.actionDialog.updateInput();
	Widgets.actionDialog.updateOutput();
	
	Widgets.actionDialog.rendered = true;
};

ActionDialogWidget.prototype.updateActionInfo = function() {
	this.actionInfoBoxTitle.setText(this.params.action.name);
	this.actionInfoBoxIcon.renderSettings.image = "icons/actionButton/" + StaticData.actions[this.params.action.id].canonicalName + ".png";
	this.actionInfoBoxIcon.imgStart();
	this.actionInfoBoxDescription.setText(this.params.action.description);
};

ActionDialogWidget.prototype.updateLocationInfo = function() {
	if(!this.params.locationTarget) {
		this.locationInfoBoxTitle.setText("No location target");
		this.locationInfoBoxIcon.rendered = false;
		this.locationInfoBoxDescription.setText("");

		return;
	}
	
	var t = StaticData.locationTypes[this.params.locationTarget.locationTypeId];
	this.locationInfoBoxTitle.setText(t.name);
	this.locationInfoBoxIcon.renderSettings.image = "icons/location/" + t.canonicalName + ".png";
	this.locationInfoBoxDescription.setText(t.description);
	this.locationInfoBoxIcon.rendered = true;
	this.locationInfoBoxBuildingIcon.rendered = false;
	
	$.each(Scene.nodeMaps.buildings, function(index, b) {
		if(b.data.locationId == Widgets.actionDialog.params.locationTarget.id) {
			Widgets.actionDialog.locationInfoBoxBuildingIcon.renderSettings.image = "icons/building/" + StaticData.buildingTypes[b.data.buildingTypeId].canonicalName + ".png";
			Widgets.actionDialog.locationInfoBoxBuildingIcon.rendered = true;
		}
	});
};

ActionDialogWidget.prototype.updateOutput = function() {
	this.outputBoxNonItemOutputStack.clearChildren();
	
	if(this.params.action.constructedBuildingTypeId != 0) {
		var t = StaticData.buildingTypes[this.params.action.constructedBuildingTypeId];
		var constructedBuildingIcon = new RenderedNode();
		constructedBuildingIcon.renderSettings.graphicsType = GraphicsType.IMAGE;
		constructedBuildingIcon.renderSettings.image = "icons/building/" + t.canonicalName + ".png";
		constructedBuildingIcon.renderSettings.size = {width: 32, height: 32};
		Tooltipper.tooltipify(constructedBuildingIcon, t.name + "\n" + t.description);
		this.outputBoxNonItemOutputStack.addChild(constructedBuildingIcon);
	}
	
	this.outputBoxItems.clear();
	var outputItems = new Array();
	$.each(StaticData.actionItemOutputs, function(index, output) {
		if(output.actionId == Widgets.actionDialog.params.action.id)
			outputItems.push(output);
	});
	this.outputBoxItems.setStorage(outputItems);
	
};

ActionDialogWidget.prototype.updateInput = function() {
	var totalActionPointCost = this.params.action.actionPointCost;
	
	if(this.params.agent.hubDistanceCost != null) {
		totalActionPointCost += this.params.agent.hubDistanceCost;
		this.inputBoxActionPointsText.setText("Action point cost: " + totalActionPointCost + " (" + this.params.agent.actionPoints + " available)\n    Base cost: " + this.params.action.actionPointCost + "\n    Distance from industry hub: " + this.params.agent.hubDistanceCost);
	}
	else {
		this.inputBoxActionPointsText.setText("Action point cost: " + totalActionPointCost + " (" + this.params.agent.actionPoints + " available)");
	}
	
	this.inputBoxItems.clear();
	var inputItems = new Array();
	$.each(StaticData.actionItemCosts, function(index, cost) {
		if(cost.actionId == Widgets.actionDialog.params.action.id)
			inputItems.push(cost);
	});
	this.inputBoxItems.setStorage(inputItems);
};

ActionDialogWidget.prototype.actionSucceeded = function(result, self) {
	Scene.selectNode(Scene.selectedNode);
};

