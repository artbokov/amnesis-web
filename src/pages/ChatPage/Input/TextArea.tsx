type textAreaProps = { 
  onSend: () => void,
  message: string, 
  setMessage: (text: string) => void,
  };
  
const TextArea = ({onSend, message, setMessage}: textAreaProps) => {
  const isSendRequest = (e: any) => (e.ctrlKey && e.key === "Enter");

  return (
    <textarea 
      placeholder="Введите ваш текст тут:"
      value={message}
      onChange={e => setMessage(e.target.value)}
      onKeyDown={e => isSendRequest(e) && onSend()}
    />
  );
}

export default TextArea;