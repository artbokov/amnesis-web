import classes from "../../styles.module.scss";
import { ReactComponent as ClipIcon } from "../../../../assets/clip.svg";

type fileInputProps = { onFileAttach: (f: File) => void };

const FileInput = ({ onFileAttach }: fileInputProps) => {
  return (
    <>
      <input
        id="file"
        type="file"
        accept=".docx,.doc"
        style={{ display: "none" }}
        onChange={(e) => e.target.files && onFileAttach(e.target.files[0])}
        multiple
      />
      <label className={classes.clipIcon} htmlFor="file">
        <ClipIcon />
      </label>
    </>
  );
};

export default FileInput;
