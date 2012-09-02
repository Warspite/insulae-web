var LocationTargetFilter = function() {
};

LocationTargetFilter.prototype.filter = function(action, agent) {
	if(action.constructedBuildingTypeId != 0)
		return this.filterByExistingBuildings(this.filterByRange(DynamicData.locationsByArea[Scene.selectedArea.id], DynamicData.locations[agent.locationId], agent.industrialHubRange));
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
