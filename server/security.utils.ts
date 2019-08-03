import moment = require("moment");
const util = require("util");
const crypto = require("crypto");
import * as jwt from "jsonwebtoken";
import * as fs from "fs";
import * as argon2 from "argon2";

export const randomBytes = util.promisify(crypto.randomBytes);

const signJwt = util.promisify(jwt.sign);

const RSA_PRIVATE_KEY = fs.readFileSync("./demos/private.key");

const RSA_PUBLIC_KEY = fs.readFileSync("./demos/public.key");

const SESSION_DURATION = 240;

export function createSessionToken(userId: string) {
  return jwt.sign({}, RSA_PRIVATE_KEY, {
    algorithm: "RS256",
    expiresIn: SESSION_DURATION,
    subject: userId
  });
}

export async function decodeJwt(token: string) {
  const payload = await jwt.verify(token, RSA_PUBLIC_KEY);
  console.log("decoded payload", payload);
  return payload;
}

export async function createCsrfToken(sessionToken: string) {
  // try {
  //   const bytes = await randomBytes(32);
  //   if (bytes) {
  //     return bytes.toString("hex");
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
  return argon2.hash(sessionToken);
}
