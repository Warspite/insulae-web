var DynamicData = {
	setup: function() {
		DynamicData.locations = {};
		DynamicData.locationNeighbors = {};
		DynamicData.locationsByArea = {};
		DynamicData.buildings = {};
		DynamicData.buildingsByLocation = {};
		DynamicData.resourcesByLocation = {};
	},
	
	setAreaBuildings: function(areaId, buildings) {
		DynamicData.removeAreaBuildings(areaId);
		
		$.each(buildings, function(index, b) {
			DynamicData.buildings[b.id] = b;
			DynamicData.buildingsByLocation[b.locationId] = b;
		});
	},
	
	setAreaResources: function(areaId, resources) {
		DynamicData.removeAreaResources(areaId);
		
		$.each(resources, function(index, r) {
			if(!DynamicData.resourcesByLocation[r.locationId])
				DynamicData.resourcesByLocation[r.locationId] = new Array();
			
			DynamicData.resourcesByLocation[r.locationId].push(r);
		});
	},
	
	addLocationNeighbors: function(neighbors) {
		$.each(neighbors, function(index, n) {
			if(!DynamicData.locationNeighbors[n.locationId])
				DynamicData.locationNeighbors[n.locationId] = {};
			
			DynamicData.locationNeighbors[n.locationId][n.neighborLocationId] = n;
		});
	},
	
	setAreaLocations: function(areaId, locations) {
		DynamicData.removeAreaLocations(areaId);
		DynamicData.locationsByArea[areaId] = locations;
		
		$.each(locations, function(index, l) {
			DynamicData.locations[l.id] = l;
		});
	},
	
	removeAreaLocations: function(areaId) {
		if(!DynamicData.locationsByArea[areaId])
			return;
		
		$.each(DynamicData.locationsByArea[areaId], function(index, l) {
			delete DynamicData.locations[l.id];
		});
	},
	
	removeAreaBuildings: function(areaId) {
		if(!DynamicData.locationsByArea[areaId])
			return;
		
		$.each(DynamicData.locationsByArea[areaId], function(index, l) {
			var b = DynamicData.buildingsByLocation[l.id];
			if(b) {
				delete DynamicData.buildingsByLocation[l.id];
				delete DynamicData.buildings[b.id];
			}
		});
	},
	
	removeAreaResources: function(areaId) {
		if(!DynamicData.locationsByArea[areaId])
			return;
		
		$.each(DynamicData.locationsByArea[areaId], function(index, l) {
			var r = DynamicData.resourcesByLocation[l.id];
			if(r)
				delete DynamicData.resourcesByLocation[l.id];
		});
	}	
};
