const Redis = require("ioredis");
var redis;
var prefix = "apiKeys.";

exports.connect = function (host, port, password) {
    redis = new Redis(port, host, {lazyConnect: true, password: password});
}
exports.setPrefix = function(newPrefix) {
    prefix = newPrefix;
}

exports.authenticateKey = function(key) {
    return redis.get(prefix + "key." + key);
}

exports.authenticateSecret = function(key) {
    return redis.get(prefix + "secret." + key);
}