import userService
  from "../services/user/user.service.js";

export const createUser =
  async (
    req,
    res,
    next
  ) => {
    try {
      const user =
        await userService.createUser(
          req.user,
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

export const updateUser =
  async (
    req,
    res,
    next
  ) => {
    try {
      const user =
        await userService.updateUser(
          req.user,
          req.params.id,
          req.body
        );

      return res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

export const deleteUser =
  async (
    req,
    res,
    next
  ) => {
    try {
      await userService.deleteUser(
        req.user,
        req.params.id
      );

      return res.json({
        success: true,
        message:
          "User deleted",
      });
    } catch (error) {
      next(error);
    }
  };

export const getUsers =
  async (
    req,
    res,
    next
  ) => {
    try {
      const users =
        await userService.getUsers();

      return res.json({
        success: true,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  };