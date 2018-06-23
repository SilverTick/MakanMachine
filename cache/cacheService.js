const NodeCache = require('node-cache');
const cacheProvider = require('./cacheProvider');

function getByCuisine(option) {
    option.trim().toLowerCase();
    console.log(`Getting cache value for cuisine: ${option}.`)
    return new Promise((resolve, reject) => {
        cacheProvider.getInstance()[cuisine].get(option, (err, result) => {
            if(err) {
                reject(new Error(`Unable to get cache value for cuisine: ${option} => Err: ${err}`));
            } else {
                console.log(`Got cache value for cuisine: ${option}.`);
                resolve(result);
            }
        });
    });
}

// Returns a random restaurant based on array of cuisines.
function surprise(preference) {
    console.log(`Preparing surprise!`);
    var arrCuisine = [];
    for(var x of preference) {
        arrCuisine = arrCuisine.concat(getByCuisine(x));
    }
    return arrCuisine[Math.floor(Math.random() * arrCuisine.length)];

    // var rdmCuisine = preference[Math.floor(Math.random() * 2)];
    // var arrCuisine = getByCuisine(rdmCuisine);
    // return arrCuisine[Math.floor(Math.random() * arrCuisine.length)];
}

// Takes in array of restaurants, and filter out info to return to user
function refineMessage(array) {
    var newArr = [];
    for(var x of array) {
        newArr.push({name: x.name, opening_hours: x.opening_hours, address: x.address, nearest_mrt: x.nearest_mrt, map_url: x.map_url});
    }
    console.log(newArr);
    return newArr;
}

module.exports = {
    getByCuisine,
    surprise,
    refineMessage,
}