var RegisterAccount = {
	setup: function() {
		$(".registerInputField").keyup(function(event){
			if(event.keyCode == 13)
				$("#registerButton").click();
			else {
				RegisterAccount.evaluateForm($('#registerCallSign').val(), $('#registerGivenName').val(), $('#registerSurname').val(), $('#registerEmail').val(), $('#registerPassword').val(), $('#registerPasswordConfirm').val());
			}
					
		});
		
		$("#cancelCreateAccountLink").click(function(event){
			$('#registerAccount').css("visibility", "collapse");
		});
	},
		
	register: function(callSign, givenName, surname, email, password, passwordConfirm) {
		Server.req("account/Account", "PUT", { email: email, password: password, surname: surname, givenName: givenName, callSign: callSign }, null, RegisterAccount.registrationSucceeded);
	},
	
	evaluateForm: function(callSign, givenName, surname, email, password, passwordConfirm) {
		var formOk = true;
		
		if( callSign.length < 4 ) {
			formOk = false;
			RegisterAccount.setFeedback('#registerCallSign', 'Min 4 characters requred.');
		}
		else {
			RegisterAccount.setFeedback('#registerCallSign', null);
		}
		
		if( givenName.length < 2 ) {
			formOk = false;
			RegisterAccount.setFeedback('#registerGivenName', 'Min 2 characters requred.');
		}
		else {
			RegisterAccount.setFeedback('#registerGivenName', null);
		}
		
		if( surname.length < 2 ) {
			formOk = false;
			RegisterAccount.setFeedback('#registerSurname', 'Min 2 characters requred.');
		}
		else {
			RegisterAccount.setFeedback('#registerSurname', null);
		}
	
		if( email.length < 5 ) {
			formOk = false;
			RegisterAccount.setFeedback(	'#registerEmail', 'Min 5 characters requred.');
		}
		else {
			RegisterAccount.setFeedback('#registerEmail', null);
		}
	
		if( password.length < 6 ) {
			formOk = false;
			RegisterAccount.setFeedback('#registerPassword', 'Min 6 characters requred.');
		}
		else {
			RegisterAccount.setFeedback('#registerPassword', null);
		}
	
		if( passwordConfirm != password ) {
			formOk = false;
			RegisterAccount.setFeedback('#registerPasswordConfirm', 'Passwords don\'t match!');
		}
		else {
			RegisterAccount.setFeedback('#registerPasswordConfirm', null);
		}
	
		if( formOk ) {
			$("#registerButton").on('click.registerAccount', function(event){ RegisterAccount.register($('#registerCallSign').val(), $('#registerGivenName').val(), $('#registerSurname').val(), $('#registerEmail').val(), $('#registerPassword').val(), $('#registerPasswordConfirm').val()); });
			$("#registerButton").removeClass('disabled');
		}
		else {
			$("#registerButton").off('click.registerAccount');
			$("#registerButton").addClass('disabled');
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
	
	registrationSucceeded: function(result) {
		$('#registerAccount').css("visibility", "collapse");
		MenuBar.login(result.content.email, $('#registerPassword').val());
	}
};
