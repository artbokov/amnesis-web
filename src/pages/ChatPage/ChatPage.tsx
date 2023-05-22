import { useEffect, useState } from "react";
import { stages } from "../../models/ChatTypes";
import Input from "./Input/Input";
import classes from "./styles.module.scss";
import classNames from "classnames";
import { MessagesApi } from "../../api";

const stagesList = [stages.REQUEST, stages.APPROVE];

const ChatPage = () => {
	const [messagesApi, setMessagesApi] = useState<MessagesApi | null>(null);
	const [messages, setMessages] = useState<string[]>([]);
	const [stageIndex, setStageIndex] = useState<number>(0);

	useEffect(() => {
		setMessagesApi(
			new MessagesApi(
				(history) =>
					setMessages(history.map((message) => message.text).reverse()),
				(newMessage) => setMessages((history) => [...history, newMessage.text])
			)
		);
	}, []);

	const onSend = (newMessage: string, attachedFiles: File[]) => {
		setStageIndex((stageIndex + 1) % stagesList.length);
		setMessages([...messages, newMessage]);
		messagesApi && messagesApi.sendMessage(newMessage, attachedFiles);
	};

	return (
		<div className={classes.chatWrapper}>
			<div className={classes.messages}>
				{messages?.map((message, index) => (
					<Message key={index} index={index} text={message} />
				))}
			</div>
			<Input stage={stagesList[stageIndex]} onSend={onSend} />
		</div>
	);
};

const Message = ({ index, text }: { index: number; text: string }) => {
	return (
		<div className={classNames(index % 2 && classes.green, classes.message)}>
			{text}
		</div>
	);
};

export default ChatPage;
