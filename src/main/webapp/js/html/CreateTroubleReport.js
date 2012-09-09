var CreateTroubleReport = {
	textFields: [
		{id: '#createTroubleReportSlogan', minLength: 4}
	],

	setup: function() {
		$(".createTroubleReportInputField").keyup(function(event){
			if(event.keyCode == 13) {
				$("#createTroubleReportButton").click();
				$("#" + event.currentTarget.id).blur();
			}
			else {
				CreateTroubleReport.evaluateForm();
			}
					
		});
		
		$("#cancelCreateTroubleReportLink").click(function(event){
			CreateTroubleReport.hide();
		});
		
		$.each(StaticData.troubleReportTypes, function(index, trType) {
			$('#createTroubleReportTroubleReportTypeId').append(
				$('<option></option>').val(trType.id).html(trType.name)
			);
		});
	},
	
	clear: function() {
		FormUtility.clear(CreateTroubleReport.textFields);
		$('#createTroubleReportContent').val('');
	},
	
	show: function(params) {
		var p = params || {};
		
		if(p.troubleReportTypeId)
			$('#createTroubleReportTroubleReportTypeId').val(p.troubleReportTypeId);
		
		if(p.slogan)
			$('#createTroubleReportSlogan').val(p.slogan);
		
		if(p.content)
			$('#createTroubleReportContent').val(p.content);
		
		$('#createTroubleReport').css("visibility", "visible");
		
		CreateTroubleReport.evaluateForm();
	},
	
	hide: function() {
		$('#createTroubleReport').css("visibility", "collapse");
	},
	
	create: function(troubleReportTypeId, slogan, content) {
		Server.req("meta/TroubleReport", "PUT", {troubleReportTypeId: troubleReportTypeId, slogan: slogan, content: content}, null, CreateTroubleReport.creationSucceeded)
	},
	
	evaluateForm: function() {
		var formOk = true;
		
		$.each(CreateTroubleReport.textFields, function(index, field) {
			if(!FormUtility.evaluateTextField(field))
				formOk = false;
		});

		$("#createTroubleReportButton").off('click.createTroubleReport');
		if( formOk ) {
			$("#createTroubleReportButton").on('click.createTroubleReport', function(event){ CreateTroubleReport.create(parseInt($('#createTroubleReportTroubleReportTypeId').val()), $('#createTroubleReportSlogan').val(), $('#createTroubleReportContent').val()); });
			$("#createTroubleReportButton").removeClass('disabled');
		}
		else {
			$("#createTroubleReportButton").addClass('disabled');
		}

		return formOk;
	},
	
	creationSucceeded: function(result) {
		CreateTroubleReport.hide();
		Message.setMessage("Success!", "Trouble report filed successfully.<br /><br />Thank you!");
		Message.show();
	},
};
