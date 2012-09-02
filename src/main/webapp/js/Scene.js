var Scene = {
	setup: function(renderer) {
		Scene.renderer = renderer;
		Scene.splash = new Splash();
		Scene.renderer.guiRoot.addChild(Scene.splash);
		Scene.nodeMaps = new SceneNodeMaps();
		Scene.selectedArea = null;
		Scene.selectedNode = null;

		Scene.locationTargeter = new LocationTargeter();
		Scene.targetingOverlayContainer = new RenderedNode();
		Scene.targetingOverlayContainer.zIndex = 100;
		Scene.renderer.sceneRoot.addChild(Scene.targetingOverlayContainer);
		
		Scene.selectedNodeMarker = new RenderedNode();
		Scene.selectedNodeMarker.renderSettings.graphicsType = GraphicsType.IMAGE;
		Scene.selectedNodeMarker.renderSettings.image = "selection.png";
		Animator.spatialAnimate(Scene.selectedNodeMarker);
		Scene.selectedNodeMarker.animationSettings.rotationSpeed = 1.0;
		Scene.selectedNodeMarker.renderSettings.origin = {horizontal: Direction.CENTER, vertical: Direction.CENTER};
		Scene.selectedNodeMarker.renderSettings.anchor = {horizontal: Direction.CENTER, vertical: Direction.CENTER};
		Scene.selectedNodeMarker.spatialTogglePause();
		Scene.selectedNodeMarker.rendered = false;
		Scene.selectedNodeMarker.zIndex = -1;
		
	},
	
	clear: function() {
		if(Scene.locationsContainer)
			Scene.renderer.sceneRoot.removeChild(Scene.locationsContainer);
		
		if(Scene.buildingsContainer)
			Scene.renderer.sceneRoot.removeChild(Scene.buildingsContainer);
		
		Scene.targetingOverlayContainer.clearChildren();
		
		Scene.nodeMaps.clearAll();
		Scene.selectedNode = null;
	},
	
	selectArea: function(area) {
		Scene.selectedArea = area;
		Server.req("geography/Location", "GET", {areaId: Scene.selectedArea.id}, null, Scene.locationsLoaded);
		Scene.splash.rendered = false;
		Scene.renderer.sceneRoot.reset();
		Widgets.actionPanel.rendered = true;
		Widgets.selectionInfoPanel.rendered = true;
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
		Scene.buildingsContainer = new RenderedNode();
		Scene.buildingsContainer.zIndex = 1;
		Scene.renderer.sceneRoot.addChild(Scene.buildingsContainer);
		
		$.each(result.content.buildings, function(index, b) {
			var bNode = new BuildingNode(b, Scene.nodeMaps.locations[b.locationId]);
			Scene.buildingsContainer.addChild(bNode);
			Scene.nodeMaps.buildings[b.id] = bNode;
		});
	},
	
	selectNode: function(node) { 
		if(Scene.selectedNodeMarker.parent)
			Scene.selectedNodeMarker.parent.removeChild(Scene.selectedNodeMarker);
		
		if(node) {
			node.addChild(Scene.selectedNodeMarker);
			Scene.selectedNodeMarker.renderSettings.size = {width: node.renderSettings.size.width * 1.35, height: node.renderSettings.size.height * 1.35};
			Scene.selectedNodeMarker.rendered = true;
			
			if(node.constructor == BuildingNode) {
				Widgets.actionPanel.displayBuildingActions(node.data);
				Widgets.selectionInfoPanel.displayBuildingInfo(node.data);
			}
		}
		else {
			Scene.selectedNodeMarker.rendered = false;
			Widgets.actionPanel.clear();
			Widgets.selectionInfoPanel.clear();
		}
	}
};
