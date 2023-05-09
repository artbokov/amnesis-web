import { useState } from "react";
import { Button } from "../../../components";
import classes from "../styles.module.scss";
import { stages, actionType, stageType, actions } from "../types";
import { ReactComponent as ClipIcon } from "../../../assets/clip.svg";
import { ReactComponent as FileIcon } from "../../../assets/fileIcon.svg";

const buttons: {
  key: number,
  text: string, 
  action: actionType, 
  activeOnStage: stageType[],
  color?: "green" | "blue",
}[] = [
  {
    key: 1,
    text: "Отправить",
    action: actions.SEND,
    activeOnStage: [stages.REQUEST],
  },
  {
    key: 2,
    text: "Редактировать",
    action: actions.EDIT,
    activeOnStage: [stages.APPROVE],
  },
  {
    key: 3,
    text: "Всё верно",
    action: actions.COMMIT,
    activeOnStage: [stages.APPROVE],
  }
];

type inputProps = {
  onSend: (newMessage: string) => void,
  stage: stageType
};

const Input = ({onSend, stage}: inputProps) => {
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const onAction = (action: actionType) => {
    switch (action) 
    {
      case actions.SEND: {
        onSend(message);
        setMessage("");
        setFiles([]);
        break;
      }
      case actions.COMMIT: {
        break;
      }
      case actions.EDIT: {
        break;
      }
      default: {
        break;
      }
    } 
  };

  const onFileAttach = (newFile: File) => {
    setFiles([...files, newFile]);
  }

  return (
    <div className={classes.input}>
      <div className={classes.textarea}> 
        <TextArea 
          onSend={() => (stage === stages.REQUEST) && onAction(actions.SEND)} 
          message={message}
          setMessage={setMessage}
        />
        <FileInput onFileAttach={onFileAttach} />
        <UploadedFiles filenames={files.map(file => file.name)}/>
      </div>
      
      {buttons.map(buttonProps => 
        <Button
          onClick={() => onAction(buttonProps.action)}
          {...buttonProps}
          optionalClasses={[
            !buttonProps.activeOnStage.includes(stage) && "disabled"
          ]}
        />
       )}
    </div>
  );
}


type textAreaProps = { 
  onSend: () => void,
  message: string, 
  setMessage: (text: string) => void,
};

const TextArea = ({onSend, message, setMessage}: textAreaProps) => {
  const isSendRequest = (e: any) => (e.ctrlKey && e.key === "Enter");

  return (
    <textarea 
      placeholder="Введите ваш текст тут:"
      value={message}
      onChange={e => setMessage(e.target.value)}
      onKeyDown={e => isSendRequest(e) && onSend()}
    />
  );
}


type fileInputProps = { onFileAttach: (f: File) => void };

const FileInput = ({onFileAttach}: fileInputProps) => {
  return <>
    <input 
      id="file"
      type="file"
      accept=".docx,.doc"
      style={{display: "none"}} 
      onChange={(e) => e.target.files && onFileAttach(e.target.files[0])}  
      multiple
    />
    <label className={classes.clipIcon} htmlFor="file"><ClipIcon /></label>
  </>;
}


type uploadedFilesProps = {
  filenames: string[]
};

const UploadedFiles = ({filenames}: uploadedFilesProps) => {
  return (
    <div className={classes.uploadedFiles}>
      {filenames.map(filename => 
        <span> 
          <FileIcon />
          <span className={classes.text}>
            {filename.length < 10 ? filename : `${filename.slice(0, 7)}...`}
          </span>
        </span>
      )}
    </div>
  );
};


export default Input;