//Auth tokens
export type Tokens = {
    access_token: string; //JWT
    refresh_token: string;
    expires_in: number;
    refresh_expires_in: number;
    //token_type: string;
    //'not-before-policy': number;
    //session_state: string;
    //scope: string;
    date: Date;
  };