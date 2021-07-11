import {
    isTokenExpired,
} from "../../../domain/context/session.context";


describe("Test SessionContext ", () => {

    test("Token expired is true when expires_in is 0 and the two dates are the same.", () => {
        var today1 = new Date();
        var today2 = new Date();
        const expired: boolean = isTokenExpired(0, today1, today2);
        expect(expired).toBe(true);

    });

    test("Token expired is true when expires_in is 0 and there is a day difference.", () => {
        var today1 = new Date();
        today1.setDate(today1.getDate() - 1); // Substract 1 day
        var today2 = new Date();
        const expired: boolean = isTokenExpired(60, today1, today2);
        expect(expired).toBe(true);
    });

    test("Token expired is false when expires_in is 60 and 10 seconds passed.", () => {
        var today1 = new Date("July 21, 1983 01:15:00");
        var today2 = new Date("July 21, 1983 01:15:10");
        const expired: boolean = isTokenExpired(60, today1, today2);
        expect(expired).toBe(false);
    });

});

