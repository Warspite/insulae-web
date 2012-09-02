var Input = {
	setup: function(canvas, renderer) {
		Input.mouse = new Mouse(canvas, renderer);
		Input.keyboard = new Keyboard(renderer);
		
		Input.keyboard.addEventListener(renderer);
		Input.mouse.addEventListener(renderer);
	},
};

