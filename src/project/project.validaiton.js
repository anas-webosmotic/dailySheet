const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const statusStrings = ["Completed", "In Progress", "Hold", "Cancelled"];

exports.addProjectValidation = {
    body: Joi.object({
        projectName: Joi.string().min(3).max(15).required(),
        clientName: Joi.string().min(3).max(15).required(),
        status : Joi.string().valid(...statusStrings).required(),
        profiles: Joi.string().required(),
        responsibleUsers: Joi.array().items(Joi.objectId().required()).required(),
        projectType: Joi.string().required(),
        source: Joi.string().required()
    })
}