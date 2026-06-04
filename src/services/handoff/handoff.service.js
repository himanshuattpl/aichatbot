import {
  chatSessionRepository,
  chatMessageRepository,
} from "../../repositories/index.js";

import {
  sendWhatsAppMessage,
} from "../../config/twilio.js";

import logger
from "../../utils/logger.js";

import env
from "../../config/env.js";

class HandoffService {

  async escalateSession(
    sessionId
  ) {

    try {

      const session =
        await chatSessionRepository
          .findById(
            sessionId
          );

      if (!session) {

        throw new Error(
          "SESSION_NOT_FOUND"
        );

      }

      // Already escalated

      if (
        session.isEscalated
      ) {

        logger.info({
          event:
            "SESSION_ALREADY_ESCALATED",
          sessionId,
        });

        return;

      }

      // Mark escalated

      await chatSessionRepository
        .markEscalated(
          sessionId
        );

      // Add system message

      await chatMessageRepository
        .create({
          sessionId,
          sender:
            "SYSTEM",
          message:
            "Conversation transferred to human support.",
        });

      // Last 20 messages

      const messages =
        await chatMessageRepository
          .getLastMessages(
            sessionId,
            20
          );

      const orderedMessages =
        messages.reverse();

      const transcript =
        orderedMessages
          .map(
            (msg) =>
              `[${msg.sender}] ${msg.message}`
          )
          .join("\n");

      const handoffMessage =
`
🚨 AI HANDOFF ALERT

Session ID:
${session.id}

Department:
${session.department}

Platform:
${session.platform}

Customer:
${session.visitorPhone || "Unknown"}

Last 20 Messages:

${transcript}
`;

      await sendWhatsAppMessage(
        env.LEAD_MANAGER_WHATSAPP,
        handoffMessage
      );

      logger.info({
        event:
          "CHAT_ESCALATED",
        sessionId,
      });

    } catch (error) {

      logger.error({
        event:
          "HANDOFF_ERROR",
        sessionId,
        error:
          error.message,
      });

      throw error;

    }

  }

}

export default new HandoffService();