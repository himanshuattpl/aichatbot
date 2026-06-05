import organizationService
  from "../services/organization/organization.service.js";

export const createOrganization =
  async (
    req,
    res,
    next
  ) => {
    try {
      const organization =
        await organizationService.createOrganization(
          req.body
        );

      return res.status(201).json({
        success: true,
        data: organization,
      });
    } catch (error) {
      next(error);
    }
  };

export const getOrganizations =
  async (
    req,
    res,
    next
  ) => {
    try {
      const organizations =
        await organizationService.getOrganizations();

      return res.json({
        success: true,
        data: organizations,
      });
    } catch (error) {
      next(error);
    }
  };

export const getOrganization =
  async (
    req,
    res,
    next
  ) => {
    try {
      const organization =
        await organizationService.getOrganization(
          req.params.id
        );

      return res.json({
        success: true,
        data: organization,
      });
    } catch (error) {
      next(error);
    }
  };

export const updateOrganization =
  async (
    req,
    res,
    next
  ) => {
    try {
      const organization =
        await organizationService.updateOrganization(
          req.params.id,
          req.body
        );

      return res.json({
        success: true,
        data: organization,
      });
    } catch (error) {
      next(error);
    }
  };

export const deleteOrganization =
  async (
    req,
    res,
    next
  ) => {
    try {
      await organizationService.deleteOrganization(
        req.params.id
      );

      return res.json({
        success: true,
        message:
          "Organization deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };