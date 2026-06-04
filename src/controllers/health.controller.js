import prisma
from "../config/prisma.js";

export const healthCheck =
  async (req, res) => {

    try {

      await prisma.$queryRaw`SELECT 1`;

      return res.status(200).json({
        status: "OK",
        database: "CONNECTED",
        timestamp:
          new Date().toISOString(),
      });

    } catch {

      return res.status(500).json({
        status: "FAILED",
        database: "DISCONNECTED",
      });

    }

  };