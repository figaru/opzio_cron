initCrons = function(){
	//Add every job to cron
	for(var i=0; i<scheduledJobs.length; i++){
		//console.log('add job ' + scheduledJobs[i].name)
		SyncedCron.add(scheduledJobs[i]);
	}

	//Start jobs
	SyncedCron.start();

	console.log('*** CRN: INITIATED CRON JOBS...');
};