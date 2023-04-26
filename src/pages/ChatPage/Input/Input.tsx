import { Button } from "../../../components";
import classes from "./styles.module.scss";

const Input = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.textField}>

      </div>
      <div className={classes.buttons}>
        <Button
          text="Редактировать"
          onClick={() => { }}
          color="green"
          optionalClasses={["chat"]}
        />
        <Button
          text="Все верно"
          onClick={() => { }}
          color="green"
          optionalClasses={["chat"]}
        />
      </div>
    </div>
  );
}

export default Input;