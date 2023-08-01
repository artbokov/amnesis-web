import classes from "./styles.module.scss";
import { ChatInput as Input } from "../../components";

const ChatPage = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.messages}></div>
      <div className={classes.input}>
        <Input />
      </div>
    </div>
  );
};

export default ChatPage;
