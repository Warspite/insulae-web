var LocationTargetFilter = function() {
};

LocationTargetFilter.prototype.filter = function(action, agent) {
	var filtered = DynamicData.locationsByArea[Scene.selectedArea.id];
	
	if(action.constructedBuildingTypeId != 0)
		filtered = this.filterByExistingBuildings(this.filterByRange(filtered, DynamicData.locations[agent.locationId], StaticData.buildingTypes[agent.buildingTypeId].industryHubRange));
	
	if(action.maximumRange != -1)
		filtered = this.filterByRange(filtered, DynamicData.locations[agent.locationId], action.maximumRange);
	
	if(action.canonicalName == "constructRoadTargeted")
		return this.filterByRoads(filtered);

	return filtered;
};

LocationTargetFilter.prototype.filterByRange = function(candidates, origin, range) {
	var filtered = {};
	filtered[origin.id] = origin;
	
	this.appendNeighbors(origin, filtered, range - 1);
	
	return filtered;
};

LocationTargetFilter.prototype.appendNeighbors = function(origin, list, remainingRecursions) {
	var self = this;
	
	$.each(DynamicData.locationNeighbors[origin.id], function(index, relation) {
		var n = DynamicData.locations[relation.neighborLocationId];
		
		list[n.id] = n;
		
		if(remainingRecursions > 0)
			self.appendNeighbors(n, list, remainingRecursions - 1);
	});
};

LocationTargetFilter.prototype.filterByExistingBuildings = function(candidates) {
	var filtered = {};
	
	$.each(candidates, function(index, l) {
		if(!DynamicData.buildingsByLocation[l.id])
			filtered[l.id] = l;
	});
	
	return filtered;
};

LocationTargetFilter.prototype.filterByRoads = function(candidates) {
	var filtered = {};
	
	$.each(candidates, function(index, l) {
		if(!l.road)
			filtered[l.id] = l;
	});
	
	return filtered;
};
