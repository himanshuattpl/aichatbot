import {
  comparePassword,
  hashPassword,
} from "../../utils/password.js";

import {
  generateToken,
} from "../../utils/jwt.js";

import userRepository
from "../../repositories/user.repository.js";

class AuthService {
  async register(userData) {
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

    const user =
      await userRepository.create({
        ...userData,
        password:
          hashedPassword,
      });

    return user;
  }

  // async login(email, password) {
  //   const user =
  //     await userRepository.findByEmail(
  //       email
  //     );

  //   if (!user) {
  //     throw new Error(
  //       "Invalid credentials"
  //     );
  //   }

  //   const isMatch =
  //     await comparePassword(
  //       password,
  //       user.password
  //     );

  //   if (!isMatch) {
  //     throw new Error(
  //       "Invalid credentials"
  //     );
  //   }

  //   const token =
  //     generateToken({
  //       id: user.id,
  //       email: user.email,
  //       role: user.role,
  //       department:
  //         user.department,
  //     });

  //   return {
  //     token,
  //     user: {
  //       id: user.id,
  //       name: user.name,
  //       email: user.email,
  //       role: user.role,
  //       department:
  //         user.department,
  //     },
  //   };
  // }

  async login(email, password) {
  const user =
    await userRepository.findByEmail(
      email
    );

  if (!user) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const isMatch =
    await comparePassword(
      password,
      user.password
    );

  if (!isMatch) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const token =
    generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
      departmentId:
        user.departmentId,
    });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      departmentId:
        user.departmentId,
    },
  };
}

  async getProfile(userId) {
    return userRepository.findById(
      userId
    );
  }
}

export default new AuthService();