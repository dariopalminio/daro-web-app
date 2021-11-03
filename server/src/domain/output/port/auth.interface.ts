export interface IAuth {

    getAdminToken(): Promise<string>;

    register(
        username: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        adminToken: string): Promise<any>;
    
    getUserInfoByAdmin(username: string, adminToken: string): Promise<any | undefined>;
    
    deleteAuthUser(authId: string, accessToken: string): Promise<any>;
  }