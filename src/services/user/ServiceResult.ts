export type ServiceResult<T = any> = {
    isSuccess: boolean;
    errorCode?: number;
    error?: any;
    data?: T;
  };