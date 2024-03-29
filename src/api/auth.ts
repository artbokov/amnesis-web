import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
    IAuthTokens,
    applyAuthTokenInterceptor,
    clearAuthTokens,
    setAuthTokens,
} from "axios-jwt";
import {
    UserData,
    UserCredentials,
    UserInfo,
    Message,
    RecivedMessage,
} from "./types";
import { Message as ClientMessage } from "../components/ChatInput/ChatInput";

const BASE_URL = `https://${process.env.REACT_APP_BACKEND_URL}`;

function saveTokensToStorage(tokens: IAuthTokens) {
    localStorage.setItem("access_token", tokens.accessToken);
    localStorage.setItem("refresh_token", tokens.refreshToken);
}

class AuthApi {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: `${BASE_URL}/auth`,
            timeout: 2500,
        });

        if (localStorage.getItem("access_token")) {
            setAuthTokens({
                accessToken: localStorage!.getItem("access_token") as string,
                refreshToken: localStorage!.getItem("refresh_token") as string,
            });
        }

        applyAuthTokenInterceptor(this.axiosInstance, {
            requestRefresh: (refreshToken) =>
                axios
                    .post(`${BASE_URL}/refresh`, {
                        refresh_token: refreshToken,
                    })
                    .then((response) => {
                        const tokens = {
                            accessToken: response.data.access_token,
                            refreshToken: response.data.refresh_token,
                        };
                        saveTokensToStorage(tokens);
                        return {
                            accessToken: response.data.access_token,
                            refreshToken: response.data.refresh_token,
                        };
                    }),
            header: "Authorization",
            headerPrefix: "Bearer ",
        });
    }

    signIn(credentials: UserCredentials): Promise<void> {
        return this.axiosInstance
            .post("/sign-in", credentials)
            .then((response) => {
                const tokens = {
                    accessToken: response.data.access_token,
                    refreshToken: response.data.refresh_token,
                };
                saveTokensToStorage(tokens);
                setAuthTokens(tokens);
            });
    }

    signOut() {
        clearAuthTokens();
    }

    signUp(data: UserData): Promise<void> {
        const formData = new FormData();

        Object.keys(data).map((i) => {
            if (i in data) {
                formData.append(i, data[i as keyof UserData] as string);
            }
        });

        formData.append("first_name", data.name);
        formData.append("second_name", data.surname);

        return this.axiosInstance
            .post("/sign-up", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(console.log);
    }

    verifyEmail(tokenId: string): Promise<void> {
        return this.axiosInstance
            .post(`/verify-email/${tokenId}`)
            .then(console.log);
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

    uploadFile(file: File): Promise<string> {
        const formData = new FormData();
        formData.append("file", file);

        return this.axiosInstance
            .put("/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                baseURL: `${BASE_URL}/messages`,
            })
            .then((response) => response.data.id);
    }

    sendMessage(clientMessage: ClientMessage): Promise<void> {
        return Promise.all(
            clientMessage.files.map((file) => this.uploadFile(file))
        ).then((fileIds) => {
            const message: Message = {
                options: {},
                commands: {},
                ...clientMessage,
                files: fileIds,
            };
            console.log(message);
            return this.axiosInstance.post("/send", message, {
                baseURL: `${BASE_URL}/messages`,
            });
        });
    }

    getChat() {
        return this.axiosInstance.get("/chat", {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            baseURL: `${BASE_URL}/messages`,
        });
    }

    getHistory(): Promise<RecivedMessage[]> {
        return this.axiosInstance
            .get("/history", {
                baseURL: `${BASE_URL}/messages`,
            })
            .then((response) => response.data.history);
    }

    selectOption(message_id: string, option_name: string): Promise<void> {
        return this.axiosInstance.post(
            "/select-option",
            { message_id, option_name },
            {
                baseURL: `${BASE_URL}/messages`,
            }
        );
    }
}

const authApi = new AuthApi();
export default authApi;
