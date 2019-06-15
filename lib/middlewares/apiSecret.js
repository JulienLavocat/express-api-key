const ApiKeyError = require("../apiKeyError");
const redis = require("../redis");

module.exports = async function (req, res, next) {

    try {
        
        const key = req.body.apiSecret || req.query.apiSecret;

        if(!key)
            return next(new ApiKeyError());

        const appId = await redis.authenticateSecret(key);
        if(appId === null)
            return next(new ApiKeyError());

        req.appId = appId;
        next();

    } catch (error) {
        return next(error);
    }
}