const Joi = require("joi");

const validateCallConnectRequest = (req, res, next) => {
  const schema = Joi.object({
    from: Joi.string().max(10).required(),
    to: Joi.string().max(10).required(),
    name: Joi.string().min(3).max(30).required(),
    duration: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
  next();
};

const validateCallDisConnectRequest = (req, res, next) => {
  const schema = Joi.object({
    callUid: Joi.string().min(10).max(150).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
  next();
};

module.exports = {
  validateCallConnectRequest,
  validateCallDisConnectRequest,
};
