import { useState } from "react";
import { Button } from "../../../components";
import classes from "../styles.module.scss";
import {
	stages,
	actionType,
	stageType,
	actions,
} from "../../../models/ChatTypes";
import TextArea from "./TextArea/TextArea";
import FileInput from "./FileInput/FileInput";
import AttachedFiles from "./AttachedFiles/AttachedFiles";

const buttons: {
	key: number;
	text: string;
	action: actionType;
	activeOnStage: stageType[];
	color?: "green" | "blue";
}[] = [
	{
		key: 1,
		text: "Отправить",
		action: actions.SEND,
		activeOnStage: [stages.REQUEST],
	},
	{
		key: 2,
		text: "Редактировать",
		action: actions.EDIT,
		activeOnStage: [stages.APPROVE],
	},
	{
		key: 3,
		text: "Всё верно",
		action: actions.COMMIT,
		activeOnStage: [stages.APPROVE],
	},
];

type inputProps = {
	onSend: (newMessage: string, attachedFiles: File[]) => void;
	stage: stageType;
};

const Input = ({ onSend, stage }: inputProps) => {
	const [message, setMessage] = useState("");
	const [files, setFiles] = useState<File[]>([]);

	const onAction = (action: actionType) => {
		if (action === actions.SEND) {
			onSend(message, files);

			setMessage("");
			setFiles([]);
			return;
		}
		if (action === actions.COMMIT) {
			return;
		}
		if (action === actions.EDIT) {
			return;
		}
	};

	const onFileAttach = (newFile: File) => {
		setFiles([...files, newFile]);
	};

	return (
		<div className={classes.input}>
			<div className={classes.textarea}>
				<TextArea
					onSend={() => stage === stages.REQUEST && onAction(actions.SEND)}
					message={message}
					setMessage={setMessage}
				/>
				<FileInput onFileAttach={onFileAttach} />
				<AttachedFiles filenames={files.map((file) => file.name)} />
			</div>

			{buttons.map((buttonProps) => (
				<Button
					onClick={() => onAction(buttonProps.action)}
					{...buttonProps}
					optionalClasses={[
						!buttonProps.activeOnStage.includes(stage) && "disabled",
					]}
				/>
			))}
		</div>
	);
};

export default Input;
