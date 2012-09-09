var Error = {
	setup: function() {
		$("#errorDismissLink").click(function(event){
			Error.hide();
		});

		$("#errorReportLink").click(function(event){
			CreateTroubleReport.clear();
			CreateTroubleReport.show({troubleReportTypeId: 2, slogan: "GUI Error popup", content: "[Please describe the circumstances that led to the error here.]\n\n" + $('#errorMessage').html()});
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
