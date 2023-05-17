import baseApi from "../sync/BaseApi";
import { Message } from "../models/types";

const EVENT_TYPES = {
    AUTH_RQ: "AuthRq",
    SEND_MESSAGE_RQ: "SendMessageRq",
    CHOOSE_OPINION_RQ: "ChooseOptionRq",
    NEW_MESSAGE_EV: "NewMessageEv",
};

type MessageCallback = (message: Message) => void;

class MessagesApi {
    private callbacks: MessageCallback[];
    private socket: WebSocket;

    constructor() {
        this.initWs();
    }   
    
    // PRIVATE
    private initWs() {
        this.socket = new WebSocket("ws://oncoanalitika.com/api/connect");

        this.socket.onopen = () => {
            this.socket.send(JSON.stringify({
                event_type: EVENT_TYPES.AUTH_RQ,
                token: baseApi.getAccessToken()
            }));
        };
        this.socket.onmessage = this.onMessage;
    }

    private onMessage(event: any) {
        const response = JSON.parse(event.data);

        if (response.event_type !== EVENT_TYPES.NEW_MESSAGE_EV)
            return;

        this.callbacks.forEach(cb => cb(response.message));
    }

    // PUBLIC
    addCallback(callback: MessageCallback) {
        this.callbacks.push(callback);
    }
}

const messagesApi = new MessagesApi();
export default messagesApi;