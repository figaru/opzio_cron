prettyCount = function(value, format){
	if(typeof value === 'number'){
		if(value >= 1000 && value < 1000000){
			return Math.round( value / 1000 * 10 ) / 10 + 'k';
		}
		else if(value >= 1000000){
			return Math.round( value / 1000000 * 10 ) / 10 + 'm';
		}
		else{
			return Math.round( value * 10 ) / 10;
		}
	}
	else{
		return value;
	}
}

prettyDistance = function(value){
	var metric = Meteor.user().profile.geo.metric;

	//Use metric system
	if(metric){
		if(typeof value === 'number'){
			if(value >= 1000 && value < 1000000){
				return Math.round( value / 1000 * 10 ) / 10 + 'km';
			}
			else{
				return value + ' m';
			}
		}
		else{
			return value;
		}
	}
	//Convert to imperial system
	else{
		//Convert meter to yards first
		var yrd = value * 1.09361;

		console.log(yrd)

		//Convert to miles if applicable
		if(yrd >= 1760){

			var miles = yrd / 1769;
			return Math.round( miles * 10 ) / 10 + 'ml';
		}
		else{
			return Math.round( yrd * 10 ) / 10 + 'yd';
		}
	}
}

sortByTime = function(array, order){
	if(order === 'ascending'){
		array.sort(function(a,b){
			return a.totalTime - b.totalTime;
		})
	}
	else{
		array.sort(function(a,b){
			return b.totalTime - a.totalTime;
		})
	}
	//return array
}

orderByProperty = function(prop) {
	var args = Array.prototype.slice.call(arguments, 1);
	return function (a, b) {
		var equality = b[prop] - a[prop];
		if (equality === 0 && arguments.length > 1) {
			return orderByProperty.apply(null, args)(a, b);
		}
		return equality;
	};
};

orderByPropertyDesc = function(prop) {
	var args = Array.prototype.slice.call(arguments, 1);
	return function (a, b) {
		var equality = a[prop] - b[prop];
		if (equality === 0 && arguments.length > 1) {
			return orderByProperty.apply(null, args)(a, b);
		}
		return equality;
	};
};

initTooltips = function(){
	var w = Session.get('deviceWidth');

	var maxWidth = 970;

	if(w > 970){ 
		var minWidth = w * 0.2;
	}
	else if(w >= 560 && w <= 970){
		var minWidth = w * 0.4;
		var maxWidth = w;
	}
	else{
		var minWidth = w - 25;
		var maxWidth = minWidth;
	}

	var a = $('.tooltipster').tooltipster({
		contentAsHTML: true,
		trigger: 'click',
		minWidth: minWidth,
		maxWidth: maxWidth,
		interactive: true,
		// functionPosition: function(instance, helper, position){
		// 	position.coord.top += 200;
		// 	//position.coord.left += 200;
		// return position;
		// }
	});
}

findInArray = function(key, match, arr){
    for (var i=0; i < arr.length; i++) {
        if (arr[i][key] === match ) {
            return arr[i];
        }
    }
}

validateEmail = function(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

validateProtocol = function(str){
	return /^(https?|ftp):\/\//i.test(str);
}

validateUrl = function(str) {
	return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(str);
}

getRandColor = function(){
	var colors = [/*'#61E4DF',*/'#40C4FF','#69F0AE','#EA80FC','#EEFF41','#FF4081','#4ACFEA'];	
	var randIndex = Math.floor(Math.random() * (colors.length - 1));
	return colors[randIndex];
}