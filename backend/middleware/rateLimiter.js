import rateLimit from "../config/upstash.js";

const ratelimiter = async (req, res, next) => {
  try {
    const { success } = await rateLimit.limit("my-limit-key");//per user with userId instead of my-limit-key
    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later",
      });
    }
    next();
  } catch (err) {
    console.log("Error: ", err);
    next(err);
  }
};

export default ratelimiter;
