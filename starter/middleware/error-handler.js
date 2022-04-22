const {CustomAPIError } = require('../errors/custom-error')

const errorHandlerMiddleware = (err,req,res,next) => {
    //two errors:

    //to handle 404 error: keeping the syntax same and messing with chars of id
    if (err instanceof CustomAPIError) { 
        return res.status(err.statusCode).json({msg:err.message})
    }

    //to handle 500 error/cast error: adding or deleting chars from id
   return res.status(500).json({msg:'something went wrong, please try again'})
}

module.exports = errorHandlerMiddleware;