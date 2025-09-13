interface Message {
  role: 'user' | 'ai';
  content: string;
  timestamp: number;
}

interface ChatBubbleProps {
  message: Message;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  return (
    <div className={`chat-bubble ${message.role}`} data-testid={`chat-bubble-${message.role}`}>
      <p className="whitespace-pre-line">{message.content}</p>
    </div>
  );
}
