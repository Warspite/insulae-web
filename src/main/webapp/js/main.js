var Paths = {
	IMAGE_ROOT: "images/",
	JAVASCRIPT_ROOT: "js/",
	SOUND_ROOT: "sound/"
}

function include(file) {
	if (document.createElement && document.getElementsByTagName) {
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.setAttribute('type', 'text/javascript');
		script.setAttribute('src', Paths.JAVASCRIPT_ROOT + file);
		head.appendChild(script);
	}
}
	
include("lib/Include.js");
include("Overloads.js");
include("Scene.js");
include("SceneNodeMaps.js");
include("Splash.js");

include("data/StaticData.js");

include("html/CreateAvatar.js");
include("html/Error.js");
include("html/FormUtility.js");
include("html/MenuBar.js");
include("html/RegisterAccount.js");

include("nodes/BuildingNode.js");
include("nodes/LocationNode.js");

include("widgets/AreaSelectionWidget.js");
include("widgets/AvatarSelectionWidget.js");
include("widgets/Widgets.js");

window.onload = function(event) {
	Overloads.setup();
	
	var canvas = document.getElementById('mainCanvas');
	var surface = new RenderSurface(canvas, {x: 25, y: 57});
	var renderer = new Renderer(surface, "#ffffff");
	var mouse = new Mouse(canvas, renderer);
	var keyboard = new Keyboard(renderer);
	
	keyboard.addEventListener(renderer);
	mouse.addEventListener(renderer);

	var ticker = new Ticker(25);
	ticker.addListener(mouse);
	ticker.addListener(keyboard);
	ticker.addListener(renderer);
	
	Scene.setup(renderer);
	
	StaticData.load(Scene.splash.loadingProgress);
};
