export const validateBody = (schema) => (req, res, next) => {
  const options = {
    abortEarly: false, // return ALL validation errors
    stripUnknown: true, // remove fields not in schema
    errors: {
      wrap: { label: false }, // remove ugly quotes from error messages
    },
  };

  const { error, value } = schema.validate(req.body, options);

  if (error) {
    return next({
      status: 400,
      message: error.message,
      details: error.details.map((d) => d.message), // clean error list
    });
  }

  req.body = value;
  next();
};
