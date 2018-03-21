Meteor.methods({
	'cron.crunchUserDailyAchievements': function(userId){
		Meteor.defer(function(){
			check(userId, String);		
			//console.log('in crunchUserDailyAchievements for ' + userId)

			//***
			//	CRUNCH GLOBAL ACTIVITIES ACHIEVEMENTS
			//***
			var goals = Goals.find({
				entity: 'system',
				active: true,
				category: 'activity',
				$or:[
					{
						reachedBy: {
							$nin: [userId] 
						}
					},
					{
						$and:[
							{
								reachedBy: {
									$in: [userId] 
								} 
							},
							{
								recurrence : {
									$ne: 'once'
								}
							},
						]
					}
				]	
			}).fetch();

			//console.log('going through '+ goals.length +' activity goals')
			
			//Iterate every activity achievements to crunch data according to goal
			for(var i=0; i<goals.length; i++){
				crunchGlobalActivityAchievements(goals[i], userId);
			}

			//	Development & global activities work a bif differently (because we have multiple related achievements)
			//	We dont get dev goals, we first aggregate logs by the user's languages and then 
			//	check goals depending on which ones exists (there can be none)

			//***
			//	CRUNCH SPECIFIC ACTIVITIES ACHIEVEMENTS
			//***

			crunchSpecificActivityAchievements(userId);

			//***
			//	CRUNCH DEVELOPMENT ACHIEVEMENTS
			//***

			crunchDevelopmentAchievements(userId);
		})
	},
})