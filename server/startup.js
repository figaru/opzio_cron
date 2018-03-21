import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
	//Startup message
	console.log('\n***');
	console.log('*** Cron Service: STARTUP @ '+ moment().utc().toISOString() +' *****');

	//#######################
	//	EMAIL URL
	//#######################
	process.env.MAIL_URL = 'smtp://postmaster@opz.io:438e639ed0a29cee91827302126d58e2@smtp.mailgun.org:587';

	//#######################
	//	ENVIRONMENT INITIALIZATION
	//#######################
	switch(process.env.NODE_ENV){
		case 'development':
			console.log('*** running in DEVELOPMENT enviroment.');
			process.env.REMOTE_DB = Meteor.settings.app_mongo_url.dev;
			process.env.REMOTE_CLIENT = Meteor.settings.app_url.dev;
			break;
		case 'production':
			console.log('*** running in PRODUCTION enviroment.');
			//THIS IS REALLY SHITTY, SHOULD GO INTO MUP SETTINGS FILE BUT CAN'T SEEM TO MAKE IT WORK
			process.env.REMOTE_CLIENT = "https://www.opz.io";
			process.env.REMOTE_DB = "mongodb://admin:t34m0Pz10_1984#law@ds123751-a0.mlab.com:23751,ds123751-a1.mlab.com:23751/opz-app?replicaSet=rs-ds123751&connectTimeoutMS=240000&socketTimeoutMS=240000";
			break;
		default:
			console.log('*** WAR: unknown enviroment!');
			break;
	}

	//#######################
	//	CLIENT CONNECTION
	//#######################
	clientWorker = DDP.connect(process.env.REMOTE_CLIENT);

	//#######################
	//	DATABASE CONNECTION
	//#######################
	var db_connection =  new DBConnection(process.env.REMOTE_DB);
	var remoteDB = db_connection.initConnection();
	
	if(db_connection.connected()){
		
		//Init collections (both local & remote)
		initCollections(remoteDB);

		//#######################
		//	TRIGGER PUBLICATIONS ONCE COLLECTIONS ARE READY
		//triggerPublications();
		
		//Meteor.call('updateServiceStatus', 'SERVER_STARTUP');

		Meteor.setTimeout(function(){
			initCrons();
			console.log('*** SYS: A-OK!');
		}, 5000);
		
		//Meteor.call('timeline.addEvent', 'system', 'server_start', 'Server Startup', 'success');
	}
	else{
		console.log('*** ERR: UNABLE TO CONNECT TO REMOTE DB!');	
	}
});
