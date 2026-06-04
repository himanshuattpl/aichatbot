// import crypto
// from "crypto";

// import redisClient
// from "../../config/redis.js";

// class CacheService {

//   generateKey(question) {

//     return crypto
//       .createHash("md5")
//       .update(
//         question
//           .trim()
//           .toLowerCase()
//       )
//       .digest("hex");

//   }

//   async get(question) {

//     const key =
//       this.generateKey(
//         question
//       );

//     return await redisClient.get(
//       key
//     );

//   }

//   async set(
//     question,
//     response
//   ) {

//     const key =
//       this.generateKey(
//         question
//       );

//     await redisClient.set(
//       key,
//       response,
//       {
//         EX:
//           60 *
//           60 *
//           24 *
//           30,
//       }
//     );

//   }

// }

// export default new CacheService();

import crypto from "crypto";

import redisClient
from "../../config/redis.js";

class CacheService {

  generateKey(
    department,
    question
  ) {

    return crypto
      .createHash("md5")
      .update(
        `${department}:${question}`
          .trim()
          .toLowerCase()
      )
      .digest("hex");

  }

  async get(
    department,
    question
  ) {

    const key =
      this.generateKey(
        department,
        question
      );

    return await redisClient.get(
      key
    );

  }

  async set(
    department,
    question,
    response
  ) {

    const key =
      this.generateKey(
        department,
        question
      );

    await redisClient.set(
      key,
      response,
      {
        EX:
          60 *
          60 *
          24 *
          30,
      }
    );

  }

}

export default new CacheService();