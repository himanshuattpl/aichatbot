import {
  verifyToken,
} from "../utils/jwt.js";
import {
  ROLE_PERMISSIONS,
} from "../utils/rolePermissions.js";


export const authenticate =
  (req, res, next) => {
    try {
      const authHeader =
        req.headers.authorization;

      if (
        !authHeader ||
        !authHeader.startsWith(
          "Bearer "
        )
      ) {
        return res.status(401).json({
          success: false,
          message:
            "Unauthorized",
        });
      }

      const token =
        authHeader.split(" ")[1];

      const decoded =
        verifyToken(token);

      req.user = decoded;

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid token",
      });
    }
  };

  export const authorize =
  (...requiredPermissions) =>
  (req, res, next) => {
    const role =
      req.user.role;

    const permissions =
      ROLE_PERMISSIONS[
        role
      ] || [];

    const hasPermission =
      requiredPermissions.every(
        (permission) =>
          permissions.includes(
            permission
          )
      );

    if (!hasPermission) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    next();
  };