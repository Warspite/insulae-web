var Scene = {
	setup: function(renderer) {
		Scene.renderer = renderer;
		Scene.splash = new Splash();
		Scene.renderer.guiRoot.addChild(Scene.splash);
		Scene.nodeMaps = new SceneNodeMaps();
		Scene.selectedArea = null;
	},
	
	clear: function() {
		if(Scene.locationsContainer)
			Scene.renderer.sceneRoot.removeChild(Scene.locationsContainer);
		
		Scene.nodeMaps.clearAll();
	},
	
	selectArea: function(area) {
		Scene.selectedArea = area;
		Server.req("geography/Location", "GET", {areaId: Scene.selectedArea.id}, null, Scene.locationsLoaded);
		Scene.splash.rendered = false;
		Scene.renderer.sceneRoot.reset();
	},
	
	locationsLoaded: function(result) {
		Scene.clear();
		Scene.locationsContainer = new RenderedNode();
		Scene.renderer.sceneRoot.addChild(Scene.locationsContainer);
		
		$.each(result.content.locations, function(index, loc) {
			var node = new LocationNode(loc);
			Scene.locationsContainer.addChild(node);
			Scene.nodeMaps.locations[loc.id] = node;
		});
		
		Server.req("industry/Building", "GET", {areaId: Scene.selectedArea.id}, null, Scene.buildingsLoaded);
	},

	buildingsLoaded: function(result) {
		Scene.nodeMaps.buildings = {};
		
		$.each(result.content.buildings, function(index, b) {
			var bNode = new BuildingNode(b);
			var locNode = Scene.nodeMaps.locations[b.locationId];
			locNode.addChild(bNode);
			Scene.nodeMaps.buildings[b.id] = bNode;
		});
	}
};
