import baseApi from "../sync/BaseApi";
import { Message } from "../../models/types";

type MessageCallback = (message: Message) => void;
type HistoryCallback = (history: Message[]) => void;

const WS_URL = "wss://api.old.oncoanalitika.com/connect";
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
	private socket: WebSocket = new WebSocket(WS_URL);

	private historyCallback: HistoryCallback | null = null;
	private messageCallbacks: MessageCallback | null = null;

	private isSocketLoaded: boolean = false;
	private shouldRqHistoryOnLoad: boolean = false;
	private lastMessageId: string | null = null;

	constructor() {
		this.setUpSocket();
	}

	// PRIVATE
	private setUpSocket() {
		this.socket.onopen = async () => {
			const accessToken = await baseApi.getAccessToken();

			// Auth
			this.socket.send(
				JSON.stringify({
					event_type: EVENT_TYPES.AUTH_RQ,
					token: accessToken,
				})
			);

			this.isSocketLoaded = true;
			this.shouldRqHistoryOnLoad && this.requestHistory();
		};

		this.socket.onmessage = (e) => this.onMessage(e);
	}

	private onMessage(event: any) {
		const response = JSON.parse(event.data);

		if (response.event_type === EVENT_TYPES.NEW_MESSAGE_EV) {
			this.lastMessageId = response.message.id;
			this.messageCallbacks && this.messageCallbacks(response.message);
			return;
		}
		if (response.event_type === EVENT_TYPES.RS_TO_HISTORY_RQ) {
			this.historyCallback && this.historyCallback(response.data.history);
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
						files: filesIds.map((idObj) => ({ id: idObj.file_id })),
					},
				})
			);
		});
	}

	sendOption(optionName: string) {
		this.socket.send(
			JSON.stringify({
				event_type: EVENT_TYPES.CHOOSE_OPINION_RQ,
				answer_to: this.lastMessageId,
				choice: optionName,
			})
		);
	}

	setMessageCallback(callback: MessageCallback) {
		this.messageCallbacks = callback;
	}

	setHistoryCallback(callback: HistoryCallback) {
		this.historyCallback = callback;
	}

	requestHistory() {
		if (!this.isSocketLoaded) {
			this.shouldRqHistoryOnLoad = true;
			return;
		}
		this.socket.send(
			JSON.stringify({
				event_type: EVENT_TYPES.HISTORY_RQ,
			})
		);
	}
}

const messagesApi = new MessagesApi();
export default messagesApi;
