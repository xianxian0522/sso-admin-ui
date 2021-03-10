export interface User {
  code?: number;
  data: {
    email?: string;
    realName?: string
    username?: string
  };
  msg?: string;
}
