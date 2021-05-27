import { cleanup } from '@testing-library/react'
import axios from 'axios';
import { LoginRequest, loginService } from '../../services/UserService'

afterEach(cleanup);

test('loginService mocking axios OK request', async () => {

    const jwtExample = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0.yRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw'
    
    const responseOKMocked =
    {
      data: { access_token: jwtExample },
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
      request: {}
    }

    let loginRequestData: LoginRequest = { email: "e@mail.com", password: "123" }

    const myMock = jest.fn()

    axios.post = myMock.mockResolvedValue(responseOKMocked)

    const service = await loginService(loginRequestData)

    expect(service).toBeDefined();
    expect(service).toBe(jwtExample);
    });
