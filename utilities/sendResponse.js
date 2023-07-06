

const sendResponse = (res, status=200, success="", message="", data="") => {
       
    return res.status(status).json({success, message, data});
}

module.exports = sendResponse;