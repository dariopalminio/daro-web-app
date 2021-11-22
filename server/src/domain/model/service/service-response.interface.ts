

export interface IServiceResponse {
    isSuccess: boolean;
    status: number; //HTTP status
    message: string; 
    data?: any;
    error?: any;
  }
