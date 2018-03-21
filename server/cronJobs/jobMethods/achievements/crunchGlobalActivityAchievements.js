crunchGlobalActivityAchievements = function(goal, userId){
	//console.log('crunch activity achievements');
	//console.log(goal.query)

	// console.log(goal.goalMatch)

	// console.log(goal.value)

	//console.log(goal.recurrence)

	// console.log(goal.reachedBy)
	// console.log(goal.usersProgress)

	switch(goal.recurrence){

		//Goals that are calculated daily
		case 'daily':
			
			switch(goal.query){
				case 'dailyHourActivity_one':
				case 'dailyHourActivity_five':
				case 'dailyHourActivity_eight':

					//var today = moment().subtract(1, 'days').startOf('day').toDate();
					var today = moment().startOf('day').toDate();

					//Get user to see if this goal has ever been calculated
					var user = findInArray('user', userId, goal.usersProgress);
					
					if(typeof user !== 'undefined'){

						//Check if goal has been reached for current day
						//When a goal is reached, the update date is set as the 
						//same against the one we're crunching data						
						if(moment(today).isSame(user.updateDate, 'day') && goal.reachedBy.indexOf(userId) >= 0){
							var compareGoal = false;
						}
						else{
							var compareGoal = true;
						}

					}
					//Goals has never been calculated, push user to
					else{
						var compareGoal = true;
						
					}
					
					//Calculate if goal hasn't been reached for today yet
					if(compareGoal){
						var data = UserLogs.aggregate([
							{
								$match:{
									user: userId,
									createDate:{
										$gte: today
									}
								}
							},
							{
								$group:{
									_id: '$user',
									totalTime:{
										$sum: '$totalTime'
									}
								}
							}
						]);
						if(data.length > 0){
							var time = data[0].totalTime;

							if(time >= goal.value){
								
								if(hasProgress(goal.usersProgress, userId)){
									
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
											//Set date as today, so then comparions is true and goal isn't recalculated
											'usersProgress.$.updateDate': today,
										},
										$inc:{
											'usersProgress.$.count': 1,
										}
									});
								}
								else{
									
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
												count: 1,
												startDate: today,
												updateDate: moment().startOf('day').add(1, 'minutes').toDate()
											}
										}
									});
								}

								updateUserPoints(userId, goal.points);
							}
							else{

								var progress = Math.round(time / goal.value * 1000) / 10;

								if(hasProgress(goal.usersProgress, userId)){
									Goals.update({
										_id: goal._id,
										'usersProgress.user': userId
									},
									{
										$pull:{
											reachedBy: userId
										},
										$set:{
											'usersProgress.$.progress': progress,
										}
									});
								}
								else{
									Goals.update({
										_id: goal._id,
									},
									{
										$pull:{
											reachedBy: userId
										},
										$push:{
											usersProgress:{
												user: userId,
												progress: progress,
												count: 0,
												startDate: today,
												updateDate: moment().startOf('day').add(1, 'minutes').toDate()
											}
										}
									});
								}
							}
						}
						else{
							if(hasProgress(goal.usersProgress, userId)){
								Goals.update({
									_id: goal._id,
									'usersProgress.user': userId
								},
								{
									$pull:{
										reachedBy: userId
									},
									$set:{
										'usersProgress.$.progress': 0,
									}
								});
							}
							else{
								Goals.update({
									_id: goal._id,
								},
								{
									$pull:{
										reachedBy: userId
									},
									$push:{
										usersProgress:{
											user: userId,
											progress: 0,
											startDate: today,
											count: 0,
											updateDate: moment().startOf('day').add(1, 'minutes').toDate()
										}
									}
								});
							}
						}
					}


					break;

				case 'dailyHourActivity_five':
					break;

				case 'dailyHourActivity_eight':
					break;
			}

			break;

		case 'weekly':
			break;
		
		case 'once':
			
			//Crunch data depending on query
			switch(goal.query){
				//***
				//Global activities
				//***

				//Check if user installed a plugin
				case 'installedPlugin':
					var trackers = Meteor.users.findOne({_id: userId}).trackers;

					if(typeof trackers !== 'undefined'){
						if(trackers.length > 0){
							if(hasProgress(goal.usersProgress, userId)){
								Goals.update({
									_id: goal._id,
									'usersProgress.user': userId
								},
								{
									$addToSet:{
										reachedBy: userId
									},
									$set:{
										'usersProgress.$.updateDate': new Date(),
									}
								});
							}
							else{
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
							//Update user progress
							if(hasProgress(goal.usersProgress, userId)){
								Goals.update({
									_id: goal._id,
									'usersProgress.user': userId
								},
								{
									$set:{
										'usersProgress.$.updateDate': new Date(),
									}
								});
							}
							else{
								Goals.update({
									_id: goal._id,
								},
								{
									$push:{
										usersProgress:{
											user: userId,
											progress: 0,
											startDate: new Date(),
											updateDate: new Date()
										}
									}
								});
							}	
						}
					}


					break;

				//Check if user has contributed at least one hour since ever
				case 'firstHour':
					var data = UserLogs.aggregate([
						{
							$match:{
								user: userId
							}
						},
						{
							$group:{
								_id: '$user',
								totalTime:{
									$sum: '$totalTime'
								}
							}
						}
					]);


					if(data.length > 0){
						var time = data[0].totalTime;

						if(time >= goal.value){
							
							if(hasProgress(goal.usersProgress, userId)){
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
									}
								});
							}
							else{
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

						//Simply update user progress
						else{
							// console.log(time)
							// console.log(goal.value)
							var progress = Math.round(time / goal.value * 1000) / 10;
							
							//Update user progress
							if(hasProgress(goal.usersProgress, userId)){
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
								Goals.update({
									_id: goal._id,
								},
								{
									$push:{
										usersProgress:{
											user: userId,
											progress: progress,
											startDate: new Date(),
											updateDate: new Date()
										}
									}
								});
							}

						}




					}
					break;

				case 'nightActivity':
					break;

				case 'stayFocused':
					break;

				case 'weekendActivity':
					break;

				case 'normalWorkActivity':
					break;

				case 'superWorkActivity':
					break;

				case 'hyperWorkActivity':
					break;
			}
			break;
	}
}