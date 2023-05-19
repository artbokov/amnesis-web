import baseApi from "../sync/BaseApi";
import { Message } from "../../models/ApiTypes";

type MessageCallback = (message: Message) => void;
type HistoryCallback = (history: Message[]) => void;

const WS_URL = "ws://oncoanalitika.com/api/connect";
const EVENT_TYPES = {
	// Requests
	AUTH_RQ: "AuthRq",
	SEND_MESSAGE_RQ: "SendMessageRq",
	CHOOSE_OPINION_RQ: "ChooseOptionRq",
	NEW_MESSAGE_EV: "NewMessageEv",
	HISTORY_RQ: "HistoryRq",

	// Responses
	RS_TO_HISTORY_RQ: "RsToHistoryRq",
	RS_TO_SEND_MESSAGE_RQ: "RsToSendMessageRq",
};

class MessagesApi {
	private historyCallback: HistoryCallback[] = [];
	private messageCallbacks: MessageCallback[] = [];
	private socket: WebSocket = new WebSocket(WS_URL);

	constructor() {
		// Socket set up
		this.socket.onopen = async () => {
			const accessToken = await baseApi.getAccessToken();

			// Auth
			this.socket.send(
				JSON.stringify({
					event_type: EVENT_TYPES.AUTH_RQ,
					token: accessToken,
				})
			);
			// History request
			this.socket.send(
				JSON.stringify({
					event_type: EVENT_TYPES.HISTORY_RQ,
				})
			);
		};
		this.socket.onmessage = (e) => this.onMessage(e);
	}

	// PRIVATE
	private onMessage(event: any) {
		const response = JSON.parse(event.data);
		console.log(response);
		if (response.event_type === EVENT_TYPES.NEW_MESSAGE_EV) {
			this.messageCallbacks.forEach((callback) => callback(response.message));
			return;
		}
		if (response.event_type === EVENT_TYPES.RS_TO_HISTORY_RQ) {
			this.historyCallback.forEach((callback) =>
				callback(response.data.history)
			);
			return;
		}
	}
	// PUBLIC
	sendMessage(text: string, files: File[]) {
		const filesIdsPromises = files.map((file) => baseApi.uploadFile(file));

		Promise.all(filesIdsPromises).then((filesIds) => {
			this.socket.send(
				JSON.stringify({
					event_type: EVENT_TYPES.SEND_MESSAGE_RQ,
					message: {
						text: text,
						files: filesIds,
					},
				})
			);
		});
	}

	addMessageCallback(callback: MessageCallback) {
		this.messageCallbacks.push(callback);
	}

	addHistoryCallback(callback: HistoryCallback) {
		this.historyCallback.push(callback);
	}
}

const messagesApi = new MessagesApi();
export default messagesApi;
