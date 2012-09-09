var MenuBar = {
	showChild: function(id) {
		$(id).css("height", $("#menuBar").css("height"));
		$(id).css("visibility", "visible");
	},
	
	hideChild: function(id) {
		$(id).css("height", "0px");
		$(id).css("visibility", "collapse");
	},
	
	setup: function(renderer) {
		$(".loginInputField").keyup(function(event){
			if(event.keyCode == 13) {
				$("#loginButton").click();
				$("#" + event.currentTarget.id).blur();
			}
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
		
		setInterval(function(){ $("#menuBar").css("width", renderer.surface.width); }, 100);
	},
		
	login: function(email, password) {
		Server.req("account/Session", "PUT", { "email": email, "password": password }, null, MenuBar.loginSucceeded, MenuBar.loginFailed);
	},
	
	loginSucceeded: function(result, self) {
		Session.set({id: result.content.id, key: result.content.key});
		MenuBar.hideChild("#loginForm");
		MenuBar.showChild("#currentSession");
		Widgets.avatarSelection.reload();
		
		Server.req("account/Account", "GET", {id: Session.get().id}, null, MenuBar.loggedInAccountLoaded)
		
	},
	
	loginFailed: function(result) {
		Error.setMessage("<h2>Login failed:</h2><br/>" + result.message);
		Error.show();
	},


	logoutSucceeded: function(result, self) {
		Session.set(null);
		Session.currentAccount = null;
		
		MenuBar.hideChild("#currentSession");
		MenuBar.showChild("#loginForm");
		$('#loginEmail').val('');
		$('#loginPassword').val('');
		
		Widgets.avatarSelection.selectedAvatar = null;
		Widgets.avatarSelection.rendered = false;
		Widgets.areaSelection.rendered = false;
		Widgets.selectionInfoPanel.rendered = false;
		Widgets.actionPanel.rendered = false;
		Widgets.actionDialog.rendered = false;
		Scene.clear();
	},
	
	logout: function() {
		Server.req("account/Session", "DELETE", null, null, MenuBar.logoutSucceeded);
		Widgets.hideAll();
		Scene.splash.rendered = true;
	},
	
	loggedInAccountLoaded: function(result) {
		Session.currentAccount = result.content;
		$('#currentSessionWelcome').html('Welcome, ' + Session.currentAccount.givenName + '!');
	}
};
