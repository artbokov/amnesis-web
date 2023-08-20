import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
    applyAuthTokenInterceptor,
    clearAuthTokens,
    setAuthTokens,
} from "axios-jwt";
import { UserCredentials, UserInfo } from "./types";

const BASE_URL = `https://${process.env.REACT_APP_BACKEND_URL}/auth`;

class AuthApi {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: BASE_URL,
            timeout: 2500,
        });

        applyAuthTokenInterceptor(this.axiosInstance, {
            requestRefresh: (refreshToken) =>
                axios
                    .post(`${BASE_URL}/refresh`, {
                        refresh_token: refreshToken,
                    })
                    .then((response) => ({
                        accessToken: response.data.access_token,
                        refreshToken: response.data.refresh_token,
                    })),
            header: "Authorization",
            headerPrefix: "Bearer ",
        });
    }

    signIn(credentials: UserCredentials): Promise<void> {
        return this.axiosInstance
            .post("/sign-in", credentials)
            .then((response) =>
                setAuthTokens({
                    accessToken: response.data.access_token,
                    refreshToken: response.data.refresh_token,
                })
            );
    }

    signOut() {
        clearAuthTokens();
    }

    changePassword(newPassword: string) {
        this.axiosInstance.post("/change-password", { password: newPassword });
    }

    changeAvatar(newAvatar: File) {
        const formData = new FormData();
        formData.append("file", newAvatar);

        this.axiosInstance.post("/change-avatar", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }

    downloadAvatar() {}

    getUserInfo(): Promise<UserInfo> {
        return this.axiosInstance
            .get<any, AxiosResponse<UserInfo>>("/get-user-info")
            .then((response) => response.data);
    }
}

const authApi = new AuthApi();
export default authApi;
