
const Pbkdf2 = require('nodejs-pbkdf2');
const util = require('util');

const pbkdf2_sha256_Config = {
    digestAlgorithm: 'sha256',
    keyLen: 32,//J3UJAlQ7PXfn0ikD9d27kY56QBnab9CDMQ4Ken9mf6w=
    saltSize: 16, //A5yWF3TpvdKekfENRj8ckg==
    iterations: 27500
};


/**
 * have a salt and are hashed using PBKDF2 with SHA256
 * 
POST http://localhost:8080/auth/admin/realms/master/users
Authorization: Bearer {{access_token}}
Content-Type: application/json

{
  "enabled": true,
  "attributes": {},
  "username": "admin",
  "emailVerified": "",
  "credentials": [
    {
      "credentialData": "{\"hashIterations\": 27500,\"algorithm\": \"pbkdf2-sha256\"}",
      "secretData": "{\"salt\": \"x/bm4Y3DcuV9eU97ervkPA==\",\"value\": \"1u7BLvfSPxQFpwc5jpGSA+88EGl9pZYKhaZ8YPIu9N4=\"}",
      "type": "password"
    }
  ]
}


The JSON that gets send for the credential representation is:
"credentials": [
{"type":"password",
"secretData":"{"value":"MWQ3MDc4MTE5ODgwNjljYTc2MDgyNjg2MWQ2ZDYzYTEwZThjM2I3ZjE3MWM0NDQxYTY0NzJlYTU4YzExNzExYg==","salt":"YXNkZmFzZGY="}",
"credentialData":"{"hashIterations":27500,"algorithm":"pbkdf2-sha256"}",
"temporary":false}
 ]
 */
export function encryptPbkdf2Password(password: string): Promise<any> {

    let pbkdf2 = new Pbkdf2(pbkdf2_sha256_Config);

    /*
    pbkdf2.hashPassword(password, (err, cipherText, salt) => {
        console.log(cipherText.toString('hex'));
        console.log(salt);
    });
*/

    // @ts-ignore
    const hashPasswordPromise = (password) => {
        return new Promise((resolve, reject) => {

            // @ts-ignore
            pbkdf2.hashPassword(password, (err, cipherText, salt) => {
                if (err) return reject(err)
                resolve({ cipherText, salt });
            })

        })
    }

    const resultObject = hashPasswordPromise(password);//{ cipherText, salt }

    return resultObject;
};

/**
 * Use...
 * 
 * 
       try {
            const ps: any = await encryptPbkdf2Password('admin');
            console.log('ps---cipherText:', ps.cipherText);
            console.log('ps---salt:', ps.salt);
        } catch (eerr) { console.log('ps---eerr:', eerr); }
 */


export function verifyPbkdf2Password(password: string, cipherText: string, sal: string): Promise<boolean> {


    let pbkdf2 = new Pbkdf2(pbkdf2_sha256_Config);

    /*
pbkdf2.hashPassword('12345', (err, cipherText, salt) => {
pbkdf2.isValidPassword('12345', cipherText, salt).then((isValid) => {
console.log(isValid);
});
});
*/

    // @ts-ignore
    const hashPasswordPromise = (password, cipherText, salt) => {
        return new Promise<boolean>((resolve, reject) => {

            // @ts-ignore
            pbkdf2.isValidPassword(password, cipherText, salt).then((isValid: boolean) => {
                console.log(isValid);
                resolve(isValid);
            });

        })
    }

    return hashPasswordPromise(password, cipherText, sal);//{ cipherText, salt }
};

/**
 *  Use...
    try {
            const ps: any = await encryptPbkdf2Password('admin');
            console.log('ps---cipherText:', ps.cipherText);
            console.log('ps---salt:', ps.salt);

            const t: boolean = await verifyPbkdf2Password('admin',ps.cipherText,ps.salt);
            console.log('ps---verify:', t);
            


        } catch (eerr) { console.log('ps---eerr:', eerr); }


 ps---cipherText: jDva3+4GTEepjhwPBH1rX+L+6hTbdlrnOHCsXXuFy5A=
ps---salt: 6pbhIHdpt3t/rBQrO2i/Pw==


 */