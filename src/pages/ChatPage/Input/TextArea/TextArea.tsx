type textAreaProps = {
  onSend: () => void;
  message: string;
  setMessage: (text: string) => void;
};

const TextArea = ({ onSend, message, setMessage }: textAreaProps) => {
  const onKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.ctrlKey) {
        setMessage(message + "\n");
        return;
      }
      onSend();
    }
  };

  return (
    <textarea
      placeholder="Введите ваш текст тут:"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={onKeyDown}
    />
  );
};

export default TextArea;
