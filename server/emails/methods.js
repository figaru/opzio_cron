Meteor.methods({
	'emails.sendReport': function(user, email, data, dateRange){
			//Report title
			switch(dateRange.range){
				case 'day':
					var dateString = moment(dateRange.startDate).format("DD MMM 'YY");
					var period = 'Daily';
					
					break;

				case 'week':
					var dateString = moment(dateRange.startDate).format("DD") +' to '+ moment(dateRange.endDate).format("DD MMM 'YY");
					var period = 'Weekly';

					break;
				
				case 'month':
					var dateString = moment(dateRange.startDate).format("MMM 'YY");
					var period = 'Monthly';

					break;
			}

			dateRange['period'] = period;
			dateRange['dateString'] = dateString;

			var body = buildReportEmail(user, data, dateRange);

			console.log('SENDING EMAIL')

			//return; 

			try{
				Meteor.defer(function(){
					Email.send({
						to: email,
						from: 'info@opz.io',
						subject: '📈  '+ period + ' Report - Opz.io',
						html: body
					});
				
				});
				console.log('*** EMAIL: sent report to ' + email)
			}
			catch(err){
				console.log('*** ERR: error sending email report to ' + email)
			}
		},
})