var StaticData = {
	load: function(progressMeter) {
		progressMeter.targetProgress = 15;

		Server.req("geography/LocationType", "GET", null, progressMeter, StaticData.locationTypesLoaded);
		Server.req("geography/TransportationType", "GET", null, progressMeter, StaticData.transportationTypesLoaded);
		Server.req("geography/TransportationCost", "GET", null, progressMeter, StaticData.transportationCostsLoaded);
		Server.req("geography/ResourceType", "GET", null, progressMeter, StaticData.resourceTypesLoaded);
		Server.req("industry/BuildingType", "GET", null, progressMeter, StaticData.buildingTypesLoaded);
		Server.req("industry/ItemType", "GET", null, progressMeter, StaticData.itemTypesLoaded);
		Server.req("industry/Action", "GET", null, progressMeter, StaticData.actionsLoaded);
		Server.req("industry/ActionItemCost", "GET", null, progressMeter, StaticData.actionItemCostsLoaded);
		Server.req("industry/ActionItemOutput", "GET", null, progressMeter, StaticData.actionItemOutputsLoaded);
		Server.req("industry/ResourceRequiredNearActionTargetLocation", "GET", null, progressMeter, StaticData.resourcesRequiredNearActionTargetLocationLoaded);
		Server.req("industry/LocationTypeRequiredNearActionTargetLocation", "GET", null, progressMeter, StaticData.locationTypesRequiredNearActionTargetLocationLoaded);
		Server.req("world/Realm", "GET", null, progressMeter, StaticData.realmsLoaded);
		Server.req("world/Race", "GET", null, progressMeter, StaticData.racesLoaded);
		Server.req("world/Sex", "GET", null, progressMeter, StaticData.sexesLoaded);
		Server.req("meta/TroubleReportType", "GET", null, progressMeter, StaticData.troubleReportTypesLoaded);
	},
	
	locationTypesLoaded: function(result, progressMeter) {
		StaticData.locationTypes = Server.mapify(result.content.locationTypes);
		progressMeter.progress += 1;
	},

	transportationTypesLoaded: function(result, progressMeter) {
		StaticData.transportationTypes = Server.mapify(result.content.transportationTypes);
		progressMeter.progress += 1;
	},

	transportationCostsLoaded: function(result, progressMeter) {
		StaticData.transportationCosts = result.content.transportationCosts;
		progressMeter.progress += 1;
	},

	resourceTypesLoaded: function(result, progressMeter) {
		StaticData.resourceTypes = Server.mapify(result.content.resourceTypes);
		progressMeter.progress += 1;
	},
	
	buildingTypesLoaded: function(result, progressMeter) {
		StaticData.buildingTypes = Server.mapify(result.content.buildingTypes);
		progressMeter.progress += 1;
	},

	itemTypesLoaded: function(result, progressMeter) {
		StaticData.itemTypes = Server.mapify(result.content.itemTypes);
		progressMeter.progress += 1;
	},

	realmsLoaded: function(result, progressMeter) {
		StaticData.realms = Server.mapify(result.content.realms);
		progressMeter.progress += 1;
	},

	racesLoaded: function(result, progressMeter) {
		StaticData.races = Server.mapify(result.content.races);
		progressMeter.progress += 1;
	},

	sexesLoaded: function(result, progressMeter) {
		StaticData.sexes = Server.mapify(result.content.sexes);
		progressMeter.progress += 1;
	},

	actionsLoaded: function(result, progressMeter) {
		StaticData.actions = Server.mapify(result.content.actions);
		progressMeter.progress += 1;
	},

	actionItemCostsLoaded: function(result, progressMeter) {
		StaticData.actionItemCosts = result.content.actionItemCosts;
		progressMeter.progress += 1;
	},

	actionItemOutputsLoaded: function(result, progressMeter) {
		StaticData.actionItemOutputs = result.content.actionItemOutputs;
		progressMeter.progress += 1;
	},

	resourcesRequiredNearActionTargetLocationLoaded: function(result, progressMeter) {
		StaticData.resourcesRequiredNearActionTargetLocation = Server.mapify(result.content.resourcesRequiredNearActionTargetLocation, "actionId");
		progressMeter.progress += 1;
	},

	locationTypesRequiredNearActionTargetLocationLoaded: function(result, progressMeter) {
		StaticData.locationTypesRequiredNearActionTargetLocation = Server.mapify(result.content.locationTypesRequiredNearActionTargetLocation, "actionId");
		progressMeter.progress += 1;
	},

	troubleReportTypesLoaded: function(result, progressMeter) {
		StaticData.troubleReportTypes = result.content.troubleReportTypes;
		progressMeter.progress += 1;
	},
};
