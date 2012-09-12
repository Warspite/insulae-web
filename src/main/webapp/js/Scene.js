var Scene = {
	setup: function(renderer) {
		Scene.renderer = renderer;
		Scene.splash = new Splash();
		Scene.renderer.guiRoot.addChild(Scene.splash);
		Scene.nodeMaps = new SceneNodeMaps();
		Scene.selectedArea = null;
		Scene.selectedNode = null;

		Scene.locationTargeter = new LocationTargeter(new LocationTargetFilter());
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
		
		Scene.locationsContainer = new RenderedNode();
		Scene.locationsContainer.zIndex = 0;
		Scene.renderer.sceneRoot.addChild(Scene.locationsContainer);
		Scene.nodeMaps.locations = {};
		
		Scene.resourcesContainer = new RenderedNode();
		Scene.resourcesContainer.zIndex = 1;
		Scene.renderer.sceneRoot.addChild(Scene.resourcesContainer);
		
		Scene.buildingsContainer = new RenderedNode();
		Scene.buildingsContainer.zIndex = 2;
		Scene.renderer.sceneRoot.addChild(Scene.buildingsContainer);
		Scene.nodeMaps.buildings = {};
	},
	
	clear: function() {
		Scene.locationsContainer.clearChildren();
		Scene.buildingsContainer.clearChildren();
		Scene.targetingOverlayContainer.clearChildren();
		Scene.nodeMaps.clearAll();
		Scene.selectedNode = null;
	},
	
	selectArea: function(area) {
		Scene.clear();
		Scene.selectedArea = area;
		Scene.splash.rendered = false;
		Scene.renderer.sceneRoot.reset();
		Widgets.actionPanel.rendered = true;
		Widgets.selectionInfoPanel.rendered = true;
		Scene.loadAreaContents(Scene.selectedArea.id);
	},
	
	loadAreaContents: function(areaId) {
		Server.req("geography/Location", "GET", {areaId: Scene.selectedArea.id}, null, Scene.locationsLoaded);
		Server.req("geography/LocationNeighbor", "GET", {areaId: Scene.selectedArea.id}, null, Scene.locationNeighborsLoaded);
	},
	
	locationNeighborsLoaded: function(result) {
		DynamicData.addLocationNeighbors(result.content.locationNeighbors);
	},
	
	locationsLoaded: function(result) {
		DynamicData.setAreaLocations(Scene.selectedArea.id, result.content.locations);
		
		Scene.nodeMaps.locations = {};
		Scene.locationsContainer.clearChildren();
		
		$.each(result.content.locations, function(index, loc) {
			var node = new LocationNode(loc);
			
			Scene.locationsContainer.addChild(node);
			Scene.nodeMaps.locations[loc.id] = node;
		});

		Server.req("industry/Building", "GET", {areaId: Scene.selectedArea.id}, null, Scene.buildingsLoaded);
		Server.req("geography/Resource", "GET", {areaId: Scene.selectedArea.id}, null, Scene.resourcesLoaded);
	},

	buildingsLoaded: function(result) {
		DynamicData.setAreaBuildings(Scene.selectedArea.id, result.content.buildings);
		
		var oldNodeMap = Scene.nodeMaps.buildings;
		var previouslySelectedNode = Scene.selectedNode;
		Scene.selectNode(null);
		Scene.nodeMaps.buildings = {};
		Scene.buildingsContainer.clearChildren();
		
		$.each(result.content.buildings, function(index, b) {
			var bNode = new BuildingNode(b, Scene.nodeMaps.locations[b.locationId]);

			if(oldNodeMap[b.id] && oldNodeMap[b.id] == previouslySelectedNode)
				Scene.selectNode(bNode);
			
			Scene.buildingsContainer.addChild(bNode);
			Scene.nodeMaps.buildings[b.id] = bNode;
		});
	},
	
	resourcesLoaded: function(result) {
		DynamicData.setAreaResources(Scene.selectedArea.id, result.content.resources);
		
		Scene.resourcesContainer.clearChildren();
		
		$.each(DynamicData.locationsByArea[Scene.selectedArea.id], function(index, location) {
			if(!DynamicData.resourcesByLocation[location.id])
				return;
			
			$.each(DynamicData.resourcesByLocation[location.id], function(index, resource) {
				Scene.resourcesContainer.addChild(new ResourceNode(resource, index, Scene.nodeMaps.locations[location.id]));
			});
		});
	},
	
	selectNode: function(node) {
		Scene.locationTargeter.cancel();
		Scene.selectedNode = node;
		if(Scene.selectedNodeMarker.parent)
			Scene.selectedNodeMarker.parent.removeChild(Scene.selectedNodeMarker);
		
		if(node) {
			node.addChild(Scene.selectedNodeMarker);
			Scene.selectedNodeMarker.renderSettings.size = {width: node.renderSettings.size.width * 1.35, height: node.renderSettings.size.height * 1.35};
			Scene.selectedNodeMarker.rendered = true;
			
			if(node.constructor == BuildingNode) {
				Server.req("industry/Building", "GET", {id: node.data.id}, null, Scene.selectedBuildingLoaded);
			}
		}
		else {
			Scene.selectedNodeMarker.rendered = false;
			Widgets.actionPanel.clear();
			Widgets.selectionInfoPanel.clear();
		}
	},
	
	selectedBuildingLoaded: function(result) {
		Widgets.actionPanel.displayBuildingActions(result.content);
		Widgets.selectionInfoPanel.displayBuildingInfo(result.content);
	}
};
