import { cleanup } from '@testing-library/react';
import axios , { AxiosResponse } from 'axios';
import loginService from '../../../../origin/client/user/LoginService';

describe('Test UserService service', () => {

    afterEach(cleanup);

    test('loginService, mocking axios OK request, should be SUCCESSFUL and responses a JWT', async () => {

        const jwtExample = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0.yRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw'

        const responseOKMocked: AxiosResponse = {
            data: { access_token: jwtExample },
            status: 200,
            statusText: "OK",
            headers: {},
            config: {},
            request: {}
        };

        const myMock = jest.fn();

        axios.post = myMock.mockResolvedValue(responseOKMocked);

        let authorized = false;
        let jwtResult = "";
        let error = null;

        await loginService('user', 'pass').then(jwt => {
            authorized = true;
            jwtResult = jwt;
        }).catch(err => {
            error = err;
        })

        expect(authorized).toBe(true);
        expect(jwtResult).toBe(jwtExample);
        expect(error).toBeNull;
    });

    test('loginService, mocking axios bad request, should be Unauthorized and responses a Error', async () => {

        const myMock = jest.fn();

        axios.post = myMock.mockResolvedValue(new Error("Unauthorized"));

        let authorized = false;
        let error = null;

        await loginService('userBad', 'passBad').then(jwt => {
            authorized = true;
        }).catch(err => {
            error = err;
        });

        expect(error).toBeInstanceOf(Error);
        expect(authorized).toBe(false);
    });

});