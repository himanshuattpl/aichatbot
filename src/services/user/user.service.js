import {
  hashPassword,
} from "../../utils/password.js";

import {
  canManageRole,
} from "../../utils/canManageRole.js";

import userRepository
  from "../../repositories/user.repository.js";

class UserService {
  async createUser(
    currentUser,
    userData
  ) {
    const allowed =
      canManageRole(
        currentUser.role,
        userData.role
      );

    if (!allowed) {
      throw new Error(
        "You are not allowed to create this role"
      );
    }

    if (
      currentUser.role ===
      "DEPARTMENT_HEAD"
    ) {
      if (
        currentUser.departmentId !==
        userData.departmentId
      ) {
        throw new Error(
          "Can only create users in your department"
        );
      }
    }

    const existingUser =
      await userRepository.findByEmail(
        userData.email
      );

    if (existingUser) {
      throw new Error(
        "User already exists"
      );
    }

    const hashedPassword =
      await hashPassword(
        userData.password
      );

    return userRepository.create({
      ...userData,
      password:
        hashedPassword,
    });
  }

  async updateUser(
    currentUser,
    targetUserId,
    updateData
  ) {
    const targetUser =
      await userRepository.findById(
        targetUserId
      );

    if (!targetUser) {
      throw new Error(
        "User not found"
      );
    }

    const isSelf =
      currentUser.id ===
      targetUser.id;

    if (!isSelf) {
      const allowed =
        canManageRole(
          currentUser.role,
          targetUser.role
        );

      if (!allowed) {
        throw new Error(
          "Not authorized"
        );
      }

      if (
        currentUser.role ===
        "DEPARTMENT_HEAD"
      ) {
        if (
          currentUser.departmentId !==
          targetUser.departmentId
        ) {
          throw new Error(
            "Cannot manage another department"
          );
        }
      }
    }

    return userRepository.update(
      targetUserId,
      updateData
    );
  }

  async deleteUser(
    currentUser,
    targetUserId
  ) {
    const targetUser =
      await userRepository.findById(
        targetUserId
      );

    if (!targetUser) {
      throw new Error(
        "User not found"
      );
    }

    const allowed =
      canManageRole(
        currentUser.role,
        targetUser.role
      );

    if (!allowed) {
      throw new Error(
        "Not authorized"
      );
    }

    if (
      currentUser.role ===
      "DEPARTMENT_HEAD"
    ) {
      if (
        currentUser.departmentId !==
        targetUser.departmentId
      ) {
        throw new Error(
          "Cannot manage another department"
        );
      }
    }

    return userRepository.delete(
      targetUserId
    );
  }

  async getUsers() {
    return userRepository.findAll();
  }
}

export default new UserService();