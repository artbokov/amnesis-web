import classes from "../styles.module.scss";

interface BlockProps {
  classname: string;
  title: JSX.Element;
  subblocks: JSX.Element[];
}

const Block: React.FC<BlockProps> = ({ classname, title, subblocks }) => {
  return (
    <div className={classname}>
      <span className={classes.title}> {title} </span>
      {subblocks}
    </div>
  );
};

export default Block;
