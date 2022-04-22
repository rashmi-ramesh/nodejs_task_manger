

class CustomAPIError extends Error {
    constructor(message,statusCode) {
        super(message)
        this.statusCode = statusCode 
    }
}

const createCustomError = (msg,statusCode) => {
    return new CustomAPIError(msg,statusCode); //new instance of the class
}

module.exports = {createCustomError,CustomAPIError}