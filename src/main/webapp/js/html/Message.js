var Message = {
	setup: function() {
		$("#messageDismissLink").click(function(event){
			Message.hide();
		});
	},
	
	setMessage: function(title, body) {
		$('#messageTitle').html(title);
		$('#messageBody').html(body);
	},
	
	show: function() {
		$('#message').css("visibility", "visible");
	},
	
	hide: function() {
		$('#message').css("visibility", "collapse");
	},
};
