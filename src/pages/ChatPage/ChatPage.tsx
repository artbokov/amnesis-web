import { useEffect, useState } from "react";
import Input from "./Input/Input";
import classes from "./styles.module.scss";
import classNames from "classnames";
import { messagesApi } from "../../api";
import AttachedFiles from "./Input/AttachedFiles/AttachedFiles";

const ChatPage = () => {
	const [messages, setMessages] = useState<string[]>([]);
	const [options, setOptions] = useState<[string, string][]>();

	useEffect(() => {
		messagesApi.setMessageCallback((newMessage) => {
			setOptions(
				newMessage.options?.map((option) => [option.name, option.text])
			);
			setMessages((history) => [...history, newMessage.text]);
		});
		messagesApi.setHistoryCallback((history) =>
			setMessages(history.map((message) => message.text).reverse())
		);
	}, []);

	const onMessageSend = (newMessage: string, attachedFiles: File[]) => {
		setMessages([...messages, newMessage]);
		messagesApi && messagesApi.sendMessage(newMessage, attachedFiles);
	};

	const onOptionSend = (optionName: string) => {
		messagesApi && messagesApi.sendOption(optionName);
	};

	return (
		<div className={classes.chatWrapper}>
			<div className={classes.messages}>
				{messages?.map((message, index) => (
					<Message key={index} index={index} text={message} />
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

const Message = ({
	index,
	text,
	filenames,
}: {
	index: number;
	text: string;
	filenames?: string[];
}) => {
	return (
		<div className={classNames(index % 2 && classes.green, classes.message)}>
			{text}
			{filenames && <AttachedFiles filenames={filenames} />}
		</div>
	);
};

export default ChatPage;
