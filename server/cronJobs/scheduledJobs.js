scheduledJobs = [
	//A Job that runs every hour and performs multiple tasks
	{
		name: 'USER EMAIL REPORTS',
		schedule: function(parser){
			return parser.recur().first().minute().first().second();
			//return parser.recur().every(30).second();
		},
		job: function(){
			var r = userEmailReports();
			return r;
		}
	},
	{
		name: 'PROJECT TOTALS',
		schedule: function(parser){
			return parser.recur().first().minute().first().second();
			//return parser.recur().every(1).minute();
		},
		job: function(){
			var r = projectTotalJob();
			return r;
		}
	},
	{
		name: 'USER METRIC CRUNCH',
		schedule: function(parser){
			//return parser.recur().on('00:00:00').time();
			return parser.recur().first().minute().first().second();
			//return parser.recur().every(150).second();
		},
		job: function(){
			var r = userStatsJob();
			return r;
		}
	},

	{
		name: 'USER MOVES',
		schedule: function(parser){
			//return parser.recur().on('00:00:00').time();
			//return parser.recur().first().minute().first().second();
			return parser.recur().every(15).minute();
			//return parser.recur().every(15).second();
		},
		job: function(){
			var r = userMovesJob();
			return r;
		}
	},

	{
		name: 'DAILY ACHIEVEMENTS CRUNCH',
		schedule: function(parser){
			//return parser.recur().on('00:00:00').time();
			return parser.recur().first().minute().first().second();
			//return parser.recur().every(15).second();
		},
		job: function(){
			var r = dailyAchievementsJob();
			return r;
		}
	},

	{
		name: 'USERS WORLD RANKING',
		schedule: function(parser){
			//return parser.recur().on('00:00:00').time();
			return parser.recur().first().minute().first().second();
			//return parser.recur().every(15).second();
		},
		job: function(){
			var r = userWorldRankingJob();
			return r;
		}
	},

	{
		name: 'USERS ORGANIZATION RANKING',
		schedule: function(parser){
			//return parser.recur().on('00:00:00').time();
			return parser.recur().first().minute().first().second();
			//return parser.recur().every(15).second();
		},
		job: function(){
			var r = userOrganizationRankingJob();
			return r;
		}
	},
];