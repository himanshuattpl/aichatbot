import prisma from "../config/prisma.js";

class DepartmentRepository {
  async create(data) {
    return prisma.department.create({
      data,
    });
  }

  async findAll() {
    return prisma.department.findMany({
      include: {
        organization: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id) {
    return prisma.department.findUnique({
      where: { id },

      include: {
        organization: true,
        services: true,
      },
    });
  }

  async update(id, data) {
    return prisma.department.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return prisma.department.delete({
      where: { id },
    });
  }
}

export default new DepartmentRepository();