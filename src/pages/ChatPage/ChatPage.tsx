import { useEffect, useState } from "react";
import Input from "./Input/Input";
import classes from "./styles.module.scss";
import { messagesApi } from "../../api";
import { Message as MessageType } from "../../models/types";
import Message from "./Message";

const ChatPage = () => {
	const [messages, setMessages] = useState<MessageType[]>([]);
	const [options, setOptions] = useState<[string, string][]>();

	useEffect(() => {
		messagesApi.setMessageCallback((newMessage) => {
			setOptions(
				newMessage.options?.map((option) => [option.name, option.text])
			);
			setMessages((history) => [...history, newMessage]);
		});
		messagesApi.setHistoryCallback((history) => {
			setMessages(history.map((message) => message).reverse());
		});
		messagesApi.requestHistory();
	}, []);

	const onMessageSend = (newMessageText: string, attachedFiles: File[]) => {
		setMessages([
			...messages,
			{
				text: newMessageText,
				files: attachedFiles,
			},
		]);
		messagesApi && messagesApi.sendMessage(newMessageText, attachedFiles);
	};

	const onOptionSend = (optionName: string) => {
		setMessages([...messages, { text: optionName }]);
		messagesApi && messagesApi.sendOption(optionName);
	};

	return (
		<div className={classes.chatWrapper}>
			<div className={classes.messages}>
				{messages?.map((message, index) => (
					<Message
						key={index}
						index={index}
						text={message.text}
						files={message.files}
					/>
				))}
			</div>
			<Input
				options={options ? options : []}
				onMessageSend={onMessageSend}
				onOptionSend={onOptionSend}
			/>
		</div>
	);
};

export default ChatPage;
