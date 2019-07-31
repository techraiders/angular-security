import { Request, Response } from "express";
import { db } from "./database";
import { DbUser } from "./db-user";
import * as argon2 from "argon2";
import { randomBytes } from "./security.utils";
import { sessionStore } from "./session-store";

export function login(req: Request, res: Response) {
  const credendials = req.body;
  const user = db.findUserByEmail(credendials.email);
  if (user) {
    attemptLogin(credendials, user).then(
      sessionId => {
        res.cookie("SESSIONID", sessionId, {
          httpOnly: true,
          secure: true
        });
        res.status(200).json({ id: user.id, email: user.email });
      },
      () => {
        console.log(`Login failed.`);
        res.sendStatus(403);
      }
    );
  } else {
    res.sendStatus(403);
  }
}

async function attemptLogin(credendials: any, user: DbUser) {
  const isPasswordValid = await argon2.verify(
    user.passwordDigest,
    credendials.password
  );
  if (isPasswordValid) {
    const bytes = await randomBytes(32);
    const sessionId = bytes.toString("hex");
    sessionStore.createSession(sessionId, user);
    return sessionId;
  } else {
    throw new Error("Invalid Password.");
  }
}
