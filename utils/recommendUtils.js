/* Utility Module for Recommend command
* Module Exported:
* 1. getMessage(type, data): For formatting recommend messages. 
* 	 'data' is in JSON format
* 2. getInlineKeyboard(type, data): For inline keyboard for
* 	 recommend. 'data' is in JSON format
*/
const KEYBOARD_TYPES = {
	RECOMMEND: 'recommend',
	LOCATION: 'location',
	CUISINE: 'cuisine',
};

function getMessage(type, data) {
	switch (type) {
		case 'recommend':
			return "Do you want to search for restaurants by cuisine or MRT station?";
		case 'cuisine':
			return "Reply this message with the cuisine that you feel like having! E.g. Korean";
		case 'mrt':
			return "Reply this message with the MRT station of your choice! E.g. Dhoby Ghaut";
		case 'settings':
			return "If you wish to edit your preferences, please *reply* to this message in the following format, up to a maximum of 3 cuisines. E.g. American, Chinese, Japanese";
		case 'help':
			return `Makan Machine recommends you restaurants to dine at based on your preferred cuisines!\n\nType /recommend or simply tell the bot the cuisine you are craving for recommendations now!\n\nFor those who are unsure of the cuisine you want, head on over to /settings to key in your all-time favourite cuisines and let /surprise_me choose a random restuarant for you!\n\nAlternatively, you can try conversing with me by typing something like "Find me a Japanese restaurant" or "Find me food in Bugis"!`;
		case 'unknown':
			return "Ah? Sorry I don't understand. Type /help to see the commands available or type /recommend to get a restaurant recommendation!";
	}
}

function getKeyboard(type) {
	switch (type) {
		case 'recommend':
			return getRecommendInlineKeyboard();
			break;
		case 'location':
			return getRequestLocationReplyKeyboard();
			break;
		case 'cuisine':
			return getCuisineMRTInlineKeyboard();
			break;
	}
}

function getRecommendInlineKeyboard() {
	return [[
		{
			text: 'Cuisine',
			callback_data: 'recommend/cuisine',
		},
		{
			text: 'Location',
			callback_data: 'recommend/location',
		}
		]]
}

function getRequestLocationReplyKeyboard() {
	return [
		[{
			text: `Yes, send my location`,
			request_location: true,
		}],

		[{
			text: `No, thanks`,
		}],
	]
}

function getCuisineMRTInlineKeyboard() {
	return [
		[{
			text: 'Cuisine',
		}],

		[{
			text: 'MRT',
		}],
	]
}

module.exports = {
	getMessage,
	getKeyboard,
	keyboardTypes: KEYBOARD_TYPES,
}