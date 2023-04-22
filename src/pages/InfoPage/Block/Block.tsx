import classes from "../styles.module.scss";

type blockProps = {
  classname: string,
  title: JSX.Element,
  subblocksData: any[],
  renderSubblock: (text: string, index: number) => JSX.Element,
};

const Block = ({ classname, title, subblocksData, renderSubblock }: blockProps) => {
  return (
    <div className={classname}>
      <span className={classes.title}> {title} </span>
      {subblocksData.map(renderSubblock)}
    </div>
  );
};

export default Block;