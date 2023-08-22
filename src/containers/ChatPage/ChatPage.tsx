import classes from "./styles.module.scss";
import { Button, ChatInput as Input } from "../../components";
import { useEffect, useState } from "react";
import { ReactComponent as FileIcon } from "../../assets/fileIcon.svg";
import { useAuthentication } from "../../contexts/AuthContext";
import { RecivedMessage } from "../../api/types";

const ChatPage = () => {
    const [messages, setMessages] = useState<RecivedMessage[]>([]);
    const {
        sendMessage,
        addMessageListener,
        getChatHistory,
        selectOption,
        addSocketReconnectListener,
    } = useAuthentication();

    useEffect(() => {
        getChatHistory().then(setMessages);
        addSocketReconnectListener(() => {
            getChatHistory().then(setMessages);
        });
        addMessageListener((message: RecivedMessage) => {
            setMessages((prev) => [message, ...prev]);
        });
    }, []);

    return (
        <div className={classes.wrapper}>
            <div id="messages" className={classes.messages}>
                {messages.map((message, index) =>
                    message.owner === "User" ? (
                        <div key={index} className={classes[`message-user`]}>
                            {message.text}
                            {message.files.map((file) => (
                                <div className={classes["attached-file"]}>
                                    <FileIcon />
                                    {file.name}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div key={index} className={classes[`message-wrapper`]}>
                            <div className={classes["message-bot"]}>
                                {message.text}
                                {message.files.map((file) => (
                                    <a
                                        className={classes["attached-file"]}
                                        href={`https://${process.env.REACT_APP_BACKEND_URL}/messages/attached-to-message-file/${message.id}/${file.id}`}
                                    >
                                        <FileIcon />
                                        {file.name}
                                    </a>
                                ))}
                            </div>
                            <div className={classes["message-options"]}>
                                {Object.keys(message.options).map((key) => (
                                    <Button
                                        label={message.options[key]}
                                        onClick={() =>
                                            selectOption(message.id, key)
                                        }
                                        color="bg-blue"
                                        optionalStyles={["round"]}
                                    />
                                ))}
                            </div>
                        </div>
                    )
                )}
            </div>
            <div className={classes.input}>
                <Input onSend={sendMessage} />
            </div>
        </div>
    );
};

export default ChatPage;
