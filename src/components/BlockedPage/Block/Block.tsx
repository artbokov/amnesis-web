import classes from "../styles.module.scss";

type blockProps = {
  classname: string;
  title: JSX.Element;
  subblocks: JSX.Element[];
};

const Block = ({ classname, title, subblocks }: blockProps) => {
  return (
    <div className={classname}>
      <span className={classes.title}> {title} </span>
      {subblocks}
    </div>
  );
};

export default Block;
