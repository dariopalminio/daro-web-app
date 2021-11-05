export interface IAuthResponse {
    isSuccess: boolean, 
    status: number, //HTTP status
    error: string, 
    data: any
  }