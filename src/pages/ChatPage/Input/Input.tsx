import { useState } from "react";
import { Button } from "../../../components";
import classes from "../styles.module.scss";
import { stages, actionType, stageType, actions } from "../types";
import TextArea from "./TextArea";
import FileInput from "./FileInput";
import AttachedFiles from "./AttachedFiles";

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
        <AttachedFiles filenames={files.map(file => file.name)}/>
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

export default Input;