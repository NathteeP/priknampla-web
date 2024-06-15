import Joi from 'joi'

const loginSchema = Joi.object({
    userName: Joi.string().required().messages({
        'string.empty': 'Please enter username.'
    }),
    password: Joi.string().required().messages({
        'string.empty': 'Please enter password.'
    })
})

const registerSchema = Joi.object({
    userName: Joi.string().trim().required().messages({
        'string.empty' : 'Username is required.'
    }),
    displayName: Joi.string().trim().required()
    .pattern(/^[a-zA-Z0-9.\-_]{4,}$/).messages({
        'string.empty': 'Display name is required.',
        'string.pattern.base': 'Invalid display name.'
    }),
    password: Joi.string().required()
    .pattern(/^[!-~]{6,}$/).messages({
        'string.empty': 'Password is required.',
        'string.pattern.base': 'Password must be at least 6 characters.'
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
        'string.empty': 'Confirm password is required',
        'any.only': 'Confirm password did not match.'
    })
})

const schemaMap = {
    "login" : loginSchema,
    "register": registerSchema
}

const validate = (field,input) => {

    const {error} = schemaMap[field].validate(input,{abortEarly: false})

    if(error) {
        const result = error.details.reduce((acc,el) => {
            acc[el.path[0]] = el.message
            return acc
        },{})

        return result
    }
}

export default validate