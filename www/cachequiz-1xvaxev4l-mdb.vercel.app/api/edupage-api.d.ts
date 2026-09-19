declare module 'edupage-api' {
  export class User {
    firstname?: string;
    lastname?: string;
    userString?: string;
    login(username: string, password: string, options?: {edupage?: string}): Promise<this>;
  }
  export class LoginError extends Error {}
}
