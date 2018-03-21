buildReportEmail = function(user, data, callData){
	console.log('building email template..')
	console.log(data)

	//DEFAULT EMPTY CONTENTS
	var MESSAGE_INTRO = MESSAGE_BODY = TABLE_DATA = '';

	//SET REPORT TITLE
	var REPORT_TITLE = callData['period'] +' report - ' + callData['dateString'];

	//USER NAME
	var USERNAME = user.profile.firstName;

	//BUILD PRE HEADER (Hidden on email body)
	var coolHeaders = [
		'Here\'s your ' + callData['period'].toLowerCase() + ' report! 😊', 
		'Here\'s your freshly baked report!', 
		'Your ' + callData['period'].toLowerCase() + ' report is here! 🎉',
		'Hey! Hey! Your activity ' + callData['period'].toLowerCase() + ' report is here!', 
		'Dear '+ user.profile.firstName +', here is your ' + callData['period'].toLowerCase() + ' activity report', 
		'Hey! How\'s it going? We\'ve got your activity report here 👍', 
		'In case you\'re interested, here\'s your activity report.', 
		'Just in, your ' + callData['period'].toLowerCase() + ' report is here!',
		'Hey! Hope you\'re doing great! We\'ve got your activity report for you ❤️', 
		'Hey! We\'ve got your activity report for you ❤️', 
		'Hey '+ user.profile.firstName +', here\'s your '+ callData['period'].toLowerCase() +' report 😉', 
		'Pssst! It\'s your ' + callData['period'].toLowerCase() + ' report 😉',
		'Sorry to bother you... but we\'ve got your activity report here!', 
		'Extra! Extra! Read all about your '+ callData['period'].toLowerCase() +' activity here! 🗞️', 
	]


	var index = Math.floor(Math.random() * (coolHeaders.length - 1));
	var PRE_HEADER = coolHeaders[index];
	//Add whitespaces to push rest of preview text from email readers
	var preHeader = '<p style="display:none !important;visibility:hidden;mso-hide:all;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">'+ PRE_HEADER +'\r\n</p>';
	preHeader += '<div style="display:none !important;visibility:hidden;mso-hide:all;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;</div>';	

	//If we have data, produce tables and crunch data
	if(!_.isEmpty(data.activities) || !_.isEmpty(data.projects)){
		
		var tmpData = {};
		var totalTime = 0;

		//Check individually the data we have
		if(!_.isEmpty(data.activities)){
			switch(callData.range){
				case 'day':
					var d = data.activities.day;
					break;

				case 'week':
					var d = data.activities.week;
					break;

				case 'month':
					var d = data.activities.month;
					break;
			}

			tmpData = buildDataTable('Activities', d);

			//console.log(tmpData)

			TABLE_DATA += tmpData['table'];
			totalTime += tmpData['totalTime'];
		}

		if(!_.isEmpty(data.projects)){			
			switch(callData.range){
				case 'day':
					var d = data.projects.day;
					break;

				case 'week':
					var d = data.projects.week;
					break;

				case 'month':
					var d = data.projects.month;
					break;
			}
			tmpData = buildDataTable('Projects', d);

			//console.log(tmpData)

			TABLE_DATA += tmpData['table'];
		}

		totalTime = getStringFromEpoch(totalTime);

		
		var goodOutros = [
			'Keep the attitude 👍',
			'Keep it going!',
			'Keep it up!',
			'Rock on!',
			'Make every second count!',
		]

		//BUILD MAIN PARAGRAPH W/ DATA
		switch(callData.range){
			case 'day':
				var badIntros = [
					"Well nothing much happened today.. You've logged",
					"Nothing much for today.. You've only logged",
					"Today you've only logged",
				]

				var goodIntros = [
					"Today you've logged a solid", 
					"This day you've logged a solid",
					"Pushing that keyboard eh? You've logged",
					"No time to waste eh? You've logged a solid",
					"You have been active! You've logged a total of",
					"All right! You've logged",
					"Work hard, play hard? No? Not play hard? Well, you've logged",
				];
				
				var normalIntros = [
					"Today you've logged", 
					"This day you've logged",
					"You've logged a total of",
				]

				var normalOutros = [
					"Well, we can't push it every day right?", 
					"Come on, you can do better! 💪",
					"Tomorrow you'll do better. Unless it's Saturday.",
					"Tomorrow you'll do better.",
					"No worries, there's always more time tomorrow.",
				]

				var badOutros = [
					'What were you doing?',
					'Did you take some days off? 🌴',
					'Stuck in meetings all day?',
					'Not too motivated?',
				]

				//If less than 2h, bad
				if(totalTime <= 7200){
					index = Math.floor(Math.random() * (badIntros.length - 1));
					var intro = badIntros[index];

					index = Math.floor(Math.random() * (badOutros.length - 1));
					var outro = badOutros[index];
				}
				//Between 2h and 6h, normal
				else if(totalTime > 7200 && totalTime < 21600){
					index = Math.floor(Math.random() * (normalIntros.length - 1));
					var intro = normalIntros[index];

					index = Math.floor(Math.random() * (normalOutros.length - 1));
					var outro = normalOutros[index];
				}
				//Good
				else{
					index = Math.floor(Math.random() * (goodIntros.length - 1));
					var intro = goodIntros[index];

					index = Math.floor(Math.random() * (goodOutros.length - 1));
					var outro = goodOutros[index];
				}

				break;

			case 'week':
				var badIntros = [
					"Well nothing much happened this week.. You've logged",
					"Nothing much for this week.. You've only logged",
					"This week you've only logged",
				]

				var goodIntros = [
					"This week you've logged a solid", 
					"For this week you've logged a solid",
					"Pushing that keyboard eh? You've logged",
					"No time to waste eh? You've logged a solid",
					"You have been active! You've logged",
					"You've logged",
					"All right! You've logged",
					"Work hard, play..? Not so much? You've logged",
				];

				var normalIntros = [
					"This week you've logged a total of", 
					"On this week you've logged",
				]

				var normalOutros = [
					"Well, it has been a slow week.", 
					"Come on, you can do better! 💪",
					"Next week you'll do better.",
					"No worries, there's always more time next week.",
				]

				var badOutros = [
					'Come on, you can do better! 💪',
					'What were you doing this week?',
					'Where were you this week?',
					'Did you take the week off? 😎',
					'Not too motivated this week?',
				]

				//If less than 35h, bad
				if(totalTime <= 126000){
					index = Math.floor(Math.random() * (badIntros.length - 1));
					var intro = badIntros[index];

					index = Math.floor(Math.random() * (badOutros.length - 1));
					var outro = badOutros[index];
				}
				//Between 35h and 40h, normal
				else if(totalTime > 126000 && totalTime < 144000){
					index = Math.floor(Math.random() * (normalIntros.length - 1));
					var intro = normalIntros[index];

					index = Math.floor(Math.random() * (normalOutros.length - 1));
					var outro = normalOutros[index];
				}
				//Good
				else{
					index = Math.floor(Math.random() * (goodIntros.length - 1));
					var intro = goodIntros[index];

					index = Math.floor(Math.random() * (goodOutros.length - 1));
					var outro = goodOutros[index];
				}

				break;

			case 'month':

				var badIntros = [
					"Well nothing much happened this month.. You've logged",
					"Nothing much this month.. You've only logged",
					"This month you've only logged",
				]

				var goodIntros = [
						"This month you've logged a solid", 
						"For this month you've logged a solid",
						"Pushing that keyboard eh? You've logged",
						"No time to waste eh? You've logged a solid",
						"You have been active! You've logged a total of",
						"You've logged a total of",
						"All right! You've logged",
						"Work hard, play..? Not so much? You've logged",
					];

				var normalIntros = [
					"This month you've logged", 
					"On this month you've logged",
					"For " + moment(callData.startDate).format('MMMM') + " you've logged"
				]

				var normalOutros = [
					"Sometimes we also go slower on certain months.", 
					"Come on, you can do better! 💪",
					"Next week you'll do better.",
					"No worries, there's always more time next week.",
				]

				var badOutros = [
					'Come on, you can do better! 💪',
					'What were you doing this month?',
					'Where were you this month?',
					'Not too motivated this month?',
					moment(callData.startDate).format('MMMM') + ' is not your favourite month?'
				]

				//If less than 140h, bad
				if(totalTime <= 504000){
					index = Math.floor(Math.random() * (badIntros.length - 1));
					var intro = badIntros[index];

					index = Math.floor(Math.random() * (badOutros.length - 1));
					var outro = badOutros[index];
				}
				//Between 140h and 160h, normal
				else if(totalTime > 504000 && totalTime < 576000){
					index = Math.floor(Math.random() * (normalIntros.length - 1));
					var intro = normalIntros[index];

					index = Math.floor(Math.random() * (normalOutros.length - 1));
					var outro = normalOutros[index];
				}
				//Good
				else{
					index = Math.floor(Math.random() * (goodIntros.length - 1));
					var intro = goodIntros[index];

					index = Math.floor(Math.random() * (goodOutros.length - 1));
					var outro = goodOutros[index];
				}

				break;
		}


		
		var MESSAGE_INTRO = intro + ' <b>' + totalTime + '</b>. ' + outro;

	}
	else{

		switch(callData.range){
			case 'day':
				var missingIntros = [
					'<b>Bummer!</b> Seems you haven\'t logged any time! 😮<br><br>If you trully haven\'t done anything today, relax! But if you have, check your <a href="https://opz.io/user/'+ user._id +'/settings#tracker">tracking page</a> to confirm your plugins are sending data correctly.',

					'<b>Wow!</b> Literally zero time for the day! <br><br>If you trully haven\'t done anything, no worries! But if you have, check your <a href="https://opz.io/user/'+ user._id +'/settings#tracker">tracking page</a> to confirm your plugins are sending data correctly.',

					'<b>Oops!</b> We couldn\'t find any logged time! Taking a day for yourself? 🛀<br><br>If you trully haven\'t done anything today, ignore this email. But if you have, check your <a href="https://opz.io/user/'+ user._id +'/settings#tracker">tracking page</a> to confirm your plugins are sending data correctly.',

					'<b>Yikes!</b> There\'s no registered time! 😐<br><br>If indeed you haven\'t done anything, relax! But if you have, check your <a style="color:#057df5;text-decoration:none;" href="https://opz.io/user/'+ user._id +'/settings#tracker">tracking page</a> to confirm your plugins are sending data correctly.',

					'<b>Wowie!</b> Seems there isn\'t any activity for the day! <br><br>If indeed you haven\'t done anything, relax! But if you have, check your <a href="https://opz.io/user/'+ user._id +'/settings#tracker">tracking page</a> to confirm your plugins are sending data correctly.'
				];
				break;

			case 'week':
				var missingIntros = [
					'<b>Bummer!</b> Seems you haven\'t logged any time! 😮<br><br>If you trully haven\'t done anything for the week, relax! But if you have, check your <a href="https://opz.io/user/'+ user._id +'/settings#tracker">tracking page</a> to confirm your plugins are sending data correctly.',

					'<b>Wow!</b> Literally zero time this week! <br><br>If you\'re taking some days away from your computer, sorry for the intrusion! But if you aren\'t, check your <a href="https://opz.io/user/'+ user._id +'/settings#tracker">tracking page</a> to confirm your plugins are sending data correctly.',

					'<b>Oops!</b> We couldn\'t find any activity this week! Taking some days off? 😎<br><br>If you\'re on vacation, kindly ignore this email. But if you have, check your <a href="https://opz.io/user/'+ user._id +'/settings#tracker">tracking page</a> to confirm your plugins are sending data correctly.',

					'<b>Yikes!</b> There\'s no registered time! 😐<br><br>If indeed you haven\'t done anything, relax! But if you have, check your <a style="color:#057df5;text-decoration:none;" href="https://opz.io/user/'+ user._id +'/settings#tracker">tracking page</a> to confirm your plugins are sending data correctly.',

					'<b>Wowie!</b> Seems there isn\'t any activity for the week! <br><br>If you\'re on vacation, sorry for bothering! But if you have, check your <a href="https://opz.io/user/'+ user._id +'/settings#tracker">tracking page</a> to confirm your plugins are sending data correctly.'
				];
				break;

			case 'month':
				var missingIntros = [
					'<b>Bummer!</b> Seems no time for a whole month?! 😮<br><br>Are you on vacation? If so, ignore this email. Otherwise, check your <a href="https://opz.io/user/'+ user._id +'/settings#tracker">tracking page</a> to confirm your plugins are sending data correctly.',

					'<b>Wow!</b> We couldn\'t find any activity this month! Taking some days off? 😎<br><br>If you\'re on vacation, kindly ignore this email. But if you have, check your <a href="https://opz.io/user/'+ user._id +'/settings#tracker">tracking page</a> to confirm your plugins are sending data correctly.',

				];
				break;
		}
		index = Math.floor(Math.random() * (missingIntros.length - 1));
		var MESSAGE_INTRO = missingIntros[index];
	}
	
	
	//The top main message
	var MAIN_MESSAGE = MESSAGE_INTRO + ' ' + MESSAGE_BODY;
	

	//Assemble email
	var header = '\
	<div id="header" style="background-color:transparent;">\
		<div class="block-grid mixed-two-up" style="Margin: 0 auto;min-width: 320px;max-width: 620px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;">\
			<div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">\
				<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 620px;"><tr class="layout-full-width" style="background-color:#FFFFFF;"><![endif]-->\
			<!--[if (mso)|(IE)]><td align="center" width="413" style=" width:413px; padding-right: 0px; padding-left: 0px; padding-top:15px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->\
			<div class="col num8" style="display: table-cell;vertical-align: top;min-width: 320px;max-width: 408px;padding-top:10px;">\
				<div style="background-color: transparent; width: 100% !important;">\
				<!--[if (!mso)&(!IE)]><!-->\
				<div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:15px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">\
				<!--<![endif]-->\
	            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 0px; padding-bottom: 10px;"><![endif]-->\
	            	<div style="color:#555555;line-height:120%;font-family:\'Lato\', Tahoma, Verdana, Segoe, sans-serif; padding-right: 10px; padding-left: 10px; padding-top: 0px; padding-bottom: 10px;">\
	              		<div style="font-size:12px;line-height:14px;color:#555555;font-family:\'Lato\', Tahoma, Verdana, Segoe, sans-serif;text-align:left;">\
							' + preHeader + '\
							<p style="margin: 0;font-size: 12px;line-height: 14px"><span style="font-size: 16px; line-height: 19px;">'+ REPORT_TITLE +'</span></p>\
						</div>\
					</div><!--[if mso]></td></tr></table><![endif]-->\
					<!--[if (!mso)&(!IE)]><!-->\
				</div><!--<![endif]-->\
			</div>\
			</div><!--[if (mso)|(IE)]></td><td align="center" width="207" style=" width:207px; padding-right: 30px; padding-left: 30px; padding-top:5px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->\
			<div class="col num4" style="display: table-cell;vertical-align: top;max-width: 320px;min-width: 204px;padding-top:10px;">\
				<div style="background-color: transparent; width: 100% !important;">\
						<!--[if (!mso)&(!IE)]><!-->\
						<div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:0px; padding-right: 30px; padding-left: 30px;">\
							<!--<![endif]-->\
							<div align="center" class="img-container center fullwidth" style="padding-right: 0px; padding-left: 30px;">\
								<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 30px;" align="center"><![endif]-->\
								<img id="logo" align="center" alt="Image" border="0" class="center fullwidth" src="https://www.opz.io/images/bot/opz_head.png" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block;border: 0;height: auto;float: right;width: 100%;max-width: 86.6666666666667px" title="Image" width="86.6666666666667"> <!--[if mso]></td></tr></table><![endif]-->\
							</div><!--[if (!mso)&(!IE)]><!-->\
						</div><!--<![endif]-->\
					</div>\
				</div><!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->\
			</div>\
		</div>\
	</div>';

	var mainIntro = '\
	<div id="mainIntro" style="background-color:transparent;">\
		<div class="block-grid" style="Margin: 0 auto;min-width: 320px;max-width: 620px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;">\
			<div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">\
				<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 620px;"><tr class="layout-full-width" style="background-color:#FFFFFF;"><![endif]-->\
				<!--[if (mso)|(IE)]><td align="center" width="620" style=" width:620px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->\
				<div class="col num12" style="min-width: 320px;max-width: 620px;display: table-cell;vertical-align: top;">\
					<div style="background-color: transparent; width: 100% !important;">\
					<!--[if (!mso)&(!IE)]><!-->\
						<div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">\
						<!--<![endif]-->\
						<div style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;">\
						<!--[if (mso)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px;padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->\
							<div align="center">\
								<div style="border-top: 1px solid #B1C6DC; width:100%; line-height:1px; height:1px; font-size:1px;">&nbsp;</div>\
							</div><!--[if (mso)]></td></tr></table></td></tr></table><![endif]-->\
						</div><!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 5px;"><![endif]-->\
						<div style="color:#555555;line-height:120%;font-family:\'Lato\', Tahoma, Verdana, Segoe, sans-serif; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 5px;">\
							<div style="font-size:12px;line-height:14px;color:#555555;font-family:\'Lato\', Tahoma, Verdana, Segoe, sans-serif;text-align:left;">\
								<p style="margin: 0;font-size: 12px;line-height: 14px">Hey ' + USERNAME +',</p>\
								<p style="margin: 0;font-size: 12px;line-height: 14px">&nbsp;<br></p>\
								<p style="margin: 0;font-size: 12px;line-height: 14px">' + MAIN_MESSAGE + '</p>\
								<p style="margin: 0;font-size: 12px;line-height: 14px"><br data-mce-bogus="1"></p>\
								<p style="margin: 0;font-size: 12px;line-height: 14px">You can always access your <a href="https://www.opz.io/user/'+ user._id +'/dashboard" rel="noopener noreferrer" style="color:#057DF5;color:#057DF5;color:#057DF5;color:#057DF5;color:#057DF5;text-decoration: none;" target="_blank">dashboard</a>&nbsp;for more details or&nbsp;<a href="https://www.opz.io/user/'+ user._id +'/calendar" rel="noopener noreferrer" style="color:#057DF5;color:#057DF5;color:#057DF5;color:#057DF5;color:#057DF5;text-decoration: none;" target="_blank">alter</a>&nbsp;this&nbsp;data.</p>\
							</div>\
							</div><!--[if mso]></td></tr></table><![endif]-->\
							<!--[if (!mso)&(!IE)]><!-->\
						</div><!--<![endif]-->\
					</div>\
				</div><!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->\
			</div>\
		</div>\
	</div>';

	var footer = '\
	<div id="footer" style="background-color:transparent;">\
	  <div class="block-grid" style="Margin: 0 auto;min-width: 320px;max-width: 620px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;">\
	    <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">\
	      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 620px;"><tr class="layout-full-width" style="background-color:#FFFFFF;"><![endif]-->\
	      <!--[if (mso)|(IE)]><td align="center" width="620" style=" width:620px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->\
	      <div class="col num12" style="min-width: 320px;max-width: 620px;display: table-cell;vertical-align: top;">\
	        <div style="background-color: transparent; width: 100% !important;">\
	        	<div style="padding-right: 10px; padding-left: 10px; padding-top: 30px; padding-bottom: 10px;">\
	            <!--[if (mso)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px;padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0">\<tr><td><![endif]-->\
	            <div align="center">\
	              <div style="border-top: 1px solid #B1C6DC; width:100%; line-height:1px; height:1px; font-size:1px;">&nbsp;</div>\
	            </div><!--[if (mso)]></td></tr></table></td></tr></table><![endif]-->\
	          </div>\
	          <!--[if (!mso)&(!IE)]><!-->\
	          <div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">\
	            <!--<![endif]-->\
	            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 0px; padding-bottom: 10px;"><![endif]-->\
	            <div style="font-family:\'Lato\', Tahoma, Verdana, Segoe, sans-serif;line-height:120%;color:#555555; padding-right: 10px; padding-left: 10px; padding-top: 30px; padding-bottom: 10px;">\
	              <div style="font-size:12px;line-height:14px;color:#555555;font-family:\'Lato\', Tahoma, Verdana, Segoe, sans-serif;text-align:left;">\
	                <p style="margin: 0;font-size: 12px;line-height: 14px;text-align: center">Sent with <span font-size: 12px; line-height: 14px;">&#9829;</span> &nbsp;by <a href="https://opz.io" rel="noopener noreferrer" style="color:#057DF5;text-decoration: underline;" target="_blank">Opz.io</a>&nbsp;</p>\
	                <p style="margin: 0;font-size: 12px;line-height: 14px;text-align: center">&nbsp;<br></p>\
	                <p style="margin: 0;font-size: 12px;line-height: 14px;text-align: center">Pra&ccedil;a Conde Agrolongo, n.123, Braga - PORTUGAL</p>\
	                <p style="margin: 0;font-size: 12px;line-height: 14px;text-align: center">Copyright &copy; 2017</p>\
	                <p style="margin: 0;font-size: 12px;line-height: 14px;text-align: center"><a href="https://www.opz.io" rel="noopener noreferrer" style="color:#555555;text-decoration: none;" target="_blank">Unsubscribe</a></p>\
	              </div>\
	            </div><!--[if mso]></td></tr></table><![endif]-->\
	            <!--[if (!mso)&(!IE)]><!-->\
	          </div><!--<![endif]-->\
	        </div>\
	      </div><!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->\
	    </div>\
	  </div>\
	</div><!--[if (mso)|(IE)]></td></tr></table><![endif]-->';


	//Assemble body and finish building rest of email
	var bodyContent = mainIntro + TABLE_DATA + footer;

	var content = '<table class="nl-container" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #F1F1F1;width: 100%"><tbody><tr style="vertical-align: top"><td id="content" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top"><!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #F1F1F1;"><![endif]-->\
		' + header + '\
		' + bodyContent + '\
        </td></tr></tbody></table><!--[if (mso)|(IE)]></div><![endif]-->';

	var style = '<style id="media-query-bodytag" type="text/css">@media (max-width: 520px) {#logo{display: none!important;} .block-grid {min-width: 320px!important;max-width: 100%!important;width: 100%!important;display: block!important;} .col {min-width: 320px!important;max-width: 100%!important;width: 100%!important;display: block!important;} .col.no-break {min-width: 150px!important;max-width: 100%!important;width: 50%!important;display: table-cell!important;overflow: hidden;} .col > div {margin: 0 auto;} img.fullwidth {max-width: 100%!important;}}</style><!--[if IE]><div class="ie-browser"><![endif]--><!--[if mso]><div class="mso-container"><![endif]-->';

	var body = '<body class="clean-body" style="margin: 0;padding-top: 20px;padding-left: 0;padding-right: 0;padding-bottom: 25px; -webkit-text-size-adjust: 100%;background-color: #F1F1F1">' + style + content + '</body>';

	var doctype = '<!DOCTYPE html>'+ body + '</html>';

	return doctype;
}

buildDataTable = function(title, data){

	console.log(data);

	var TABLE_TITLE = title;
	
	switch(title){
		case 'Activities':
			var intros = [
				'<br>Regarding your activites:',
				'<br>Here are the activites you did:',
				'<br>Your activites are as follows:'
			]	
			break;

		case 'Projects':
			var personalProject = findInArray('label', 'Personal', data);
			if(typeof personalProject !== 'undefined'){
				var intros = [
					"Below are the projects you've worked on. You've spent <b>" + getStringFromEpoch(personalProject.totalTime) + "</b> on personal stuff.",
					"You've spent <b>" + getStringFromEpoch(personalProject.totalTime) + "</b> on personal activities and the rest on these projects:",
					"You've spent <b>" + getStringFromEpoch(personalProject.totalTime) + "</b> doing personal things, the rest was spent on these projects:",
				]
			}
			else{
				var intros = [
					"Regarding the projects you worked on:",
					"Regarding your projects:",
					"Here's how much you've worked on your projects:",
				]	
			}
			break;
	}

	var index = Math.floor(Math.random() * (intros.length - 1));
	var TABLE_INTRO = intros[index];
	
	var total = 0;

	var tableIntro = '\
	<div style="background-color:transparent;" class="section-intro">\
		<div class="block-grid" style="Margin: 0 auto;min-width: 320px;max-width: 620px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;">\
			\
			<div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">\
				<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 620px;"><tr class="layout-full-width" style="background-color:#FFFFFF;"><![endif]-->\
				<!--[if (mso)|(IE)]><td align="center" width="620" style=" width:620px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->\
				<div class="col num12" style="min-width: 320px;max-width: 620px;display: table-cell;vertical-align: top;">\
					<div style="background-color: transparent; width: 100% !important;">\
						<!--[if (!mso)&(!IE)]><!-->\
						<div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">\
				        	<!--<![endif]-->\
				        	<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 5px; padding-bottom: 10px;"><![endif]-->\
				        	<div style="color:#555555;line-height:120%;font-family:\'Lato\', Tahoma, Verdana, Segoe, sans-serif; padding-right: 10px; padding-left: 10px; padding-top: 5px; padding-bottom: 10px;">\
				        		<div style="font-size:12px;line-height:14px;color:#555555;font-family:\'Lato\', Tahoma, Verdana, Segoe, sans-serif;text-align:left;">\
				        			<p style="margin: 0;font-size: 12px;line-height: 14px">'+ TABLE_INTRO +'</p>\
			        			</div>\
		        			</div><!--[if mso]></td></tr></table><![endif]-->\
	        			<!--[if (!mso)&(!IE)]><!-->\
	        			</div><!--<![endif]-->\
	    			</div>\
				</div><!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->\
			</div>\
		</div>\
	</div>';

	var tableHeader = '\
	<div style="background-color:transparent;" class="column-header">\
	  <div class="block-grid mixed-two-up" style="Margin: 0 auto;min-width: 320px;max-width: 620px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #B1C6DC;">\
	    <div style="border-collapse: collapse;display: table;width: 100%;background-color:#B1C6DC;">\
	      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 620px;"><tr class="layout-full-width" style="background-color:#B1C6DC;"><![endif]-->\
	      <!--[if (mso)|(IE)]><td align="center" width="413" style=" width:413px; padding-right: 10px; padding-left: 10px; padding-top:10px; padding-bottom:10px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->\
	      <div class="col num8" style="display: table-cell;vertical-align: top;min-width: 320px;max-width: 408px;">\
	        <div style="background-color: transparent; width: 100% !important;">\
	          <!--[if (!mso)&(!IE)]><!-->\
	          <div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:10px; padding-bottom:10px; padding-right: 10px; padding-left: 10px;">\
	            <!--<![endif]-->\
	            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 0px; padding-bottom: 0px;"><![endif]-->\
	            <div style="color:#555555;line-height:120%;font-family:\'Lato\', Tahoma, Verdana, Segoe, sans-serif; padding-right: 10px; padding-left: 10px; padding-top: 0px; padding-bottom: 0px;">\
	              <div style="font-size:12px;line-height:14px;color:#555555;font-family:\'Lato\', Tahoma, Verdana, Segoe, sans-serif;text-align:left;">\
	                <p style="margin: 0;font-size: 12px;line-height: 14px"><span style="font-size: 16px; line-height: 19px; color: rgb(255, 255, 255);">'+ TABLE_TITLE +'</span></p>\
	              </div>\
	            </div><!--[if mso]></td></tr></table><![endif]-->\
	            <!--[if (!mso)&(!IE)]><!-->\
	          </div><!--<![endif]-->\
	        </div>\
	      </div><!--[if (mso)|(IE)]></td><td align="center" width="207" style=" width:207px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->\
	      <div class="col num4" style="display: table-cell;vertical-align: top;max-width: 320px;min-width: 204px;">\
	        <div style="background-color: transparent; width: 100% !important;">\
	          <!--[if (!mso)&(!IE)]><!-->\
	          <div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:10px; padding-bottom:10px; padding-right: 10px; padding-left: 10px;">\
	            <!--<![endif]-->\
	            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 20px; padding-left: 20px; padding-top: 0px; padding-bottom: 0px;"><![endif]-->\
	            <div style="font-family:\'Lato\', Tahoma, Verdana, Segoe, sans-serif;line-height:120%;color:#FFFFFF; padding-right: 20px; padding-left: 20px; padding-top: 0px; padding-bottom: 0px;">\
	              <div style="font-size:12px;line-height:14px;color:#FFFFFF;font-family:\'Lato\', Tahoma, Verdana, Segoe, sans-serif;text-align:left;">\
	                <p style="margin: 0;font-size: 12px;line-height: 14px"><span style="font-size: 16px; line-height: 19px; color: rgb(255, 255, 255);">&nbsp;</span></p>\
	              </div>\
	            </div><!--[if mso]></td></tr></table><![endif]-->\
	            <!--[if (!mso)&(!IE)]><!-->\
	          </div><!--<![endif]-->\
	        </div>\
	      </div><!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->\
	    </div>\
	  </div>\
	</div>';

	//Build table rows
	var rows = '';
	for(var i=0; i<data.length; i++){
		if(data[i].label === 'Personal') continue;

		var ROW_LABEL = data[i].label;
		var ROW_VALUE = getStringFromEpoch(data[i].totalTime);

		total += data[i].totalTime;

		var row = '\
		<div style="background-color:transparent;" class="column-row">\
		  <div class="block-grid mixed-two-up" style="Margin: 0 auto;min-width: 320px;max-width: 620px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;">\
		    <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">\
		      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 620px;"><tr class="layout-full-width" style="background-color:#FFFFFF;"><![endif]-->\
		      <!--[if (mso)|(IE)]><td align="center" width="413" style=" width:413px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->\
		      <div class="col num8 no-break" style="display: table-cell;vertical-align: top;min-width: 320px;max-width: 408px;">\
		        <div style="background-color: transparent; width: 100% !important;">\
		          <!--[if (!mso)&(!IE)]><!-->\
		          <div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">\
		            <!--<![endif]-->\
		            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 20px; padding-left: 20px; padding-top: 0px; padding-bottom: 0px;"><![endif]-->\
		            <div style="font-family:\'Lato\', Tahoma, Verdana, Segoe, sans-serif;line-height:120%;color:#555555; padding-right: 20px; padding-left: 20px; padding-top: 0px; padding-bottom: 0px;">\
		              <div style="font-size:12px;line-height:14px;color:#555555;font-family:\'Lato\', Tahoma, Verdana, Segoe, sans-serif;text-align:left;">\
		                <p style="margin: 0;font-size: 12px;line-height: 14px"><span style="font-size: 14px; line-height: 16px;">'+ ROW_LABEL +'</span></p>\
		              </div>\
		            </div><!--[if mso]></td></tr></table><![endif]-->\
		            <!--[if (!mso)&(!IE)]><!-->\
		          </div><!--<![endif]-->\
		        </div>\
		      </div><!--[if (mso)|(IE)]></td><td align="center" width="207" style=" width:207px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->\
		      <div class="col num4 no-break" style="display: table-cell;vertical-align: top;max-width: 320px;min-width: 204px;">\
		        <div style="background-color: transparent; width: 100% !important;">\
		          <!--[if (!mso)&(!IE)]><!-->\
		          <div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">\
		            <!--<![endif]-->\
		            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 20px; padding-left: 20px; padding-top: 0px; padding-bottom: 0px;"><![endif]-->\
		            <div style="font-family:\'Lato\', Tahoma, Verdana, Segoe, sans-serif;line-height:120%;color:#555555; padding-right: 20px; padding-left: 20px; padding-top: 0px; padding-bottom: 0px;">\
		              <div style="font-size:12px;line-height:14px;color:#555555;font-family:\'Lato\', Tahoma, Verdana, Segoe, sans-serif;text-align:left;">\
		                <p style="margin: 0;font-size: 12px;line-height: 14px"><span style="font-size: 14px; line-height: 16px;">'+ ROW_VALUE +'</span></p>\
		              </div>\
		            </div><!--[if mso]></td></tr></table><![endif]-->\
		            <!--[if (!mso)&(!IE)]><!-->\
		          </div><!--<![endif]-->\
		        </div>\
		      </div><!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->\
		    </div>\
		  </div>\
		</div>';

		rows += row;
	}

	var separator = '\
	<div style="background-color:transparent;" class="dotted-line">\
	  <div class="block-grid" style="Margin: 0 auto;min-width: 320px;max-width: 620px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;">\
	    <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">\
	      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 620px;"><tr class="layout-full-width" style="background-color:#FFFFFF;"><![endif]-->\
	      <!--[if (mso)|(IE)]><td align="center" width="620" style=" width:620px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->\
	      <div class="col num12" style="min-width: 320px;max-width: 620px;display: table-cell;vertical-align: top;">\
	        <div style="background-color: transparent; width: 100% !important;">\
	          <!--[if (!mso)&(!IE)]><!-->\
	          <div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">\
	            <!--<![endif]-->\
	            <div style="padding-right: 10px; padding-left: 10px; padding-top: 0px; padding-bottom: 10px;">\
	              <!--[if (mso)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px;padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->\
	              <div align="center">\
	                <div style="border-top: 1px dotted #CCCCCC; width:100%; line-height:1px; height:1px; font-size:1px;">\
	                  &nbsp;\
	                </div>\
	              </div><!--[if (mso)]></td></tr></table></td></tr></table><![endif]-->\
	            </div><!--[if (!mso)&(!IE)]><!-->\
	          </div><!--<![endif]-->\
	        </div>\
	      </div><!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->\
	    </div>\
	  </div>\
	</div>';

	var table = '<div class="data-section" style="background-color:transparent;">'+ tableIntro + tableHeader + rows + separator + '</div>';

	return {
		table: table,
		totalTime: total
	}
}