// import ChatService
// from "../services/chat/chat.service.js";
// import { successResponse } from "../utils/apiResponse.js";

// export const sendMessage =
//   async (req, res, next) => {
//     try {
//       const result =
//         await ChatService.sendMessage(
//           req.body
//         );

//         return successResponse(
//           res,
//           result,
//           "Response generated"
//         )

//     } catch (error) {
//       next(error);
//     }
//   };


import ChatService
from "../services/chat/chat.service.js";

import {
  successResponse
} from "../utils/apiResponse.js";

export const sendMessage =
  async (
    req,
    res,
    next
  ) => {

    try {

      const result =
        await ChatService
          .sendMessage({

            ...req.body,

            ip:
              req.ip,

          });

      return successResponse(
        res,
        result,
        "Response generated"
      );

    } catch (error) {

      next(error);

    }

  };
