import { forbiddenError } from "@/lib/errors";
import * as jwt from "hono/jwt";

const generateAccessToken = async (
  userId: string,
  fullName: string,
  role: string
) => {
  const data = await jwt.sign(
    {
      id: userId,
      fullName: fullName,
      role: role,
      type: "access",
      exp: Math.floor(Date.now() / 1000) + 60 * 15, // 15 mins
    },
    process.env.ACCESS_TOKEN_SECRET as string
  );

  return data;
};

const generateRefreshToken = async (userId: string) => {
  const data = await jwt.sign(
    {
      id: userId,
      type: "refresh",
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 1, // 1 day
    },
    process.env.REFRESH_TOKEN_SECRET as string
  );

  return data;
};

const validateRefreshToken = (refreshToken: string) => {
  try {
    const payload = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    );
    return payload; // Decoded token payload
  } catch (err) {
    console.error("Refresh token verification failed:", err);

    if (err) forbiddenError("Invalid token");

    return null; // Token invalid or expired
  }
};

export { generateAccessToken, generateRefreshToken, validateRefreshToken };
