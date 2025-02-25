import jwt from "jsonwebtoken";

const createToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
};

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

export const JwtHelpers = { createToken, verifyToken };
