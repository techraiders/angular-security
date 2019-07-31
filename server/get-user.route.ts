import { Request, Response } from "express";
import { sessionStore } from "./session-store";

export function getUser(req: Request, res: Response) {
  const {
    cookies: { SESSIONID }
  } = req;

  const user = sessionStore.findUserBySessionId(SESSIONID);
  if (user) {
    res.status(200).send(user);
  } else {
    res.sendStatus(204);
  }
}
