import axios, { AxiosInstance, AxiosResponse } from "axios";
import { getAccessToken } from "axios-jwt";
import { RecivedMessage } from "./types";

const WS_URL = `wss://${process.env.REACT_APP_BACKEND_URL}/ws-proxy/proxy`;
const BASE_URL = `https://${process.env.REACT_APP_BACKEND_URL}/messages`;

const EVENT_TYPES = {
    AUTH_RQ: "AuthenticateRequest",
    AUTH_SUCCESS: "AuthenticationSuccess",
    NEW_MESSAGE: "NewMessage",
    OPTION_SELECTED: "OptionSelected",
};

type MessageCallback = (newMessage: RecivedMessage) => void;

class ChatApi {
    private socket: WebSocket = new WebSocket(WS_URL);
    private isAuthenticated = false;
    private messageQueue: RecivedMessage[] = [];
    private messageCallbacks: MessageCallback[] = [];
    private axiosInstance: AxiosInstance;

    constructor() {
        this.socket.onopen = () => {
            const waitForLoginInterval = setInterval(() => {
                if (getAccessToken()) {
                    this.socket.send(
                        JSON.stringify({
                            event_type: EVENT_TYPES.AUTH_RQ,
                            token: getAccessToken(),
                        })
                    );
                    clearInterval(waitForLoginInterval);
                }
            }, 1000);
        };

        this.socket.onmessage = (e) => this.onMessage(e);

        this.axiosInstance = axios.create({
            baseURL: BASE_URL,
            timeout: 2500,
        });
    }

    onMessage(e: any) {
        const response = JSON.parse(e.data);

        const processMessageQueue = () => {
            for (const cb of this.messageCallbacks) {
                for (const message of this.messageQueue) {
                    cb(message);
                }
            }
            this.messageQueue = [];
        };

        switch (response.event_type) {
            case EVENT_TYPES.AUTH_SUCCESS:
                this.isAuthenticated = true;
                break;
            case EVENT_TYPES.NEW_MESSAGE:
                if (this.messageCallbacks.length) {
                    if (this.messageQueue.length) {
                        processMessageQueue();
                    }
                    for (const cb of this.messageCallbacks) {
                        cb(response);
                    }
                } else {
                    this.messageQueue.push(response);
                }
                break;
            case EVENT_TYPES.OPTION_SELECTED:
                break;
        }
    }

    addMessageCallback(cb: MessageCallback) {
        this.messageCallbacks.push(cb);
    }

    sendMessage(message: RecivedMessage): Promise<void> {
        return this.axiosInstance.post("/send", message);
    }
}

const chatApi = new ChatApi();
export default chatApi;
