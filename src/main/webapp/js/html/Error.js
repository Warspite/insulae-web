var Error = {
	setup: function() {
		$("#errorDismissLink").click(function(event){
			Error.hide();
		});
	},
	
	setMessage: function(msg) {
		$('#errorMessage').html(msg);
	},
	
	show: function() {
		$('#error').css("visibility", "visible");
	},
	
	hide: function() {
		$('#error').css("visibility", "collapse");
	},
};
