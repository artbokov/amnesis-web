import classes from "./styles.module.scss";
import Block from "./Block/Block";

type blockedPageProps = {
  blocks: {
    id: string;
    classname: string;
    title: JSX.Element;
    subblocks: JSX.Element[];
  }[];
};

const BlockedPage = ({ blocks }: blockedPageProps) => {
  return (
    <div className={classes.wrapper}>
      {blocks.map((block) => (
        <Block key={block.id} {...block} />
      ))}
    </div>
  );
};

export default BlockedPage;
