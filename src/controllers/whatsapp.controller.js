import WhatsAppService
from "../services/whatsapp/whatsapp.service.js";

import logger
from "../utils/logger.js";

export const webhook = async (
  req,
  res,
  next
) => {

  try {

    logger.info({
      event: "WHATSAPP_WEBHOOK_RECEIVED",
      body: req.body,
    });

    const incomingMessage =
      req.body.Body;

    const sender =
      req.body.From;

    logger.info({
      event: "WHATSAPP_MESSAGE_RECEIVED",
      sender,
      message: incomingMessage,
    });

    await WhatsAppService
      .processIncomingMessage({
        from: sender,
        message: incomingMessage,
      });

    logger.info({
      event: "WHATSAPP_MESSAGE_PROCESSED",
      sender,
    });

    return res
      .status(200)
      .send("OK");

  } catch (error) {

    logger.error({
      event: "WHATSAPP_WEBHOOK_ERROR",
      message: error.message,
      stack: error.stack,
    });

    next(error);

  }

};