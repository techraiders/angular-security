import { db } from "./database";
import { sessionStore } from "./session-store";
import { Request, Response } from "express";

export function readAllLessons(req: Request, res: Response) {
  const {
    cookies: { SESSIONID }
  } = req;
  const isSessionValid = sessionStore.isSessionValid(SESSIONID);

  if (isSessionValid) {
    res.status(200).json({ lessons: db.readAllLessons() });
  } else {
    res.sendStatus(403);
  }
}
