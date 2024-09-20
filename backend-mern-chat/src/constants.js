const DB_NAME = "chatApp";
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 10 * 24 * 60 * 60 * 1000, // 10 day
};

export { DB_NAME, COOKIE_OPTIONS };
