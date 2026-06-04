import redisClient
from "../../config/redis.js";

class RateLimiterService {

  async checkLimit(userId) {

    const key =
      `rate_limit:${userId}`;

    const currentCount =
      await redisClient.get(key);

    // First message
    if (!currentCount) {

      await redisClient.set(
        key,
        1,
        {
          EX: 60 * 60, // 1 hour
        }
      );

      return {
        allowed: true,
        remaining: 39,
      };

    }

    const count =
      Number(currentCount);

    // Limit reached
    if (count >= 40) {

      const ttl =
        await redisClient.ttl(
          key
        );

      return {
        allowed: false,
        remaining: 0,
        retryAfter: ttl,
      };

    }

    await redisClient.incr(key);

    return {
      allowed: true,
      remaining:
        40 - (count + 1),
    };

  }

}

export default new RateLimiterService();