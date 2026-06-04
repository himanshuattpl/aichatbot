import prisma from "../config/prisma.js";

class UserRepository {
  async create(data) {
    return prisma.user.create({
      data,
    });
  }

  async findById(id) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id, data) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return prisma.user.delete({
      where: { id },
    });
  }

  async findAll() {
    return prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}

export default new UserRepository();