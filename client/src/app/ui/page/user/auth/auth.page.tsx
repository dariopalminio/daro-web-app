import { FunctionComponent } from "react";
import Auth from "../../../component/user/auth/auth";

/**
 * 
 * @returns   position: fixed;
  bottom: 0;
 */
export const AuthPage: FunctionComponent = () => {
  return (
    <>
      <div>
      <br />
      <Auth />
      </div>
    </>
  );
};
