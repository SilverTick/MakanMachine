const cService = require('../cache/cacheService');
const lService = require('./locationService');
const is = require('is_js');
const userpref = require('../userpref');

// Returns a 'surprise' message based on options.
async function surprise(options) {
    var user = await userpref.getUser(options.chatID);
    var message;

    if(user == undefined) {
        message = `Oops! You have not yet configured your settings. Run /settings to begin!`;
    } else {
        const preference = user.cuisine;
        console.log(`Preparing surprise!`);
        console.log(`Preference: ${preference}`);
        var arrCuisine = [];

        for(var x of preference) {
            var arrTemp = await cService.get(cService.cacheTables.CUISINE, x);
            arrCuisine = arrCuisine.concat(arrTemp);
            console.log(`arrTemp: ${arrTemp}`);
        }

        // Filter by location if location is defined.
        if(is.propertyDefined(options, 'location')) {
            let location = options.location;
            var nearby = await lService.filterLocation(arrCuisine, location.longitude, location.latitude);
            var arrTemp = [];
            for(var x of nearby) {
                value = await cService.get(cService.cacheTables.ID, x["i"]);
                arrTemp.push(value);
                console.log(value);
            }
            arrCuisine = arrTemp;
        }

        console.log(`Filtered array: ${arrCuisine}`);
        var result = arrCuisine[Math.floor(Math.random() * arrCuisine.length)];

        if(result) {
        console.log(`User: ${user}.`);
        console.log(`Result: ${result.name}`);
        message = `*${result.name}*\n\nAddress: ${result.address}\nOpening hours:\n${result.opening_hours}\nNearest MRT: ${result.nearest_mrt}\nGoogle Maps: ${result.map_url}`;
        } else {
            message = `Oops! We could not find you a restaurant based on your preferences. Run /settings to edit your preferences!`;
        }
    }
    return message;
}

module.exports = {
    surprise,
}