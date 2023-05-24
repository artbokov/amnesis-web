import { useState } from "react";
import { Button } from "../../../components";
import classes from "../styles.module.scss";
import TextArea from "./TextArea/TextArea";
import FileInput from "./FileInput/FileInput";
import AttachedFiles from "./AttachedFiles/AttachedFiles";

type inputProps = {
	onOptionSend: (optionName: string) => void;
	onMessageSend: (newMessage: string, attachedFiles: File[]) => void;
	options: [string, string][];
};

const Input = ({ onMessageSend, onOptionSend, options }: inputProps) => {
	const [message, setMessage] = useState("");
	const [files, setFiles] = useState<File[]>([]);

	const sendMessage = () => {
		setMessage("");
		setFiles([]);

		onMessageSend(message, files);
	};

	const onFileAttach = (newFile: File) => {
		setFiles([...files, newFile]);
	};

	const onFileDetach = (fileIndex: number) => {
		setFiles(files.filter((file, index) => index !== fileIndex));
	};

	return (
		<div className={classes.input}>
			<div className={classes.textarea}>
				<TextArea
					onSend={() => !options.length && sendMessage()}
					message={message}
					setMessage={setMessage}
				/>
				<FileInput onFileAttach={onFileAttach} />
				<AttachedFiles files={files} onFileDetach={onFileDetach} />
			</div>
			<Button
				onClick={sendMessage}
				text="Отправить"
				optionalClasses={[!!options.length && "disabled"]}
			/>
			{options.map((option) => (
				<Button onClick={() => onOptionSend(option[0])} text={option[1]} />
			))}
		</div>
	);
};

export default Input;
