var AvatarSelectionWidget = function() {
	
	mixin(new FoldingNode(Direction.RIGHT, this), this);
	
	this.selectedAvatar = null;
	this.renderSettings.anchor.horizontal = Direction.RIGHT;
	this.renderSettings.origin.horizontal = Direction.RIGHT;
	this.foldButton.renderSettings.anchor.horizontal = Direction.LEFT;
	this.renderSettings.position.y = 20;
	this.renderSettings.graphicsType = GraphicsType.RECT;
	this.renderSettings.alpha = 0.2;
	this.renderSettings.sizing = {width: Sizing.CHILDREN, height: Sizing.CHILDREN};
	this.rendered = false;
};

AvatarSelectionWidget.prototype.avatarsLoaded = function(result, self) {
	self.content.clearChildren();
	self.content.addChild(self.createNewAvatarButton());
	for(i in result.content.avatars) {
		var a = result.content.avatars[i];
		var btn = new IconLabelButtonNode(function(self) { Widgets.avatarSelection.selectAvatar(self.avatar) }, "icons/race/" + StaticData.races[a.raceId].canonicalName + ".png", StaticData.sexes[a.sexId].title + " " + a.name + "\n(" + StaticData.realms[a.realmId].name + ")");
		btn.avatar = a;
		self.content.addChild(btn);
	}
	self.rendered = true;
	self.folded = false;
};

AvatarSelectionWidget.prototype.createNewAvatarButton = function() {
	return new IconLabelButtonNode(
		function() { 
			CreateAvatar.clear();
			CreateAvatar.show();
		}, 
		"icons/createNewAvatar.png", 
		"Create a new avatar"
	);
};

AvatarSelectionWidget.prototype.selectAvatar = function(avatar) {
	Widgets.avatarSelection.selectedAvatar = avatar;
	Server.req("geography/Area", "GET", {realmId: avatar.realmId}, Widgets.areaSelection, Widgets.areaSelection.areasLoaded);
};

AvatarSelectionWidget.prototype.reload = function() {
	Server.req("world/Avatar", "GET", { "accountId": Session.get().id }, Widgets.avatarSelection, Widgets.avatarSelection.avatarsLoaded);	
};
