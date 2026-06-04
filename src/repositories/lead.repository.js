import prisma from "../config/prisma.js";

class LeadRepository {
  async create(data) {
    return prisma.lead.create({
      data,
    });
  }

  async findById(id) {
    return prisma.lead.findUnique({
      where: { id },

      include: {
        assignedTo: true,
      },
    });
  }

  async update(id, data) {
    return prisma.lead.update({
      where: { id },
      data,
    });
  }

  async assignLead(leadId, userId) {
    return prisma.lead.update({
      where: {
        id: leadId,
      },

      data: {
        assignedToId: userId,
        status: "ASSIGNED",
      },
    });
  }

  async findByDepartment(department) {
    return prisma.lead.findMany({
      where: {
        department,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findAll() {
    return prisma.lead.findMany({
      include: {
        assignedTo: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }
}

export default new LeadRepository();