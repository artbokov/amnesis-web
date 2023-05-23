import classes from "../../styles.module.scss";
import { ReactComponent as FileIcon } from "../../../../assets/fileIcon.svg";

type attachedFilesProps = {
	filenames: string[];
	onFileDetach?: (index: number) => void;
};

const AttachedFiles = ({ filenames, onFileDetach }: attachedFilesProps) => {
	return (
		<div className={classes.uploadedFiles}>
			{filenames.map((filename, index) => (
				<span key={index} onClick={() => onFileDetach && onFileDetach(index)}>
					<FileIcon />
					<span className={classes.text}>
						{filename.length < 10 ? filename : `${filename.slice(0, 15)}...`}
					</span>
				</span>
			))}
		</div>
	);
};

export default AttachedFiles;
