import Joi from "joi";

// Product Joi validation schema
const productJoi = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    category: Joi.string()
});

export default productJoi;