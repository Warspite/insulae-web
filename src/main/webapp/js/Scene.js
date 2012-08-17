var Scene = {
	setup: function(renderer) {
		Scene.renderer = renderer;
		Scene.splash = new Splash();
		Scene.renderer.guiRoot.addChild(Scene.splash);
	},
	
	selectArea: function(area) {
		Server.req("geography/Location", "GET", {areaId: area.id}, null, Scene.locationsLoaded);
		Scene.splash.rendered = false;
	},
	
	locationsLoaded: function(result) {
		if(Scene.locationsContainer)
			Scene.renderer.sceneRoot.removeChild(Scene.locationsContainer);
		
		Scene.locationsContainer = new RenderedNode();
		Scene.renderer.sceneRoot.addChild(Scene.locationsContainer);
		
		$.each(result.content.locations, function(index, loc) {
			Scene.locationsContainer.addChild(new LocationNode(loc));
		});
	}
};
