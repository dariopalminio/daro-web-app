export interface IHookState {
    isProcessing: boolean, hasError: boolean, msg: string, isSuccess: boolean
}

export const InitialState: IHookState = { isProcessing: false, hasError: false, msg: '', isSuccess: false }