import authService
from "../services/auth/auth.service.js";

export const register =
  async (req, res, next) => {
    try {
      const user =
        await authService.register(
          req.body
        );

      return res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

export const login =
  async (req, res, next) => {
    try {
      const result =
        await authService.login(
          req.body.email,
          req.body.password
        );

      return res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };