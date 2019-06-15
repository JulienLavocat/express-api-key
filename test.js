const keys = require("./index");
keys.redis.connect("localhost", 6379);

const validMock = {
    req: {
        body: {
            apiKey: "validApiKey",
            apiSecret: "validApiSecret"
        }
    },
    next: logTestResults
}
const invalidMock = {
    req: {
        body: {
            apiKey: "invalidApiKey",
            apiSecret: "invalidApiSecret"
        }
    },
    next: logTestResults
}

function testValid(cb) {
    keys.apiKey(validMock.req, null, validMock.next);
    keys.apiSecret(validMock.req, null, validMock.next);
}

function testInvalid() {
    keys.apiKey(invalidMock.req, null, invalidMock.next);
    keys.apiSecret(invalidMock.req, null, invalidMock.next);
}

function logTestResults(result) {
    console.log(`    Request ended with: ${result}`);
}