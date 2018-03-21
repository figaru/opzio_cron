crunchSpecificActivityAchievements = function(userId){
	//console.log('crunch activity achievements');

	var data = UserLogs.aggregate([
		{
			$match:{
				user: userId,
				$and:[
					{
						category:{
							$nin: [null, undefined]
						}
					},
					{
						'category.category':{
							$nin: ['miscelaneous', 'other']
						}
					}
				]
			}
		},
		{
			$group:{
				_id: '$category.category',
				totalTime:{
					$sum: '$totalTime'
				}
			}
		}
	]);

	//console.log(data)

	for(var i=0; i<data.length;i++){
		var d = data[i];

		//console.log('for ' + d._id);

		//Get all goals for this language
		var goals = Goals.find({
			category: 'activity_type',
			//_id = the category
			activity: d._id,
			//Only get goals the user hasn't completed yet
			reachedBy: {
				$nin: [userId] 
			}
		}).fetch();

		//console.log('goal:')
		//console.log(goal)

		//Chech if there's are any goals for this language
		if(goals.length > 0){
			
			var time = d.totalTime;

			//Iterate every language goal

			//console.log('got ' + goals.length)

			
			for(var j=0; j<goals.length; j++){
				var goal = goals[j];
			
				// console.log('checking for ' + goal.level + ' ' + goal.activity);

				//Check if goal has been met
				if(time >= goal.value){
					//console.log('reached goal')
					
					if(hasProgress(goal.usersProgress, userId)){
						// console.log('update [completed]')
						Goals.update({
							_id: goal._id,
							'usersProgress.user': userId
						},
						{
							$addToSet:{
								reachedBy: userId
							},
							$set:{
								'usersProgress.$.progress': 100,
								'usersProgress.$.updateDate': new Date(),
							},
						});
					}
					else{
						// console.log('push [completed]')
						Goals.update({
							_id: goal._id,
						},
						{
							$addToSet:{
								reachedBy: userId
							},
							$push:{
								usersProgress:{
									user: userId,
									progress: 100,
									startDate: new Date(),
									updateDate: new Date()
								}
							}
						});
					}

					updateUserPoints(userId, goal.points);
				}
				else{
					var progress = Math.round(time / goal.value * 1000) / 10;

					if(hasProgress(goal.usersProgress, userId)){
						// console.log('update progress')
						Goals.update({
							_id: goal._id,
							'usersProgress.user': userId
						},
						{
							$set:{
								'usersProgress.$.progress': progress,
								'usersProgress.$.updateDate': new Date(),
							}
						});
					}
					else{
						// console.log('push progress')
						Goals.update({
							_id: goal._id,
						},
						{
							$push:{
								usersProgress:{
									user: userId,
									progress: progress,
									startDate: new Date(),
									updateDate: new Date(),
								}
							}
						});
					}
				}

			}
		}
		else{
			//console.log(' no goals for language ' + d._id)
		}

	}

	//Finished
	
}