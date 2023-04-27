import { useState } from "react";
import { Button } from "../../../components";
import classes from "./styles.module.scss";

type actionType = "send" | "commit" | "edit";

const buttons: {
  text: string, 
  action: actionType, 
  color: "green" | "blue",
}[] = [
  {
    text: "Отправить",
    action: "send",
    color: "green",
  },
  {
    text: "Редактировать",
    action: "edit",
    color: "green",
  },
  {
    text: "Всё верно",
    action: "commit",
    color: "green",
  }
];

const Input = ({onSend}: {onSend: (newMessage: string) => void}) => {
  const [message, setMessage] = useState("");

  const onAction = (action: actionType) => {
    if (action === "send") {
      onSend(message);
      setMessage("");
    } 
  };

  return (
    <div className={classes.input}>

      <textarea 
        placeholder="Введите ваш текст тут:"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      
      {buttons.map(buttonProps => 
        <Button
          onClick={() => onAction(buttonProps.action)}
          {...buttonProps}
        />
       )}
    </div>
  );
}

export default Input;