const moment = require('moment');

function formatMessage(username, text) {
  return {
    username,
    text, //message
    time: moment().format('h:mm a') //current time with am & pm
  };
}

module.exports = formatMessage;