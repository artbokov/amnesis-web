import Input from "./Input/Input";
import classes from "./styles.module.scss";

const ChatPage = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.messages}></div>
      <Input />
    </div>
  );
};

export default ChatPage;