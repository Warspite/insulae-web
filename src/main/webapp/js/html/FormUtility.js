var FormUtility = {
	evaluateTextField: function(field) {
		var val = $(field.id).val();
		
		if( field.minLength != null && val.length < field.minLength ) {
			FormUtility.setFeedback(field.id, 'Min ' + field.minLength + ' characters requred.');
			return false;
		}
		
		FormUtility.setFeedback(field.id, null);
		return true;
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
	
	clear: function(textFields) {
		for(i in textFields) {
			var f = textFields[i];
			$(f.id).val('');
			$(f.id).removeClass('formError');
			$(f.id + 'Feedback').html('');
			$(f.id + 'Feedback').removeClass('formErrorFeedback');
		}
	},
};
