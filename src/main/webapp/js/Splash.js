var Splash = function()
{
	mixin(new DynamicNode(), this);
	this.renderSettings.sizing = {width: Sizing.PARENT, height: Sizing.PARENT};
	
	var splashLogo = new DynamicNode();
	splashLogo.renderSettings.position = {x: 0, y: 0};
	splashLogo.renderSettings.anchor = {horizontal: Anchor.CENTER, vertical: Anchor.CENTER};
	splashLogo.renderSettings.origin = {horizontal: Origin.CENTER, vertical: Origin.CENTER};
	splashLogo.renderSettings.sizing = {width: Sizing.PARENT, height: Sizing.PARENT};
	splashLogo.renderSettings.sizeRatio = {ratio: 1600/1200, behavior: SizeRatioBehavior.SHRINK};
	splashLogo.renderSettings.graphicsType = GraphicsType.IMAGE;
	splashLogo.renderSettings.image = "splash.png";
	splashLogo.renderSettings.alpha = 0;
	Animator.spatialAnimate(splashLogo);
	splashLogo.animationSettings.alphaSpeed = 0.3;
	splashLogo.spatialSetPaused(false);
	
	this.loadingProgress = new ProgressBarNode("Loading . . .");
	this.loadingProgress.renderSettings.position = {x: 0, y: -5};
	this.loadingProgress.renderSettings.anchor = {horizontal: Anchor.CENTER, vertical: Anchor.BOTTOM};
	this.loadingProgress.renderSettings.origin = {horizontal: Origin.CENTER, vertical: Origin.BOTTOM};
	this.loadingProgress.completeTextString = "Loading complete!"
	this.loadingProgress.addEventListener(this);
	
	this.addChild(splashLogo);
	this.addChild(this.loadingProgress);
	
	this.addEventHandler(EventType.PROGRESS_COMPLETE, function(self, source, event) {
		MenuBar.showChild("#loginForm");
		$("#loginEmail").focus();
	});
};
