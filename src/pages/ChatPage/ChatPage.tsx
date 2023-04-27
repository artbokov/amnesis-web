import { useEffect, useState } from "react";
import Input from "./Input/Input";
import classes from "./styles.module.scss";
import classNames from "classnames";


const ChatPage = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // setMessages(); fetch logic
  }, []);

  const onSend = (newMessage: string) => {
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
      <div className={classes.input}>
        <Input onSend={onSend} />
      </div>
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