import { useRef, useState } from "react";
import classes from "./styles.module.scss";
import Button from "../Button/Button";
import { ReactComponent as SendIcon } from "../../assets/sendIcon.svg";
import { ReactComponent as ClipIcon } from "../../assets/clip.svg";
import { ReactComponent as AttachedFile } from "../../assets/attachedFile.svg";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  const fileInput = useRef<HTMLInputElement>(null);

  // Buttons handlers
  const handleFileAttach = (file: File) => {
    setAttachedFiles(attachedFiles.concat(file));
  };

  const handleFileDetach = (fileIndex: number) => {
    setAttachedFiles(
      attachedFiles.filter((file, index) => index !== fileIndex)
    );
  };

  const handleMessageSend = () => {
    if (message || attachedFiles.length) {
      // onSend(message, attachedFiles);
    }

    setMessage("");
    setAttachedFiles([]);
  };

  // Textarea handlers
  const handleTyping = (e: any) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      setMessage(`${message}\n`);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      handleMessageSend();
    }
  };

  const resizeTextarea = (e: any) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.input}>
        <textarea
          placeholder="Сообщение:"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
          onKeyUp={resizeTextarea}
          rows={1}
        />
        <div className={classes["attach-button"]}>
          <Button
            onClick={() => fileInput.current?.click()}
            Icon={<ClipIcon />}
          />
          <input
            type="file"
            accept=".docx,.doc"
            onChange={(e) =>
              e.target.files && handleFileAttach(e.target.files[0])
            }
            ref={fileInput}
            multiple
            hidden
          />
        </div>
        <div className={classes["send-button"]}>
          <Button onClick={handleMessageSend} Icon={<SendIcon />} />
        </div>
      </div>
      {attachedFiles.length !== 0 && (
        <div className={classes["attached-files"]}>
          {attachedFiles.map((i, index) => (
            <div key={index} className={classes.file}>
              <Button
                onClick={() => handleFileDetach(index)}
                Icon={<AttachedFile />}
              />
              <span className={classes["file-name"]}>
                {i.name.length < 10 ? i.name : `${i.name.slice(0, 7)}...`}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatInput;
