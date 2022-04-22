//To avoid Try-catch blocks in the controllers

const asyncWrapper = (fn) => {
    return async(req,res,next) => {
        try {
            await fn(req,res,next) //await becoz fn is a async function which returns promise
        } catch (error) {
            next(error) //next is used to pass to the next middleware in the stack i.e. errorHandlerMiddleware
        }
    }
}

module.exports = asyncWrapper;