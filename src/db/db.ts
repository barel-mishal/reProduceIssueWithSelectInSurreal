import * as Surreal from "surrealdb.js";
// make there is not port 8000 in use
// surreal start --log debug --user projectDb --pass projectDb --bind 127.0.0.1:8000 file://projectDb/db.db
// surreal sql --conn http://localhost:8000 --db projectDb --ns projectDb --pretty --user projectDb --pass projectDb

`
  CREATE user:123 CONTENT {
    email: "b.m@mail.com",
    name: "Bobby"
  };

  CREATE user CONTENT {
    email: "something",
    name: "something"
};
`



export enum NS {
    projectDb,
  }
  export enum DB {
    projectDb,
  }
  export enum SC {
    USER = "projectDb",
  }
  export interface SurrealVars {
    NS: NS;
    DB: DB;
    SC: SC;
    email: string;
    pass: string;
  }
  
  export interface VARS {
    [key: string]: any;
  }
  
  export type surrealtype = any;
  export interface Db {
    connect: (url: string) => surrealtype;
    wait: () => surrealtype;
    close: () => surrealtype;
    use: (ns: NS, db: DB) => surrealtype;
    signup: (vars: SurrealVars) => surrealtype;
    signin: (vars: SurrealVars) => surrealtype;
    invalidate: () => surrealtype;
    authenticate: (token: string) => surrealtype;
    let: (key: string, val: any) => surrealtype; // Switch to a specific namespace and database.
    query: (query: string, vars: VARS) => surrealtype;
    select: (thing: string) => surrealtype;
    create: (thing: string, data: VARS) => surrealtype;
    update: (thing: string, data: VARS) => surrealtype;
    change: (thing: string, data: VARS) => surrealtype;
    modify: (thing: string, data: VARS) => surrealtype;
    delete: (thing: string) => surrealtype;
  }

  const db = new Surreal.default("http://127.0.0.1:8000/rpc");
//   if (!db) throw new Error("db not connected");
  export async function main() {
    try {
      // Signin as a namespace, database, or projectDb user
      await db.signin({
        user: "projectDb",
        pass: "projectDb",
      });
      // Select a specific namespace / database
      await db.use("projectDb", "projectDb");
      return db;
    } catch (e) {
      console.error("ERROR", e);
    }
  };

  export const useDb = await main();
