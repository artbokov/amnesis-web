import { useEffect, useRef, useState } from "react";
import classes from "./styles.module.scss";
import Button from "../Button/Button";
import { ReactComponent as SendIcon } from "../../assets/sendIcon.svg";
import { ReactComponent as ClipIcon } from "../../assets/clip.svg";
import { ReactComponent as AttachedFile } from "../../assets/attachedFile.svg";
import { ReactComponent as OptionsSelect } from "../../assets/optionsSelects.svg";

export interface Message {
    text: string;
    files: File[];
}

interface ChatInputProps {
    onSend: (message: Message) => void;
    options?: true;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, options }) => {
    const [message, setMessage] = useState<Message>({ text: "", files: [] });
    const [hasOptions, setHasOptions] = useState(!!options);

    const fileInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const textarea = document.getElementById("textarea")!;
        textarea.style.height = "inherit";
        textarea.style.height = `${Math.min(textarea.scrollHeight - 3, 200)}px`;
    }, [message.text]);

    // Buttons handlers
    const handleFileAttach = (file: File) => {
        setMessage({
            ...message,
            files: message.files.concat(file),
        });
    };

    const handleFileDetach = (fileIndex: number) => {
        setMessage({
            ...message,
            files: message.files.filter((_, index) => index !== fileIndex),
        });
    };

    const handleMessageSend = () => {
        if (message.text || message.files.length) {
            onSend(message);
        }

        setMessage({
            text: "",
            files: [],
        });
    };

    // Textarea handlers
    const handleTyping = (e: any) => {
        if (e.key === "Enter") {
            e.preventDefault();

            if (e.ctrlKey) {
                setMessage({
                    ...message,
                    text: `${message.text}\n`,
                });
            } else {
                handleMessageSend();
            }
        }
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.input}>
                {options && (
                    <div className={classes["options-button"]}>
                        <Button onClick={() => {}} icon={<OptionsSelect />} />
                    </div>
                )}
                <textarea
                    id="textarea"
                    placeholder="Сообщение:"
                    value={message.text}
                    onChange={(e) =>
                        setMessage({
                            ...message,
                            text: e.target.value,
                        })
                    }
                    onKeyDown={handleTyping}
                    disabled={options}
                    rows={1}
                />
                <div className={classes["attach-button"]}>
                    <Button
                        onClick={() => fileInput.current?.click()}
                        icon={<ClipIcon />}
                    />
                    <input
                        type="file"
                        accept=".docx,.doc"
                        onChange={(e) =>
                            e.target.files &&
                            handleFileAttach(e.target.files[0])
                        }
                        ref={fileInput}
                        multiple
                        hidden
                    />
                </div>
                <div className={classes["send-button"]}>
                    <Button onClick={handleMessageSend} icon={<SendIcon />} />
                </div>
            </div>
            {!!message.files.length && (
                <div className={classes["attached-files"]}>
                    {message.files.map((i, index) => (
                        <div key={index} className={classes["file"]}>
                            <Button
                                onClick={() => handleFileDetach(index)}
                                icon={<AttachedFile />}
                            />
                            <div>
                                {i.name.length < 10
                                    ? i.name
                                    : `${i.name.slice(0, 7)}...`}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ChatInput;
