import classes from "../styles.module.scss";
import { ReactComponent as FileIcon } from "../../../assets/fileIcon.svg";

type attachedFilesProps = {
    filenames: string[]
};
  
const AttachedFiles = ({filenames}: attachedFilesProps) => {
    return (
    <div className={classes.uploadedFiles}>
        {filenames.map(filename => 
        <span> 
            <FileIcon />
            <span className={classes.text}>
            {filename.length < 10 ? filename : `${filename.slice(0, 7)}...`}
            </span>
        </span>
        )}
    </div>
    );
};

export default AttachedFiles;