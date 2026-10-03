import { useState, useEffect, useRef } from 'react';
import type { Message } from '@/types';

interface ChatWindowProps {
  messages: Message[];
  onSend: (text: string) => void;
}

export const ChatWindow = ({ messages, onSend }: ChatWindowProps) => {
  const [text, setText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  return (
    <div className="chat-window">
      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="chat-messages-empty">Нет сообщений</div>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`message-row ${m.isOutgoing ? 'outgoing' : 'incoming'}`}
          >
            <div className="message-bubble">{m.text}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form className="chat-input-form" onSubmit={handleSubmit}>
        <input
          className="chat-input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Введите сообщение..."
        />
        <button className="chat-send-button" type="submit">
          𖤂
        </button>
      </form>
    </div>
  );
};