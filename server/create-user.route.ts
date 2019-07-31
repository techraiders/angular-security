import { Request, Response } from "express";
import { db } from "./database";
import { USERS } from "./database-data";
import * as argon2 from "argon2";
import { validatePassword } from "./password-validation";
import { randomBytes } from "./security.utils";
import { sessionStore } from "./session-store";

export function createUser(req: Request, res: Response) {
  const credentials = req.body;

  const errors = validatePassword(credentials.password);

  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    createUerAndSession(res, credentials);
  }
}

async function createUerAndSession(res: Response, credentials) {
  const passwordDigest = await argon2.hash(credentials.password);
  const user = db.createUser(credentials.email, passwordDigest);

  const bytes = await randomBytes(32);
  const sessionId = bytes.toString("hex");

  sessionStore.createSession(sessionId, user);

  res.cookie("SESSIONID", sessionId, { httpOnly: true, secure: true });
  res.status(200).json({ id: user.id, email: user.email });
}
