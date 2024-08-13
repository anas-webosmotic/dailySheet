const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const statusStrings = ["Completed", "In Progress", "Hold", "Cancelled"];

exports.addProjectValidation = {
    body: Joi.object({
        projectName: Joi.string().min(3).max(15).required(),
        clientName: Joi.string().min(3).max(15).required(),
        status : Joi.string().valid(...statusStrings).required(),
        profiles: Joi.array().items(Joi.string().required()).required(),
        responsibleUsers: Joi.array().items(Joi.objectId().required()).required(),
        projectType: Joi.array().items(Joi.string().required()).required(),
        source: Joi.string().required()
    })
}

exports.getProjectValidation = {
    params : Joi.object({
        projectId: Joi.objectId()
    })
}

exports.updateProjectValidation = {
    body: Joi.object({
        projectName: Joi.string().min(3).max(15).optional(),
        clientName: Joi.string().min(3).max(15).optional(),
        status : Joi.string().valid(...statusStrings).optional(),
        profiles: Joi.array().items(Joi.string().required()).optional(),
        responsibleUsers: Joi.array().items(Joi.objectId().required()).optional(),
        projectType: Joi.array().items(Joi.string().required()).optional(),
        source: Joi.string().optional()
    }),
    params : Joi.object({
        projectId: Joi.objectId()
    })
}