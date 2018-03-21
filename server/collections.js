//API Local & Remote Collections
initCollections = function(database){
	console.log('*** DB: Init Remote Collections')
	
	//Remote DB Collections
	//Using new Mongo.Collection to use the options, namely idGeneration 
	//(when using db.open, idGeneration will be as mongo, an object. we want to force string like Meteor does)
	//Use _driver, otherwise it will save to local db and not remote (wtf?). See -> https://dev4devs.com/2015/06/05/meteor-js-how-to-connect-to-remotemultiple-databases/
	UserLogs = new Mongo.Collection('userLogs', { _driver: database, idGeneration: 'STRING' });

	Projects = new Mongo.Collection('projects', { _driver: database, idGeneration: 'STRING' });

	LastTouchedProject = new Mongo.Collection('lastTouchedProject', { _driver: database, idGeneration: 'STRING' });

	Organizations = new Mongo.Collection('organizations', { _driver: database, idGeneration: 'STRING' });

	OrganizationProfile = new Mongo.Collection('organizationProfile', { _driver: database, idGeneration: 'STRING' });

	PlanTypes = new Mongo.Collection('planTypes', { _driver: database, idGeneration: 'STRING' });

	Signups = new Mongo.Collection('signups', { _driver: database, idGeneration: 'STRING' });

	UsersStats = new Mongo.Collection('usersStats', { _driver: database, idGeneration: 'STRING' });

	Badges = new Mongo.Collection('badges', { _driver: database, idGeneration: 'STRING' });

	Goals = new Mongo.Collection('goals', { _driver: database, idGeneration: 'STRING' });

	Domains = new Meteor.Collection('domains', { _driver: database, idGeneration: 'STRING' });

	DomainCategories = new Meteor.Collection('domainCategories', { _driver: database, idGeneration: 'STRING' });

	DomainRules = new Meteor.Collection('domainRules', { _driver: database, idGeneration: 'STRING' });
	
	//For users, we use db.open (new Mongo.Collection creates conflict on remote db.)
	Meteor.users = database.open("users");


	
	//END HOOKS 

}