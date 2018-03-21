buildUserReport = function(user, dateRange){
	var callData = {
		'userId': user._id,
		'startDate': dateRange.startDate,
		'endDate': dateRange.endDate,
		'range': dateRange.range,
	}

	var range = dateRange.range;

	Meteor.call('users.getUserReport', callData, range, function(err, data){
		Meteor.call('emails.sendReport', user, user.emails[0].address, data, callData);
	});
}