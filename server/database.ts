import * as _ from "lodash";
import { LESSONS, USERS } from "./database-data";
import { DbUser } from "./db-user";

class InMemoryDatabase {
  userCounder = 0;
  readAllLessons() {
    return _.values(LESSONS);
  }

  createUser(email: string, password: string) {
    const id = ++this.userCounder;
    const user: DbUser = {
      id,
      email,
      password
    };
    USERS[id] = user;
    return user;
  }
}

export const db = new InMemoryDatabase();
