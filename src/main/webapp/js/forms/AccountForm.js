var AccountForm = {
	setupLoginForm: function() {
		$(".loginInputField").keyup(function(event){
			if(event.keyCode == 13)
				$("#loginButton").click();
		});
		
		$("#loginButton").click(function(event){
			AccountForm.login($('#loginEmail').val(), $('#loginPassword').val());
		});

		$("#logoutLink").click(function(event){
			AccountForm.logout();
		});
	},
		
	login: function(email, password) {
		Server.req("account/Session", "PUT", { "email": email, "password": password }, AccountForm.loginSucceeded);
	},
	
	loginSucceeded: function(result) {
		$("#loginForm").css("height", "0px");
		$("#loginForm").css("visibility", "collapse");
		$("#currentSession").css("height", $("#menuBar").css("height"));
		$("#currentSession").css("visibility", "visible");
	},

	logout: function(result) {
		$("#currentSession").css("height", "0px");
		$("#currentSession").css("visibility", "collapse");
		$("#loginForm").css("height", $("#menuBar").css("height"));
		$("#loginForm").css("visibility", "visible");
	}
};
