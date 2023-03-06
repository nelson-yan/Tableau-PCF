// npm or yarn install jsonwebtoken
import jwt = require("jsonwebtoken");
import { randomBytes } from "crypto";
import { addSeconds ,format} from 'date-fns'

export default async function handler(connectedappclientid: string, username: string, connectedappsecret: string, connectedappsecretid: string) {
    const jwtExpirySeconds = 300;
    const curTime = new Date();
    const expTime = addSeconds(curTime, jwtExpirySeconds);

    const curTime_format=format(curTime,'MM/dd/yyyy HH:mm:ss');
    const expTime_format=format(expTime,'MM/dd/yyyy HH:mm:ss');
    console.log(curTime_format,"~", expTime_format);

    const payload = {
        jti: randomBytes(64).toString("hex"),
        iss: connectedappclientid,
        aud: "tableau",
        sub: username,
        scp: ["tableau:views:embed"],
    };
    console.log("jti: " + payload.jti);
    //   Create a new token with the username in the payload
    const token: string = jwt.sign(payload, connectedappsecret.toString(), {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds,
        header: {
            'kid': connectedappsecretid,
            'iss': connectedappclientid,
            'alg': "HS256"
        }
    });
    console.log("token1: " + token);
    return {
        token: token,
        iat: curTime,
        exp: expTime,
    }
}