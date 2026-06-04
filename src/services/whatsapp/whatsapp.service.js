import ChatService
from "../chat/chat.service.js";

import {
  sendWhatsAppMessage
} from "../../config/twilio.js";

import {
  PLATFORMS
} from "../../constants/index.js";

class WhatsAppService {

  async processIncomingMessage({
    from,
    message
  }) {

    const chatResponse =
      await ChatService.sendMessage({
        message,
        platform:
          PLATFORMS.WHATSAPP,
      });

    await sendWhatsAppMessage(
      from,
      chatResponse.response
    );

    return chatResponse;
  }
}

export default new WhatsAppService();