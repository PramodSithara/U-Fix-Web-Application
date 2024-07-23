const Joi = require('joi')


const validateCheck = function(validationObj) {
    return async function(req, res, next) {
        try{
            const data = req.body
            const find_error = await validation(data,validationObj)
            req.currentError = find_error;
            next()
        }catch(err){
            return res.status(400).json(err);
        }
    }
}


const validation = async (body_data,validation_data) => {
    try{
        validObj = Joi.object().keys(
            validation_data
        );
        const { error } = validObj.validate(body_data, { abortEarly: false })
        return error
        
    }catch(err){
        return res.status(400).json(err);
    }
}

module.exports = { validateCheck, validation } 