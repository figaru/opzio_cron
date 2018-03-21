/*
	A job that runs every hour and performs multiple tasks
*/
userEmailReports = function(){
	console.log('*** CRN: RUNNNING EMAIL REPORTS @' + moment().toDate());

	//Check wether or not we should send the daily report to every active user
	var users = Meteor.users.find({ active: true }).fetch();

	for(var i=0; i<users.length; i++){
		//Uncomment and wrap below lines to test specific user
		// if(users[i]._id === 'user_id'){
		// }
		Meteor.call('cron.userReports', users[i]);
	}

	return userEmailReports;
}

projectTotalJob = function(){
	console.log('*** CRN: RUNNNING PROJECT TOTAL @' + moment().toDate());

	var projects = Projects.find({ active: true }).fetch()

	for(var i=0; i<projects.length; i++){
		Meteor.call('projects.crunchTotalTime', projects[i]._id);
	}


	return projectTotalJob;
}

userStatsJob = function(){
	console.log('*** CRN: RUNNNING USER STATS @' + moment().toDate());

	var users = Meteor.users.find({ active: true }).fetch()

	for(var i=0; i<users.length; i++){
		Meteor.call('cron.crunchUserStats', users[i]);
	}


	return userStatsJob;
}

userMovesJob = function(){
	console.log('*** CRN: RUNNNING USER MOVES @' + moment().toDate());

	//Only for users that have the moves integration
	var users = Meteor.users.find({
		active: true,
		trackers:{
			$elemMatch:{
				tracker: 'moves'
			}
		}
	}).fetch();

	for(var i=0; i<users.length; i++){
		Meteor.call('moves.getCurrentDay', users[i]);
	}


	return userMovesJob;
}

dailyAchievementsJob = function(){
	console.log('*** CRN: RUNNNING USER ACHIEVEMENTS @' + moment().toDate());

	var users = Meteor.users.find({ active: true }).fetch()


	for(var i=0; i<users.length; i++){
		Meteor.call('cron.crunchUserDailyAchievements', users[i]._id);
	}


	return dailyAchievementsJob;
}

userWorldRankingJob = function(){
	console.log('*** CRN: RUNNNING USER WORLD RANKINGS @' + moment().toDate());

	var users = Meteor.users.find({
		active: true,
		//Ignore root user
		roles:{ $nin: ['root'] },
		'profile.points':{
			$gt: 0
		}
	},
	{
		sort:{
			'profile.points': -1
		}
	}).fetch();


	for(var i=0; i<users.length; i++){

		//Update user profile
		Meteor.users.update({
			_id: users[i]._id
		},
		{
			$set:{
				'profile.worldRanking': i+1
			}
		});

		//Update daily stats
		UsersStats.upsert({
			user: users[i]._id,
			organization: users[i].profile.organization,
			createDate:{
				$gte: moment().startOf('day').toDate()
			}
		},{
			$set:{
				worldRanking: i+1,
				updateDate: moment().toDate()
			},
			$setOnInsert:{
				createBy: 'rankingCronJob',
				createDate: moment().toDate()
			}
		});
	}


	return userWorldRankingJob;
}

userOrganizationRankingJob = function(){

	console.log('*** CRN: RUNNNING USER ORGANIZATION RANKINGS @' + moment().toDate());

	var organizations = Organizations.find({
		active: true,
		'plan.usingOrganization': true
	}).fetch();

	//Iterate every organization
	for(var i=0; i<organizations.length; i++){
		//Iterate users of that organization

		var users = Meteor.users.find({
			active: true,
			//Ignore root user
			roles:{ $nin: ['root'] },
			'profile.organization': organizations[i]._id,
			'profile.points':{
				$gt: 0
			}
		},
		{
			sort:{
				'profile.points': -1
			}
		}).fetch();

		for(var j=0; j<users.length; j++){
			//Update user profile
			Meteor.users.update({
				_id: users[j]._id
			},
			{
				$set:{
					'profile.teamRanking': j+1
				}
			});

			//Update daily stats
			UsersStats.upsert({
				user: users[j]._id,
				organization: organizations[i]._id,
				createDate:{
					$gte: moment().startOf('day').toDate()
				}
			},{
				$set:{
					teamRanking: j+1,
					updateDate: moment().toDate()
				},
				$setOnInsert:{
					createDate:{
						$gte: moment().startOf('day').toDate()
					},
					createBy: 'rankingCronJob',
				}
			});
		}

	}

	return userOrganizationRankingJob;
}