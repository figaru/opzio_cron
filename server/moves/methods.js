Meteor.methods({
	//Updates the activities captured by Moves for the given user
	//and updates the user's activities collections to be crunched
	'moves.getCurrentDay': function(userObj){
		Meteor.defer(function(){

			var organization = userObj.profile.organization;
			var trackerSetting = userObj.trackers.filter(function( obj ) { return obj.tracker === 'moves'; })[0];
			var day = moment().utc().startOf('day').format('YYYYMMDD')

			const response = HTTP.call('GET',
				'https://api.moves-app.com/api/1.1/user/activities/daily/'+day+'?access_token=' + trackerSetting.access_token,
			)

			if(response.statusCode === 200){
				if(response.data[0].summary !== null){
					if(response.data[0].summary.length > 0){
						
						var summary = response.data[0].summary;

						UsersStats.upsert({
							user: userObj._id,
							organization: userObj.profile.organization,
							createDate:{
								$gte: moment(response.data[0].date, 'YYYYMMD').startOf('day').toDate(),
								$lt: moment(response.data[0].date, 'YYYYMMD').endOf('day').toDate()
							},
						},
						{
							$set:{
								updateDate: moment(response.data[0].date, 'YYYYMMD').toDate(),
								'exercise.day': summary
							},
							$setOnInsert: {
								createBy: 'moves',
								user: userObj._id,
								organization: organization,
								createDate: moment(response.data[0].date, 'YYYYMMD').startOf('day').toDate(),
							}
						});
					}
				}
			}
			
		})
	},
});