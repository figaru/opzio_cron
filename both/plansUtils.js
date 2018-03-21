isFreePlan = function(user){
	if(typeof user !== 'undefined'){
		var organization = Organizations.findOne({});
		
		if(typeof organization !== 'undefined'){
			if(organization.plan.type === 'free_plan'){
				return true;
			}

			return false;
		}
		else{
			return false;
		}
	}
	else{
		if(typeof Meteor.user() !== 'undefined'){
			var organization = Organizations.findOne({});
			
			if(typeof organization !== 'undefined'){
				if(organization.plan.type === 'free_plan'){
					return true;
				}

				return false;
			}
			else{
				return false;
			}
		}
	}
};

usingOrganization = function(){
	var organization = Organizations.findOne();
	if(typeof organization !== 'undefined') return organization.plan.usingOrganization; 
}

isBillingResponsible = function(userId){
	if(typeof userId === 'undefined'){
		var organization = Organizations.findOne();
		if(typeof organization !== 'undefined'){
			if(organization.billTo === Meteor.userId()) return true;
			return false;
		} 	
	}
	else{
		var organization = Organizations.findOne();
		if(typeof organization !== 'undefined'){
			if(organization.billTo === userId) return true;
			return false;
		}
	}
}

getProjectsQuota = function(){
	var usedProjects = Projects.find({
		type:{
			$nin: ['personal', 'unknown']
		},
		active: true
	}).fetch().length;


	var organization = Organizations.findOne();
	if(typeof organization !== 'undefined') return usedProjects + '/' + Organizations.findOne().plan.maxProjects;
}

getUsersQuota = function(){
	var users = Meteor.users.find({
		'active': true,
		'profile.organization': Meteor.user().profile.organization
	}).fetch().length;

	var organization = Organizations.findOne();
	if(typeof organization !== 'undefined') return users + '/' + Organizations.findOne().plan.maxUsers; 
}

getMaxHistory = function(planType){
	if(typeof planType === 'undefined'){
		
		var organization = Organizations.findOne();
		if(typeof organization === 'undefined') return;

		var plan = organization.plan;

		switch(plan.type){
			case 'free_plan':
				return plan.maxHistory + ' days';
				break;

			case 'basic_plan':
				var a = moment().dayOfYear(365)
				return (a.month()+1) + ' months';
				break;

			case 'pro_plan':
				return 'Unlimited';
				break;
		}
	}
	else{
		switch(planType.plan_id){
			case 'free_plan':
				return planType.metadata.maxHistory + ' days';
				break;

			case 'basic_plan':
				var a = moment().dayOfYear(365)
				return (a.month()+1) + ' months';
				break;

			case 'pro_plan':
				return 'Unlimited';
				break;
		}
	}
}

maxHistory = function(){
	return moment().subtract(7, 'days').startOf('day');
}

reachedMaxHistory = function(date){
	//Date must be moment object
	if(date.isSameOrBefore(maxHistory(), 'day')) return true;

	return false;
}

reachedMaxUsers = function(){
	var users = Meteor.users.find({
		active: true,
		'profile.organization': Meteor.user().profile.organization
	}).fetch().length;

	var organization = Organizations.findOne();
	
	if(typeof organization !== 'undefined') 
		if(users >= organization.plan.maxUsers) return true;
		return false;
}

reachedMaxProjects = function(){
	var usedProjects = Projects.find({
		active: true,
		type:{
			$nin: ['personal', 'unknown']
		},
	}).fetch().length;


	var organization = Organizations.findOne();
	if(typeof organization !== 'undefined'){
		if(usedProjects >= organization.plan.maxProjects){
			return true;
		}
	}
	
	return false;
}

hasInstalledPlugins = function(){
	if(typeof Meteor.user() !== 'undefined'){
		if(Meteor.user().profile.hasTracker){
			return true
		}
		return false;
	}
	return false;
}

//Check if user is last admin
isLastAdmin = function(userId){
	var isLastAdmin = true;
	
	var organization = Organizations.findOne();
	
	if(typeof organization !== 'undefined'){
		var remainingUsers = Meteor.users.find({
			_id: {$ne: Meteor.userId() },
			active: true,
			'profile.organization': organization._id
		}).fetch();

		for(var i=0; i<remainingUsers.length; i++){
			if(isAdmin(remainingUsers[i]._id)){
				isLastAdmin = false;
				break;
			}
		}

	}
	return isLastAdmin;
}

//Check if user is last active account
isLastActiveAccount = function(userId){
	var isLastAccount = true;
	
	var organization = Organizations.findOne();
	
	if(typeof organization !== 'undefined'){
		var remainingUsers = Meteor.users.find({
			_id: {$ne: Meteor.userId() },
			active: true,
			'profile.organization': organization._id
		}).fetch();

		if(remainingUsers.length > 0) isLastAccount = false;

	}
	
	return isLastAccount;
}

//Check if user is only organization admin
isSoleOrgAdmin = function(userId){
	var isLastAdmin = false;
	
	var organization = Organizations.findOne();
	
	if(typeof organization !== 'undefined'){
		if(organization.admin.indexOf(userId) >= 0 && organization.admin.length === 1){
			isLastAdmin = true;
		}

	}
	return isLastAdmin;
}



//Not in use for now
hasCompletedMainIntro = function(){
	if(typeof Meteor.user() !== 'undefined'){
		var user = Meteor.user();

		if(user.mainIntro.installPlugins && user.mainIntro.createProjects){
			
			var organization = Organizations.findOne();
			
			if(typeof organization !== 'undefined'){
				if(organization.plan.type === 'single'){
					//If is single user, we don't care about inviting other users, therefore set completed as true
					Meteor.call('users.completedMainIntro', function(err, data){
						if(!err){
							Session.set('completedMainIntro', true);
						}
					});
				}
				else{
					//Check if user invited any team member
					if(user.mainIntro.inviteTeam){
						Meteor.call('users.completedMainIntro', function(err, data){
							if(!err){
								Session.set('completedMainIntro', true);
							}
						});
					}
					else{
					}

				}
			}
		}
	}
};