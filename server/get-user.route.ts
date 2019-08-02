import { Request, Response } from "express";
import { db } from "./database";

export function getUser(req: Request, res: Response) {
  // TODO retrieve the actual user based on JWT content
  const user = db.findUserById(req["userId"]);

  if (user) {
    const { email, id } = user;
    res.status(200).json({ email, id });
  } else {
    res.sendStatus(204);
  }
}
