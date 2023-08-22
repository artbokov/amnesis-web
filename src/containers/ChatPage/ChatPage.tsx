import classes from "./styles.module.scss";
import { Button, ChatInput as Input } from "../../components";
import { useEffect, useState } from "react";
import { ReactComponent as FileIcon } from "../../assets/fileIcon.svg";
import { useAuthentication } from "../../contexts/AuthContext";
import { RecivedMessage } from "../../api/types";
import { chatApi } from "../../api";
import parse from "html-react-parser";

const ChatPage = () => {
    const [messages, setMessages] = useState<RecivedMessage[]>([]);
    const [clicked, setClicked] = useState<{ [messageId: string]: string }>({});

    const {
        sendMessage,
        addMessageListener,
        getChatHistory,
        selectOption,
        addSocketReconnectListener,
    } = useAuthentication();

    useEffect(() => {
        const interval = setInterval(() => {
            if (chatApi.isAuthenticated) {
                console.log("chatApi authed!");
                getChatHistory().then(setMessages);
                addSocketReconnectListener(() => {
                    getChatHistory().then(setMessages);
                });
                addMessageListener((message: RecivedMessage) => {
                    setMessages((prev) => [message, ...prev]);
                });
                clearInterval(interval);
            }
        }, 100);
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
                                {parse(message.text)}
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
                                        hoverEffect={
                                            !(message.id in clicked) &&
                                            !message.selected_option
                                        }
                                        optionalStyles={
                                            message.id in clicked ||
                                            message.selected_option
                                                ? ["round", "disabled"]
                                                : ["round"]
                                        }
                                        selected={
                                            key === clicked[message.id] ||
                                            key === message.selected_option
                                        }
                                        onClick={
                                            message.id in clicked ||
                                            message.selected_option
                                                ? () => {}
                                                : () => {
                                                      setClicked((prev) => ({
                                                          ...prev,
                                                          [message.id]: key,
                                                      }));
                                                      selectOption(
                                                          message.id,
                                                          key
                                                      );
                                                  }
                                        }
                                        color="bg-blue"
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
