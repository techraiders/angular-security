import { Session } from "./session";
import { User } from "../src/app/model/user";

class SessionStore {
  private sessions: { [key: string]: Session } = {};

  createSession(sessionId: string, user: User) {
    this.sessions[sessionId] = new Session(sessionId, user);
  }

  findUserBySessionId(sessionId): User {
    if (sessionId) {
      const session = this.sessions[sessionId];
      let isSessionValid;
      if (session) {
        isSessionValid = session.isValid();
      }

      if (isSessionValid) {
        return session.user;
      }
    }
  }
}

export const sessionStore = new SessionStore();
