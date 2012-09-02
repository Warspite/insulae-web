var CreateAvatar = {
	textFields: [
		{id: '#createAvatarName', minLength: 4}
	],

	setup: function() {
		$(".createAvatarInputField").keyup(function(event){
			if(event.keyCode == 13) {
				$("#createAvatarButton").click();
				$("#" + event.currentTarget.id).blur();
			}
			else {
				CreateAvatar.evaluateForm();
			}
					
		});
		
		$("#cancelCreateAvatarLink").click(function(event){
			$('#createAvatar').css("visibility", "collapse");
		});
		
		$.each(StaticData.realms, function(index, realm) {
			$('#createAvatarRealm').append(
				$('<option></option>').val(realm.id).html(realm.name)
			);
		});

		$('#createAvatarRace').change(CreateAvatar.raceSelectionChanged);
		$('#createAvatarRealm').change(CreateAvatar.realmSelectionChanged);
		$('#createAvatarRealm').change();
	},
	
	clear: function() {
		FormUtility.clear(CreateAvatar.textFields);
	},
	
	show: function() {
		$('#createAvatar').css("visibility", "visible");
	},
	
	hide: function() {
		$('#createAvatar').css("visibility", "collapse");
	},
	
	create: function(name, realmId, raceId, sexId) {
		Server.req("world/Avatar", "PUT", {name: name, realmId: realmId, raceId: raceId, sexId: sexId}, null, CreateAvatar.creationSucceeded)
	},
	
	evaluateForm: function() {
		var formOk = true;
		
		for(i in CreateAvatar.textFields)
			if(!FormUtility.evaluateTextField(CreateAvatar.textFields[i]))
				formOk = false;

		$("#createAvatarButton").off('click.createAvatar');
		if( formOk ) {
			$("#createAvatarButton").on('click.createAvatar', function(event){ CreateAvatar.create($('#createAvatarName').val(), parseInt($('#createAvatarRealm').val()), parseInt($('#createAvatarRace').val()), parseInt($('#createAvatarSex').val())); });
			$("#createAvatarButton").removeClass('disabled');
		}
		else {
			$("#createAvatarButton").addClass('disabled');
		}

		return formOk;
	},
	
	setFeedback: function(id, feedback) {
		if(feedback == null) {
			$(id).removeClass('formError');
			$(id + 'Feedback').html('Ok!');
			$(id + 'Feedback').removeClass('formErrorFeedback');
		}
		else {
			$(id).addClass('formError');
			$(id + 'Feedback').html(feedback);
			$(id + 'Feedback').addClass('formErrorFeedback');
		}
	},
	
	creationSucceeded: function(result) {
		Widgets.avatarSelection.reload();
		Widgets.avatarSelection.selectAvatar(result.content);
	},
	
	realmSelectionChanged: function() {
		$('#createAvatarRace').attr('disabled', 'disabled');
		$('#createAvatarRace').empty();
		$('#createAvatarRaceAjaxSpinner').css('visibility', 'visible');
		Server.req("world/Race", "GET", {realmId: parseInt($('#createAvatarRealm').val())}, null, CreateAvatar.racesByRealmLoaded);
	},
	
	raceSelectionChanged: function() {
		$('#createAvatarSex').attr('disabled', 'disabled');
		$('#createAvatarSex').empty();
		$('#createAvatarSexAjaxSpinner').css('visibility', 'visible');
		Server.req("world/Sex", "GET", {raceId: parseInt($('#createAvatarRace').val())}, null, CreateAvatar.sexesByRaceLoaded);
	},
	
	racesByRealmLoaded: function(result) {
		$.each(result.content.races, function(index, race) {
			$('#createAvatarRace').append(
				$('<option></option>').val(race.id).html(race.name)
			);
		});
		$('#createAvatarRace').removeAttr('disabled');
		$('#createAvatarRaceAjaxSpinner').css('visibility', 'collapse');
		$('#createAvatarRace').change();
	},

	sexesByRaceLoaded: function(result) {
		$.each(result.content.sexes, function(index, sex) {
			$('#createAvatarSex').append(
				$('<option></option>').val(sex.id).html(sex.name)
			);
		});
		$('#createAvatarSex').removeAttr('disabled');
		$('#createAvatarSexAjaxSpinner').css('visibility', 'collapse');
	},
};
