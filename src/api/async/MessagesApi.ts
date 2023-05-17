import baseApi from "../sync/BaseApi";
import { Message } from "../../models/ApiTypes";

type MessageCallback = (message: Message) => void;

const WS_URL = "ws://oncoanalitika.com/api/connect";
const EVENT_TYPES = {
    AUTH_RQ: "AuthRq",
    SEND_MESSAGE_RQ: "SendMessageRq",
    CHOOSE_OPINION_RQ: "ChooseOptionRq",
    NEW_MESSAGE_EV: "NewMessageEv",
};

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

        this.callbacks.forEach(callback => callback(response.message));
    }

    // PUBLIC
    sendMessage(text: string, files: File[]) {
        const filesIdsPromises = files.map(file => baseApi.uploadFile(file));
        
        Promise.all(filesIdsPromises).then(filesIds => {
            this.socket.send(JSON.stringify({
                text: text,
                files: filesIds
            }));
        });
    }

    addCallback(callback: MessageCallback) {
        this.callbacks.push(callback);
    }
}

const messagesApi = new MessagesApi();
export default messagesApi;