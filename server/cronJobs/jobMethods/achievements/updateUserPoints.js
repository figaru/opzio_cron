updateUserPoints = function(userId, points){
	Meteor.users.update({
		_id: userId,
	},
	{
		$inc:{
			'profile.points': points
		}
	})
};