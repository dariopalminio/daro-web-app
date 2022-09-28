
import { IProfileClient } from '../../../domain/service/profile-client.interface';

/**
 * A stub for Profile http client thet may simulate the behavior of real impementation code and be a temporary substitute for this. 
 */
export default function ProfileClientStub(): IProfileClient {

//Stub function
function getProfileService(userName: string): Promise<any>{
    return new Promise<any>( (resolve, reject) => {
           const resp: any = {
            "_id": "6316b3844c55dc07b0aac559",
            "startVerificationCode": "2022-09-06T02:43:06.034Z",
            "verified": true,
            "enable": true,
            "authId": "5480285b-0b78-405d-98bf-23c82fd71a66",
            "userName": "dariopalminio@gmail.com",
            "firstName": "Dario Andres",
            "lastName": "Palminio Choy",
            "email": "dariopalminio@gmail.com",
            "docType": "RUT",
            "document": "23712384",
            "telephone": "979513353",
            "language": "en",
            "verificationCode": "000c1b37-86bb-4ae1-9a25-7b550b34898b",
            "__v": 0,
            "addresses": [
                {
                    "street": "Galvarino Gallardo 1750",
                    "department": "1001",
                    "neighborhood": "Providencia",
                    "city": "Santiago",
                    "state": "Santiago",
                    "country": "Chile"
                },
                {
                    "street": "Apoquindo 6445",
                    "department": "1411",
                    "neighborhood": "Las Condes",
                    "city": "Santiago",
                    "state": "Región Metropolitana",
                    "country": "Chile"
                }
            ]
        };
           resolve(resp);
     });
  };

//Stub function
 function updateProfile(userProfile: any): Promise<number>{
    return new Promise<any>( (resolve, reject) => {
           const resp: any = {
            "message": "User Updated Successfully",
            "updatedUser": true
        };
           resolve(resp);
     });
  };


return {
    getProfileService,
    updateProfile
};
};
