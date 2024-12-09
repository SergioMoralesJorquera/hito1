import Joi from "joi";

export const petCreateSchema = Joi.object({
    name: Joi.string().required(),
    type:Joi.string().required(),
    age:Joi.number().required()
})

export const petUpdateSchema = Joi.object({
    name: Joi.string(),
    type:Joi.string(),
    age:Joi.number()
})

