import { useEffect, useState } from "react";
import { stages } from "./types";
import Input from "./Input/Input";
import classes from "./styles.module.scss";
import classNames from "classnames";

const stagesList = [stages.REQUEST, stages.APPROVE];

const ChatPage = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [stageIndex, setStageIndex] = useState<number>(0);

  useEffect(() => {
    // setMessages(); fetch logic
  }, []);

  const onSend = (newMessage: string) => {
    setStageIndex((stageIndex + 1) % stagesList.length);
    setMessages([...messages, newMessage, "Тут будет ответ от бота"]);
  }

  return (
    <div className={classes.chatWrapper}>
      <div className={classes.messages}>
        {messages?.map((message, index) => 
          <Message 
            key={index}
            index={index} 
            text={message} 
          />
        )}
      </div>
      <Input stage={stagesList[stageIndex]} onSend={onSend} />
    </div>
  );
};

const Message = ({index, text}: {index: number, text: string}) => {
  return (
    <div className={classNames((index % 2) && classes.green, classes.message)}> 
      {text} 
    </div>
  );
};

export default ChatPage;