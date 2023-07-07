const AWS = require('aws-sdk');

// Set region
AWS.config.update({region: 'ap-south-1'});

// Create SMS Attribute parameters:
function sendSms(message, phone){
    const params = {
        Message: message,
        PhoneNumber: phone,
    }

    let  publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

    publishTextPromise.then(data => console.log(data))
    publishTextPromise.catch(err => console.log(err))
}

module.exports = sendSms;