var DynamicData = {
	setup: function() {
		DynamicData.locations = {};
		DynamicData.locationNeighbors = {};
		DynamicData.locationsByArea = {};
		DynamicData.buildings = {};
		DynamicData.buildingsByLocation = {};
	},
	
	addBuildings: function(buildings) {
		$.each(buildings, function(index, b) {
			DynamicData.buildings[b.id] = b;
			DynamicData.buildingsByLocation[b.locationId] = b;
		});
	},
	
	addLocationNeighbors: function(neighbors) {
		$.each(neighbors, function(index, n) {
			if(!DynamicData.locationNeighbors[n.locationId])
				DynamicData.locationNeighbors[n.locationId] = {};
			
			DynamicData.locationNeighbors[n.locationId][n.neighborLocationId] = n;
		});
	},
	
	addLocations: function(locations) {
		$.each(locations, function(index, l) {
			DynamicData.locations[l.id] = l;
			
			if(!DynamicData.locationsByArea[l.areaId])
				DynamicData.locationsByArea[l.areaId] = {};
			
			DynamicData.locationsByArea[l.areaId][l.id] = l;
		});
	}
};
