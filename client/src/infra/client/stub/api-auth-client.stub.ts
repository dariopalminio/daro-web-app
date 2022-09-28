import { IAuthTokensClient } from '../../../domain/service/auth-tokens-client.interface';
import { Tokens } from '../../../domain/model/auth/tokens.type';
import { IAuthClient } from '../../../domain/service/auth-client.interface';

/**
 * Stub factory function
 * This simulates a AuthApiClient with fail responses
 * @returns export default function ApiAuthClientImpl(): IAuthClient {
 */
export default function ApiAuthClientStub(): IAuthClient {

    function register(
        username: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        adminToken: string): Promise<any> {
        return new Promise<number>((resolve, reject) => {
            const response: any = {
                "data": "",
                "status": 200,
                "statusText": "OK",
                "headers": {
                    "content-length": "2",
                    "content-type": "application/json; charset=utf-8"
                },
                "config": {
                    "url": "http://localhost:3001/api/webshop/v1/auth/register",
                    "method": "post",
                    "data": "{\"username\":\"mariadelcarmenchoy@gmail.com\",\"firstName\":\"Choy\",\"lastName\":\"Maryy\",\"email\":\"mariadelcarmenchoy@gmail.com\",\"password\":\"12345Qwert\"}",
                    "headers": {
                        "Accept": "application/json, text/plain, */*",
                        "Content-Type": "application/json;charset=utf-8",
                        "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI4Tmo4RmZUODZOZXRNZXpoWWZrbDZ5VTJMWW1QOWFrUUltLWlid2ZKejJZIn0.eyJleHAiOjE2NjQzMDgxMDAsImlhdCI6MTY2NDMwNzk4MCwianRpIjoiYzQ5MTgyM2ItNWQwMS00MmU3LWJhODQtNDRiMThkNzYzNmVhIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL215LXJlYWxtLXRlc3QiLCJhdWQiOiJyZWFsbS1tYW5hZ2VtZW50Iiwic3ViIjoiMTljNDc0YjktYThlZS00NWU1LTllZDktOTJkMmJmMTU4Y2Y2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicmVzdC1jbGllbnQtdGVzdCIsInNlc3Npb25fc3RhdGUiOiJlMDAzZTExNy00ZDVlLTQyYTQtYjllMy1kZWYyZGRkMDQ3MTkiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImFwcC1hZG1pbiIsImFwcC11c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsicmVhbG0tbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJtYW5hZ2UtdXNlcnMiLCJ2aWV3LXVzZXJzIiwicXVlcnktZ3JvdXBzIiwicXVlcnktdXNlcnMiXX0sInJlc3QtY2xpZW50LXRlc3QiOnsicm9sZXMiOlsidW1hX3Byb3RlY3Rpb24iLCJhZG1pbiIsInVzZXIiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJEYXJpbyBQYWxtaW5pbyIsInByZWZlcnJlZF91c2VybmFtZSI6ImRhcmlvcGFsbWluaW9AaG90bWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiRGFyaW8iLCJmYW1pbHlfbmFtZSI6IlBhbG1pbmlvIiwiZW1haWwiOiJkYXJpb3BhbG1pbmlvQGhvdG1haWwuY29tIn0.JdKRR3SomxbiaacDTqgAavGTGPejXg0Qm7gIJHWQ333cBQ841SaGw0_mdSAi2MMjbk7znS1sPVXxYKA5ZgBtxpu0stUjbMjRLu7EuuV173CdWXOh5GXZBhVmmw5kmZMtUcjYWJD1-ueGdU2paVjAz7quajRqPE-Ssg6R1HehiO0svemINQFlG7W_VQ84XGeqt04D14yex535CtLMjXqvEs8injmuJMsgsO5of2nBHBI9FM42zypjOOd4cYIifXlgoBNU78LXfe48WQnC84_6q_g9Dm21HF4qqzYWQFEZuHxbEjdz7yyODYO-S_ateR-7wX0LVw9DZURasfFZyOJSRA"
                    },
                    "transformRequest": [
                        null
                    ],
                    "transformResponse": [
                        null
                    ],
                    "timeout": 0,
                    "xsrfCookieName": "XSRF-TOKEN",
                    "xsrfHeaderName": "X-XSRF-TOKEN",
                    "maxContentLength": -1,
                    "maxBodyLength": -1
                },
                "request": {}
            };
            resolve(response);
        });
    };

    function loginService(username: string, pass: string): Promise<Tokens> {
        return new Promise<Tokens>((resolve, reject) => {
            const data: any = {
                "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI4Tmo4RmZUODZOZXRNZXpoWWZrbDZ5VTJMWW1QOWFrUUltLWlid2ZKejJZIn0.eyJleHAiOjE2NjQzMDc0NTIsImlhdCI6MTY2NDMwNzMzMiwianRpIjoiZDEzYmUyYWMtZmQ4ZS00ODliLWI0ZDYtODBjMTI4NjE1NTkwIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL215LXJlYWxtLXRlc3QiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNTQ4MDI4NWItMGI3OC00MDVkLTk4YmYtMjNjODJmZDcxYTY2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicmVzdC1jbGllbnQtdGVzdCIsInNlc3Npb25fc3RhdGUiOiI4M2MwZWJlZC02MWQzLTRhYjUtOGNlYS02ZjU3ZDcwNjQxNzMiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbXktcmVhbG0tdGVzdCIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX0sInJlc3QtY2xpZW50LXRlc3QiOnsicm9sZXMiOlsiYWRtaW4iLCJ1c2VyIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJDaG95IERhcmlvIEFuZHJlcyIsInByZWZlcnJlZF91c2VybmFtZSI6ImRhcmlvcGFsbWluaW9AZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6IkNob3kiLCJmYW1pbHlfbmFtZSI6IkRhcmlvIEFuZHJlcyIsImVtYWlsIjoiZGFyaW9wYWxtaW5pb0BnbWFpbC5jb20ifQ.ffJf_PA_gemFPRQIlloHfjVQZDIVZrMGRXnaS63-PPSov2lEsb6lD94m_6AdncKhSZCNFt6ExXuV6Cuq0VMXlXO3S-D29kJDxg0Bmju5sTMfmbl9DEq-2GOWLnjc9iVvyngPm8rbmKExRsKsGAqrgmVRT8GLpU8PbmsIlHsJvfXhllUfKKc8JjSH0NsjGQGRNFMuwZyZ9gs1zBIVvgWUJ8e3mD9m6r5EAHQQKq9GGRVc5ikfnbSmzdbI17O23aD_QHd-UJplvVHquCkSazWviHcYZxDIoEOaETyEHUyDuigtsQMno6QqUi01bui6WXc41y60ZEcoKoCl8vq2hmplJw",
                "expires_in": 120,
                "refresh_expires_in": 36000,
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI5NGRlYzlhYS01MTc1LTRlOTQtOGVkZC00Y2Q5ZmMzMGU1OTgifQ.eyJleHAiOjE2NjQzNDMzMzIsImlhdCI6MTY2NDMwNzMzMiwianRpIjoiZTdmZGE5ZGQtYWNkNy00N2ZjLWFhYjktYzdhYzYyZTI4ZDMzIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL215LXJlYWxtLXRlc3QiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXV0aC9yZWFsbXMvbXktcmVhbG0tdGVzdCIsInN1YiI6IjU0ODAyODViLTBiNzgtNDA1ZC05OGJmLTIzYzgyZmQ3MWE2NiIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJyZXN0LWNsaWVudC10ZXN0Iiwic2Vzc2lvbl9zdGF0ZSI6IjgzYzBlYmVkLTYxZDMtNGFiNS04Y2VhLTZmNTdkNzA2NDE3MyIsInNjb3BlIjoicHJvZmlsZSBlbWFpbCJ9.BYQ93i4Rym1P1wYIpwPuQz8PdcFkq-xGMpwIyP7AWkQ",
                "token_type": "Bearer",
                "not-before-policy": 1664256052,
                "session_state": "83c0ebed-61d3-4ab5-8cea-6f57d7064173",
                "scope": "profile email"
            };
            resolve(data);
        });
    };


    function logoutService(userId: string, adminToken: string): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            resolve(200);
        });
    };

    function sendStartEmailConfirm(
        name: string,
        email: string,
        verificationPageLink: string,
        lang: string,
        accessToken: string): Promise<any> {
        return new Promise<number>((resolve, reject) => {
            const response: any = {
                "isSuccess": true,
                "status": 200,
                "message": "auth.MESSAGE.SENT_VERIFICATION_EMAIL_SUCCESS",
                "data": {
                    "accepted": [
                        "mariadelcarmenchoy@gmail.com"
                    ],
                    "rejected": [],
                    "envelopeTime": 809,
                    "messageTime": 1128,
                    "messageSize": 1155,
                    "response": "250 2.0.0 OK  1664308145 e14-20020a056870238e00b0011e73536301sm1277790oap.52 - gsmtp",
                    "envelope": {
                        "from": "dariopalminio@gmail.com",
                        "to": [
                            "mariadelcarmenchoy@gmail.com"
                        ]
                    },
                    "messageId": "<5071a9ee-dd07-1aee-e6dc-d1916b8e0181@gmail.com>"
                }
            };
            resolve(response);
        });
    };

    function confirmAccount(
        token: string,
        lang: string,
        adminToken: string): Promise<any> {
        return new Promise<number>((resolve, reject) => {
            const response: any = {
                "data": {
                    "message": "auth.MESSAGE.CONFIRM_WAS_SUCCESS"
                },
                "status": 200,
                "statusText": "OK",
                "headers": {
                    "content-length": "46",
                    "content-type": "application/json; charset=utf-8"
                },
                "config": {
                    "url": "http://localhost:3001/api/webshop/v1/auth/register/confirm",
                    "method": "post",
                    "data": "{\"token\":\":bWFyaWFkZWxjYXJtZW5jaG95QGdtYWlsLmNvbXw1ZTI3OGViMy1lNmJjLTQ5ZTAtOGY4OS1hYmU4ODM3ZTE3OWQ=\"}",
                    "headers": {
                        "Accept": "application/json, text/plain, */*",
                        "Content-Type": "application/json;charset=utf-8",
                        "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI4Tmo4RmZUODZOZXRNZXpoWWZrbDZ5VTJMWW1QOWFrUUltLWlid2ZKejJZIn0.eyJleHAiOjE2NjQzMDgzNzksImlhdCI6MTY2NDMwODI1OSwianRpIjoiZjdmYzE5ODAtN2NlZi00YzNjLWFmOTktYWI2NzVmNjRjMTIzIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL215LXJlYWxtLXRlc3QiLCJhdWQiOiJyZWFsbS1tYW5hZ2VtZW50Iiwic3ViIjoiMTljNDc0YjktYThlZS00NWU1LTllZDktOTJkMmJmMTU4Y2Y2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicmVzdC1jbGllbnQtdGVzdCIsInNlc3Npb25fc3RhdGUiOiJlNzE1NTQ0My04MWU5LTQ3ZTAtYTgwNy1mMGEyODI0ZjQzYmEiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImFwcC1hZG1pbiIsImFwcC11c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsicmVhbG0tbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJtYW5hZ2UtdXNlcnMiLCJ2aWV3LXVzZXJzIiwicXVlcnktZ3JvdXBzIiwicXVlcnktdXNlcnMiXX0sInJlc3QtY2xpZW50LXRlc3QiOnsicm9sZXMiOlsidW1hX3Byb3RlY3Rpb24iLCJhZG1pbiIsInVzZXIiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJEYXJpbyBQYWxtaW5pbyIsInByZWZlcnJlZF91c2VybmFtZSI6ImRhcmlvcGFsbWluaW9AaG90bWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiRGFyaW8iLCJmYW1pbHlfbmFtZSI6IlBhbG1pbmlvIiwiZW1haWwiOiJkYXJpb3BhbG1pbmlvQGhvdG1haWwuY29tIn0.AHK_15BDGW2L4EyrCwMEP-eQS9xEcFul9k4oIlBujcyKsw6L9MIqCIrjXWwlvuzYLllrendDpP7H4FiUreLnWUat9AANcz6flDKxACbF57k5Lx9s1szJ7cyfwCXFX5IG2iQFfQz--pYYvXgT1nsfzTTeT6bjNHnZIgkVuHIvzCJWlm3sw04SisF2ltJfEfqZPzLX8O2ZByryR0s7d458OFp6mUAhh3RNUYKrkzyv7_baRBEOvV4BL1ElmBxgtDjjlq1pvoIhmq4d-W8i1nfFF8KhPKctkh2c5Y6WRQEDnBXb29DtxlTHTW8scwPxW0lBhQMr8-_iWq0HikDdOs4tYA",
                        "lang": "en"
                    },
                    "transformRequest": [
                        null
                    ],
                    "transformResponse": [
                        null
                    ],
                    "timeout": 0,
                    "xsrfCookieName": "XSRF-TOKEN",
                    "xsrfHeaderName": "X-XSRF-TOKEN",
                    "maxContentLength": -1,
                    "maxBodyLength": -1
                },
                "request": {}
            };
            resolve(response);
        });
    };

    function sendEmailToRecoveryPass(
        email: string,
        recoveryPageLink: string,
        lang: string,
        adminToken: string): Promise<any> {
        return new Promise<number>((resolve, reject) => {
            const response: any = {
                "isSuccess": true,
                "status": 200,
                "message": "auth.MESSAGE.RECOVERY_EMAIL_SENT",
                "data": {
                    "accepted": [
                        "mariadelcarmenchoy@gmail.com"
                    ],
                    "rejected": [],
                    "envelopeTime": 765,
                    "messageTime": 813,
                    "messageSize": 1395,
                    "response": "250 2.0.0 OK  1664308633 f20-20020a9d5f14000000b0063715f7eef8sm1156333oti.38 - gsmtp",
                    "envelope": {
                        "from": "dariopalminio@gmail.com",
                        "to": [
                            "mariadelcarmenchoy@gmail.com"
                        ]
                    },
                    "messageId": "<a491f1ef-4344-3434-cb1a-cac8b84161df@gmail.com>"
                }
            };
            resolve(response);
        });
    };

    function updatePassword(
        token: string,
        password: string,
        lang: string,
        adminToken: string): Promise<any> {
        return new Promise<number>((resolve, reject) => {
            const data: any = {
                "reseted": true
            };
            resolve(data);
        });
    };

    return {
        register,
        sendStartEmailConfirm,
        confirmAccount,
        loginService,
        logoutService,
        sendEmailToRecoveryPass,
        updatePassword
    };
};
