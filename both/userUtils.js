getUserFullName = function(userId){
    if(typeof userId === 'string'){
        var user = Meteor.users.findOne({_id: userId});
        if(typeof user !== 'undefined'){
            var names = Meteor.users.findOne({_id:userId}, {fields: {'profile.name': 1, 'profile.firstName': 1, 'profile.lastName': 1} }).profile;
        }
        else{
            return userId;
        }
    }
    else{
        var names = userId.profile;
    }
    if('firstName' in names && 'lastName' in names){
        if(names.firstName.length > 0 && names.lastName.length > 0){
            return names.firstName + ' ' + names.lastName;
        }
        else if(names.firstName.length > 0 && names.lastName.length === 0){
            return names.firstName;
        }
        else{
            return names.name;
        }
    }
    else{
        return names.name;
    }
}

getUserShortName = function(userId){
    if(typeof(userId) !== 'undefined'){
        if(typeof userId === 'string'){
            var user = Meteor.users.findOne({ _id:userId}, 
            {
                fields: {
                    'profile.firstName': 1,
                    'profile.lastName': 1
                } 
            });

            if(typeof(user) !== 'undefined'){
                if('firstName' in user.profile && 'lastName' in user.profile){
                    if(user.profile.firstName.length > 0 && user.profile.lastName.length > 0){
                        return user.profile.firstName + ' ' + user.profile.lastName[0].toUpperCase() + '.';
                    }
                    else if(user.profile.firstName.length > 0 && user.profile.lastName.length === 0){
                        return user.profile.firstName;
                    }
                    else{
                        return user.profile.firstName;
                    }
                }
                else{
                    return 'Unknown';
                }
            }
        }
        if(typeof userId === 'object'){
            var user = userId;
            if('firstName' in user.profile && 'lastName' in user.profile){
                if(user.profile.firstName.length > 0 && user.profile.lastName.length > 0){
                    return user.profile.firstName + ' ' + user.profile.lastName[0].toUpperCase() + '.';
                }
                else if(user.profile.firstName.length > 0 && user.profile.lastName.length === 0){
                    return user.profile.firstName;
                }
                else{
                    return user.profile.firstName;
                }
            }
            else{
                return 'Unknown';
            }
        }
    }
}

getUserInitials = function(userId){
    if(typeof userId === 'string'){
        var user = Meteor.users.findOne({_id:userId});
        if(typeof user !== 'undefined'){

            var names = user.profile;
        }
    }
    else{
        var names = userId.profile;
    }

    if(typeof names !== 'undefined'){
        if('firstName' in names && 'lastName' in names){
            if(names.firstName.length > 0 && names.lastName.length > 0){
                return names.firstName[0].toUpperCase() + names.lastName[0].toUpperCase();
            }
            else if(names.firstName.length > 0 && names.lastName.length === 0){
                return names.firstName[0].toUpperCase();
            }
            else{
                return names.name;
            }
        }
        else{
            return names.name;
        }
    }
    else{
        return 'Unknown';
    }

}

hasBrowserTracker = function(user){
    for (var i = 0; i < user.trackers.length; i++) {
        if (user.trackers[i].tracker === 'browser') {
            return true;
        }
    }
    return false;
}

/* 
Util functions to check user permissions. Use param userId to call functions from within server methods passing this.userId
*/
isRoot = function(userId){
    if(userId){
        return Roles.userIsInRole(userId, 'root');
    }
    else if(userId === null){
        return Roles.userIsInRole(this.userId, 'root');
    }
    else{
        return Roles.userIsInRole(Meteor.userId(), 'root');   
    }
};

isAdmin = function(userId){
    if(userId){
        return Roles.userIsInRole(userId, 'admin');
    }
    else if(userId === null){
        return Roles.userIsInRole(this.userId, 'admin');
    }
    else{
        return Roles.userIsInRole(Meteor.userId(), 'admin');   
    }
}

isMember = function(userId){
    if(userId){
        return Roles.userIsInRole(userId, 'member');
    }
    else if(userId === null){
        return Roles.userIsInRole(this.userId, 'member');
    }
    else{
        return Roles.userIsInRole(Meteor.userId(), 'member');   
    }
}

isOrganizationAdmin = function(userId){
    if(userId){
        var user = Meteor.users.findOne({_id: userId });
        var org = Organizations.findOne(({_id: user.profile.organization }));

        return (org.admin.indexOf(userId) >= 0) ? true : false;
    }
    else if(userId === null){

        var user = Meteor.users.findOne({_id: this.userId });
        var org = Organizations.findOne(({_id: user.profile.organization}));

        return (org.admin.indexOf(this.userId) >= 0) ? true : false;
    }
    else{

        var org = Organizations.findOne();
        if(typeof org !== 'undefined')
            return (org.admin.indexOf(Meteor.userId()) >= 0) ? true : false;
    }
}

generateUserHandle = function(user){
    var randomCuteness = [
        'baby',
        'tiny',
        'small',
        'yawning',
        'sleeping',
        'lovely',
        'delightful',
        'charming',
        'pleasant',
        'pretty',
        'sexy',
        'captivating',
        'clever',
        'smart',
        'glamorous'
    ];
    
    var randomAnimals = [
        'unicorn',
        'mermaid',
        'dragon',
        'pegasus',
        'hippogriff',
        'centaur',
        'giraffe',
        'chameleon',
        'elephant',
        'duck',
        'deer',
        'hippo',
        'hedgehog',
        'kitten',
        'dolphin',
        'panda',
        'octopus',
        'owl',
        'seal',
        'bunny',
        'fox',
        'hamster',
        'penguin',
        'otter',
        'lemur',
        'shark',
        'lion',
        'zebra',
        'llama',
        'bear',
        'panther',
        'flamingo'
    ];

    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };
  
    var cuteIndex = Math.floor(Math.random() * (randomCuteness.length - 1));
    var cute = randomCuteness[cuteIndex];

    var animalIndex = Math.floor(Math.random() * (randomAnimals.length - 1));
    var animal = randomAnimals[animalIndex];

    var handle = cute+'-'+animal+'-'+s4()+s4();
    
    return handle;
}

hasMovesIntegration = function() {
    var user = Meteor.users.findOne({
        _id: Meteor.userId(),
        'trackers.tracker': 'moves'
    });

    if(typeof user !== 'undefined') return true;

    return false;
}