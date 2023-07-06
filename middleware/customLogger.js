const colors = require("colors");

const customLogger = (req, res, next) => {
     console.log("custom logger is running");
     console.log(`${req.method}, ${req.protocol}://${req.get("host")}/${req.originalUrl} api was hit at , ${new Date().toISOString()}`.underline.red)
    //  console.log("method",req.method) // get, post, put, delete
    //  console.log("url",req.url) // /hello => routes of the api
    //  console.log("protocol",req.protocol) // http or https
    //  console.log("hostname",req.hostname) // localhost or domain name
    //  console.log("originl url",req.originalUrl) // /hello?name=abhi
    // console.log(req.method, `${req.protocol}://${req.get("host")}/${req.originalUrl}`)
     next();

}


module.exports = customLogger;



// new Date().toString() 
