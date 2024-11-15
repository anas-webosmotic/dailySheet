const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.addUserValidation = {
  body: Joi.object({
    username: Joi.string().min(3).max(15).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "in", "org"] },
      })
      .required(),
    // phone: Joi.string().length(10).pattern(/^(\+91)?[6-9][0-9]{9}$/)
    phone: Joi.string()
      .pattern(/^(\+91)?[6-9][0-9]{9}$/)
      .required(),
    password: Joi.string().min(6).max(12).required(),
    role: Joi.string().required(),
    responsibleUsers: Joi.array().items(Joi.objectId().required()).required(),
    verifierUser: Joi.objectId().required(),
  }),
};

exports.getUserValidation = {
  params : Joi.object({
    userId: Joi.objectId()
  })
}

exports.updateUserValidation = {
  body: Joi.object({
    username: Joi.string().min(3).max(15).optional(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "in", "org"] },
      })
      .optional(),
    phone: Joi.string()
      .pattern(/^(\+91)?[6-9][0-9]{9}$/)
      .optional(),
    // password: Joi.string().min(6).max(12).optional(),
    role: Joi.string().optional(),
    responsibleUsers: Joi.array().items(Joi.objectId().required()).optional(),
    verifierUser: Joi.objectId().optional(),
  }),
  params : Joi.object({
    userId: Joi.objectId()
  })
}
