/*
	userReports
	
	Runs every day at 00:00 and crunches the user's metric for the past 7 days and past 30 days
*/

Meteor.methods({
	'cron.crunchUserStats': function(user){
		Meteor.defer(function(){


			var userId = user._id;

			//Holds the stats for a given data type and period
			//(is constantly overriden with data or set as empty array from aggregations)
			var stats = [];

			var finalData = {
				'browsing': {},
				'activities': {},
				'exercise': {}
			}

			
			var dayStart = moment().subtract(24, 'hour').startOf().toDate();
			var dayEnd = moment().toDate();
			var weekStart = moment().subtract(7, 'days').startOf('day').toDate();
			var monthStart = moment().subtract(30, 'days').startOf('day').toDate();

			//var startDate = moment().subtract(1, 'hour').toDate()
			/*****
				GET BROWSING DATA
			*****/
			//Past 24h
			stats = UserLogs.aggregate([
				{
				    $match:{
				        user: userId,
				        type: 'browser',
				        createDate:{
				            $gte: dayStart
				        }
				    }
				},
				{
				    $project:{
				        _id: '$_id',
				        user: '$user',
				        createDate: '$createDate',
				        totalTime: '$totalTime',
				        domain: '$domain',
				        publicTime:{
				            $cond: {
				                if: { $eq: ['$private', false] },
				                then: '$totalTime',
				                else: 0,
				            }
				        },
				        privateTime:{
				            $cond: {
				                if: { $eq: ['$private', true] },
				                then: '$totalTime',
				                else: 0,
				            }
				        },
				    }
				},
				{
				    $group:{
				        _id: {
				            domain: '$domain',
				            'day': {'$dayOfMonth': '$createDate' },
				            'month': {'$month': '$createDate' },
				            'year': {'$year': '$createDate' },
				        },
				        totalAccess:{
				        	$sum: 1
				        },
				        totalTime:{
				            $sum: '$totalTime'
				        },
				        publicTime:{
				            $sum: '$publicTime'
				        },
				        privateTime:{
				            $sum: '$privateTime'
				        }
				        
				    }
				},
				{
				    $group:{
				        _id: '$_id.domain',
				        totalTime:{
				            $sum: '$totalTime'
				        },
				        totalAvg:{
				            $avg: '$totalTime'
				        },
				        
				        publicTime:{
				            $sum: '$publicTime'
				        },
				        publicAvg:{
				            $avg: '$publicTime'
				        },

				        privateTime:{
				            $sum: '$privateTime'
				        },
				        privateAvg:{
				            $avg: '$privateTime'
				        },

				        totalAccess:{
				        	$sum: '$totalAccess'
				        }
				    }
				},
				{
				    $sort:{
				        publicTime: -1
				    }
				},
				{
					$limit: 5
				}

			]);

			if(stats.length > 0) finalData['browsing']['day'] = stats;

			//Past 7 days
			stats = UserLogs.aggregate([
				{
				    $match:{
				        user: userId,
				        type: 'browser',
				        createDate:{
				            $gte: weekStart
				        }
				    }
				},
				{
				    $project:{
				        _id: '$_id',
				        user: '$user',
				        createDate: '$createDate',
				        totalTime: '$totalTime',
				        domain: '$domain',
				        publicTime:{
				            $cond: {
				                if: { $eq: ['$private', false] },
				                then: '$totalTime',
				                else: 0,
				            }
				        },
				        privateTime:{
				            $cond: {
				                if: { $eq: ['$private', true] },
				                then: '$totalTime',
				                else: 0,
				            }
				        },
				    }
				},
				{
				    $group:{
				        _id: {
				            domain: '$domain',
				            'day': {'$dayOfMonth': '$createDate' },
				            'month': {'$month': '$createDate' },
				            'year': {'$year': '$createDate' },
				        },
				        totalAccess:{
				        	$sum: 1
				        },
				        totalTime:{
				            $sum: '$totalTime'
				        },
				        publicTime:{
				            $sum: '$publicTime'
				        },
				        privateTime:{
				            $sum: '$privateTime'
				        }
				        
				    }
				},
				{
				    $group:{
				        _id: '$_id.domain',
				        totalTime:{
				            $sum: '$totalTime'
				        },
				        totalAvg:{
				            $avg: '$totalTime'
				        },
				        
				        publicTime:{
				            $sum: '$publicTime'
				        },
				        publicAvg:{
				            $avg: '$publicTime'
				        },

				        privateTime:{
				            $sum: '$privateTime'
				        },
				        privateAvg:{
				            $avg: '$privateTime'
				        },

				        totalAccess:{
				        	$sum: '$totalAccess'
				        }
				    }
				},
				{
				    $sort:{
				        publicTime: -1
				    }
				},
				{
					$limit: 5
				}

			]);

			if(stats.length > 0) finalData['browsing']['week'] = stats;


			//Past 30 days
			stats = UserLogs.aggregate([
				{
				    $match:{
				        user: userId,
				        type: 'browser',
				        createDate:{
				            $gte: monthStart
				        }
				    }
				},
				{
				    $project:{
				        _id: '$_id',
				        user: '$user',
				        createDate: '$createDate',
				        totalTime: '$totalTime',
				        domain: '$domain',
				        publicTime:{
				            $cond: {
				                if: { $eq: ['$private', false] },
				                then: '$totalTime',
				                else: 0,
				            }
				        },
				        privateTime:{
				            $cond: {
				                if: { $eq: ['$private', true] },
				                then: '$totalTime',
				                else: 0,
				            }
				        },
				    }
				},
				{
				    $group:{
				        _id: {
				            domain: '$domain',
				            'day': {'$dayOfMonth': '$createDate' },
				            'month': {'$month': '$createDate' },
				            'year': {'$year': '$createDate' },
				        },
				        totalAccess:{
				        	$sum: 1
				        },
				        totalTime:{
				            $sum: '$totalTime'
				        },
				        publicTime:{
				            $sum: '$publicTime'
				        },
				        privateTime:{
				            $sum: '$privateTime'
				        }
				        
				    }
				},
				{
				    $group:{
				        _id: '$_id.domain',
				        totalTime:{
				            $sum: '$totalTime'
				        },
				        totalAvg:{
				            $avg: '$totalTime'
				        },
				        
				        publicTime:{
				            $sum: '$publicTime'
				        },
				        publicAvg:{
				            $avg: '$publicTime'
				        },

				        privateTime:{
				            $sum: '$privateTime'
				        },
				        privateAvg:{
				            $avg: '$privateTime'
				        },

				        totalAccess:{
				        	$sum: '$totalAccess'
				        }
				    }
				},
				{
				    $sort:{
				        publicTime: -1
				    }
				},
				{
					$limit: 5
				}

			]);

			if(stats.length > 0) finalData['browsing']['month'] = stats;



			/*****
				GET ACTIVITIES DATA
			*****/
			//Past 24h
			stats = UserLogs.aggregate([
				{
				    $match:{
				        user: userId,
				        createDate:{
				            $gte: dayStart
				        }
				    }
				},
				{
				    $project:{
				        _id: '$_id',
				        user: '$user',
				        totalTime: '$totalTime',
				        domain: '$domain',
				        createDate: '$createDate',
				        category: '$category',
				        publicTime:{
				            $cond: {
				                if: { $eq: ['$private', false] },
				                then: '$totalTime',
				                else: 0,
				            }
				        },
				        privateTime:{
				            $cond: {
				                if: { $eq: ['$private', true] },
				                then: '$totalTime',
				                else: 0,
				            }
				        },
				    }
				},
				{
				    $group:{
				        _id: {
				            'category': '$category._id',
				            'day': {'$dayOfMonth': '$createDate' },
				            'month': {'$month': '$createDate' },
				            'year': {'$year': '$createDate' },
				        },
				        label:{
				        	$max: '$category.label'
				        },
				        totalAccess:{
				        	$sum: 1
				        },
				        totalTime:{
				            $sum: '$totalTime'
				        },
				        publicTime:{
				            $sum: '$publicTime'
				        },
				        privateTime:{
				            $sum: '$privateTime'
				        }
				        
				    }
				},
				{
				    $group:{
				        _id: '$_id.category',
				        label:{
				        	$max: '$label'
				        },
				        totalTime:{
				            $sum: '$totalTime'
				        },
				        totalAvg:{
				            $avg: '$totalTime'
				        },
				        
				        publicTime:{
				            $sum: '$publicTime'
				        },
				        publicAvg:{
				            $avg: '$publicTime'
				        },

				        privateTime:{
				            $sum: '$privateTime'
				        },
				        privateAvg:{
				            $avg: '$privateTime'
				        },

				        totalAccess:{
				        	$sum: '$totalAccess'
				        }
				    }
				},
				{
				    $sort:{
				        publicTime: -1
				    }
				},
				{
					$limit: 5
				}

			]);
		
			if(stats.length > 0) finalData['activities']['day'] = stats;

			
			//Past 7 days
			stats = UserLogs.aggregate([
				{
				    $match:{
				        user: userId,
				        createDate:{
				            $gte: weekStart
				        }
				    }
				},
				{
				    $project:{
				        _id: '$_id',
				        user: '$user',
				        totalTime: '$totalTime',
				        domain: '$domain',
				        createDate: '$createDate',
				        category: '$category',
				        publicTime:{
				            $cond: {
				                if: { $eq: ['$private', false] },
				                then: '$totalTime',
				                else: 0,
				            }
				        },
				        privateTime:{
				            $cond: {
				                if: { $eq: ['$private', true] },
				                then: '$totalTime',
				                else: 0,
				            }
				        },
				    }
				},
				{
				    $group:{
				        _id: {
				            'category': '$category._id',
				            'day': {'$dayOfMonth': '$createDate' },
				            'month': {'$month': '$createDate' },
				            'year': {'$year': '$createDate' },
				        },
				        label:{
				        	$max: '$category.label'
				        },
				        totalAccess:{
				        	$sum: 1
				        },
				        totalTime:{
				            $sum: '$totalTime'
				        },
				        publicTime:{
				            $sum: '$publicTime'
				        },
				        privateTime:{
				            $sum: '$privateTime'
				        }
				        
				    }
				},
				{
				    $group:{
				        _id: '$_id.category',
				        label:{
				        	$max: '$label'
				        },
				        totalTime:{
				            $sum: '$totalTime'
				        },
				        totalAvg:{
				            $avg: '$totalTime'
				        },
				        
				        publicTime:{
				            $sum: '$publicTime'
				        },
				        publicAvg:{
				            $avg: '$publicTime'
				        },

				        privateTime:{
				            $sum: '$privateTime'
				        },
				        privateAvg:{
				            $avg: '$privateTime'
				        },

				        totalAccess:{
				        	$sum: '$totalAccess'
				        }
				    }
				},
				{
				    $sort:{
				        publicTime: -1
				    }
				},
				{
					$limit: 5
				}

			]);

			if(stats.length > 0) finalData['activities']['week'] = stats;


			//Past 30 days
			stats = UserLogs.aggregate([
				{
				    $match:{
				        user: userId,
				        createDate:{
				            $gte: monthStart
				        }
				    }
				},
				{
				    $project:{
				        _id: '$_id',
				        user: '$user',
				        totalTime: '$totalTime',
				        domain: '$domain',
				        createDate: '$createDate',
				        category: '$category',
				        publicTime:{
				            $cond: {
				                if: { $eq: ['$private', false] },
				                then: '$totalTime',
				                else: 0,
				            }
				        },
				        privateTime:{
				            $cond: {
				                if: { $eq: ['$private', true] },
				                then: '$totalTime',
				                else: 0,
				            }
				        },
				    }
				},
				{
				    $group:{
				        _id: {
				            'category': '$category._id',
				            'day': {'$dayOfMonth': '$createDate' },
				            'month': {'$month': '$createDate' },
				            'year': {'$year': '$createDate' },
				        },
				        label:{
				        	$max: '$category.label'
				        },
				        totalAccess:{
				        	$sum: 1
				        },
				        totalTime:{
				            $sum: '$totalTime'
				        },
				        publicTime:{
				            $sum: '$publicTime'
				        },
				        privateTime:{
				            $sum: '$privateTime'
				        }
				        
				    }
				},
				{
				    $group:{
				        _id: '$_id.category',
				        label:{
				        	$max: '$label'
				        },
				        totalTime:{
				            $sum: '$totalTime'
				        },
				        totalAvg:{
				            $avg: '$totalTime'
				        },
				        
				        publicTime:{
				            $sum: '$publicTime'
				        },
				        publicAvg:{
				            $avg: '$publicTime'
				        },

				        privateTime:{
				            $sum: '$privateTime'
				        },
				        privateAvg:{
				            $avg: '$privateTime'
				        },

				        totalAccess:{
				        	$sum: '$totalAccess'
				        }
				    }
				},
				{
				    $sort:{
				        publicTime: -1
				    }
				},
				{
					$limit: 5
				}

			]);
			
			if(stats.length > 0) finalData['activities']['month'] = stats;

			/*****
				GET EXERCISE/TRANSPORT DATA
			*****/
			//Past 24h
			stats = UsersStats.aggregate([
				{
				    $match:{
				        user: userId,
				        updateDate:{
				            $gte: dayStart,
				            $lte: dayEnd
				        }
				    }
				},
				{
					$unwind: '$exercise.day'
				},
				{
				    $group:{
				        _id: {
				            'activity': '$exercise.day.activity',
				            'group': '$exercise.day.group',
				            'day': {'$dayOfMonth': '$createDate' },
				            'month': {'$month': '$createDate' },
				            'year': {'$year': '$createDate' },
				        },
				        duration:{
				        	$sum: '$exercise.day.duration'
				        },
				        distance:{
				            $sum: '$exercise.day.distance'
				        },
				        steps:{
				            $sum: '$exercise.day.steps'
				        },
				        
				    }
				},
				{
				    $sort:{
				        totalDistance: -1
				    }
				},
				{
					$project:{
						_id: 0,
						"activity" : "$_id.activity",
						"group" : "$_id.group",
		                "duration" : '$duration',
		                "distance" : '$distance',
		                "steps" : '$steps'
					}
				},
				{
					$limit: 5
				}

			]);
			if(stats.length > 0) finalData['exercise']['day'] = stats;
			
			//Past 7 days
			stats = UsersStats.aggregate([
				{
				    $match:{
				        user: userId,
				        updateDate:{
				            $gte: weekStart,
				            $lte: dayEnd
				        }
				    }
				},
				{
					$unwind: '$exercise.day'
				},
				{
				    $group:{
				        _id: {
				            'activity': '$exercise.day.activity',
				            'day': {'$dayOfMonth': '$createDate' },
				            'month': {'$month': '$createDate' },
				            'year': {'$year': '$createDate' },
				        },
				        activity:{
				        	$max: '$exercise.day.activity'
				        },
				        duration:{
				        	$sum: '$exercise.day.duration'
				        },
				        distance:{
				            $sum: '$exercise.day.distance'
				        },
				        steps:{
				            $sum: '$exercise.day.steps'
				        },
				        
				    }
				},
				{
				    $group:{
				        _id: '$_id.activity',
				        activity: {
				        	$max: '$activity'
				        },
				        label:{
				        	$max: '$activity'
				        },
				        totalTime:{
				            $sum: '$duration'
				        },
				        timeAvg:{
				            $avg: '$duration'
				        },
				        totalDistance:{
				            $sum: '$distance'
				        },
				        distanceAvg:{
				            $avg: '$distance'
				        },
				        totalSteps:{
				            $sum: '$steps'
				        },
				        stepsAvg:{
				            $avg: '$steps'
				        },
				    }
				},
				{
				    $sort:{
				        totalDistance: -1
				    }
				},
				{
					$limit: 5
				}

			]);
			if(stats.length > 0) finalData['exercise']['week'] = stats;

			//Past 30 days
			stats = UsersStats.aggregate([
				{
				    $match:{
				        user: userId,
				        createDate:{
				            $gte: monthStart
				        }
				    }
				},
				{
					$unwind: '$exercise.day'
				},
				{
				    $group:{
				        _id: {
				            'activity': '$exercise.day.activity',
				            'day': {'$dayOfMonth': '$createDate' },
				            'month': {'$month': '$createDate' },
				            'year': {'$year': '$createDate' },
				        },
				        activity:{
				        	$max: '$exercise.day.activity'
				        },
				        duration:{
				        	$sum: '$exercise.day.duration'
				        },
				        distance:{
				            $sum: '$exercise.day.distance'
				        },
				        steps:{
				            $sum: '$exercise.day.steps'
				        },
				        
				    }
				},
				{
				    $group:{
				        _id: '$_id.activity',
				        activity: {
				        	$max: '$activity'
				        },
				        label:{
				        	$max: '$activity'
				        },
				        totalTime:{
				            $sum: '$duration'
				        },
				        timeAvg:{
				            $avg: '$duration'
				        },
				        totalDistance:{
				            $sum: '$distance'
				        },
				        distanceAvg:{
				            $avg: '$distance'
				        },
				        totalSteps:{
				            $sum: '$steps'
				        },
				        stepsAvg:{
				            $avg: '$steps'
				        },
				    }
				},
				{
				    $sort:{
				        totalDistance: -1
				    }
				},
				{
					$limit: 5
				}

			]);
			if(stats.length > 0) finalData['exercise']['month'] = stats;


			UsersStats.upsert({
				user: userId,
				organization: user.profile.organization,
				updateDate:{
					$gte: moment().startOf('day').toDate()
				}
			},
			{
				$set:{
					updateDate: new Date(),
					browsing: finalData['browsing'],
					activities: finalData['activities'],
					'exercise.week': finalData['exercise']['week'],
					'exercise.month': finalData['exercise']['month'],
				},
				$setOnInsert: {
					user: userId,
					createBy: 'statsCron',
					organization: user.profile.organization,
					createDate: new Date(),
				}
			});
		
		});
	}
})
/*
//Have daily metrics
-> Total Time
-> Total Public Time
-> Total Private Time
-> Most visisted domain
-> Most used app
-> Most used file
-> Top 5 activities performed

//Have last 7 days metrics

//Have last 30 days metrics

*/