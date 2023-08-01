import classes from "./styles.module.scss";
import Block from "./Block/Block";
import Footer from "./Footer/Footer";

interface BlockedPageProps {
  blocks: {
    id: string;
    classname: string;
    title: JSX.Element;
    titleColor?: "red";
    subblocks: JSX.Element[];
  }[];
}

const BlockedPage: React.FC<BlockedPageProps> = ({ blocks }) => {
  return (
    <div className={classes.wrapper}>
      {blocks.map((block) => (
        <Block key={block.id} {...block} />
      ))}
      <Footer />
    </div>
  );
};

export default BlockedPage;
