import departmentService
  from "../services/department/department.service.js";

export const createDepartment =
  async (
    req,
    res,
    next
  ) => {
    try {
      const department =
        await departmentService.createDepartment(
          req.body
        );

      return res.status(201).json({
        success: true,
        data: department,
      });
    } catch (error) {
      next(error);
    }
  };

export const getDepartments =
  async (
    req,
    res,
    next
  ) => {
    try {
      const departments =
        await departmentService.getDepartments();

      return res.json({
        success: true,
        data: departments,
      });
    } catch (error) {
      next(error);
    }
  };

export const getDepartment =
  async (
    req,
    res,
    next
  ) => {
    try {
      const department =
        await departmentService.getDepartment(
          req.params.id
        );

      return res.json({
        success: true,
        data: department,
      });
    } catch (error) {
      next(error);
    }
  };

export const updateDepartment =
  async (
    req,
    res,
    next
  ) => {
    try {
      const department =
        await departmentService.updateDepartment(
          req.params.id,
          req.body
        );

      return res.json({
        success: true,
        data: department,
      });
    } catch (error) {
      next(error);
    }
  };

export const deleteDepartment =
  async (
    req,
    res,
    next
  ) => {
    try {
      await departmentService.deleteDepartment(
        req.params.id
      );

      return res.json({
        success: true,
        message:
          "Department deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };