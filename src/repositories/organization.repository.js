import prisma from "../config/prisma.js";

class OrganizationRepository {
  async create(data) {
    return prisma.organization.create({
      data,
    });
  }

  async findAll() {
    return prisma.organization.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id) {
    return prisma.organization.findUnique({
      where: { id },
    });
  }

  async update(id, data) {
    return prisma.organization.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return prisma.organization.delete({
      where: { id },
    });
  }
}

export default new OrganizationRepository();