var Paths = {
	IMAGE_ROOT: "images/",
	JAVASCRIPT_ROOT: "js/"
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

window.onload = function(event) {
	var canvas = document.getElementById('mainCanvas');
	var surface = new RenderSurface(canvas, {x: 25, y: 25});
	var renderer = new Renderer(surface, "#303030");
	var mouse = new Mouse(canvas, renderer);
	var keyboard = new Keyboard(renderer);
	
	keyboard.addEventListener(renderer);
	mouse.addEventListener(renderer);

	var ticker = new Ticker(25);
	ticker.addListener(mouse);
	ticker.addListener(keyboard);
	ticker.addListener(renderer);
};
