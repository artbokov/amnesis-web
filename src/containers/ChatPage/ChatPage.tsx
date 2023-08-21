import classes from "./styles.module.scss";
import { Button, ChatInput as Input } from "../../components";
import { useEffect, useState } from "react";
import { ReactComponent as FileIcon } from "../../assets/fileIcon.svg";
import { useAuthentication } from "../../contexts/AuthContext";
import { RecivedMessage } from "../../api/types";

const ChatPage = () => {
    const [messages, setMessages] = useState<RecivedMessage[]>([]);
    const { sendMessage, addMessageListener } = useAuthentication();

    useEffect(() => {
        addMessageListener((message: RecivedMessage) => {
            setMessages((prev) => [message, ...prev]);
        });
    }, []);

    return (
        <div className={classes.wrapper}>
            <div className={classes.messages}>
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
                            </div>
                            {Object.keys(message.options).map((key) => (
                                <Button
                                    label={message.options[key]}
                                    onClick={() => {}}
                                    color="bg-blue"
                                    optionalStyles={["round"]}
                                />
                            ))}
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
