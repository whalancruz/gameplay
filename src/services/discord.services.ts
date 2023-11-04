import axios from "axios";
import { enviroment } from "../environments/environments";

export async function requestAuthToken(code: string, codeVerify: string): Promise<string> {
    const { CLIENT_ID, REDIRECT_URI, CLIENT_SECRET, SCOPE } = enviroment;

    const params = new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        code_verifier: codeVerify
    }).toString();

    try {

        const response = await axios.post(`${SCOPE}/oauth2/token`,
            params,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        return response.data.access_token;

    } catch (error: any) {
        // console.log("status", error.response.status)
        // console.log("error", error.response);
        return "";
    }
}

export async function requestRefreshToken(token: string): Promise<string> {
    const { CLIENT_SECRET, CLIENT_ID, SCOPE } = enviroment;

    const params = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: token,
        client_secret: CLIENT_SECRET,
        client_id: CLIENT_ID
    }).toString();

    try {

        const response = await axios.post(`${SCOPE}/oauth2/token`, params, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

        return response.data.access_token;

    } catch (error: any) {
        // console.log("status", error.response.status)
        // console.log("error", error.response.data)
        return "";
    }
}