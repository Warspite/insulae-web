var MenuBar = {
	showChild: function(id) {
		$(id).css("height", $("#menuBar").css("height"));
		$(id).css("visibility", "visible");
	},
	
	hideChild: function(id) {
		$(id).css("height", "0px");
		$(id).css("visibility", "collapse");
	},
	
	setup: function() {
		$(".loginInputField").keyup(function(event){
			if(event.keyCode == 13)
				$("#loginButton").click();
		});
		
		$("#loginButton").click(function(event){
			MenuBar.login($('#loginEmail').val(), $('#loginPassword').val());
		});

		$("#logoutLink").click(function(event){
			MenuBar.logout();
		});
		
		$("#createAccountLink").click(function(event){
			RegisterAccount.clear();
			RegisterAccount.show();
		});
		
	},
		
	login: function(email, password) {
		Server.req("account/Session", "PUT", { "email": email, "password": password }, null, MenuBar.loginSucceeded);
	},
	
	loginSucceeded: function(result, self) {
		Session.set({id: result.content.id, key: result.content.key});
		MenuBar.hideChild("#loginForm");
		MenuBar.showChild("#currentSession");
		Widgets.avatarSelection.reload();
		
	},

	logoutSucceeded: function(result, self) {
		MenuBar.hideChild("#currentSession");
		MenuBar.showChild("#loginForm");
		$('#loginEmail').val('');
		$('#loginPassword').val('');
		
		Widgets.avatarSelection.rendered = false;
	},
	
	logout: function() {
		Server.req("account/Session", "DELETE", null, null, MenuBar.logoutSucceeded);
	}
};
