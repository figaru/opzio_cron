Meteor.methods({
	/*
		A duplicate of the original function on opz_app (original still exists but not in use anymore)
		Decided to copy it here as it's unecessary to call opz_app and load it with this crunching.
	*/
	'users.getUserReport': function(params, range){
		if(typeof params.userId !== undefined){
			this.userId = params.userId;
		}

		//console.log('[AGGREGATION] getUserProjectActivity for ' + this.userId)

		//var startQuery = moment();
		var startDate = params.startDate;
		var endDate = params.endDate;
		var offset = params.offset;


		//Holds the stats for a given data type and period
		//(is constantly overriden with data or set as empty array from aggregations)
		var stats = [];

		var finalData = {
			'activities': {},
			'projects': {},
			'achievements': {},
		}

		switch(range){
			case 'day':
				/*****
					GET ACTIVITIES DATA
				*****/
				stats = UserLogs.aggregate([
					{
					    $match:{
					        user: this.userId,
					        createDate:{
					            $gte: new Date(startDate)
					        }
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
					        totalTime:{
					            $sum: '$totalTime'
					        },
					        
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
					    }
					},
					{
					    $sort:{
					        totalTime: -1
					    }
					},
					{
						$limit: 5
					}

				]);
				
				if(stats.length > 0) finalData['activities']['day'] = stats;

				/*****
					GET PROJECTS DATA
				*****/
				stats = UserLogs.aggregate([
					{
					    $match:{
					        user: this.userId,
					        createDate:{
					            $gte: new Date(startDate)
					        }
					    }
					},
					{
					    $group:{
					        _id: {
					            'project': '$project._id',
					            'day': {'$dayOfMonth': '$createDate' },
					            'month': {'$month': '$createDate' },
					            'year': {'$year': '$createDate' },
					        },
					        label:{
					        	$max: '$project.name'
					        },
					        totalTime:{
					            $sum: '$totalTime'
					        },
					        
					    }
					},
					{
					    $group:{
					        _id: '$_id.project',
					        label:{
					        	$max: '$label'
					        },
					        totalTime:{
					            $sum: '$totalTime'
					        },
					    }
					},
					{
					    $sort:{
					        totalTime: -1
					    }
					},
					{
						$limit: 6
					}

				]);
				
				if(stats.length > 0) finalData['projects']['day'] = stats;

				break;

			case 'week':
				/*****
					ACTIVITIES
				*****/
				stats = UserLogs.aggregate([
					{
					    $match:{
					        user: this.userId,
					        createDate:{
					            $gte: new Date(startDate)
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

				/*****
					PROJECTS
				*****/
				stats = UserLogs.aggregate([
					{
					    $match:{
					        user: this.userId,
					        createDate:{
					            $gte: new Date(startDate)
					        }
					    }
					},
					{
					    $group:{
					        _id: {
					            'project': '$project._id',
					            'day': {'$dayOfMonth': '$createDate' },
					            'month': {'$month': '$createDate' },
					            'year': {'$year': '$createDate' },
					        },
					        label:{
					        	$max: '$project.name'
					        },
					        totalTime:{
					            $sum: '$totalTime'
					        },
					        
					    }
					},
					{
					    $group:{
					        _id: '$_id.project',
					        label:{
					        	$max: '$label'
					        },
					        totalTime:{
					            $sum: '$totalTime'
					        },
					    }
					},
					{
					    $sort:{
					        totalTime: -1
					    }
					},
					{
						$limit: 6
					}

				]);
				
				if(stats.length > 0) finalData['projects']['week'] = stats;

				break;

			case 'month':
				/*****
					ACTIVITIES
				*****/
				stats = UserLogs.aggregate([
					{
					    $match:{
					        user: this.userId,
					        createDate:{
					            $gte: new Date(startDate)
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
					PROJECTS
				*****/
				stats = UserLogs.aggregate([
					{
					    $match:{
					        user: this.userId,
					        createDate:{
					            $gte: new Date(startDate)
					        }
					    }
					},
					{
					    $group:{
					        _id: {
					            'project': '$project._id',
					            'day': {'$dayOfMonth': '$createDate' },
					            'month': {'$month': '$createDate' },
					            'year': {'$year': '$createDate' },
					        },
					        label:{
					        	$max: '$project.name'
					        },
					        totalTime:{
					            $sum: '$totalTime'
					        },
					        
					    }
					},
					{
					    $group:{
					        _id: '$_id.project',
					        label:{
					        	$max: '$label'
					        },
					        totalTime:{
					            $sum: '$totalTime'
					        },
					    }
					},
					{
					    $sort:{
					        totalTime: -1
					    }
					},
					{
						$limit: 6
					}

				]);
				
				if(stats.length > 0) finalData['projects']['month'] = stats;

				break;

		}
		
		return finalData;
	},
})