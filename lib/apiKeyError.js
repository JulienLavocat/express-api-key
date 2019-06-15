class APIKeyError extends Error {

    constructor() {
        super("Invalid API Key");
    }

}

module.exports = APIKeyError;