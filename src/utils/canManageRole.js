import { ROLE_HIERARCHY }
  from "../constants/roleHierarchy.js";

export const canManageRole =
  (managerRole, targetRole) => {
    return (
      ROLE_HIERARCHY[
        managerRole
      ]?.includes(
        targetRole
      ) || false
    );
  };