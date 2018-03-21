hasProgress = function(progressArray, userId){
	var match = findInArray('user', userId, progressArray);
	if(typeof match !== 'undefined'){
		return true;
	}
	return false;
}