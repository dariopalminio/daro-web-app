require('@testing-library/react');
import { renderHook, act } from '@testing-library/react-hooks'
import useUser from "../../hooks/useUser";


test('test login in useUser hook when it fail', () => {
    const { result } = renderHook(() => useUser());

    act(() => {
        result.current.login("bad@gmail.com", "fake-password");
    })

    expect(result.current.isLogged).toBe(false);
});

