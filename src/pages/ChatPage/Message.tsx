import AttachedFiles from "./Input/AttachedFiles/AttachedFiles";
import classNames from "classnames";
import classes from "./styles.module.scss";
import { File } from "../../models/types";

type messageProps = {
	index: number;
	text: string;
	files: File[] | undefined;
};

const pitureContentTypes = ["images/jpg"];

const isPicture = (file: File) => {
	return (
		file.id &&
		file.content_type &&
		pitureContentTypes.includes(file.content_type)
	);
};

const Message = ({ index, text, files }: messageProps) => {
	const defaultFiles = files?.filter((file) => !isPicture(file));
	const pictureIds = files?.filter(isPicture).map((picture) => picture.id);

	return (
		<div className={classNames(index % 2 && classes.green, classes.message)}>
			<div className={classes.messageText}>{text}</div>
			<div className={classes.messagePhoto}>
				{pictureIds &&
					pictureIds.map(
						(id) =>
							id && (
								<img
									height="200"
									src={`oncoanalitika.com/api/download/${id}`}
									alt="attachedPhoto"
								/>
							)
					)}
			</div>
			{defaultFiles && <AttachedFiles files={defaultFiles} couldDownload />}
		</div>
	);
};

export default Message;
