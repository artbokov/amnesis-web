import baseApi from "../sync/BaseApi";
import { Message } from "../../models/ApiTypes";

type MessageCallback = (message: Message) => void;
const EVENT_TYPES = {
    AUTH_RQ: "AuthRq",
    SEND_MESSAGE_RQ: "SendMessageRq",
    CHOOSE_OPINION_RQ: "ChooseOptionRq",
    NEW_MESSAGE_EV: "NewMessageEv",
};
const WS_URL = "ws://oncoanalitika.com/api/connect";

class MessagesApi {
    private callbacks: MessageCallback[] = [];
    private socket: WebSocket = new WebSocket(WS_URL);

    constructor() {
        // Socket set up
        this.socket.onopen = async () => {
            const accessToken = await baseApi.getAccessToken();

            this.socket.send(JSON.stringify({
                event_type: EVENT_TYPES.AUTH_RQ,
                token: accessToken
            }));
        };

        this.socket.onmessage = this.onMessage;
    }   
    
    // PRIVATE
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