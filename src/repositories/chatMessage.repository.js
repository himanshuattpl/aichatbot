// import prisma from "../config/prisma.js";

// class ChatMessageRepository {
//   async create(data) {
//     return prisma.chatMessage.create({
//       data,
//     });
//   }

//   async createMany(messages) {
//     return prisma.chatMessage.createMany({
//       data: messages,
//     });
//   }

//   async getSessionMessages(sessionId) {
//     return prisma.chatMessage.findMany({
//       where: {
//         sessionId,
//       },

//       orderBy: {
//         createdAt: "asc",
//       },
//     });
//   }

//   async deleteSessionMessages(sessionId) {
//     return prisma.chatMessage.deleteMany({
//       where: {
//         sessionId,
//       },
//     });
//   }
// }

// export default new ChatMessageRepository();

import prisma from "../config/prisma.js";

class ChatMessageRepository {

  async create(data) {
    return prisma.chatMessage.create({
      data,
    });
  }

  async createMany(messages) {
    return prisma.chatMessage.createMany({
      data: messages,
    });
  }

  async getSessionMessages(sessionId) {
    return prisma.chatMessage.findMany({
      where: {
        sessionId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }

  async getLastMessages(
    sessionId,
    limit = 20
  ) {

    return prisma.chatMessage.findMany({
      where: {
        sessionId,
      },

      orderBy: {
        createdAt: "desc",
      },

      take: limit,
    });

  }

  async deleteSessionMessages(sessionId) {
    return prisma.chatMessage.deleteMany({
      where: {
        sessionId,
      },
    });
  }

}

export default new ChatMessageRepository();