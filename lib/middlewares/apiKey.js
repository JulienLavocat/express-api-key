const ApiKeyError = require("../apiKeyError");
const redis = require("../redis");

module.exports = async function (req, res, next) {

    try {

        const key = req.body.apiKey || req.query.apiKey;

        if (!key)
            return next(new ApiKeyError());

        const appId = await redis.authenticateKey(key);
        if (appId === null)
            return next(new ApiKeyError());

        req.appId = appId;
        next();

    } catch (error) {
        return next(error);
    }
}