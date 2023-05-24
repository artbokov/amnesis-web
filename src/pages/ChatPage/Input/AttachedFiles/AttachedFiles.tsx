import classes from "../../styles.module.scss";
import { ReactComponent as FileIcon } from "../../../../assets/fileIcon.svg";
import { File } from "../../../../models/types";

type attachedFilesProps = {
	files: File[];
	onFileDetach?: (index: number) => void;
	couldDownload?: true;
};

const AttachedFiles = ({
	files,
	onFileDetach,
	couldDownload = undefined,
}: attachedFilesProps) => {
	return (
		<div className={classes.uploadedFiles}>
			{files.map((file, index) => (
				<span key={index} onClick={() => onFileDetach && onFileDetach(index)}>
					<FileIcon />
					<a
						className={classes.text}
						href={couldDownload && `oncoanalitika.com/api/download/${file.id}`}
					>
						{file.name.length < 10 ? file.name : `${file.name.slice(0, 15)}...`}
					</a>
				</span>
			))}
		</div>
	);
};

export default AttachedFiles;
