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
      if (session && session.isValid()) {
        return session.user;
      }
    }
  }
  isSessionValid(sessionId: string) {
    if (sessionId) {
      const session = this.sessions[sessionId];
      if (session) {
        return session.isValid();
      }
    }
  }
  destroySession(sessionId: string) {
    delete this.sessions[sessionId];
  }
}

export const sessionStore = new SessionStore();
