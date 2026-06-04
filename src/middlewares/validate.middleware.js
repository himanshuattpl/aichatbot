export const validate = (schema) => {
  return async (req, res, next) => {
    try {
      req.validatedData = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors,
      });
    }
  };
};