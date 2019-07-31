import { Request, Response } from "express";
import { sessionStore } from "./session-store";

export function logout(req: Request, res: Response) {
  const {
    cookies: { SESSIONID }
  } = req;
  sessionStore.destroySession(SESSIONID);
  res.clearCookie(`SESSIONID`);
  res.status(200).send();
}
