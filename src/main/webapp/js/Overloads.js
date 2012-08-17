var Overloads = {
	setup: function() {
		Server.defaultFailureCallback = function(result, requestType, servlet, caller) {
			Error.setMessage("<h2>A request to the server failed:</h2><br/>" + requestType + " request to " + servlet + " returned \"" + result.message + "\".");
			Error.show();
		};
	
		Server.handleRequestFault = function(error, textStatus) {
			Error.setMessage("<h2>There was a server communication error:</h2><br/>" + error.status + " " + error.statusText + " (" + textStatus  + ").");
			Error.show();
		};
	}
}

