import prisma from "../config/prisma.js";

class ChatSessionRepository {

  async create(data) {
    return prisma.chatSession.create({
      data,
    });
  }

  async findById(id) {
    return prisma.chatSession.findUnique({
      where: {
        id,
      },

      include: {
        messages: true,
      },
    });
  }

  async findActiveSessionByPhone(phone) {

    if (!phone) {
      return null;
    }

    return prisma.chatSession.findFirst({

      where: {

        visitorPhone: phone,

        status: "ACTIVE",

      },

      orderBy: {
        createdAt: "desc",
      },

    });

  }

  async findActiveSessionByEmail(email) {

    if (!email) {
      return null;
    }

    return prisma.chatSession.findFirst({

      where: {

        visitorEmail: email,

        status: "ACTIVE",

      },

      orderBy: {
        createdAt: "desc",
      },

    });

  }

  async update(id, data) {
    return prisma.chatSession.update({
      where: {
        id,
      },
      data,
    });
  }

  async markEscalated(id) {

    return prisma.chatSession.update({

      where: {
        id,
      },

      data: {

        isEscalated: true,

        escalatedAt:
          new Date(),

      },

    });

  }

  async closeSession(id) {

    return prisma.chatSession.update({

      where: {
        id,
      },

      data: {

        status: "CLOSED",

        endedAt:
          new Date(),

      },

    });

  }

  async getRecentSessions(
    limit = 20
  ) {

    return prisma.chatSession.findMany({

      take: limit,

      orderBy: {
        createdAt: "desc",
      },

      include: {
        messages: true,
      },

    });

  }

  async deleteOldSessions(days = 30) {

    const cutoffDate =
      new Date(
        Date.now() -
        days * 24 * 60 * 60 * 1000
      );

    return prisma.chatSession.deleteMany({

      where: {

        createdAt: {

          lt: cutoffDate,

        },

      },

    });

  }

}

export default new ChatSessionRepository();