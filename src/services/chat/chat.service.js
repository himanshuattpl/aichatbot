import GeminiService from "../ai/gemini.service.js";
import DepartmentRouterService from "../ai/departmentRouter.service.js";
import CacheService from "../cache/cache.service.js";
import RateLimiterService from "../rateLimiter/rateLimiter.service.js";
import logger from "../../utils/logger.js";
import HandoffService from "../handoff/handoff.service.js";

import generalPrompt from "../../prompts/general.prompt.js";
import emsPrompt from "../../prompts/ems.prompt.js";
import agritechPrompt from "../../prompts/agritech.prompt.js";

import { chatSessionRepository, chatMessageRepository } from "../../repositories/index.js";
import { PLATFORMS } from "../../constants/index.js";
import VisitorQualificationService from "../../utils/visitorDetails.util.js";

// ─── Human request keywords ───────────────────────────────────────────────────
// Checked BEFORE Gemini — catches direct requests instantly without AI round-trip
const HUMAN_REQUEST_PATTERNS = [
  /\b(human|agent|person|staff|representative)\b/i,
  /\b(talk|speak|chat|connect|switch|transfer)\b.{0,20}\b(human|agent|person|someone|support|team)\b/i,
  /\b(want|need|can i|could i|would like)\b.{0,30}\b(human|agent|live|real|support)\b/i,
  /real person/i,
  /live (agent|support|chat)/i,
  /connect me (to|with)/i,
  /not helpful/i,
  /talk to (your )?team/i,
  /human assist/i,
  /i want.{0,20}human/i,
];

const isHumanRequest = (message) =>
  HUMAN_REQUEST_PATTERNS.some((p) => p.test(message));

const generateWhatsAppRedirect = (
  session,
  visitorName,
  visitorEmail,
  visitorPhone
) => {
  return `https://wa.me/918305334067?text=${encodeURIComponent(
`Hello ATTPL Team,

Session ID: ${session.id}

Name: ${visitorName || "NA"}
Email: ${visitorEmail || "NA"}
Phone: ${visitorPhone || "NA"}

Department: ${session.department}

I need assistance from a human representative.`
  )}`;
};

class ChatService {

  async sendMessage({
  message,
  sessionId,
  userId,

  visitorName,
  visitorEmail,
  visitorPhone,
  ip,

  platform = PLATFORMS.WEBSITE
}) {
    const startTime = Date.now();
    let session;

    try {

      // =========================
      // RATE LIMIT
      // =========================
      const limitResult = await RateLimiterService.checkLimit(userId);
      if (!limitResult.allowed) {
        return {
          sessionId: null,
          department: null,
          response: "You have reached the limit of 40 messages per hour. Please try again later.",
          handoff: false,
        };
      }

      // =========================
      // SESSION
      // =========================
      if (sessionId) {
        session = await chatSessionRepository.findById(sessionId);

        // AI is silenced if human has already taken over
        if (session && session.isEscalated) {
          logger.info({ event: "AI_SILENCED_FOR_HUMAN_TAKEOVER", sessionId: session.id });
          return {
            sessionId: session.id,
            department: session.department,
            response: "Your conversation is with a human agent now. They will contact you on WhatsApp shortly.",
            handoff: true,
          };
        }
      }

      let activePromptType = "GENERAL";

      if (sessionId && session) {
        activePromptType = session.department;
      }

//       if (!session) {
//         const detectedDept = DepartmentRouterService.detectDepartment(message);
//         activePromptType = detectedDept;

//        const dbDepartmentValue =
//   detectedDept === "GENERAL"
//     ? "AGRITECH"
//     : detectedDept;

// session = await chatSessionRepository.create({
//   department: dbDepartmentValue,
//   platform,

//   visitorName,
//   visitorEmail,
//   visitorPhone,
// });

      //   logger.info({
      //     event: "CHAT_SESSION_CREATED",
      //     sessionId: session.id,
      //     department: dbDepartmentValue,
      //     uiPromptState: detectedDept,
      //   });
      // }

      if (!session) {

  session = await chatSessionRepository.create({
    department: "GENERAL",
    platform,
    visitorName,
    visitorEmail,
    visitorPhone,
  });

  activePromptType = "GENERAL";

  logger.info({
    event: "CHAT_SESSION_CREATED",
    sessionId: session.id,
    department: "GENERAL",
  });
}
const extracted =
  VisitorQualificationService.extract(message);

  if (extracted) {

  await chatSessionRepository.update(
    session.id,
    {
      visitorName: extracted.visitorName,
      visitorPhone: extracted.visitorPhone,
      visitorEmail: extracted.visitorEmail,
    }
  );

  session.visitorName = extracted.visitorName;
  session.visitorPhone = extracted.visitorPhone;
  session.visitorEmail = extracted.visitorEmail;
}

// ======================================
// VISITOR QUALIFICATION CHECK
// ======================================

const missingFields = [];

if (!session.visitorName) {
  missingFields.push("Full Name");
}

if (!session.visitorPhone) {
  missingFields.push("Mobile Number");
}

if (!session.visitorEmail) {
  missingFields.push("Email Address");
}

if (missingFields.length > 0) {

  const qualificationMessage =
    `Welcome to ATTPL Group.\n\nBefore we proceed, please provide:\n\n${missingFields.map(field => `• ${field}`).join("\n")}`;

  await chatMessageRepository.create({
    sessionId: session.id,
    sender: "AI",
    message: qualificationMessage,
    responseTimeMs: Date.now() - startTime,
  });

  return {
    sessionId: session.id,
    department: "GENERAL",
    response: qualificationMessage,
    handoff: false,
  };
}

      // Continuous department switch
      const detailsCollected =
  session.visitorName &&
  session.visitorEmail &&
  session.visitorPhone;

if (detailsCollected) {

  const continuousCheck =
    DepartmentRouterService.detectDepartment(message);

  if (continuousCheck !== "GENERAL") {

    activePromptType = continuousCheck;

    if (session.department !== continuousCheck) {

      await chatSessionRepository.update(
        session.id,
        {
          department: continuousCheck,
        }
      );

      session.department = continuousCheck;
    }
  }
}

      // =========================
      // SAVE USER MESSAGE
      // =========================
      await chatMessageRepository.create({
        sessionId: session.id,
        sender: "USER",
        message,
      });

      // =========================
      // HUMAN REQUEST DETECTION
      // Runs before Gemini — catches all direct requests instantly
      // =========================
      if (isHumanRequest(message)) {
        logger.info({ event: "HUMAN_REQUEST_DETECTED", sessionId: session.id, message });

        try {
          await HandoffService.escalateSession(session.id);
        } catch (handoffError) {
          logger.error({ event: "HANDOFF_ERROR", sessionId: session.id, error: handoffError.message });
        }

        const handoffResponse =
          "I'm connecting you to a human agent now. ✅ Your full conversation has been sent to our support team on WhatsApp. They will contact you shortly.";

        await chatMessageRepository.create({
          sessionId: session.id,
          sender: "AI",
          message: handoffResponse,
          responseTimeMs: Date.now() - startTime,
        });

        logger.info({ event: "CHAT_RESPONSE_SENT", sessionId: session.id, responseTime: Date.now() - startTime });

        return {
  sessionId: session.id,
  department: session.department,
  response: handoffResponse,
  handoff: true,

  whatsappRedirect: generateWhatsAppRedirect(
    session,
    visitorName,
    visitorEmail,
    visitorPhone
  ),
};
      }

      // =========================
      // LAST 20 MESSAGES
      // =========================
      const history = await chatMessageRepository.getLastMessages(session.id, 20);

      if (history.length > 2 && activePromptType === "GENERAL") {
        activePromptType = session.department;
      }

      // Auto-handoff after 12 user messages
      const userMessageCount = history.filter((msg) => msg.sender === "USER").length;
      let forceHandoff = userMessageCount >= 12;

      const conversationHistory = [...history]
        .reverse()
        .map((msg) => `${msg.sender}: ${msg.message}`)
        .join("\n");

      // =========================
      // CACHE CHECK
      // =========================
      if (!forceHandoff) {
        const cachedResponse = await CacheService.get(activePromptType, message);
        if (cachedResponse) {
          logger.info({ event: "CACHE_HIT", sessionId: session.id });

          await chatMessageRepository.create({
            sessionId: session.id,
            sender: "AI",
            message: cachedResponse,
            responseTimeMs: Date.now() - startTime,
          });

          logger.info({ event: "CHAT_RESPONSE_SENT", sessionId: session.id, responseTime: Date.now() - startTime });

          return {
            sessionId: session.id,
            department: session.department,
            response: cachedResponse,
            handoff: false,
          };
        }
      }

      // =========================
      // PROMPT SELECTION
      // =========================
      let systemPrompt;
      if (activePromptType === "EMS") systemPrompt = emsPrompt;
      else if (activePromptType === "AGRITECH") systemPrompt = agritechPrompt;
      else systemPrompt = generalPrompt;

      const finalPrompt = `
${systemPrompt}

Conversation History:
${conversationHistory}

Current User Question:
${message}
`;

      // =========================
      // GEMINI
      // =========================
      let aiResponse;

      if (!forceHandoff) {
        try {
          aiResponse = await GeminiService.generateResponse(finalPrompt);

          // If Gemini itself says to redirect → trigger handoff
          if (aiResponse.toLowerCase().includes("redirecting you to a human assistant")) {
            forceHandoff = true;
          }

        } catch (error) {
          logger.error({ event: "GEMINI_ERROR", sessionId: session.id, error: error.message });
          forceHandoff = true;

          aiResponse = error.message === "GEMINI_QUOTA_EXCEEDED"
            ? "Our AI service is experiencing high demand. I am redirecting you to a human assistant now."
            : "Thank you for contacting ATTPL. I am redirecting you to a human assistant on WhatsApp now.";
        }
      } else {
        aiResponse =
          "Thank you for sharing your requirements. I am redirecting you to a human assistant on WhatsApp now. A specialist will contact you with a formal proposal shortly.";
      }

      // =========================
      // FORCE HANDOFF (auto / Gemini keyword / error)
      // =========================
      if (forceHandoff) {
        try {
          await HandoffService.escalateSession(session.id);
          logger.info({
            event: "AUTOMATIC_WHATSAPP_HANDOFF_TRIGGERED",
            sessionId: session.id,
            reason: userMessageCount >= 12 ? "MESSAGE_COUNT_LIMIT" : "GEMINI_KEYWORD_OR_ERROR",
          });
        } catch (handoffError) {
          logger.error({ event: "HANDOFF_ERROR", sessionId: session.id, error: handoffError.message });
        }
      }

      // =========================
      // CACHE SAVE + SAVE AI MSG
      // =========================
      await CacheService.set(activePromptType, message, aiResponse);

      await chatMessageRepository.create({
        sessionId: session.id,
        sender: "AI",
        message: aiResponse,
        responseTimeMs: Date.now() - startTime,
      });

      logger.info({ event: "CHAT_RESPONSE_SENT", sessionId: session.id, responseTime: Date.now() - startTime });

      return {
  sessionId: session.id,
  department: session.department,
  response: aiResponse,
  handoff: forceHandoff,

  whatsappRedirect: forceHandoff
    ? generateWhatsAppRedirect(
        session,
        visitorName,
        visitorEmail,
        visitorPhone
      )
    : null,
};

    } catch (error) {
      logger.error({ event: "CHAT_SERVICE_ERROR", error: error.message, stack: error.stack });
      throw error;
    }
  }
}

export default new ChatService();