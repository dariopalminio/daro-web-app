require('@testing-library/react');
import { waitFor } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
import useUser from "../../hooks/useUser";

jest.mock("../../services/UserService", () => {
    return async function loginService(user: string, pass: string): Promise<any> {
        return await new Promise<any>(
            function (resolve, reject) {
                if ((user == "okuser") && (pass == "okpass")) {
                    console.log(user)
                    let jwtExample = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0.yRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw'
                    resolve(jwtExample); // fulfilled
                } else {
                    var reason = new Error('Response is NOT OK. Could not authenticate!');
                    reject(reason); // reject
                }

            }
        );
    }
});


test('test login in useUser hook when it OK', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useUser());

    act(() => {
        result.current.login("bad-user", "bad-password");
    })

    await waitForNextUpdate();
    
    expect(result.current.isLogged).toBe(false);
   
});