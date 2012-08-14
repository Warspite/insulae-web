var StaticData = function(progressMeter)
{
	this.progressMeter = progressMeter;

	this.progressMeter.totalProgress = 7;
	Server.req("geography/LocationType", "GET", null, this, this.locationTypesLoaded);
	Server.req("geography/TransportationType", "GET", null, this, this.transportationTypesLoaded);
	Server.req("geography/TransportationCost", "GET", null, this, this.transportationCostsLoaded);
	Server.req("industry/BuildingType", "GET", null, this, this.buildingTypesLoaded);
	Server.req("industry/ItemType", "GET", null, this, this.itemTypesLoaded);
	Server.req("world/Realm", "GET", null, this, this.realmsLoaded);
	Server.req("world/Race", "GET", null, this, this.racesLoaded);
};

StaticData.prototype.locationTypesLoaded = function(result, self) {
	self.locationTypes = Server.mapify(result.content.locationTypes);
	self.progressMeter.progress += 1;
};

StaticData.prototype.transportationTypesLoaded = function(result, self) {
	self.transportationTypes = Server.mapify(result.content.transportationTypes);
	self.progressMeter.progress += 1;
};

StaticData.prototype.transportationCostsLoaded = function(result, self) {
	self.transportationCosts = result.content.transportationCosts;
	self.progressMeter.progress += 1;
};

StaticData.prototype.buildingTypesLoaded = function(result, self) {
	self.buildingTypes = Server.mapify(result.content.buildingTypes);
	self.progressMeter.progress += 1;
};

StaticData.prototype.itemTypesLoaded = function(result, self) {
	self.itemTypes = Server.mapify(result.content.itemTypes);
	self.progressMeter.progress += 1;
};

StaticData.prototype.realmsLoaded = function(result, self) {
	self.realms = Server.mapify(result.content.realms);
	self.progressMeter.progress += 1;
};

StaticData.prototype.racesLoaded = function(result, self) {
	self.races = result.content.races;
	self.progressMeter.progress += 1;
};
