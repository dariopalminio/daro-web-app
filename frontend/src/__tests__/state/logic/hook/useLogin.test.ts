require('@testing-library/react');
import { renderHook, act } from '@testing-library/react-hooks';
import useLogin from "../../../../state/logic/hook/useLogin";

const userOk = "ok";
const passOk = "ok";

// First: mock service for authenticate user and pass
jest.mock("../../../../source/client/user/LoginService", () => {
    return async function loginService(user: string, pass: string): Promise<any> {
        return await new Promise<any>(
            function (resolve, reject) {
                if ((user == userOk) && (pass == passOk)) {
                    let jwtExample = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0.yRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw';
                    resolve(jwtExample); // fulfilled
                } else {
                    var reason = new Error('Response is NOT OK. Could not authenticate!');
                    reject(reason); // reject
                }
            }
        );
    }
});

/*
// Second: mock service for retrieve user information
jest.mock("../../../client/user/GetUserInfoService", () => {
    return async function getUserInfoService(jwt: string): Promise<any> {
        return await new Promise<any>(
            function (resolve, reject) {
                let jwtExample = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0.yRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw';
                if (jwt == jwtExample) {
                    const data = {
                        email: "test@gmail.com",
                        email_verified: true,
                        given_name: "test",
                        preferred_username: "test",
                        sub: "23423432423423423", // sub is the ID
                      };
                    resolve(data); // fulfilled
                } else {
                    var reason = new Error('Response is NOT OK. Could not authenticate!');
                    reject(reason); // reject
                }
            }
        );
    }
});
*/

describe('Test useUser Hook', () => {

    test('login with BAD credentials should to FAIL', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useLogin());

        act(() => {
            result.current.login("bad", "bad");
        })

        await waitForNextUpdate();
        expect(result.current.isLoggedOk).toBe(false);
    });

    test('login with credentials OK should be SUCCESSFUL', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useLogin());

        act(() => {
            result.current.login(userOk, passOk);
        })

        await waitForNextUpdate();
        expect(result.current.isLoggedOk).toBe(true);
    });

});